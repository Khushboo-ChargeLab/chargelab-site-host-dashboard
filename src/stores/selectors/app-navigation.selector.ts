import { createSelector } from 'reselect';
import { AppState } from '../types/App-State';

const AppNavigationSelectors = (state: any) => state.navigator as AppState;
const initStore = {
    title: 'Overview',
    path: '/overview',
};

export const getCurrentNavigation = createSelector(
    [AppNavigationSelectors],
    (state) => state?.navigation || initStore,
);
