// React
import React, { memo, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
// Hooks
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Location } from 'history';
// Selectors
import { getChargerDetail } from '../../stores/selectors/charger.selector';
// Components
import { Label, LabelType, Button, ButtonType, Card, FormInput } from '../_ui';
import { ChargerStatus } from './ChargerStatus.component';
import { Sessions } from '../Session/Sessions.component';
// assets
import { start, stop, reset, alert, coolicon, info } from '../../lib';
import { fetchChargerDetail, UpdateChargerInformation, updateChargerInformation } from '../../stores/reducers/charger.reducer';
import { CHARGER_STATUS } from './Constants';
import { ButtonSize } from '../_ui/Button.component';
// css
import 'tippy.js/dist/tippy.css';
import './tippy-tooltip.css';

export const ChargerDetail = () => {
  const { t } = useTranslation();
  const distpach = useDispatch();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { state } = currentLocation;
  const id = (state as any)?.id;
  const charger = useSelector(getChargerDetail(id));
  const [editEnabled, setEditEnabled] = useState(false);
  const [directions, setDirections] = useState(charger?.directions);
  const [parkingSpot, setParkingSpot] = useState(charger?.parkingSpot);
  const [associatedBuildingUnit, setAssociatedBuildingUnit] = useState(charger?.associatedBuildingUnit);
  const [internalNote, setInternalNote] = useState(charger?.internalNote);

  let payload: UpdateChargerInformation = { id };

  useEffect(() => {
    if (id) {
      distpach(fetchChargerDetail({ id }));
    }
  }, [distpach, id]);

  const renderImage = () => {
    return (
      <div className='flex self-center'>
        <img src={charger?.imageUrl} width={160} height={160} alt='' />
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className='flex flex-col mt-4'>
        {renderImage()}
        <div className='flex gap-4 flex-col pt-4'>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_make')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <Label text={charger?.model} type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_serial_number')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <Label text='' type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_connectors')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <Label
              text={charger?.ports[0]?.connectorTypes[0]}
              type={LabelType.BODY3}
            />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_location')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <Label text={charger?.location?.name} type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_address')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <Label
              text={charger?.location?.streetAddress}
              type={LabelType.BODY3}
            />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_status')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <ChargerStatus status={charger?.status} />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_last_used')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <Label text='' type={LabelType.BODY3} />
          </div>
          <div className='flex flex-row gap-3'>
            <Label
              text={t('charger_actions')}
              type={LabelType.H7}
              className='w-[9.25rem]'
            />
            <div className='flex flex-row gap-2 ml-3 h-8 w-[16.56rem]'>
              <Button
                label='Start'
                type={ButtonType.Icon}
                icon={start}
                size={ButtonSize.FULL}
                iconGap='gap-1'
              />
              <Button
                label='Stop'
                type={ButtonType.Icon}
                icon={stop}
                size={ButtonSize.FULL}
              />
              <Button
                label='Reset'
                type={ButtonType.Icon}
                icon={reset}
                size={ButtonSize.FULL}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdditionalInfo = () => {
    const handleEditBtnClick = () => {
      setEditEnabled(true);
    };

    const directionsChanged = (event: any) => {
      setDirections(event.target.value);
    };

    const parkingSpotChanged = (event: any) => {
      setParkingSpot(event.target.value);
    };

    const associatedBuildingUnitChanged = (event: any) => {
      setAssociatedBuildingUnit(event.target.value);
    };

    const internalNoteChanged = (event: any) => {
      setInternalNote(event.target.value);
    };

    const handleSaveBtnClick = () => {
      payload = {
        ...payload,
        directions,
        parkingSpot,
        associatedBuildingUnit,
        internalNote,
      };
      distpach(updateChargerInformation(payload));
      setEditEnabled(false);
    };

    const handleCancelBtnClick = () => {
      setDirections(charger?.directions);
      setParkingSpot(charger?.parkingSpot);
      setAssociatedBuildingUnit(charger?.associatedBuildingUnit);
      setInternalNote(charger?.internalNote);
      setEditEnabled(false);
    };
    const renderBtnDiv = () => {
      if (editEnabled) {
        return (
          <div className='flex flex-row-reverse gap-2'>
            <Button label='Save' type={ButtonType.Primary} size={ButtonSize.SMALL} onClick={handleSaveBtnClick} />
            <Button label='Cancel' type={ButtonType.Cancel} size={ButtonSize.SMALL} onClick={handleCancelBtnClick} />
          </div>
        );
      }
    };

    const renderEditBtnDiv = () => {
      if (!editEnabled) {
        return (
          <div className='flex flex-row-reverse w-[16rem]'>
            <Button label='Edit' type={ButtonType.Cancel} size={ButtonSize.SMALL} onClick={handleEditBtnClick} />
          </div>
        );
      }
    };
    return (
      <div className='flex gap-1 flex-col pt-4'>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_additional_info')}
            type={LabelType.H7}
            className='w-[9.25rem]'
            style={{ 'min-height': '40px' }}
          />
          {renderEditBtnDiv()}
        </div>
        <div className='flex flex-row gap-3'>
          <div className='flex flex-row gap-1 w-[9.25rem]'>
            <Label
              text={t('charger_directions')}
              type={LabelType.H7}
              className='w-auto py-2.5'
            />
            <Tippy
              content={(
                <Label
                  text='This will appear in the app to help drivers find the charger.'
                  type={LabelType.LABEL_S}
                  style={{ 'color': 'rgb(255 255 255)', 'font-style': 'normal', 'font-family': 'Inter' }}
                />
              )}
              allowHTML
              arrow
              placement='top-start'
              interactive
              maxWidth={300}
              offset={[-10, 0]}
              className='h-16 py-3 px-4'
            >
              <img src={info} alt='Info' width='16.67px' height='16.67px' />
            </Tippy>
          </div>
          {!editEnabled && charger?.directions &&
            (
              <Label text={charger?.directions} type={LabelType.BODY3} className='py-2.5' />
            )}
          {editEnabled &&
            (
              <input
                value={directions}
                className='rounded text-sm not-italic font-sans text-black bg-silver w-64 h-9 px-3 py-2'
                onChange={directionsChanged}
              />
            )
          }
        </div>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_parking_space')}
            type={LabelType.H7}
            className='w-[9.25rem] py-2.5'
          />
          {!editEnabled && charger?.parkingSpot &&
            (
              <Label text={charger?.parkingSpot} type={LabelType.BODY3} className='py-2.5' />
            )}
          {editEnabled &&
            (
              <input
                value={parkingSpot}
                className='rounded text-sm not-italic font-sans text-black bg-silver w-64 h-9 px-3 py-2'
                onChange={parkingSpotChanged}
              />
            )
          }
        </div>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_unit')}
            type={LabelType.H7}
            className='w-[9.25rem] py-2.5'
          />
          {!editEnabled && charger?.associatedBuildingUnit &&
            (
              <Label text={charger?.associatedBuildingUnit} type={LabelType.BODY3} className='py-2.5' />
            )}
          {editEnabled &&
            (
              <input
                value={associatedBuildingUnit}
                className='rounded text-sm not-italic font-sans text-black bg-silver w-64 h-9 px-3 py-2'
                onChange={associatedBuildingUnitChanged}
              />
            )
          }
        </div>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_internal_note')}
            type={LabelType.H7}
            className='w-[9.25rem] py-2.5'
          />
          {!editEnabled && charger?.internalNote &&
            (
              <Label text={charger?.internalNote} type={LabelType.BODY3} className='py-2.5' />
            )}
          {editEnabled &&
            (
              <input
                value={internalNote}
                className='rounded text-sm not-italic font-sans text-black bg-silver w-64 h-9 px-3 py-2'
                onChange={internalNoteChanged}
              />
            )
          }
        </div>
        {renderBtnDiv()}
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className='flex gap-4 flex-col pt-4'>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_settings')}
            type={LabelType.H7}
            className='w-[9.25rem]'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_pricing')}
            type={LabelType.H7}
            className='w-[9.25rem]'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_access')}
            type={LabelType.H7}
            className='w-[9.25rem]'
          />
          <Label text='' type={LabelType.BODY3} />
        </div>
        <div className='flex flex-row gap-3'>
          <Label
            text={t('charger_auto_start')}
            type={LabelType.H7}
            className='w-[9.25rem]'
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

  const renderError = () => {
    // if (charger?.status !== CHARGER_STATUS.OUT_OF_ORDER) {
    //   return null;
    // }
    return (
      <div style={{ width: '413px', height: '156px' }}>
        <Card
          className='border-2 border-alerts_negative_1'
          bg='bg-alerts_negative_0'
          padding='p-6'
        >
          <div className='flex flex-row gap-3.5'>
            <div className=''>
              <img src={alert} alt='' />
            </div>
            <div className='flex flex-col'>
              <Label text={t('charger_detail_error')} />
              <ul className='list-disc ml-6 mt-2'>
                <li>
                  <Label
                    text={t('chargers_trouble_solution_3')}
                    type={LabelType.BODY3_GREY6}
                  />
                </li>
              </ul>
              <div className='mt-6'>
                <Button
                  label={t('charger_detail_err_button')}
                  type={ButtonType.Alert}
                  size={ButtonSize.ERROR}
                  icon={coolicon}
                  iconRightAlign
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderDetail = () => (
    <div className='w-[28.3rem]'>
      <Card padding='p-5'>
        {renderError()}
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
