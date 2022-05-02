import { createAction, createReducer, current } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Charger } from '../types/sessions.interface';
import { ChargerList } from '../types/chargers.interface';

export interface ChargerOptions {
  'filter_eq[locationId]'?: string;
  offset?: number;
  limit?: number;
  filter_hasTrouble?: boolean;
}

export const fetchChargers = createAction<ChargerOptions | undefined>(
  'FETCH-CHARGERS',
);

export const fetchChargersSuccess = createAction<ChargerList>(
  'FETCH-CHARGERS-SUCCESS',
);

export const fetchTroubleChargers = createAction<ChargerOptions>(
  'FETCH-TROUBLE-CHARGERS',
);

export const fetchTroubleChargersSuccess = createAction<ChargerList>(
  'FETCH-TROUBLE-CHARGERS-SUCCESS',
);

const initialState = {
  totalCount: 0,
  troubleCount: 0,
  entities: [] as Array<Charger>,
} as ChargerList;

export const ChargerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchChargersSuccess, (state, action) => {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        entities: _.unionBy(
          current(state.entities),
          action.payload.entities,
          'id',
        ),
      };
    })
    .addCase(fetchTroubleChargersSuccess, (state, action) => {
      return {
        ...state,
        troubleCount: action.payload.totalCount,
      };
    });
});
