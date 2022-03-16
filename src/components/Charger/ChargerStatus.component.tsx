import { memo } from "react";
import { Pill, PILL_BG_COLOR } from "../_ui/Pill.component";
import { useTranslation } from "react-i18next";
import { LabelType } from "../_ui/Label.component";

export enum CHARGE_STATUS {
  COMING_SOON,
  AVAILABLE,
  PREPARING,
  CHARGING,
  SCHEDULED,
  OFFLINE,
  OUT_OF_ORDER,
}

interface InputProps {
  status: CHARGE_STATUS;
}

export const ChargerStatus = memo(({ status }: InputProps) => {
  const { t } = useTranslation();
  let label, color;
  switch (status) {
    case CHARGE_STATUS.COMING_SOON:
      label = t("coming_soon");
      color = PILL_BG_COLOR.PURPLE;
      break;
    case CHARGE_STATUS.AVAILABLE:
      label = t("available");
      color = PILL_BG_COLOR.LIGHT_FREEN;
      break;
    case CHARGE_STATUS.PREPARING:
      label = t("preparing");
      color = PILL_BG_COLOR.GREEN;
      break;
    case CHARGE_STATUS.CHARGING:
      label = t("charging");
      color = PILL_BG_COLOR.BLUE;
      break;
    case CHARGE_STATUS.SCHEDULED:
      label = t("scheduled");
      color = PILL_BG_COLOR.YELLOW;
      break;
    case CHARGE_STATUS.OFFLINE:
      label = t("offline");
      color = PILL_BG_COLOR.GREY;
      break;
    case CHARGE_STATUS.OUT_OF_ORDER:
      label = t("out_of_order");
      color = PILL_BG_COLOR.RED;
      break;
    default:
      label = "";
      color = PILL_BG_COLOR.DEFAULT;
      break;
  }
  return (
    <Pill
      label={label}
      bgColor={color}
      labelType={LabelType.PILL}
      width={120}
    ></Pill>
  );
});
