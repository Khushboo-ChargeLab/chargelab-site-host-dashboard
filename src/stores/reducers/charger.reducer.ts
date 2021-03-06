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

export interface AutoStartConfig {
  // TODO: Type value can be ENUM?
  type : string;
  email: string;
}

export interface UpdateChargerInformation {
  id: string;
  directions?: string;
  parkingSpot?: string;
  associatedBuildingUnit?: string;
  description?: string;
  internalNote?: string;
  autoStartConfig?: AutoStartConfig;
}

export const fetchChargerDetail = createAction<{id:string}>(
  'FETCH-CHARGER-DETAIL',
);

export const fetchChargerDetailSuccess = createAction<any>(
  'FETCH-CHARGER-DETAIL-SUCCESS',
);

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

export const updateChargerInformation = createAction<UpdateChargerInformation>(
  'UPDATE-CHARGER',
);

export const updateChargerInformationSuccess = createAction<any>(
  'UPDATE-CHARGER-SUCCESS',
);

const initialState = {
  totalCount: 0,
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
    })
    .addCase(fetchChargerDetailSuccess, (state, action) => {
      const fetchedCharger = action.payload;
      const chargers = state.entities;
      return {
        ...state,
        entities: chargers?.map((charger, index) => {
          if (charger.id === fetchedCharger.id) {
            return fetchedCharger;
          }
          return charger;
        }),
      };
    })
    .addCase(updateChargerInformationSuccess, (state, action) => {
      const { response, updatedChargerInfo } = action.payload;
      const chargers = state.entities;
      let updatedCharger;
      return {
        ...state,
        // FIX ME : Need to fix once we start getting updated entity from BE
        entities: chargers?.map((charger, index) => {
          if (charger.id === updatedChargerInfo.id) {
            updatedCharger = _.cloneDeep(charger);
            updatedCharger.directions = updatedChargerInfo.directions;
            updatedCharger.parkingSpot = updatedChargerInfo.parkingSpot;
            updatedCharger.associatedBuildingUnit = updatedChargerInfo.associatedBuildingUnit;
            updatedCharger.internalNote = updatedChargerInfo.internalNote;
            return updatedCharger;
          }
          return charger;
        }),
      };
    });
});
