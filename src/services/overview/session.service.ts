import { formatDate, formatIso, getLastWeek, addMonths } from '../../utils/Date.Util';
import { get } from '../http/http.service';
import { getUserScope } from '../authenticate/authenticate.service';

export const getRecentSessions = async (filter: any): Promise<any[]> => {
    let transactionsQuery = `historical/transactions?scope=${getUserScope()}`;
    let sessionsQuery = `sessions?scope=${getUserScope()}&filter_hasCompletedTx=false`;

    if (filter?.locations?.id) {
        transactionsQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
        sessionsQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
    }

    if (filter?.charger?.length) {
        transactionsQuery += `&filter_in%5BchargerId%5D=${filter?.charger.map((c: any) => c.id).join(',')}`;
        sessionsQuery += `&filter_in%5BchargerId%5D=${filter?.charger.map((c: any) => c.id).join(',')}`;
    }

    if (filter?.dateRange) {
        const startDate = new Date(filter?.dateRange[0]);
        const endDate = new Date(filter?.dateRange[1]);
        transactionsQuery += `&filter_ge%5BstartTime%5D=${formatIso(startDate)}&filter_lt%5BstartTime%5D=${formatIso(endDate)}`;
        sessionsQuery += `&filter_ge%5BcreateTime%5D=${formatIso(startDate)}&filter_lt%5BcreateTime%5D=${formatIso(endDate)}`;
    } else {
        const lastWeek = getLastWeek();
        transactionsQuery += `&filter_ge%5BstartTime%5D=${formatIso(lastWeek[0])}&filter_lt%5BstartTime%5D=${formatIso(lastWeek[1])}`;
        sessionsQuery += `&filter_ge%5BcreateTime%5D=${formatIso(lastWeek[0])}&filter_lt%5BcreateTime%5D=${formatIso(lastWeek[1])}`;
    }

    const { entities } = await get(sessionsQuery);
    const transactions = await get(transactionsQuery);

    return entities.concat(transactions.entities);
};

export const getSimpleStats = async (filter: any) => {
    let query = 'historical/simplestats?aggregateLocations=false&currency=CAD';

    if (filter?.locations?.id) {
        query += `&locationId=${filter?.locations.id}`;
    }
    if (filter?.statRange) {
        query += `&fromDate=${formatDate(filter?.statRange[0], 'yyyy-MM')}&toDate=${formatDate(filter?.statRange[1], 'yyyy-MM')}`;
    } else {
        const date = new Date();
        query += `&fromDate=${formatDate(date, 'yyyy-MM')}&toDate=${formatDate(addMonths(date, 1), 'yyyy-MM')}`;
    }
    return get(query);
};