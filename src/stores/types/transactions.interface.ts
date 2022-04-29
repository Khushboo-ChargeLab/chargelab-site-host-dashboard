import { Charger } from './chargers.interface';

export interface Transaction {
  id: string;
  port: {
    id: string;
    physicalLocation: string;
    charger: Charger;
  };
  pluggedInTimeSeconds: number;
  effectiveChargingTimeSeconds: number;
  consumedEnergyKwh: number;
  startTime: Date;
  stopTime: Date;
  billedTotalAmount: number;
  billedCurrency: string;
  startedVia: string;
}

export interface TransactionList {
  totalCount: number;
  entries: Array<Transaction>;
}
