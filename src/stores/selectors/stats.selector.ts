import { createSelector } from 'reselect';
import { AppState } from '../types/App-State';

const StatsSelectors = (state: any) => state as AppState;

export const selectRecentStats = createSelector(
    [StatsSelectors],
    (state) => state?.stats || [],
);
export const selectRecentStatsFilter = createSelector(
    [StatsSelectors],
    (state) => state?.stats?.filter || [],
);
