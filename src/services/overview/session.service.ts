import { formatIso, getLastWeek } from '../../utils/Date.Util';
import { get } from '../http/http.service';
import { getUserScope } from '../authenticate/authenticate.service';

export const getRecentSessions = async (filter: any): Promise<any[]> => {
    let transactionsQuery = `historical/transactions?scope=${getUserScope()}`;
    let sessionsQuery = `sessions?scope=${getUserScope()}`;

    if (filter?.locations?.id) {
        transactionsQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
        sessionsQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
    }

    if (filter?.charger?.length) {
        transactionsQuery += `&filter_in%5BchargerId%5D=${filter?.charger.map((c: any) => c.id).join(',')}`;
        sessionsQuery += `&filter_in%5BchargerId%5D=${filter?.charger.map((c: any) => c.id).join(',')}`;
    }

    if (filter?.dateRange) {
        transactionsQuery += `&filter_ge%5BstartTime%5D=${formatIso(filter?.dateRange[0])}&filter_lt%5BstartTime%5D=${formatIso(filter?.dateRange[1])}`;
    } else {
        const lastWeek = getLastWeek();
        transactionsQuery += `&filter_ge%5BstartTime%5D=${formatIso(lastWeek[0])}&filter_lt%5BstartTime%5D=${formatIso(lastWeek[1])}`;
    }

    const { entities } = await get(sessionsQuery);
    const transactions = await get(transactionsQuery);

    return entities.concat(transactions.entities);
};