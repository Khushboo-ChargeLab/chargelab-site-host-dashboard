import { Location } from '../../stores/types';
import { get } from '../http/http.service';

export const getRecentSessions = async (filter: any): Promise<any[]> => {
    console.log('filter', filter);
    let transactionsQuery = 'historical/transactions?scope=all';
    let sessionsQuery = 'sessions?scope=all';

    if (filter?.locations?.id) {
        transactionsQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
        sessionsQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
    }

    if (filter?.charger?.id) {
        transactionsQuery += `&filter_in%5BchargerId%5D=${filter?.charger?.id}`;
        sessionsQuery += `&filter_in%5BchargerId%5D=${filter?.charger?.id}`;
    }

    const { entities } = await get(sessionsQuery);
    const transactions = await get(transactionsQuery);

    return entities.concat(transactions.entities);
};