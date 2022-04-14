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

export interface Port {
  id: string;
  physicalLocation: string;
  connectorTypes: [];
  status: string;
}

export interface Charger {
  id: string;
  name: string;
  type: string;
  model: string;
  maxPowerKW: number;
  status: string;
  ports: Array<Port>;
  location: Location;
  imageUrl: string;
  directions: string;
  parkingSpot: string;
  associatedBuildingUnit: string;
  description: string;
  usageNotes: string;
  access: string;
  isFree: boolean;
  currentPrice: {
    currency: string;
    ratePerKilowattHour: number;
  };
  autoStartEnabled: boolean;
  installInfo: string;
  installationVoltage: number;
}

export interface ChargerList {
  totalCount: number;
  entries: Array<Charger>;
}

export interface LocationList {
  totalCount: number;
  entries: Array<Location>;
}
