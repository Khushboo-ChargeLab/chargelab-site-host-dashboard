import { formatInTimeZone } from 'date-fns-tz';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadCSV } from '../../services/utils';
import { alert, charging, completed } from '../../lib';
import { fetchSessions } from '../../stores/reducers/sessons.reducer';
import { fetchTransactionReport } from '../../stores/reducers/transactionReport.reducer';
import { selectChargers } from '../../stores/selectors/charger.selector';
import { getTransactionReport } from '../../stores/selectors/transactionReport.selector';
import { getSortedRecentSessions } from '../../stores/selectors/session.selector';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { convertToDate } from '../../utils/Date.Util';
import {
  Button,
  ButtonType,
  Card,
  CustomDatePicker,
  Dropdown,
  DropdownType,
  Grid,
  Label,
  LabelType,
  ModalForm,
  Pill,
  PILL_BG_COLOR,
} from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';
import { SessionDetail } from './SessionDetail.component';

interface SessionsProps {
  locationId?: string | undefined;
  chargerId?: string | undefined;
  enableFilterLocation?: boolean;
  enableExportCSV?: boolean;
  dataMap?: Array<string>;
}

export const Sessions = ({
  locationId,
  chargerId,
  enableFilterLocation = true,
  enableExportCSV = true,
  dataMap,
}: SessionsProps) => {
  const dispatch = useDispatch();
  const recentSessions = useSelector(getSortedRecentSessions);
  const chargers = useSelector(selectChargers);
  const transactionReport = useSelector(getTransactionReport);
  const [filter, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadReport, setDownloadReport] = useState(false);

  const [chargerData, setChargerData] = useState<
    { id: string; label: string | undefined; selected: boolean }[]
  >([]);
  const [_locationId, setLocationId] = useState(locationId);
  useEffect(() => {
    setLocationId(locationId);
  }, [locationId]);
  const getDefaultChargerData = (_id: any) => {
    return chargers
      .filter((charger) => !_id || charger.location?.id === _id)
      .map((charger: any) => ({
        id: charger.id,
        label: charger.name,
        selected: false,
      }));
  };

  useEffect(() => {
    setChargerData(getDefaultChargerData(_locationId));
  }, [chargers, _locationId]);

  const refreshGrid = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      if (page === 1) {
        dispatch(fetchSessions({ page, ...filter }));
      }
      // Fetch data
    },
    [filter, dispatch],
  );

  const dateChanged = useCallback(
    (selectedDate: any) => {
      setFilter({
        ...filter,
        dateRange: selectedDate,
      });
    },
    [filter],
  );

  const handleClearAllClick = () => {
    setChargerData(getDefaultChargerData(_locationId));
    setFilter({
      ...filter,
      charger: [],
    });
  };

  const renderClearAllButton = () => {
    const foundSelectedCharger = chargerData.some(
      (charger) => charger.selected,
    );
    if (foundSelectedCharger) {
      return (
        <button
          type='button'
          className='pl-2 text-left'
          onClick={handleClearAllClick}
        >
          <Label type={LabelType.DROPDOWN_ITEM_SELECTED} text='Clear all' />
        </button>
      );
    }
  };

  const handlePillClick = (chargerToBeRemoved: any) => {
    const newChargerList = chargerData.map((cd) => {
      if (cd.label === chargerToBeRemoved.label) {
        return { ...cd, selected: false };
      }
      return cd;
    });
    setFilter({
      ...filter,
      charger: newChargerList
        .filter((data: any) => data.selected)
        .map((selectedData: any) => {
          return chargers.find((charger) => charger.id === selectedData.id);
        }),
    });
    setChargerData(newChargerList);
  };

  const renderSelectedCharger = () => {
    return chargerData
      .filter((charger: any) => charger.selected)
      .map((c: any, index) => {
        return (
          <Pill
            // eslint-disable-next-line react/no-array-index-key
            key={`${c.label}-${index}`}
            onClick={() => handlePillClick(c)}
            label={c.label}
            isButton
            autoWidth
            labelType={LabelType.PILL_DROPDOWN}
          />
        );
      });
  };

  const chargerSelected = (item: any) => {
    setFilter({
      ...filter,
      charger: item
        .filter((data: any) => data.selected)
        .map((selectedData: any) => {
          return chargers.find((charger) => charger.id === selectedData.id);
        }),
    });
    setChargerData(item);
  };

  const rowClick = useCallback((rowData: any) => {
    const generateChargerStatusHistory = (
      status: any,
      startTime: any,
      endTime: any,
    ) => {
      const chargerStatusHistory = [];
      if (status === 'FAILED') {
        chargerStatusHistory.push({
          title: 'Failed',
          date: convertToDate(startTime),
        });
      } else if (status === 'PREPARING' || status === 'IN_PROGRESS') {
        chargerStatusHistory.push(
          { title: 'Charging' },
          { title: 'Start', date: convertToDate(startTime) },
        );
      } else {
        chargerStatusHistory.push(
          { title: 'Completed', date: convertToDate(endTime) },
          { title: 'Charging' },
          { title: 'Start', date: convertToDate(startTime) },
        );
      }
      return chargerStatusHistory;
    };

    const SessionDetailInfo = {
      startTime: rowData.startTime || rowData.createTime,
      endTime: rowData.stopTime || rowData.completeTime,
      timeZone: rowData.port?.charger?.location?.timeZone,
      authenticationType: 'N/A',
      charger: rowData.port?.charger?.name,
      connector: rowData.port?.charger?.type,
      connectorSide: rowData.port?.physicalLocation,
      connectorUrl: 'N/A',
      location: rowData.port?.charger?.location?.name,
      address: rowData.port?.charger?.location?.streetAddress,
      kwhUsed: rowData.consumedEnergyKwh,
      cost: rowData.billedTotalAmount,
      currency: rowData.billedCurrency,
      sessionStatus: rowData.status,
      statusHistory: generateChargerStatusHistory(
        rowData.status,
        rowData.startTime || rowData.createTime,
        rowData.stopTime || rowData.completeTime,
      ),
    };
    ModalForm.show({
      title: 'Session detail',
      body: <SessionDetail sessionData={SessionDetailInfo} />,
    });
  }, []);

  useEffect(() => {
    if (downloadReport && transactionReport.transactionReport) {
      downloadCSV(transactionReport.transactionReport, 'Export Transactions');
    }
  }, [transactionReport.transactionReport, downloadReport]);

  useEffect(() => {
    refreshGrid(1);
  }, [refreshGrid]);

  const handleButtonClick = () => {
    dispatch(fetchTransactionReport({ ...filter }));
    setDownloadReport(true);
  };

  const renderSelectedChargers = () => {
    if (!chargerData.some((c: any) => c.selected)) {
      return <div className='mt-5' />;
    }
    return (
      <div className='gap-2 mt-5 mb-6 inline-flex flex-wrap'>
        {renderSelectedCharger()}
        {renderClearAllButton()}
      </div>
    );
  };

  const columnsSettings = [
    { key: 'port.charger.location.name', title: 'Location' },
    {
      key: 'port.charger.name',
      title: 'Charger',
      component: (row: any) => (
        <Pill
          width='200'
          label={row.port.charger.name}
          className='text-grey6'
          bgColor={PILL_BG_COLOR.LIGHT}
          labelType={LabelType.LABEL_S_G6}
        />
      ),
    },
    {
      key: 'createTime|startTime',
      title: 'Start Time',
      component: (row: any) => {
        return (
          <Label
            text={formatInTimeZone(row?.createTime || row?.startTime || '', row.port.charger.location.timeZone, 'LLL dd, h:mm a')}
            type={LabelType.BODY3}
          />
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      component: (row: any) => {
        let statusIcon = '';
        if (
          row?.status?.toLowerCase() === 'preparing' ||
          row?.status?.toLowerCase() === 'in_progress'
        ) {
          statusIcon = charging;
        } else if (row?.status?.toLowerCase() === 'failed') {
          statusIcon = alert;
        } else {
          statusIcon = completed;
        }
        return (
          <Label
            text={(row.status || 'Completed')
              .replace('ENDED', 'Completed')
              .replace('FAILED', 'Failed')
              .replace('PREPARING', 'Preparing')
              .replace('IN_PROGRESS', 'Charging')}
            type={LabelType.BODY3}
            icon={statusIcon}
          />
        );
      },
    },
    {
      key: 'consumedEnergyKwh',
      title: 'Energy used',
      component: (row: any) => (
        <Label
          text={
            row.consumedEnergyKwh || row.consumedEnergyKwh === 0
              ? `${row.consumedEnergyKwh.toFixed(1)} kWh`
              : ''
          }
          type={LabelType.BODY3}
        />
      ),
    },
    {
      key: 'billedTotalAmount',
      title: 'Cost',
      component: (row: any) => (
        <Label
          text={
            row.billedTotalAmount || row.billedTotalAmount === 0
              ? `${convertToLocaleCurrency(
                  row.billedTotalAmount,
                  row.billedCurrency,
                )}`
              : ''
          }
          type={LabelType.BODY3}
        />
      ),
    },
  ];
  return (
    <Card title='Recent sessions'>
      <div className='flex mt-3 w-full'>
        <div className='flex w-4/5'>
          {enableFilterLocation && (
            <div className='mr-2'>
              <Dropdown
                title='Charger'
                headerWidth='auto'
                type={DropdownType.CHECKBOX}
                items={chargerData}
                onItemClick={chargerSelected}
                headerHighLightClassName='bg-grey6 border-grey-light2 rounded'
                inputWidth='15.3rem'
              />
            </div>
          )}
          <CustomDatePicker format='MMM d,yyyy' onChange={dateChanged} />
        </div>
        {enableExportCSV && (
          <div className='flex justify-end w-1/5'>
            <Button
              size={ButtonSize.SMALL}
              label='Export CSV'
              type={ButtonType.Cancel}
              onClick={handleButtonClick}
            />
          </div>
        )}
      </div>

      {renderSelectedChargers()}

      <Grid
        onRowClick={rowClick}
        pageIndex={currentPage}
        loadPage={refreshGrid}
        local
        columns={columnsSettings.filter(
          (setting) => !dataMap || dataMap?.includes(setting.key),
        )}
        data={recentSessions}
        totalPage={Math.ceil(recentSessions.length / 20)}
        primaryKey='id'
      />
    </Card>
  );
};
