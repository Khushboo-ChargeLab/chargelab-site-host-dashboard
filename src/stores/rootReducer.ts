import { combineReducers } from 'redux';
import { appNavigationReducer } from './reducers/app-navigation.reducer';
import { SessionsReducer } from './reducers/sessons.reducer';
import { ThemeReducer } from './reducers/theme.reducer';
import { ChargersReducer } from './reducers/chargers.reducer';
import { TransactionsReducer } from './reducers/transactions.reducer';
import { LocationsReducer } from './reducers/locations.reducer';

const rootReducer = combineReducers({
  navigator: appNavigationReducer,
  theme: ThemeReducer,
  recentSessions: SessionsReducer,
  chargers: ChargersReducer,
  transactions: TransactionsReducer,
  locations: LocationsReducer,
});
export default rootReducer;
