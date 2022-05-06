import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChargerStatusChart, DataReport, Summary } from '.';
import { fetchChargers } from '../../stores/reducers/charger.reducer';
import {
  fetchSessions,
  fetchSimpleStat,
} from '../../stores/reducers/sessons.reducer';
import { selectChargerStatuses } from '../../stores/selectors/charger.selector';
import { fetchStatistics } from '../../stores/reducers/stats.reducer';
import { getLocation } from '../../stores/selectors/location.selector';
import { Sessions } from '../Session';
import { Dropdown } from '../_ui';

export const Overview = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const [locationsDropdown, setlocationsDropdown] = useState<
    {
      id?: string;
      label: string;
      selected: Boolean;
    }[]
  >();

  useEffect(() => {
    const arr: Array<{ id?: string; label: string; selected: Boolean }> = [];
    arr.push({
      label: 'All',
      selected: false,
    });
    const locationArr = locations.map((location) => {
      return {
        id: location.id,
        label: location.name,
        selected: false,
      };
    });
    setlocationsDropdown(arr.concat(locationArr));
  }, [locations]);

  const [locationId, setLocation] = useState<string | undefined>();
  const chargerStatus = useSelector(selectChargerStatuses(locationId));
  const locationChanged = (selectedlocation: any) => {
    setLocation(selectedlocation?.id);
    const location = locations.find(
      (_location) => _location.id === selectedlocation.id,
    );
    dispatch(fetchSessions({ locations: location }));
    dispatch(fetchSimpleStat({ locations: location }));
    dispatch(fetchStatistics({ locationId: location?.id, currency: 'CAD' }));
    setlocationsDropdown(
      locationsDropdown?.map((data) => {
        return {
          ...data,
          selected: data.id === selectedlocation.id,
        };
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchChargers());
  }, [dispatch]);

  return (
    <>
      <div className='block'>
        <Dropdown
          title='Location'
          headerWidth='auto'
          items={locationsDropdown}
          white
          onItemClick={locationChanged}
        />
      </div>
      <div className='flex w-full mt-6'>
        <div className='inline-block w-2/5 pr-3'>
          <ChargerStatusChart data={chargerStatus} />
        </div>
        <div className='inline-block w-3/5 pl-3'>
          <Summary />
        </div>
      </div>
      <div className='mt-6 block'>
        <DataReport />
      </div>
      <div className='mt-6 block'>
        <Sessions />
      </div>
    </>
  );
};
