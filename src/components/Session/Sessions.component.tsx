import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alert, completed } from '../../lib';
import { fetchSessions } from '../../stores/reducers/sessons.reducer';
import { selectChargers } from '../../stores/selectors/charger.selector';
import { selectRecentSessions } from '../../stores/selectors/session.selector';
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

export const Sessions = () => {
  const dispatch = useDispatch();
  const recentSessions = useSelector(selectRecentSessions);
  const chargers = useSelector(selectChargers);

  const [filter, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [chargerData, setChargerData] = useState<
    { id: string; label: string | undefined; selected: boolean }[]
  >([]);

  useEffect(() => {
    setChargerData(
      chargers.map((charger) => ({
        id: charger.id,
        label: charger.name,
        selected: false,
      })),
    );
  }, [chargers]);

  const refreshGrid = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      if (page === 1) {
        console.log('filter:', filter);
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
    setChargerData(
      chargers.map((charger) => ({
        id: charger.id,
        label: charger.name,
        selected: false,
      })),
    );
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
      startTime: convertToDate(rowData.startTime || rowData.createTime),
      endTime: convertToDate(rowData.stopTime || rowData.completeTime),
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
    refreshGrid(1);
  }, [refreshGrid]);

  console.log('chargerData:', chargerData);
  return (
    <Card title='Recent sessions'>
      <div className='flex mt-3 mb-8 w-full'>
        <div className='flex w-4/5'>
          <Dropdown
            title='Charger'
            headerWidth='auto'
            type={DropdownType.CHECKBOX}
            items={chargerData}
            onItemClick={chargerSelected}
          />
          <CustomDatePicker
            format='MMM d,yyyy'
            className='ml-2'
            onChange={dateChanged}
          />
        </div>
        <div className='flex justify-end w-1/5'>
          <Button
            size={ButtonSize.SMALL}
            label='Export CSV'
            type={ButtonType.Cancel}
          />
        </div>
      </div>

      {chargerData.some((c: any) => c.selected) && (
        <div className='mt-3 mb-8 inline-flex flex-wrap gap-1'>
          {renderSelectedCharger()}
          {renderClearAllButton()}
        </div>
      )}
      <Grid
        onRowClick={rowClick}
        pageIndex={currentPage}
        loadPage={refreshGrid}
        local
        columns={[
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
            type: GridColumnType.DATETIME,
            format: 'LLL dd, h:mm a',
          },
          {
            key: 'status',
            title: 'Status',
            component: (row: any) => (
              <Label
                text={(row.status || 'Completed').replace('ENDED', 'Completed')}
                type={LabelType.BODY3}
                icon={row.status === 'Failed' ? alert : completed}
              />
            ),
          },
          {
            key: 'consumedEnergyKwh',
            title: 'Energy used',
            component: (row: any) => (
              <Label
                text={
                  row.consumedEnergyKwh ? `${row.consumedEnergyKwh} kWh` : ''
                }
                type={LabelType.BODY3}
              />
            ),
          },
          {
            key: 'billedTotalAmount',
            title: 'Cost',
            type: GridColumnType.CURRENCY,
          },
        ]}
        data={recentSessions}
        totalPage={Math.ceil(recentSessions.length / 20)}
        primaryKey='id'
      />
    </Card>
  );
};
