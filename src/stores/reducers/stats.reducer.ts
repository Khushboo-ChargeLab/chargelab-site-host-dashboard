import { createAction, createReducer } from '@reduxjs/toolkit';
import { Statistics } from '../types/stats.interface';

export const fetchStatistics = createAction<any>('FETCH-STATISTICS');
export const fetchStatisticsSuccess = createAction<Statistics[]>('FETCH-STATISTICS-SUCCESS');

export const StatsReducer = createReducer({}, (builder) => {
    builder
    .addCase(fetchStatisticsSuccess, (state, action) => ({
        ...state,
        stats: action.payload,
    }))
    .addCase(fetchStatistics, (state: any, action) => ({
        ...state,
        filter: {
            ...state.filter,
            ...action.payload,
        },
    }));
});