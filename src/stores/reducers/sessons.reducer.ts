import { createAction, createReducer } from '@reduxjs/toolkit';
import { Charger } from '../types/sessions.interface';

export const fetchSessions = createAction<any>('FETCH-RECENT-SESSIONS');
export const fetchSessionsSuccess = createAction<Charger[]>('FETCH-RECENT-SESSIONS-SUCCESS');
export const setSessionsFilter = createAction<any>('SET-SESSIONS-FILTER');
export const fetchSimpleStat = createAction<any>('SET-SIMPLE-STATS');
export const fetchSimpleStatSuccess = createAction<any[]>('FETCH-SIMPLE-STATS-SUCCESS');

export const SessionsReducer = createReducer({

}, (builder) => {
    builder
        .addCase(fetchSessionsSuccess, (state, action) => ({
            ...state,
            chargers: action.payload,
        }))
        .addCase(fetchSimpleStatSuccess, (state, action) => ({
            ...state,
            stats: action.payload,
        }))
        .addCase(fetchSimpleStat, (state: any, action) => ({
            ...state,
            filter: {
                ...state.filter,
                ...action.payload,
            },
        }))
        .addCase(fetchSessions, (state: any, action) => ({
            ...state,
            filter: {
                ...state.filter,
                ...action.payload,
            },
        }));
});
