import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pill, PILL_BG_COLOR } from '../_ui/Pill.component';
import { LabelType } from '../_ui/Label.component';
import { CHARGER_STATUS } from './Constants';

interface InputProps {
  status: string;
}

export const ChargerStatus = memo(({ status }: InputProps) => {
  const { t } = useTranslation();
  let label;
  let color;
  switch (status) {
    case CHARGER_STATUS.COMING_SOON:
      color = PILL_BG_COLOR.PURPLE;
      break;
    case CHARGER_STATUS.AVAILABLE:
      color = PILL_BG_COLOR.LIGHT_FREEN;
      break;
    case CHARGER_STATUS.PREPARING:
      color = PILL_BG_COLOR.GREEN;
      break;
    case CHARGER_STATUS.CHARGING:
      color = PILL_BG_COLOR.BLUE;
      break;
    case CHARGER_STATUS.SCHEDULED:
      color = PILL_BG_COLOR.YELLOW;
      break;
    case CHARGER_STATUS.OFFLINE:
      color = PILL_BG_COLOR.GREY;
      break;
    case CHARGER_STATUS.OUT_OF_ORDER:
      color = PILL_BG_COLOR.RED;
      break;
    default:
      color = PILL_BG_COLOR.GREEN;
      break;
  }
  return (
    <Pill
      label={t(status)}
      bgColor={color}
      labelType={LabelType.PILL}
      width='120'
    />
  );
});
