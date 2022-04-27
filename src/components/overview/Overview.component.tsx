import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Summary, ChargerStatusChart, DataReport } from '.';
import { fetchChargers } from '../../stores/reducers/charger.reducer';
import {
  fetchSessions,
  fetchSimpleStat,
} from '../../stores/reducers/sessons.reducer';
import { getLocation } from '../../stores/selectors/location.selector';
import { Sessions } from '../Session';
import { Dropdown } from '../_ui';

export const Overview = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);

  const chargerStatus = [
    {
      label: 'Available',
      value: 4,
      color: '#7CB342',
    },
    {
      label: 'Charging',
      value: 1,
      color: '#039BE5',
    },
    {
      label: 'Offline',
      value: 3,
      color: '#FFB300',
    },
    {
      label: 'Coming soon',
      value: 2,
      color: '#B0B8C1',
    },
  ];

  const locationChanged = (location: any) => {
    dispatch(fetchSessions({ locations: location }));
    dispatch(fetchSimpleStat({ locations: location }));
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
          items={locations}
          white
          label='name'
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
