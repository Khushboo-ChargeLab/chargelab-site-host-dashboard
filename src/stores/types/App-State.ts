import { AppNavigator, Theme, RecentSessions, Location } from '.';
import { Charger } from './sessions.interface';
import { ChargerList } from './chargers.interface';

export interface AppState {
    navigation: AppNavigator;
    theme: Theme;
    sessions: RecentSessions;
    locations: Location[];
    chargers: ChargerList;
}