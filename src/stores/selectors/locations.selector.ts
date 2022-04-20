import { createSelector } from 'reselect';
import _ from 'lodash';
import { LocationList } from '../types/location.interface';

const initState = {
  totalCount: 10,
  entries: [
    {
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
      chargers: [
        {
          id: 'fafd3b90-d479-46f1-a095-922f280c2aec',
          type: 'LEVEL_2',
          maxPowerKW: 6.7,
          status: 'ONLINE',
          ports: [
            {
              id: '31a715c2-7329-4b49-ad79-8e183a722472.1',
              connectorTypes: ['TYPE_1'],
              status: 'AVAILABLE',
            },
          ],
          currentPrice: {
            currency: 'USD',
            ratePerKilowattHour: 0.25,
          },
        },
      ],
      operationHours: '0000-2400',
      phone: '+18006360986',
    },
  ],
};

const LocationsSelectors = (state: any) =>
  (_.isEmpty(state?.locations) ? initState : state?.locations) as LocationList;

export const getLocations = createSelector(
  [LocationsSelectors],
  (locations) => locations,
);
