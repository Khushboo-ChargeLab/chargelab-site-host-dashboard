import { memo } from "react";
import { Label, LabelType } from "./Label.component";

export enum ButtonType {
  Primary = "flex bg-blue-light p-6 rounded-lg justify-center h-12 items-center hover:bg-blue-dark",
  Alert = "flex bg-red p-6 rounded-lg justify-center h-12 items-center",
  Info = "flex bg-[#E8F7FC] p-6 rounded-lg justify-center h-12 items-center hover:bg-[#BBE7F6]",
  Cancel = "flex bg-white p-6 rounded-lg justify-center h-12 items-center hover:bg-grey-dark1",
  Disabled = "flex bg-grey-light1 p-6 rounded-lg justify-center h-12 items-center",
}

export enum ButtonSize {
  FULL = "w-full",
  NORMAL = "w-48",
  SMALL = "w-24",
}

interface InputProps {
  size?: ButtonSize;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
}

const getLabelType = (buttonType: ButtonType) => {
  switch (buttonType) {
    case ButtonType.Primary:
      return LabelType.BUTTON_PRIMARY;
    case ButtonType.Cancel:
      return LabelType.BUTTON_CANCEL;
    case ButtonType.Disabled:
      return LabelType.BUTTON_DISABLE;
    case ButtonType.Info:
      return LabelType.BUTTON_INFO;
    case ButtonType.Alert:
      return LabelType.BUTTON_ALERT;
    default:
      return LabelType.BUTTON_PRIMARY;
  }
};

export const Button = memo(
  ({
    size = ButtonSize.NORMAL,
    label,
    onClick,
    type = ButtonType.Primary,
  }: InputProps) => {
    const labelType = getLabelType(type);
    return (
      <div className="p-2">
        <button
          className={`${type} ${size}`}
          onClick={onClick}
          disabled={type === ButtonType.Disabled}
        >
          <Label text={label} type={labelType}></Label>
        </button>
      </div>
    );
  }
);
