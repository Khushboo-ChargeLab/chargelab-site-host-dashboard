import { AppNavigator } from './App-Navigator.interface';
import { RecentSessions } from './sessions.interface';
import { Theme } from './theme.interface';

export interface AppState {
    navigation: AppNavigator;
    theme: Theme;
    sessions: RecentSessions;
}