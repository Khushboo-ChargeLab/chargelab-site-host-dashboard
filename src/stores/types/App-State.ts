import { AppNavigator, Theme, RecentSessions, Location } from '.';
import { Charger } from './sessions.interface';
import { ChargerList } from './chargers.interface';
import { StatisticsObject } from './stats.interface';
import { TransactionReport } from './transactionReports.interface';

export interface AppState {
    navigation: AppNavigator;
    theme: Theme;
    sessions: RecentSessions;
    locations: Location[];
    chargers: ChargerList;
    stats: StatisticsObject;
    transactionReport: TransactionReport;
}