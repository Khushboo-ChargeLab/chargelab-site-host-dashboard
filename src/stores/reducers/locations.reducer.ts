import { createAction, createReducer } from '@reduxjs/toolkit';
import { LocationList } from '../types/location.interface';

export const fetchLocations = createAction('LOCATION_FETCH_REQUEST');
export const fetchLocationsSuccess = createAction<LocationList>(
  'LOCATION_FETCH_SUCCESS',
);

export const LocationsReducer = createReducer({}, (builder) => {
  builder.addCase(fetchLocationsSuccess, (state, action) => ({
    ...state,
    locations: action.payload,
  }));
});
