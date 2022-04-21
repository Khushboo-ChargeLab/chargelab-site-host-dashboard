import { createSelector } from 'reselect';
import { AppState } from '../types/App-State';

const LocationSelectors = (state: any) => state.locations as AppState;
export const getLocation = createSelector(
    [LocationSelectors],
    (state) => state?.locations || [],
);
