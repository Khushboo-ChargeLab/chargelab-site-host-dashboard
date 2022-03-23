import { createAction, createReducer } from '@reduxjs/toolkit';
import { AppNavigator } from '../types/App-Navigator.interface';

export const setCurrentNavigation = createAction<AppNavigator | null>('SET-CURRENT-NAVIGATION');

export const appNavigationReducer = createReducer({

}, (builder) => {
    builder
        .addCase(setCurrentNavigation, (state, action) => ({
            ...state,
            navigation: action.payload,
        }));
});
