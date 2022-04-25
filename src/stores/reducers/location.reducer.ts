import { createAction, createReducer } from '@reduxjs/toolkit';
import { Location } from '../types';

export const fetchLocations = createAction('FETCH-LOCATIONS');
export const fetchLocationsSuccess = createAction<Location[]>('FETCH-LOCATIONS-SUCCESS');

export const LocationReducer = createReducer({

}, (builder) => {
    builder
        .addCase(fetchLocationsSuccess, (state, action) => ({
            ...state,
            locations: action.payload,
        }));
});
