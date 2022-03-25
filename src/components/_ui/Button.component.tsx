import React, { memo } from 'react';
import { Label, LabelType } from '.';

export enum ButtonType {
  Primary = 'flex bg-blue-light rounded justify-center h-10 items-center hover:bg-blue-dark',
  Alert = 'flex bg-red  rounded justify-center h-10 items-center',
  Info = 'flex bg-[#E8F7FC] rounded justify-center h-10 items-center hover:bg-[#BBE7F6]',
  Cancel = 'flex bg-silver rounded justify-center h-10 items-center hover:bg-grey-dark1',
  Disabled = 'flex bg-grey-light1 rounded justify-center h-10 items-center',
}

export enum ButtonSize {
  FULL = 'w-full',
  NORMAL = 'w-48',
  SMALL = 'w-20',
}

interface ButtonProps {
  size?: ButtonSize;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  className?: string;
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

const Button = ({
  size = ButtonSize.NORMAL,
  label,
  onClick,
  type = ButtonType.Primary,
  className = '',
}: ButtonProps) => {
  const labelType = getLabelType(type);
  return (
    <button
      type="button"
      className={`${type} ${size} ${className}`}
      onClick={onClick}
      disabled={type === ButtonType.Disabled}
    >
      <Label text={label} type={labelType} />
    </button>
  );
};

Button.defaultProps = {
  size: ButtonSize.NORMAL,
  onClick: () => null,
  type: ButtonType.Primary,
  className: '',
};

export default memo<ButtonProps>(Button);
