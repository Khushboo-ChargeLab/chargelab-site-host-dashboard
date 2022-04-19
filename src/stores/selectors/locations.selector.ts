import { createSelector } from 'reselect';
import { LocationList } from '../types/location.interface';

const LocationsSelectors = (state: any) =>
  (state?.locations || []) as LocationList;

export const getLocations = createSelector(
  [LocationsSelectors],
  (locations) => locations,
);
