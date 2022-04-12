import { createAction, createReducer } from '@reduxjs/toolkit';
import { RecentSessions } from '../types/sessions.interface';

export const fetchSessions = createAction<any>('FETCH-RECENT-SESSIONS');
export const fetchSessionsSuccess = createAction<RecentSessions>('FETCH-RECENT-SESSIONS-SUCCESS');

export const SessionsReducer = createReducer({

}, (builder) => {
    builder
        .addCase(fetchSessionsSuccess, (state, action) => ({
            ...state,
            recentSessions: action.payload,
        }));
});
