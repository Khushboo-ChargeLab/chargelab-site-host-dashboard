import { createSelector } from 'reselect';
import { AppState } from '../types/App-State';
import { Theme } from '../types/theme.interface';
import { chargelab } from '../../lib';

const ThemeSelectors = (state: any) => state.theme as AppState;
const initStore = {
    networkLogo: chargelab,
    chartColor: '#3DBAE3',
    navigationSelectedColor: '#18A0D7',
    btnHoverColor: '#117DB8',
    secondaryBtnBgColor: '#E8F7FC',
} as Theme;

export const getCurrentTheme = createSelector(
    [ThemeSelectors],
    (state) => state?.theme || initStore,
);
