import { Statistics } from '../../stores/types/stats.interface';
import { formatDate } from '../../utils/Date.Util';
import { get, getBlob } from '../http/http.service';

export const getStatistics = async (filter: any): Promise<Statistics[] | Blob> => {
    let statisticsQuery = 'historical/simplestats';
    let response;
    if (filter?.getBlob === true) {
        response = await getBlob(statisticsQuery, { 'Accept': 'text/csv' });
    } else {
        if (filter?.fromDate) {
            statisticsQuery += `?fromDate=${filter?.fromDate}`;
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
        response = await get(statisticsQuery);
    }
    return response;
};