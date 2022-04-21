import { createSelector } from 'reselect';
import { AppState } from '../types/App-State';

const ChargerSelectors = (state: any) => state.chargers as AppState;
export const selectChargers = createSelector(
    [ChargerSelectors],
    (state) => state?.chargers || [],
);
