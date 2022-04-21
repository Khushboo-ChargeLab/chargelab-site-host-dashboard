import { createSelector } from 'reselect';
import { AppState } from '../types/App-State';

const SessionSelectors = (state: any) => state as AppState;

export const selectRecentSessions = createSelector(
    [SessionSelectors],
    (state) => state?.sessions?.chargers || [],
);

export const selectRecentSessionFilter = createSelector(
    [SessionSelectors],
    (state) => state?.sessions?.filter || [],
);
