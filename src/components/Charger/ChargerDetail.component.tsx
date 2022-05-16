// React
import React, { memo, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
// Hooks
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Location } from 'history';
// Selectors
import { getChargerDetail } from '../../stores/selectors/charger.selector';
// Components
import { Label, LabelType, Button, ButtonType, Card } from '../_ui';
import { ChargerStatus } from './ChargerStatus.component';
import { Sessions } from '../Session/Sessions.component';
// assets
import { start, stop, reset } from '../../lib';
import { fetchChargerDetail } from '../../stores/reducers/charger.reducer';

export const ChargerDetail = () => {
  const { t } = useTranslation();
  const distpach = useDispatch();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { state } = currentLocation;
  const id = (state as any)?.id;
  const charger = useSelector(getChargerDetail(id));

  useEffect(() => {
    if (id) {
      distpach(fetchChargerDetail({ id }));
    }
  });

  const renderImage = () => {
    return (
      <div className='flex self-center'>
        <img src={charger?.imageUrl} width={160} height={160} alt='' />
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className='flex flex-col'>
        {renderImage()}
        <div className='flex gap-4 flex-col pt-4'>
          <div className='flex flex-row'>
            <Label
              text={t('charger_make')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <Label text={charger?.model} type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_serial_number')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <Label text='' type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_connectors')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <Label
              text={charger?.ports[0]?.connectorTypes[0]}
              type={LabelType.BODY3}
            />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_location')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <Label text={charger?.location?.name} type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_address')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <Label
              text={charger?.location?.streetAddress}
              type={LabelType.BODY3}
            />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_status')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <ChargerStatus status={charger?.status} />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_last_used')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <Label text='' type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row'>
            <Label
              text={t('charger_actions')}
              type={LabelType.H7}
              className='basis-1/2'
            />
            <div className='flex flex-row gap-2'>
              <Button label='Start' type={ButtonType.Icon} icon={start} />
              <Button label='Start' type={ButtonType.Icon} icon={stop} />
              <Button label='Start' type={ButtonType.Icon} icon={reset} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdditionalInfo = () => {
    return (
      <div className='flex gap-4 flex-col pt-4'>
        <div className='flex flex-row'>
          <Label
            text={t('charger_additional_info')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_directions')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_parking_space')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_unit')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_internal_note')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className='flex gap-4 flex-col pt-4'>
        <div className='flex flex-row'>
          <Label
            text={t('charger_settings')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_pricing')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_access')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row'>
          <Label
            text={t('charger_auto_start')}
            type={LabelType.H7}
            className='basis-1/2'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
      </div>
    );
  };

  const renderNav = (parent: string, name?: string) => (
    <div className='flex flex-row gap-1'>
      <Link to={-1 as any}>
        <Label text={parent} type={LabelType.LABEL_M_LINK} />
      </Link>
      <Label text={`/ ${name}`} type={LabelType.LABEL_M_GREY} />
    </div>
  );

  const renderDetail = () => (
    <div className='w-[28.3rem]'>
      <Card>
        {renderInfo()}
        {renderAdditionalInfo()}
        {renderSettings()}
      </Card>
    </div>
  );

  const renderSessions = () => (
    <div className='flex flex-grow'>
      <Sessions
        enableFilterLocation={false}
        enableExportCSV={false}
        dataMap={[
          'createTime|startTime',
          'status',
          'consumedEnergyKwh',
          'billedTotalAmount',
        ]}
      />
    </div>
  );

  return (
    <div className='flex flex-col gap-6'>
      {renderNav(t('Chargers'), charger?.name)}
      <div className='flex flex-row gap-6'>
        {renderDetail()}
        {renderSessions()}
      </div>
    </div>
  );
};
