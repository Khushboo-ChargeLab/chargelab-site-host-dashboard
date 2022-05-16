import { formatInTimeZone } from 'date-fns-tz';
import React, { memo } from 'react';
import { alert, charging, completed, connector, startGreen } from '../../lib';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { convertToDate, formatDateTime, getDifferenceInMinutes } from '../../utils/Date.Util';
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

const renderTitle = (title: string) => (
  <Label text={title} type={LabelType.BODY3} icon={renderIcon(title)} />
);

const renderContent = (date: Date) => (
  <Label
    text={formatDateTime(date, 'LLL dd, h:mm a')}
    type={LabelType.BODY3_G5}
  />
);

const checkSessionStatusForDivVisiblity = (status: any) => {
  if (
    status === 'FAILED' ||
    status === 'PREPARING' ||
    status === 'IN_PROGRESS'
  ) {
    return false;
  }
  return true;
};

const renderStartTimeDiv = (startTime: any, timeZone: any) => {
  return (
    <div className='flex flex-row'>
      <Label text='Start time' type={LabelType.H7} className='basis-2/6' />
      <Label
        text={startTime && timeZone ? formatInTimeZone(startTime, timeZone, 'LLL dd, yyyy h:mm a') : ''}
        type={LabelType.BODY3}
      />
    </div>
  );
};

const renderEndTimeDiv = (endTime: any, timeZone: any) => {
  return (
    <div className='flex flex-row'>
      <Label text='End time' type={LabelType.H7} className='basis-2/6' />
      <Label
        text={endTime && timeZone ? formatInTimeZone(endTime, timeZone, 'LLL dd, yyyy h:mm a') : ''}
        type={LabelType.BODY3}
      />
    </div>
  );
};

const renderDurationDiv = (endTime: any, startTime: any) => {
  const mins = getDifferenceInMinutes(convertToDate(endTime), convertToDate(startTime));
  const unit = mins > 1 ? 'mins' : 'min';
  return (
    <div className='flex flex-row'>
      <Label text='Duration' type={LabelType.H7} className='basis-2/6' />
      <Label
        text={endTime && startTime ? `${mins} ${unit}` : ''}
        type={LabelType.BODY3}
      />
    </div>
  );
};

const renderEnergyUsedDiv = (kWhUsed: any) => {
  return (
    <div className='flex flex-row'>
      <Label text='kWh used' type={LabelType.H7} className='basis-2/6' />
      <Label
        text={!kWhUsed ? '0 kWh' : `${convertToThousandSeperator(kWhUsed)} kWh`}
        type={LabelType.BODY3}
      />
    </div>
  );
};

const renderCostDiv = (amount: any, currency: any) => {
  return (
    <div className='flex flex-row'>
      <Label text='Cost' type={LabelType.H7} className='basis-2/6' />
      <Label
        text={convertToLocaleCurrency(amount || 0, currency)}
        type={LabelType.BODY3}
      />
    </div>
  );
};

export const SessionDetail = memo(({ sessionData }: SessionDetailProps) => (
  <div className='flex flex-col py-2 gap-5'>
    {sessionData.sessionStatus !== 'FAILED' &&
      renderStartTimeDiv(sessionData.startTime, sessionData.timeZone)}
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) &&
      renderEndTimeDiv(sessionData.endTime, sessionData.timeZone)}
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) &&
      renderDurationDiv(sessionData.endTime, sessionData.startTime)}
    <div className='flex flex-row'>
      <Label
        text='Authentication type'
        type={LabelType.H7}
        className='basis-2/6'
      />
      <Label text={sessionData.authenticationType} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row'>
      <Label text='Charger' type={LabelType.H7} className='basis-2/6' />
      <Pill
        label={sessionData.charger}
        labelType={LabelType.PILL_DROPDOWN}
        autoWidth
      />
    </div>
    <div className='flex flex-row'>
      <Label text='Connector' type={LabelType.H7} className='basis-2/6' />
      <div className='flex flex-row gap-4'>
        <Label text={sessionData.connectorSide} type={LabelType.BODY3_G5} />
        <div className='flex flex-row gap-1'>
          <img src={connector} alt='Connector Icon' />
          <Label
            text={sessionData.connector}
            type={LabelType.BODY3}
          />
        </div>
      </div>
    </div>
    <div className='flex flex-row'>
      <Label text='Location' type={LabelType.H7} className='basis-2/6' />
      <Label text={sessionData.location} type={LabelType.BODY3} />
    </div>
    <div className='flex flex-row'>
      <Label text='Address' type={LabelType.H7} className='basis-2/6' />
      <Label text={sessionData.address} type={LabelType.BODY3} />
    </div>
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) &&
      renderEnergyUsedDiv(sessionData.kwhUsed)}
    {checkSessionStatusForDivVisiblity(sessionData.sessionStatus) &&
      renderCostDiv(sessionData.cost, sessionData.currency)}
    <div className='flex flex-row'>
      <Label text='Status history' type={LabelType.H7} className='basis-2/6' />
      <Timeline
        data={sessionData.statusHistory || []}
        renderTitle={renderTitle}
        renderContent={renderContent}
      />
    </div>
  </div>
));
