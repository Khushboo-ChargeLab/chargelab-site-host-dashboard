import { memo } from "react";
import { Label, LabelType } from "./Label.component";

export enum PILL_BG_COLOR {
  DEFAULT = "bg-grey-light",
  LIGHT_FREEN = "bg-green-light",
  GREEN = "bg-green",
  YELLOW = "bg-yellow",
  RED = "bg-red",
  PURPLE = "bg-purple",
  BLUE = "bg-blue",
  GREY = "bg-grey-dark",
}

interface InputProps {
  label?: string;
  labelType?: LabelType;
  bgColor?: PILL_BG_COLOR;
  isButton?: boolean;
  onClick?: () => void;
}

export const Pill = memo(
  ({
    label = "",
    bgColor = PILL_BG_COLOR.DEFAULT,
    labelType = LabelType.LABEL_M,
    isButton = false,
    onClick,
  }: InputProps) => {
    const classes = `inline-block px-2.5 py-0.5 rounded-full ${bgColor}`;
    if (isButton) {
      return (
        <div className={classes}>
          <span>
            <Label type={labelType} text={label} />
          </span>
          <button type="button" className="pl-2" onClick={onClick!}>
            <Label type={labelType} text={"x"} />
          </button>
        </div>
      );
    } else {
      return (
        <span className={classes}>
          <Label type={labelType} text={label} />
        </span>
      );
    }
  }
);
