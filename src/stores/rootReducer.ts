import { combineReducers } from 'redux';
import { appNavigationReducer } from './reducers/app-navigation.reducer';
import { SessionsReducer } from './reducers/sessons.reducer';
import { ThemeReducer } from './reducers/theme.reduer';

const rootReducer = combineReducers({
    navigator: appNavigationReducer,
    theme: ThemeReducer,
    recentSessions: SessionsReducer,
});
export default rootReducer;