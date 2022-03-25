import { memo } from 'react';
import {
  ChargerStatus,
  CHARGE_STATUS,
} from '../Charger/ChargerStatus.component';
import { Label, LabelType, Timeline } from '../_ui';
import { TimelineData } from '../_ui/time-line/types/Timeline.interface';
import { formatDate } from '../../utils/Date.Util';

interface InputProps {
  data: TimelineData[];
}

const renderTitle = (title: string) => {
  const status = CHARGE_STATUS[title as keyof typeof CHARGE_STATUS];
  return <ChargerStatus status={status} />;
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
