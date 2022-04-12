import { createAction, createReducer } from '@reduxjs/toolkit';
import { Theme } from '../types/theme.interface';

export const setCurrentTheme = createAction<Theme | null>('SET-CURRENT-THEME');

export const ThemeReducer = createReducer({

}, (builder) => {
    builder
        .addCase(setCurrentTheme, (state, action) => ({
            ...state,
            theme: action.payload,
        }));
});
