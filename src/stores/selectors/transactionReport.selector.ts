import { createSelector } from 'reselect';
import { TransactionReport } from '../types/transactionReports.interface';

const TransactionReportSelectors = (state: any) => state as TransactionReport;

export const getTransactionReport = createSelector(
  [TransactionReportSelectors],
  (state) => state?.transactionReport,
);

export const getTransactionReportFilter = createSelector(
  [TransactionReportSelectors],
  (state) => state?.transactionReport?.filter,
);