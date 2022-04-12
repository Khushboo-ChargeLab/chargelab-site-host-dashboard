import { TimelineData } from "../_ui/time-line/types/Timeline.interface";

export interface SessionDetailData {
    startTime?: Date;
    endTime?: Date;
    duration?: string;
    authenticationType: string;
    charger?: string;
    connector: string;
    connectorSide: string,
    connectorUrl: string,
    location: string;
    address: string;
    kwhUsed?: number;
    cost?: number;
    statusHistory: TimelineData[];
}