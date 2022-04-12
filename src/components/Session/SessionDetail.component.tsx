import React, { memo } from 'react';
import { alert, charging, completed, startGreen } from '../../lib';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { formatDateTime } from '../../utils/Date.Util';
import { Label, LabelType, Pill, Timeline } from '../_ui';
import { SessionDetailData } from './SessionDetail.interface';

interface SessionDetailProps {
sessionData: SessionDetailData;
}

const renderIcon = (chargingStatus: string) => {
  const chargingStatusValue = chargingStatus.toLowerCase();
  let icon;
  switch (chargingStatusValue) {
    case 'start':
      icon = startGreen;
      break;
    case 'charging':
      icon = charging;
      break;
    case 'completed':
      icon = completed;
      break;
    case 'alert':
      icon = alert;
      break;
    default:
      icon = '';
      break;
  }
  return icon;
};

const renderTitle = (title: string) => <Label text={title} type={LabelType.BODY3} icon={renderIcon(title)} />;

const renderContent = (date: Date) => <Label text={formatDateTime(date, 'LLL dd, h:mm a')} type={LabelType.BODY3_G5} />;

export const SessionDetail = memo(({ sessionData }: SessionDetailProps) => (
  <div className='flex flex-col'>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Start time' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={formatDateTime(sessionData.startTime || new Date())} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='End time' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={formatDateTime(sessionData.endTime || new Date())} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Duration' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={sessionData.duration || ''} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Authentication type' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={sessionData.authenticationType} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Charger' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Pill label={sessionData.charger} labelType={LabelType.LABEL_S_G6} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Connector' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={sessionData.connectorSide} type={LabelType.BODY3_G5} />
      <Label text={sessionData.connector} type={LabelType.BODY3} icon={sessionData.connectorUrl} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Location' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={sessionData.location} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Address' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={sessionData.address} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='kWh used' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={`${sessionData.kwhUsed}kWh`} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Cost' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Label text={convertToLocaleCurrency(sessionData.cost || 0)} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Status history' type={LabelType.LABEL_S_G6} className='basis-1/4' />
      <Timeline data={sessionData.statusHistory || []} renderTitle={renderTitle} renderContent={renderContent} />
    </div>
  </div>
));
