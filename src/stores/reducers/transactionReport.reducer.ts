import { createAction, createReducer } from '@reduxjs/toolkit';

export const fetchTransactionReport = createAction<any>('TRANSACTION-FETCH-REPORT-REQUEST');
export const fetchTransactionReportSuccess = createAction<any>('TRANSACTION-FETCH-REPORT-SUCCESS');
export const addFilterForExportTransaction = createAction<any>('TRANSACTION-REPORT-ADD-FILTER');

export const TransactionReportReducer = createReducer({}, (builder) => {
    builder
    .addCase(fetchTransactionReport, (state: any, action) => ({
      ...state,
      filter: {
        ...state.filter,
        ...action.payload,
      },
    }))
    .addCase(addFilterForExportTransaction, (state: any, action) => ({
      ...state,
      filter: {
        ...state.filter,
        ...action.payload,
      },
    }))
    .addCase(fetchTransactionReportSuccess, (state, action) => ({
      ...state,
      transactionReport: action.payload,
    }));
  });