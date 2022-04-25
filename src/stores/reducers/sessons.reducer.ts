import { createAction, createReducer } from '@reduxjs/toolkit';
import { Charger } from '../types/sessions.interface';

export const fetchSessions = createAction<any>('FETCH-RECENT-SESSIONS');
export const fetchSessionsSuccess = createAction<Charger[]>('FETCH-RECENT-SESSIONS-SUCCESS');
export const setSessionsFilter = createAction<any>('SET-SESSIONS-FILTER');

export const SessionsReducer = createReducer({

}, (builder) => {
    builder
        .addCase(fetchSessionsSuccess, (state, action) => ({
            ...state,
            chargers: action.payload,
        }))
        .addCase(fetchSessions, (state: any, action) => ({
            ...state,
            filter: {
                ...state.filter,
                ...action.payload,
            },
        }));
});
