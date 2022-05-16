import { TimelineData } from "../_ui/time-line/types/Timeline.interface";

export interface SessionDetailData {
    startTime?: Date;
    endTime?: Date;
    timeZone?: String,
    authenticationType: string;
    charger?: string;
    connector: string;
    connectorSide: string,
    location: string;
    address: string;
    kwhUsed?: number;
    cost?: number;
    currency?: string,
    sessionStatus?:string,
    statusHistory: TimelineData[];
}