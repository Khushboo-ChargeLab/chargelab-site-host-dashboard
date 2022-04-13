import { combineReducers } from 'redux';
import { appNavigationReducer } from './reducers/app-navigation.reducer';
import { SessionsReducer } from './reducers/sessons.reducer';
import { ThemeReducer } from './reducers/theme.reducer';

const rootReducer = combineReducers({
    navigator: appNavigationReducer,
    theme: ThemeReducer,
    sessions: SessionsReducer,
});
export default rootReducer;