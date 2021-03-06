import { createSelector } from 'reselect';
import { CHARGER_STATUS } from '../../components/Charger/Constants';
import { ChargerList } from '../types/chargers.interface';

const key = 'chargers';
const ChargerSelectors = (state: any) => state[key] as ChargerList;

// Available: charger status is online and at least 1 port is available
// Charging: charger status is online and all ports are in an idle or charging state
// Coming Soon: charger status is coming soon
// Out of Order: charger status is out of order
// Offline: charger status is offline
const getChargerStatus = (status?: string, ports?: any) => {
  switch (status) {
    case 'ONLINE': {
      return ports?.some((port: any) => port.status === 'AVAILABLE')
        ? CHARGER_STATUS.AVAILABLE
        : CHARGER_STATUS.CHARGING;
    }
    case 'COMING_SOON':
      return CHARGER_STATUS.COMING_SOON;
    case 'OUT_OF_ORDER':
      return CHARGER_STATUS.OUT_OF_ORDER;
    case 'CHARGING':
      return CHARGER_STATUS.CHARGING;
    case 'OFFLINE':
      return CHARGER_STATUS.OFFLINE;
    case 'PREPARING':
      return CHARGER_STATUS.PREPARING;
    case 'SCHEDULED':
      return CHARGER_STATUS.SCHEDULED;
    default:
      console.warn('unknown charger status:', status);
      return status;
  }
};

export const selectChargers = createSelector([ChargerSelectors], (chargers) => {
  return (
    chargers?.entities?.map((charger) => {
      return {
        ...charger,
        status: getChargerStatus(charger.status, charger.ports),
      };
    }) || []
  );
});

export const selectChargerStatuses = (locationId?: string) =>
createSelector(
    [selectChargers],
    (chargers) => {
      const filteredChargers = chargers.filter((charger) => !locationId || charger.location?.id === locationId);
      return [
        {
            label: 'Available',
            value: filteredChargers.filter(
                (c) =>
                    c.status === CHARGER_STATUS.AVAILABLE,
            ).length,
            color: '#7CB342',
        },
        {
            label: 'Charging',
            value: filteredChargers.filter(
                (c) =>
                    c.status === CHARGER_STATUS.CHARGING,
            ).length,
            color: '#039BE5',
        },
        {
            label: 'Offline',
            value: filteredChargers.filter((c) => c.status === CHARGER_STATUS.OFFLINE).length,
            color: '#FFB300',
        },
        {
            label: 'Coming soon',
            value: filteredChargers.filter((c) => c.status === CHARGER_STATUS.COMING_SOON).length,
            color: '#B0B8C1',
        },
    ];
    },

);

export const getTroubleChargerNum = createSelector(
  [ChargerSelectors],
  (chargers) => {
    return chargers?.troubleCount;
  },
);

export const getChargerNumber = createSelector(
  [ChargerSelectors],
  (chargers) => {
    return chargers.totalCount;
  },
);

export const getFilteredChargers = (statusFilter: any[], locationFilter?: string, page: number = 0, count: number = 10) =>
  createSelector(selectChargers, getChargerNumber, (entities, totalCount) => {
    const isAnyStatusSelected = statusFilter.some((item) => item.selected);
    const startIndex = page * count;
    const endIndex =
      startIndex + count > entities.length
        ? entities.length
        : startIndex + count;
    const filteredChargers = entities.filter((charger) => !locationFilter || charger.location?.id === locationFilter)
            .filter((charger) => !isAnyStatusSelected || statusFilter.some(
                (item) => item.label === charger.status && item.selected,
              ));
    return {
        chargers: filteredChargers.slice(startIndex, endIndex),
        count: totalCount,
    };
  });

  export const getChargerDetail = (chargerId: string | undefined) =>
  createSelector(selectChargers, (chargers) => {
    return chargerId ? chargers.find((charger) => charger.id === chargerId) : null;
  });