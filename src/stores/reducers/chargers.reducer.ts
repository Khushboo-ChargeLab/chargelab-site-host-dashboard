import { createAction, createReducer } from '@reduxjs/toolkit';
import { ChargerList } from '../types/chargers.interface';

const chargersStoreKey = 'chargers';

export const fetchChargers = (payload: any) => {
  return {
    type: 'CHARGER_FETCH_REQUEST',
    payload,
  };
};

export const fetchChargersSuccess = createAction<ChargerList>(
  'CHARGER_FETCH_SUCCESS',
);

export const ChargersReducer = createReducer({}, (builder) => {
  builder.addCase(fetchChargersSuccess, (state, action) => ({
    ...state,
    [chargersStoreKey]: action.payload,
  }));
});
