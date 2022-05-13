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
import { fetchTransactions } from '../../stores/reducers/transactions.reducer';
import {
  fetchChargers,
  fetchTroubleChargers,
  ChargerOptions,
} from '../../stores/reducers/charger.reducer';

// Selectors

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
import { getLocation } from '../../stores/selectors/location.selector';
import {
  getTroubleChargerNum,
  selectChargers,
  getFilteredChargers,
} from '../../stores/selectors/charger.selector';

const ROW_PER_PAGE = 20;

export const Chargers = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [statusList, setStatusList] = useState(() =>
    Object.values(CHARGER_STATUS).map((status) => ({
      label: t(`${status}`),
      selected: false,
    })),
  );
  const [locationFilter, setLocationFilter] = useState<string | undefined>();

  const { chargers, count } = useSelector(
    getFilteredChargers(
      statusList,
      locationFilter,
      currentPage - 1,
      ROW_PER_PAGE,
    ),
  );
  const troubleCount = useSelector(getTroubleChargerNum);
  const locations = useSelector(getLocation);
  const transactions = useSelector(getTransactions, shallowEqual);
  const [locationsDropdown, setlocationsDropdown] = useState<
    {
      id?: string;
      label: string;
      selected: Boolean;
    }[]
  >();

  useEffect(() => {
    const arr: Array<{ id?: string; label: string; selected: Boolean }> = [];
    arr.push({
      label: t('all_location'),
      selected: false,
    });
    const locationArr = locations.map((location) => {
      return {
        id: location.id,
        label: location.name,
        selected: false,
      };
    });
    setlocationsDropdown(arr.concat(locationArr));
  }, [locations]);

  const renderChargerOverview = () => {
    const text =
      troubleCount === 0
        ? t('chargers_status_all_online')
        : `${troubleCount} ${t('chargers_status_has_trouble')}`;
    return (
      <div>
        <Card
          className='border-2 border-grey2'
          title={t('chargers_overview')}
          titleType={LabelType.H7}
        >
          {chargers && troubleCount !== undefined && (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row items-center gap-2'>
                <img
                  className='w-7 h-7'
                  src={troubleCount > 0 ? infoRed : completed}
                  alt=''
                />
                <Label text={text} type={LabelType.H4} />
              </div>
              {troubleCount > 0 && (
                <Label
                  text={t('chargers_trouble_desc')}
                  type={LabelType.BODY3_GREY6}
                />
              )}
              {troubleCount > 0 && (
                <ul className='list-disc flex flex-col ml-6'>
                  <li>
                    <Label
                      text={t('chargers_trouble_solution_1')}
                      type={LabelType.BODY3_GREY6}
                    />
                  </li>
                  <li>
                    <Label
                      text={t('chargers_trouble_solition_2')}
                      type={LabelType.BODY3_GREY6}
                    />
                  </li>
                  <li>
                    <Label
                      text={t('chargers_trouble_solution_3')}
                      type={LabelType.BODY3_GREY6}
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
    setCurrentPage(1);
  };

  const rowClick = () => {};

  const handleLoadPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchTroubleChargers({ limit: 0, filter_hasTrouble: true }));
  }, [dispatch]);

  useEffect(() => {
    const offset = (currentPage - 1) * ROW_PER_PAGE;
    const payload: ChargerOptions = { offset, limit: ROW_PER_PAGE };
    if (locationFilter) {
      payload['filter_eq[locationId]'] = locationFilter;
    }
    dispatch(fetchChargers(payload));
  }, [currentPage, dispatch, locationFilter]);

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
    return charger.isFree ? t('chargers_price_free') : t('chargers_price_paid');
  };

  const getGridData = () =>
    chargers.map((charger) => ({
      charger: charger.name,
      location: charger.location?.name,
      status: charger.status,
      lastUsed:
        transactions?.entries.find(
          (transaction) => transaction.port.charger.id === charger.id,
        )?.startTime || '',
      pricing: getPrice(charger),
      access: charger.access,
      note: charger.usageNotes,
    }));

  const handlePillClick = (clickedItem: any) => {
    setStatusList(
      statusList.map((item) => {
        return {
          label: item.label,
          selected: clickedItem.label === item.label ? false : item.selected,
        };
      }),
    );
    setCurrentPage(1);
  };

  const renderSelectedStatus = () => {
    if (!statusList.some((item) => item.selected)) {
      return <div className='mt-5' />;
    }
    return (
      <div className='flex flex-row gap-2 mt-5 mb-6'>
        {statusList
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
          })}
      </div>
    );
  };

  const renderDropdown = () => {
    return (
      <div className='flex gap-3'>
        {locations && (
          <Dropdown
            title={t('location')}
            headerWidth='auto'
            items={locationsDropdown}
            onItemClick={handleLocationSelected}
          />
        )}
        <Dropdown
          title={t('status')}
          type={DropdownType.CHECKBOX}
          headerWidth='auto'
          items={statusList}
          onItemClick={(items: any) => setStatusList(items)}
          headerHighLightClassName='bg-grey6 border-grey-light2 rounded'
        />
      </div>
    );
  };

  const renderChargerTable = () => {
    return (
      <div>
        {chargers && (
          <div className='flex flex-col mt-6'>
            {renderDropdown()}
            {renderSelectedStatus()}
            <Grid
              onRowClick={rowClick}
              pageIndex={currentPage}
              loadPage={handleLoadPage}
              columns={getColumnTitle()}
              data={getGridData()}
              primaryKey='charger'
              totalPage={Math.ceil(count / ROW_PER_PAGE)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='pb-12'>
      <Card>
        {renderChargerOverview()}
        {renderChargerTable()}
      </Card>
    </div>
  );
};
