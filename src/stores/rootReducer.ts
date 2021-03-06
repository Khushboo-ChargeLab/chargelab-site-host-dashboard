import { combineReducers } from 'redux';
import { ChargerReducer } from './reducers/charger.reducer';
import { LocationReducer } from './reducers/location.reducer';
import { SessionsReducer } from './reducers/sessons.reducer';
import { ThemeReducer } from './reducers/theme.reducer';
import { TransactionsReducer } from './reducers/transactions.reducer';
import { StatsReducer } from './reducers/stats.reducer';
import { TransactionReportReducer } from './reducers/transactionReport.reducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
  sessions: SessionsReducer,
  locations: LocationReducer,
  chargers: ChargerReducer,
  transactions: TransactionsReducer,
  stats: StatsReducer,
  transactionReport: TransactionReportReducer,
});
export default rootReducer;
