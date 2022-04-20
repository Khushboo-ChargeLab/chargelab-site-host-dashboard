import { createSelector } from 'reselect';
import _ from 'lodash';
import { TransactionList } from '../types/transactions.interface';

const initState = {
  totalCount: 10,
  entries: [
    {
      id: '3d8425d9-edd0-2118-81f7-77c60a5a2652',
      port: {
        id: '31a715c2-7329-4b49-ad79-8e183a722472.1',
        physicalLocation: 'FRONT',
        charger: {
          id: '31a715c2-7329-4b49-ad79-8e183a722472',
          name: 'CSF-FREE',
          type: 'LEVEL_2',
          model: 'Delta AC Mini',
          location: {
            id: 'affd3b91-d479-46f1-a095-922f280c2aef',
            name: 'TurnOnGreen HQ',
            latitude: 37.40669145,
            longitude: -121.90314503,
            timeZone: 'America/Los Angeles',
            streetAddress: '1635 S Main Street',
            zipOrPostalCode: '95035',
            city: 'Malpitas',
            stateOrRegion: 'CA',
            isoCountryCode: 'US',
          },
        },
      },
      pluggedInTimeSeconds: 631.5359999999998,
      effectiveChargingTimeSeconds: 620,
      consumedEnergyJoules: 4464000,
      startTime: '2022-02-02T23:08:04.402-05:00',
      stopTime: '2022-02-02T23:18:35.938-05:00',
      billedTotalAmount: 0,
      billedCurrency: 'USD',
      startedVia: 'RFID',
    },
  ],
};

const TransactionsSelectors = (state: any) =>
  (_.isEmpty(state?.transactions)
    ? initState
    : state?.transactions) as TransactionList;

export const getTransactions = createSelector(
  [TransactionsSelectors],
  (transactions) => transactions,
);
