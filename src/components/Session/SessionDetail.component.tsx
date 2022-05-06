import React, { memo } from 'react';
import { alert, charging, completed, connector, startGreen } from '../../lib';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { formatDateTime, getDifferenceInMinutes } from '../../utils/Date.Util';
import { convertToThousandSeperator } from '../../utils/Number.Util';
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
    case 'failed':
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

const checkSessionStatusForDivVisiblity = (status: any) => {
  if (status === 'FAILED' || status === 'PREPARING' || status === 'IN_PROGRESS') {
    return false;
  }
  return true;
};

const renderStartTimeDiv = (startTime: any) => {
  return (
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Start time' type={LabelType.H7} className='basis-2/6' />
      <Label text={startTime ? formatDateTime(startTime, 'LLL dd, yyyy h:mm a') : ''} type={LabelType.BODY3} />
    </div>
  );
};

const renderEndTimeDiv = (endTime: any) => {
  return (
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='End time' type={LabelType.H7} className='basis-2/6' />
      <Label text={endTime ? formatDateTime(endTime, 'LLL dd, yyyy h:mm a') : ''} type={LabelType.BODY3} />
    </div>
  );
};

const renderDurationDiv = (endTime: any, startTime: any) => {
  return (
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Duration' type={LabelType.H7} className='basis-2/6' />
      <Label text={endTime && startTime ? `${getDifferenceInMinutes(endTime, startTime)} mins` : ''} type={LabelType.BODY3} />
    </div>
  );
};

const renderEnergyUsedDiv = (kWhUsed: any) => {
  return (
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='kWh used' type={LabelType.H7} className='basis-2/6' />
      <Label text={!kWhUsed ? '0 kWh' : `${convertToThousandSeperator(kWhUsed)} kWh`} type={LabelType.BODY3} />
    </div>
  );
};

const renderCostDiv = (amount: any, currency: any) => {
  return (
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Cost' type={LabelType.H7} className='basis-2/6' />
      <Label text={convertToLocaleCurrency(amount || 0, currency)} type={LabelType.BODY3} />
    </div>
  );
};

export const SessionDetail = memo(({ sessionData }: SessionDetailProps) => (
  <div className='flex flex-col'>
    {sessionData.sessionStatus !== 'FAILED' && renderStartTimeDiv(sessionData.startTime)}
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) && renderEndTimeDiv(sessionData.endTime)}
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) && renderDurationDiv(sessionData.endTime, sessionData.startTime)}
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Authentication type' type={LabelType.H7} className='basis-2/6' />
      <Label text={sessionData.authenticationType} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Charger' type={LabelType.H7} className='basis-2/6' />
      <Pill label={sessionData.charger} labelType={LabelType.PILL_DROPDOWN} autoWidth />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Connector' type={LabelType.H7} className='basis-2/6' />
      <Label text={sessionData.connectorSide} type={LabelType.BODY3_G5} />
      <Label text={sessionData.connector} type={LabelType.BODY3} icon={connector} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Location' type={LabelType.H7} className='basis-2/6' />
      <Label text={sessionData.location} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Address' type={LabelType.H7} className='basis-2/6' />
      <Label text={sessionData.address} type={LabelType.BODY3} />
    </div>
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) && renderEnergyUsedDiv(sessionData.kwhUsed)}
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) && renderCostDiv(sessionData.cost, sessionData.currency)}
    <div className='flex flex-row pt-4 pb-4'>
      <Label text='Status history' type={LabelType.H7} className='basis-2/6' />
      <Timeline data={sessionData.statusHistory || []} renderTitle={renderTitle} renderContent={renderContent} />
    </div>
  </div>
));
