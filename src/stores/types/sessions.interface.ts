import { Location } from '.';

export interface Charger {
    id: string;
    completeTime?: Date;
    createTime?: Date;
    startTime?: Date;
    stopTime?: Date;
    billedTotalAmount?: number;
    consumedEnergyJoules?: number;
    status: string;
    transactionId?: string;
    name?: string;
    type?: string;
    port: {
        id: string;
        physicalLocation: string;
        charger: {
            id: string;
            model: string;
            name: string;
            type: string;
            location: Location;
        };
    };
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
