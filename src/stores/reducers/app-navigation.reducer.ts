import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCurrentNavigation = createAction<string>('SET-CURRENT-NAVIGATION');

export const appNavigationReducer = createReducer({

}, (builder) => {
    builder
        .addCase(setCurrentNavigation, (state, action) => {
            return {
                ...state,
                navigation: action.payload,
            }
        })
});