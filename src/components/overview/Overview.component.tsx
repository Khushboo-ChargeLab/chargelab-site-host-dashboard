import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Summary, ChargerStatusChart, DataReport } from '.';
import { fetchChargers } from '../../stores/reducers/charger.reducer';
import {
  fetchSessions,
  fetchSimpleStat,
} from '../../stores/reducers/sessons.reducer';
import { selectChargerStatuses } from '../../stores/selectors/charger.selector';
import { getLocation } from '../../stores/selectors/location.selector';
import { Sessions } from '../Session';
import { Dropdown } from '../_ui';

export const Overview = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const chargerStatus = useSelector(selectChargerStatuses);

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
