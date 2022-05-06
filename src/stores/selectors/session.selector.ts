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

export const selectSimpleStats = createSelector(
    [SessionSelectors],
    (state) => state?.sessions?.stats || [],
);

export const getFormattedSimpleStats = createSelector(
    [selectSimpleStats],
    (stats) => stats.reduce((formattedStats, currentStat) => {
        const stat = formattedStats.find((formattedStat:any) => formattedStat.date === currentStat.date);
       if (stat) {
        stat.transactions += currentStat.transactions;
        stat.revenue += currentStat.revenue;
        stat.energyDeliveredKWh += currentStat.energyDeliveredKWh;
       } else {
           formattedStats.push({ ...currentStat });
       }
       return formattedStats;
    }, []),
);