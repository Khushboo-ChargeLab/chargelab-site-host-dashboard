import { NumberLiteralType } from 'typescript';
import { Location } from '.';

export interface Charger {
    id: string;
    completeTime?: Date;
    createTime?: Date;
    startTime?: Date;
    stopTime?: Date;
    billedTotalAmount?: number;
    consumedEnergyKwh?: number;
    status: string;
    transactionId?: string;
    name?: string;
    type?: string;
    usageNotes?: string;
    access?: string;
    location?: Location;
    model?: string;
    autoStartEnabled: boolean;
    currentPrice: {
        currency: string;
        flatRate: number;
        ratePerEffectiveHour: number;
        ratePerHourPluggedIn: number;
        ratePerKilowattHour: number;
    };
    free: boolean;
    maxPowerKW: number;

    imageUrl: string;
    installInfo: string;
    installationVoltage: NumberLiteralType;
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
    ports: { id: string; physicalLocation: string; status: string; connectorTypes: string[] }[];
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
    stats: any[];
}
