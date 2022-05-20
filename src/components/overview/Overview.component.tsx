/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
// React
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Hooks
import { useTranslation, Trans } from 'react-i18next';
import { useUserPreference } from '../../hooks/useUserPreference';
import {
  useGlobalModalContext,
  MODAL_TYPES,
} from '../_ui/modal/GlobalModal.component';

// Components
import { ChargerStatusChart, DataReport, Summary } from '.';
import { Sessions } from '../Session/Sessions.component';
import { ButtonType, Dropdown, Label, LabelType, CheckBox } from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { boltCharging } from '../../lib';
import { getApiPrefix } from '../../services/http/http.service';

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
import { addFilterForExportTransaction } from '../../stores/reducers/transactionReport.reducer';

export const Overview = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const { t } = useTranslation();
  const [storedValue, setValue] = useUserPreference('show_welcome', true);
  const { showModal } = useGlobalModalContext();

  const handleWelcomeCheckBoxSelected = (checked: boolean) => {
    setValue(!checked);
  };

  const renderWelcomeBody = (url: string) => {
    return (
      <div className='w-full h-full pl-14 pt-2 pr-5 text-grey6 whitespace-pre-line text-sm leading-5 font-normal'>
        <Trans
          defaults="We've redesigned the Chargelab dashboard experience to be more
          powerful and intuitive.<br/><br/>Some parts of the new experience are still
          under construction, so if you need to access <strong>Pricing</strong>
          or <strong>export PDF reports</strong>, you can do so in the
          <strong>
            <customLink>previous version of the dashboard</customLink>
          </strong>
          .<br/><br/>These features will be available in the new dashboard experience
          soon."
          components={{
            italic: <i />,
            bold: <strong />,
            customLink: (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={url}
                style={{ color: '#18A0D7' }}
              />
            ),
            br: <br />,
          }}
        />

        <div className='mt-6'>
          <CheckBox
            label="Don't show me this again"
            onChange={(checked: boolean) =>
              handleWelcomeCheckBoxSelected(checked)
            }
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const ac = new AbortController();
    if (storedValue) {
      getApiPrefix()
        .then((api) => {
          showModal(MODAL_TYPES.ALERT_MODAL, {
            title: 'Welcome to new dashboard',
            icon: boltCharging,
            width: '400px',
            height: '400px',
            onRenderBody: () => renderWelcomeBody(api.oldDashboardUrl),
            buttons: [
              {
                label: 'Get started',
                size: ButtonSize.WELCOME,
              },
            ],
          });
        })
        .catch((e) => console.error(e));
    }
    return () => ac.abort();
  }, [storedValue]);

  const [locationsDropdown, setlocationsDropdown] = useState<
    {
      id?: string;
      label: string;
      selected: Boolean;
    }[]
  >([]);

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
    dispatch(addFilterForExportTransaction({ locations: location }));
    setlocationsDropdown(
      locationsDropdown?.map((data) => {
        return {
          ...data,
          selected: data.id === selectedlocation.id && selectedlocation.label !== 'All Locations',
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
          headerHighLightClassName='border border-solid rounded bg-grey6 border-grey-light2'
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
