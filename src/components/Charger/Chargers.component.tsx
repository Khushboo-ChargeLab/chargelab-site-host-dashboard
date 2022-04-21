// React
import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

// Hooks
import { useTranslation } from 'react-i18next';

// Components
import {
  Label,
  Card,
  LabelType,
  Dropdown,
  Grid,
  Pill,
  DropdownType,
} from '../_ui';
import { infoRed, completed } from '../../lib';
import { ChargerStatus } from './ChargerStatus.component';

// Actions
import {
  fetchChargers,
  fetchTroubleChargers,
} from '../../stores/reducers/chargers.reducer';
import { fetchTransactions } from '../../stores/reducers/transactions.reducer';

// Selectors
import {
  getChargers,
  getTroubleChargerNum,
} from '../../stores/selectors/chargers.selector';
import { getLocations } from '../../stores/selectors/locations.selector';
import { getTransactions } from '../../stores/selectors/transactions.selector';

// Utils
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { formatDate } from '../../utils/Date.Util';

// Constants
import { ChargerList } from '../../stores/types/chargers.interface';
import { LocationList } from '../../stores/types/location.interface';
import { CHARGER_STATUS } from './Constants';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';
import { TransactionList } from '../../stores/types/transactions.interface';

export const Chargers = () => {
  // const dispatch = useDispatch();
  // dispatch(fetchChargers);
  // dispatch(fetchTroubleChargers);
  // dispatch(fetchTransactions);

  const chargers = useSelector(getChargers, shallowEqual);
  const troubleCount = useSelector(getTroubleChargerNum, shallowEqual);
  const locations = useSelector(getLocations, shallowEqual);
  const transactions = useSelector(getTransactions, shallowEqual);

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [statusList, setStatusList] = useState(() =>
    Object.values(CHARGER_STATUS).map((status) => ({
      label: t(`${status}`),
      selected: false,
    })),
  );
  const [locationFilter, setLocationFilter] = useState(null);

  const renderChargerOverview = () => {
    const text =
      troubleCount === 0
        ? t('chargers_status_all_online')
        : `${troubleCount} ${t('chargers_status_has_trouble')}`;
    const icon = troubleCount > 0 ? infoRed : completed;
    return (
      <div>
        <Card
          className='border-2 border-grey2'
          title={t('chargers_overview')}
          titleType={LabelType.H7}
        >
          {chargers && (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row items-center gap-2'>
                <img className='w-8 h-8' src={icon} alt='' />
                <Label text={text} type={LabelType.H4} />
              </div>
              {troubleCount > 0 && (
                <Label
                  text={t('chargers_trouble_desc')}
                  type={LabelType.BODY3}
                />
              )}
              {troubleCount > 0 && (
                <ul className='list-disc flex flex-col ml-6'>
                  <li>
                    <Label
                      text={t('chargers_trouble_solution_1')}
                      type={LabelType.BODY3}
                    />
                  </li>
                  <li>
                    <Label
                      text={t('chargers_trouble_solition_2')}
                      type={LabelType.BODY3}
                    />
                  </li>
                </ul>
              )}
            </div>
          )}
        </Card>
      </div>
    );
  };

  const handleLocationSelected = (location: any) => {
    setLocationFilter(location.id);
  };

  const rowClick = () => {};
  const refreshGrid = (page: number) => {};

  useEffect(() => {
    refreshGrid(0);
  }, [currentPage]);

  const getLocationDropDownList = () => {
    const result = [{ id: '', label: t('all_location'), selected: false }];
    locations?.entries.forEach((location) => {
      result.push({
        id: location.id,
        label: location.name,
        selected: false,
      });
    });
    return result;
  };

  const getColumnTitle = () => {
    return [
      {
        key: 'charger',
        title: t('charger'),
      },
      {
        key: 'location',
        title: t('location'),
        component: (row: any) => (
          <Label
            className='whitespace-nowrap w-40'
            text={row.location}
            type={LabelType.BODY3}
          />
        ),
      },
      {
        key: 'status',
        title: t('status'),
        component: (row: any) => (
          <div className='whitespace-nowrap w-40'>
            <ChargerStatus status={row.status} />
          </div>
        ),
      },

      {
        key: 'lastUsed',
        title: t('chargers_grid_lastUsed'),
        component: (row: any) => {
          return (
            <Label
              className='whitespace-nowrap w-40'
              text={formatDate(new Date(row.lastUsed), 'MMM dd, hh:mm a')}
              type={LabelType.BODY3}
            />
          );
        },
      },
      { key: 'pricing', title: t('pricing') },
      { key: 'access', title: t('access') },
      {
        key: 'note',
        title: t('chargers_grid_note'),
        component: (row: any) => {
          return (
            <div className='h-6 overflow-hidden text-ellipsis'>
              <Label text={row.note} type={LabelType.BODY3} />
            </div>
          );
        },
      },
    ];
  };

  const getPrice = (charger: any) => {
    return charger.currentPrice.ratePerKilowattHour === 0
      ? t('chargers_price_free')
      : convertToLocaleCurrency(
          charger.currentPrice.ratePerKilowattHour,
          charger.currentPrice.currency,
        );
  };

  const getGridData = () => {
    const row: Array<Object> = [];
    chargers?.entries.forEach((charger) => {
      const isAnyStatusSelected = statusList.some((item) => item.selected);
      const isStatusSelected = statusList.some(
        (item) => item.label === charger.status && item.selected,
      );

      if (
        (!locationFilter || charger.location.id === locationFilter) &&
        (!isAnyStatusSelected || isStatusSelected)
      ) {
        row.push({
          charger: charger.name,
          location: charger.location.name,
          status: charger.status,
          lastUsed:
            transactions?.entries.find(
              (transaction) => transaction.port.charger.id === charger.id,
            )?.startTime || '',
          pricing: getPrice(charger),
          access: charger.access,
          note: charger.usageNotes,
        });
      }
    });

    return row;
  };

  const handlePillClick = (clickedItem: any) => {
    setStatusList(
      statusList.map((item) => {
        return {
          label: item.label,
          selected: clickedItem.label === item.label ? false : item.selected,
        };
      }),
    );
  };

  const renderSelectedStatus = () => {
    return statusList
      .filter((item) => item.selected)
      .map((item) => {
        return (
          <Pill
            key={item.label}
            label={item.label}
            labelType={LabelType.PILL_DROPDOWN}
            isButton
            onClick={() => handlePillClick(item)}
            autoWidth
          />
        );
      });
  };

  const renderDropdown = () => {
    const locationDropdownLiust = getLocationDropDownList();
    return (
      <div className='flex flex-col gap-5'>
        <div className='flex gap-3'>
          {locations && (
            <Dropdown
              title={t('location')}
              headerWidth='auto'
              items={locationDropdownLiust}
              onItemClick={handleLocationSelected}
            />
          )}
          <Dropdown
            title={t('status')}
            type={DropdownType.CHECKBOX}
            headerWidth='auto'
            items={statusList}
            onItemClick={(items: any) => setStatusList(items)}
          />
        </div>
        <div className='flex flex-row gap-5'>{renderSelectedStatus()}</div>
      </div>
    );
  };

  const renderChargerTable = () => {
    return (
      <div>
        {chargers && (
          <div className='flex flex-col gap-6 mt-6'>
            <div className='flex gap-3'>{renderDropdown()}</div>
            <Grid
              onRowClick={rowClick}
              pageIndex={currentPage}
              loadPage={refreshGrid}
              columns={getColumnTitle()}
              data={getGridData()}
              primaryKey='charger'
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      {renderChargerOverview()}
      {renderChargerTable()}
    </Card>
  );
};
