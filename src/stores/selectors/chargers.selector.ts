import { createSelector } from 'reselect';
import { ChargerList } from '../types/chargers.interface';
import { CHARGER_STATUS } from '../../components/Charger/Constants';

const ChargersSelectors = (state: any) =>
  (state?.chargers || []) as ChargerList;

export const getChargers = createSelector(
  [ChargersSelectors],
  (chargers) => chargers,
);

export const getTroubleChargerNum = createSelector(
  getChargers,
  (chargers) =>
    chargers?.entries.reduce((accumulator: number, charger: any) => {
      // eslint-disable-next-line no-return-assign
      return charger.status === CHARGER_STATUS.OFFLINE ||
        charger.status === CHARGER_STATUS.OUT_OF_ORDER
        ? (accumulator += 1)
        : accumulator;
    }, 0) || 0,
);
