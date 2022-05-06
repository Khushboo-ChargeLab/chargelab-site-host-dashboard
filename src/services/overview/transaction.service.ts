import { formatIso, getLastWeek } from '../../utils/Date.Util';
import { getUserScope } from '../authenticate/authenticate.service';
import { getBlob } from '../http/http.service';

export const getTransactionReport = async (filter: any): Promise<any> => {
    let transactionReportQuery = `historical/reports/transactions?scope=${getUserScope()}`;
    console.log('filter in getTransactionReport:>> ', filter);
    if (filter?.locations?.id) {
        transactionReportQuery += `&filter_eq%5BlocationId%5D=${filter?.locations?.id}`;
    }

    if (filter?.charger?.length) {
        transactionReportQuery += `&filter_in%5BchargerId%5D=${filter?.charger.map((c: any) => c.id).join(',')}`;
    }

    if (filter?.dateRange) {
        transactionReportQuery += `&filter_ge%5BstartTime%5D=${formatIso(filter?.dateRange[0])}&filter_lt%5BstartTime%5D=${formatIso(filter?.dateRange[1])}`;
    } else {
        const lastWeek = getLastWeek();
        transactionReportQuery += `&filter_ge%5BstartTime%5D=${formatIso(lastWeek[0])}&filter_lt%5BstartTime%5D=${formatIso(lastWeek[1])}`;
    }

    const response = await getBlob(transactionReportQuery, { 'Accept': 'text/csv;charset=UTF-8' });
    return response;
};