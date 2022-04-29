import { createSelector } from 'reselect';
import { CHARGER_STATUS } from '../../components/Charger/Constants';
import { AppState } from '../types/App-State';

const ChargerSelectors = (state: any) => state.chargers as AppState;
export const selectChargers = createSelector(
    [ChargerSelectors],
    (state) => state?.chargers || [],
);

export const selectChargerStatuses = createSelector(
    [selectChargers],
    (chargers) => [
        {
            label: 'Available',
            value: chargers.filter(
                (c) =>
                    c.status === 'ONLINE' &&
                    c.ports.some((d) => d.status === 'AVAILABLE'),
            ).length,
            color: '#7CB342',
        },
        {
            label: 'Charging',
            value: chargers.filter(
                (c) =>
                    c.status === 'ONLINE' &&
                    (c.ports.every((d) => d.status === 'IDLE') ||
                        c.ports.every((d) => d.status === 'CHARGING')),
            ).length,
            color: '#039BE5',
        },
        {
            label: 'Offline',
            value: chargers.filter((c) => c.status === 'OFFLINE').length,
            color: '#FFB300',
        },
        {
            label: 'Coming soon',
            value: chargers.filter((c) => c.status === 'COMING_SOON').length,
            color: '#B0B8C1',
        },
    ],
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
