import { createSelector } from '@reduxjs/toolkit';
import { TransactionReport } from '../types/transactionReports.interface';

const TransactionReportSelectors = (state: any) => state as TransactionReport;

export const getTransactionReport = createSelector(
  [TransactionReportSelectors],
  (state) => state?.transactionReport,
);