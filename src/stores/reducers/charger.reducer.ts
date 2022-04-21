import { createAction, createReducer } from '@reduxjs/toolkit';
import { Charger } from '../types/sessions.interface';

export const fetchChargers = createAction('FETCH-CHARGERS');
export const fetchChargersSuccess = createAction<Charger[]>('FETCH-CHARGERS-SUCCESS');

export const ChargerReducer = createReducer({

}, (builder) => {
    builder
        .addCase(fetchChargersSuccess, (state, action) => ({
            ...state,
            chargers: action.payload,
        }));
});
