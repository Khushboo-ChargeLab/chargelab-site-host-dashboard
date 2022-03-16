import { memo } from "react";
import { format, parseISO } from "date-fns";
import {
  ChargerStatus,
  CHARGE_STATUS,
} from "../Charger/ChargerStatus.component";
import { Label, LabelType, Timeline } from "../_ui";

interface InputProps {
  data: Array<Array<string>>;
}

export const SessionStatusHistory = memo(({ data }: InputProps) => {
  return (
    <Timeline
      data={data}
      renderTitle={renderTitle}
      renderContent={renderContent}
    ></Timeline>
  );
});

const renderTitle = (title: string) => {
  const status = CHARGE_STATUS[title as keyof typeof CHARGE_STATUS];
  return <ChargerStatus status={status} />;
};

const renderContent = (date: string) => {
  const formattedString = format(parseISO(date), "MMM dd, hh:mm b");
  return <Label text={formattedString} type={LabelType.LABEL_M} />;
};
