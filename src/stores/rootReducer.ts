import { combineReducers } from 'redux';
import { appNavigationReducer } from './reducers/app-navigation.reducer';

const rootReducer = combineReducers({
    navigator: appNavigationReducer,
});
export default rootReducer;