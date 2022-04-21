import React, { memo } from 'react';
import { ChargerStatus } from '../Charger/ChargerStatus.component';
import { Label, LabelType, Timeline } from '../_ui';
import { TimelineData } from '../_ui/time-line/types/Timeline.interface';
import { formatDate } from '../../utils/Date.Util';

interface InputProps {
  data: TimelineData[];
}

const renderTitle = (title: string) => {
  return <ChargerStatus status={title} />;
};

const renderContent = (date: Date) => {
  const formattedString = formatDate(date, 'MMM dd, hh:mm b');
  return <Label text={formattedString} type={LabelType.LABEL_M} />;
};

export const SessionStatusHistory = memo(({ data }: InputProps) => (
  <Timeline
    data={data}
    renderTitle={renderTitle}
    renderContent={renderContent}
  />
));
