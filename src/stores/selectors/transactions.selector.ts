import { createSelector } from 'reselect';
import { TransactionList } from '../types/transactions.interface';

const TransactionsSelectors = (state: any) =>
  (state?.transactions || []) as TransactionList;

export const getTransactions = createSelector(
  [TransactionsSelectors],
  (transactions) => transactions,
);
