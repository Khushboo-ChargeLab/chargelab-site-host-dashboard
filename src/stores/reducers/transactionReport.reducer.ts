import { createAction, createReducer } from '@reduxjs/toolkit';

export const fetchTransactionReport = createAction('TRANSACTION-FETCH-REPORT-REQUEST');
export const fetchTransactionReportSuccess = createAction<any>('TRANSACTION-FETCH-REPORT-SUCCESS');

export const TransactionReportReducer = createReducer({}, (builder) => {
    builder
    .addCase(fetchTransactionReport, (state: any, action) => ({
      ...state,
      filter: {
        ...state.filter,
      },
    }))
    .addCase(fetchTransactionReportSuccess, (state, action) => ({
      ...state,
      transactionReport: action.payload,
    }));
  });