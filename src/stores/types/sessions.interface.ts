export interface Charger {
    charger: string;
}

export interface ChargerStatus {
    status: string;
    count: number;
}

export interface ChargerSummary {
    title: string;
    value: string;
}
export interface RecentSessions {
    chargers: Charger[];
    chargerStatus: ChargerStatus[];
    chargerSummary: ChargerSummary[];
    filter: any;
}
