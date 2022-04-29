import { combineReducers } from 'redux';
import { appNavigationReducer } from './reducers/app-navigation.reducer';
import { ChargerReducer } from './reducers/charger.reducer';
import { LocationReducer } from './reducers/location.reducer';
import { SessionsReducer } from './reducers/sessons.reducer';
import { ThemeReducer } from './reducers/theme.reducer';
import { TransactionsReducer } from './reducers/transactions.reducer';
import { StatsReducer } from './reducers/stats.reducer';

const rootReducer = combineReducers({
  navigator: appNavigationReducer,
  theme: ThemeReducer,
  sessions: SessionsReducer,
  locations: LocationReducer,
  chargers: ChargerReducer,
  transactions: TransactionsReducer,
  stats: StatsReducer,
});
export default rootReducer;
