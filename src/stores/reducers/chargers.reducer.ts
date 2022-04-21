import { createAction, createReducer } from '@reduxjs/toolkit';
import { ChargerList } from '../types/chargers.interface';

export const fetchChargers = createAction<string>('CHARGER_FETCH_REQUEST');

export const fetchTroubleChargers = createAction<string>('CHARGER_TROUBLE_NUMBER_FETCH_REQUEST');

export const fetchChargersSuccess = createAction<ChargerList>(
  'CHARGER_FETCH_SUCCESS',
);

export const ChargersReducer = createReducer({}, (builder) => {
  builder.addCase(fetchChargersSuccess, (state, action) => ({
    ...state,
    chargers: action.payload,
  }));
});
