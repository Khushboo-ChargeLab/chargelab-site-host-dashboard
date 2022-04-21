import { createAction, createReducer } from '@reduxjs/toolkit';
import { TransactionList } from '../types/transactions.interface';

export const fetchTransactions = createAction('TRANSACTIONS_FETCH_REQUEST');
export const fetchTransactionsSuccess = createAction<TransactionList>(
  'TRANSACTIONS_FETCH_SUCCESS',
);

export const TransactionsReducer = createReducer({}, (builder) => {
  builder.addCase(fetchTransactionsSuccess, (state, action) => ({
    ...state,
    transactions: action.payload,
  }));
});
