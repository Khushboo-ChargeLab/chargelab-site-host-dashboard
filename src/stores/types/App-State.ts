import { AppNavigator, Theme, RecentSessions, Location } from '.';
import { Charger } from './sessions.interface';

export interface AppState {
    navigation: AppNavigator;
    theme: Theme;
    sessions: RecentSessions;
    locations: Location[];
    chargers: Charger[];
}