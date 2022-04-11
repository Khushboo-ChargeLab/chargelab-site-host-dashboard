import { combineReducers } from 'redux';
import { appNavigationReducer } from './reducers/app-navigation.reducer';
import { ThemeReducer } from './reducers/theme.reduer';

const rootReducer = combineReducers({
    navigator: appNavigationReducer,
    theme: ThemeReducer,
});
export default rootReducer;