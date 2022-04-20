import { createSelector } from 'reselect';
import _ from 'lodash';
import { ChargerList } from '../types/chargers.interface';
import { CHARGER_STATUS } from '../../components/Charger/Constants';
import { AppState } from '../types/App-State';

const initState = {
  totalCount: 10,
  entries: [
    {
      id: '31a715c2-7329-4b49-ad79-8e183a722472',
      name: 'CSF-FREE',
      type: 'LEVEL_2',
      model: 'Delta AC Mini',
      maxPowerKW: 6.7,
      status: 'ONLINE',
      ports: [
        {
          id: '31a715c2-7329-4b49-ad79-8e183a722472.1',
          physicalLocation: 'FRONT',
          connectorTypes: ['TYPE_1'],
          status: 'AVAILABLE',
        },
      ],
      location: {
        id: 'affd3b91-d479-46f1-a095-922f280c2aef',
        name: 'TurnOnGreen HQ',
        latitude: 37.40669145,
        longitude: -121.90314503,
        timeZone: 'America/Los Angeles',
        streetAddress: '1635 S Main Street',
        zipOrPostalCode: '95035',
        city: 'Malpitas',
        stateOrRegion: 'CA',
        isoCountryCode: 'US',
      },
      imageUrl:
        'https://chargelabservice.s3.us-east-2.amazonaws.com/stations/generic/Delta+AC+Mini.jpg',
      directions: 'Located behind main entrance',
      parkingSpot: '3F-02',
      associatedBuildingUnit: '204',
      description: 'Private station for testing',
      usageNotes:
        'Works with any vehicle that has a SAE J1772 port. Works with Tesla vehicles using the J1772 adapter from your charging bag.',
      access: 'PUBLIC',
      isFree: false,
      currentPrice: {
        currency: 'USD',
        ratePerKilowattHour: 0.25,
      },
      autoStartEnabled: false,
      installInfo: 'Installed 2020',
      installationVoltage: 208,
    },
  ],
} as ChargerList;

const ChargersSelectors = (state: any) => {
  return (
    _.isEmpty(state?.chargers) ? initState : state?.chargers
  ) as ChargerList;
};

export const getChargers = createSelector([ChargersSelectors], (chargers) => {
  return chargers;
});

export const getTroubleChargerNum = createSelector(
  getChargers,
  (chargers) =>
    chargers?.entries.reduce((accumulator: number, charger: any) => {
      // eslint-disable-next-line no-return-assign
      return charger.status === CHARGER_STATUS.OFFLINE ||
        charger.status === CHARGER_STATUS.OUT_OF_ORDER
        ? (accumulator += 1)
        : accumulator;
    }, 0) || 0,
);
