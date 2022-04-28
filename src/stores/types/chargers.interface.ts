import { Location } from './location.interface';
import { Charger } from './sessions.interface';

export interface ChargerList {
  totalCount: number;
  troubleCount?: number;
  entities: Array<Charger>;
}
