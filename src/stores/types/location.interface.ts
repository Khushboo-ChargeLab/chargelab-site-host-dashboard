export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  streetAddress: string;
  zipOrPostalCode: string;
  city: string;
  stateOrRegion: string;
  isoCountryCode: string;
  chargers?: [];
  operationHours?: string;
  phone?: string;
}

export interface LocationList {
  totalCount: number;
  entries: Array<Location>;
}
