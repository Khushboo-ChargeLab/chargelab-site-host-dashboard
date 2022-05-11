// React
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import { useTranslation } from 'react-i18next';

// Components
import { ChargerStatusChart, DataReport, Summary } from '.';
import { Sessions } from '../Session/Sessions.component';
import { Dropdown } from '../_ui';

// Actions
import { fetchChargers } from '../../stores/reducers/charger.reducer';
import {
  fetchSessions,
  fetchSimpleStat,
} from '../../stores/reducers/sessons.reducer';

// Selectors
import { selectChargerStatuses } from '../../stores/selectors/charger.selector';
import { fetchStatistics } from '../../stores/reducers/stats.reducer';
import { getLocation } from '../../stores/selectors/location.selector';

export const Overview = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const { t } = useTranslation();
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
      label: t('all_location'),
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
    <div className='pb-12'>
      <div className='block'>
        <Dropdown
          title='Location'
          headerWidth='auto'
          items={locationsDropdown}
          onItemClick={locationChanged}
          headerClassName='bg-white border border-solid border-silver5 rounded'
          headerHighLightClassName='bg-white border border-solid border-silver5 rounded'
        />
      </div>
      <div className='flex flex-row mt-6 gap-6'>
        <div className='inline-block w-96'>
          <ChargerStatusChart data={chargerStatus} />
        </div>
        <div className='flex-grow'>
          <Summary />
        </div>
      </div>
      <div className='mt-6 block'>
        <DataReport />
      </div>
      <div className='mt-6 block'>
        <Sessions locationId={locationId} />
      </div>
    </div>
  );
};
