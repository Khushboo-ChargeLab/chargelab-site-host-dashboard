import { GridColumnType } from "../enums/Grid-Column-Type.enum";

export interface GridColumn {
    key: string;
    title: string;
    type?: GridColumnType;
    format?: string;
    component?: any;
}