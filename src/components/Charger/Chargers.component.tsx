// React
import React, { useState, useEffect } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks';

// Components
import {
  Label,
  Card,
  Spinner,
  LabelType,
  Dropdown,
  Grid,
  PILL_BG_COLOR,
  Pill,
  DropdownType,
} from '../_ui';
import { infoRed, completed } from '../../lib';
import { ChargerStatus } from './ChargerStatus.component';

// Utils
import { convertToLocaleCurrency } from '../../utils/Currency.Util';

// Constants
import {
  Charger,
  ChargerList,
  LocationList,
} from '../../stores/types/chargers.interface';
import { CHARGER_STATUS } from './Constants';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';

export const Chargers = () => {
  const {
    data: chargers,
    error: chargersError,
    isLoading: isChargersLoading,
  } = useFetch<ChargerList>('/internal/core/v2/chargers');

  const {
    data: locations,
    error: locationsError,
    isLoading: isLocationLoading,
  } = useFetch<ChargerList>('/internal/core/v2/locations');

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<Array<string>>([]);
  const [locationFilter, setLocationFilter] = useState(null);

  const getTroubleNum = () => {
    let count = 0;
    chargers?.entries.forEach((charger) => {
      if (
        charger.status === CHARGER_STATUS.OUT_OF_ORDER ||
        charger.status === CHARGER_STATUS.OFFLINE
      ) {
        count += 1;
      }
    });
    return count;
  };

  const renderChargerOverview = () => {
    const troubleNum = getTroubleNum();
    const text =
      troubleNum === 0
        ? t('chargers_status_all_online')
        : `${troubleNum} ${t('chargers_status_has_trouble')}`;
    const icon = troubleNum > 0 ? infoRed : completed;
    return (
      <div>
        <Card
          className='border-2 border-grey2'
          title={t('chargers_overview')}
          titleType={LabelType.H7}
        >
          {isChargersLoading && <Spinner />}
          {chargers && (
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row items-center gap-2'>
                <img className='w-8 h-8' src={icon} alt='' />
                <Label text={text} type={LabelType.H4} />
              </div>
              {troubleNum > 0 && (
                <Label
                  text={t('chargers_trouble_desc')}
                  type={LabelType.BODY3}
                />
              )}
              {troubleNum > 0 && (
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

  const handleStatusSelected = (items: any) => {
    const newStatusFilter: Array<string> = [];
    items.forEach((item: any) => {
      if (item.selected) {
        newStatusFilter.push(item.label);
      }
    });
    setStatusFilter(newStatusFilter);
  };

  const handleLocationSelected = (location: any) => {
    setLocationFilter(location.id);
  };

  const rowClick = () => {};
  const refreshGrid = (page: number) => {};

  useEffect(() => {
    refreshGrid(0);
  }, [currentPage]);

  const getStatusDropDownList = () => {
    return Object.values(CHARGER_STATUS).map((status) => {
      return {
        label: t(`${status}`),
        selected: false,
      };
    });
  };

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
            className='whitespace-nowrap'
            text={row.location}
            type={LabelType.BODY3}
          />
        ),
      },
      {
        key: 'status',
        title: t('status'),
        component: (row: any) => <ChargerStatus status={row.status} />,
      },

      {
        key: 'lastUsed',
        title: t('chargers_grid_lastUsed'),
        type: GridColumnType.DATETIME,
      },
      { key: 'pricing', title: t('pricing') },
      { key: 'access', title: t('access') },
      {
        key: 'note',
        title: t('note'),
        component: (row: any) => {
          return (
            <div className='h-4 overflow-hidden text-ellipsis'>
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
      if (
        (!locationFilter || charger.location.id === locationFilter) &&
        (statusFilter.length === 0 || statusFilter.includes(charger.status))
      ) {
        row.push({
          charger: charger.name,
          location: charger.location.name,
          status: charger.status,
          // FIXME: Simon wants to prvide another api for 'lastUsed'
          lastUsed: '',
          pricing: getPrice(charger),
          access: charger.access,
          note: charger.usageNotes,
        });
      }
    });

    return row;
  };

  const renderChargerTable = () => {
    const statusDropdownList = getStatusDropDownList();
    const locationDropdownLiust = getLocationDropDownList();
    return (
      <div>
        {chargers && (
          <div className='flex flex-col gap-6 mt-6'>
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
                items={statusDropdownList}
                onItemClick={handleStatusSelected}
              />
            </div>
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
  console.log('chargers:', chargers);
  return (
    <Card>
      {renderChargerOverview()}
      {renderChargerTable()}
    </Card>
  );
};
