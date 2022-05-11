import { createSelector } from 'reselect';
import { getYear, getMonth, differenceInMonths, addMonths } from 'date-fns';
import { AppState } from '../types/App-State';
import { formatDate } from '../../utils/Date.Util';

const SessionSelectors = (state: any) => state as AppState;

export const selectRecentSessions = createSelector(
    [SessionSelectors],
    (state) => state?.sessions?.chargers || [],
);

export const getSortedRecentSessions = createSelector(
    [selectRecentSessions],
    (chargers) => {
        const sortedArray = [...chargers];
        sortedArray.sort((a, b) => {
            const startTimeA = a.startTime || a.createTime;
            const startTimeB = b.startTime || b.createTime;
            if (!startTimeA) return 1;
            if (!startTimeB) return -1;
            return startTimeA < startTimeB ? 1 : -1;
        });
        return sortedArray;
    },
);

export const selectRecentSessionFilter = createSelector(
    [SessionSelectors],
    (state) => state?.sessions?.filter || [],
);

export const selectSimpleStats = createSelector(
    [SessionSelectors],
    (state) => state?.sessions?.stats || [],
);
export const getFormattedSimpleStats = (dateRange:Date[]) => createSelector(
    [selectSimpleStats],
    (stats) => {
        const diffMonths = Math.abs(differenceInMonths(dateRange[0], dateRange[1]));
        const initStats = [];
        for (let i = 0; i <= diffMonths; i += 1) {
            initStats.push({
                date: formatDate(addMonths(dateRange[0], i), 'yyyy-LL'),
                transactions: 0,
                revenue: 0,
                energyDeliveredKWh: 0,
            });
        }
        const result = stats.reduce((formattedStats, currentStat) => {
            const stat = formattedStats.find((formattedStat:any) => formattedStat.date === currentStat.date);
           if (stat) {
            stat.transactions += currentStat.transactions;
            stat.revenue += currentStat.revenue;
            stat.energyDeliveredKWh += currentStat.energyDeliveredKWh;
           } else {
               formattedStats.push({ ...currentStat });
           }
           return formattedStats;
        }, initStats);
        return result.sort((a:any, b:any) => new Date(a.date) < new Date(b.date) ? -1 : 1,
        );
    },

);