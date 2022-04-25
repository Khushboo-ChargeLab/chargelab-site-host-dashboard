import { createSelector } from 'reselect';
import { CHARGER_STATUS } from '../../components/Charger/Constants';
import { AppState } from '../types/App-State';

const ChargerSelectors = (state: any) => state.chargers as AppState;
export const selectChargers = createSelector(
    [ChargerSelectors],
    (state) => state?.chargers || [],
);

export const getTroubleChargerNum = createSelector(
    selectChargers,
    (chargers) =>
        chargers?.reduce((accumulator: number, charger: any) => {
            // eslint-disable-next-line no-return-assign
            return charger.status === CHARGER_STATUS.OFFLINE ||
                charger.status === CHARGER_STATUS.OUT_OF_ORDER
                ? (accumulator += 1)
                : accumulator;
        }, 0) || 0,
);
