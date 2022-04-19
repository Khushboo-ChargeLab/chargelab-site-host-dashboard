import { createAction, createReducer } from '@reduxjs/toolkit';
import { ChargerList } from '../types/chargers.interface';

export const fetchChargers = createAction('CHARGER_FETCH_REQUEST');
export const fetchChargersSuccess = createAction<ChargerList>(
  'FETCH-RECENT-SESSIONS-SUCCESS',
);

export const ChargersReducer = createReducer({}, (builder) => {
  builder.addCase(fetchChargersSuccess, (state, action) => ({
    ...state,
    chargers: action.payload,
  }));
});
