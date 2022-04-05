import React, { memo } from 'react';
import { Label, LabelType } from './Label.component';

export enum ButtonType {
  Primary = 'flex bg-blue-light rounded justify-center h-10 items-center hover:bg-blue-dark',
  Alert = 'flex bg-red  rounded justify-center h-10 items-center',
  Info = 'flex bg-[#E8F7FC] rounded justify-center h-10 items-center hover:bg-[#BBE7F6]',
  Cancel = 'flex bg-silver rounded justify-center h-10 items-center hover:bg-silver',
  Disabled = 'flex bg-grey-light1 rounded justify-center h-10 items-center',
  Icon = 'flex border border-silver5 justify-center items-center rounded',
}

export enum ButtonSize {
  FULL = 'w-full',
  NORMAL = 'w-48',
  SMALL = 'w-20',
  ICON = 'h-8 pr-3 pl-4',
}

interface InputProps {
  size?: ButtonSize;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  className?: string;
  icon?: any;
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
    case ButtonType.Icon:
      return LabelType.LABEL_S;
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
    className = '',
    icon = null,
  }: InputProps) => {
    const labelType = getLabelType(type);
    return (
      <button
        className={`${type} ${icon ? ButtonSize.ICON : size} ${className}`}
        onClick={onClick}
        disabled={type === ButtonType.Disabled}
      >
        {icon && <img src={icon} alt='' className='pr-2' />}

        <Label text={label} type={labelType} />
      </button>
    );
  },
);
