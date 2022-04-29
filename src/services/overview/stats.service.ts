import { Statistics } from '../../stores/types/stats.interface';
import { get } from '../http/http.service';

export const getStatistics = async (filter: any): Promise<Statistics[]> => {
    let statisticsQuery = 'historical/simplestats?';

    if (filter?.fromDate) {
        statisticsQuery += `fromDate=${filter?.fromDate}`;
    }
    if (filter?.toDate) {
        statisticsQuery += `&toDate=${filter?.toDate}`;
    }
    if (filter?.locationId) {
        statisticsQuery += `&locationId=${filter?.locationId}&aggregateLocations=false`;
    } else {
        statisticsQuery += '&aggregateLocations=true';
    }
    if (filter?.currency) {
        statisticsQuery += `&currency=${filter?.currency}`;
    }
    const response = await get(statisticsQuery);
    return response;
};