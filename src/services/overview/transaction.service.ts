import { getBlob } from '../http/http.service';

export const getTransactionReport = async (): Promise<any> => {
    const transactionReportQuery = 'historical/reports/transactions';
    const response = await getBlob(transactionReportQuery, { 'Accept': 'text/csv;charset=UTF-8' });
    console.log('response of getTransactionReport :>> ', response);
    return response;
};