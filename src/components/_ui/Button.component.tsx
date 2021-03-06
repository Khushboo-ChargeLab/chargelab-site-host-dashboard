import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../stores/selectors/theme.selector';
import { Label, LabelType } from './Label.component';

export enum ButtonType {
  Primary = 'flex bg-blue-light rounded justify-center items-center hover:bg-blue-dark',
  Alert = 'flex bg-red  rounded justify-center items-center',
  Info = 'flex bg-[#E8F7FC] rounded justify-center items-center hover:bg-[#BBE7F6]',
  Cancel = 'flex bg-silver rounded justify-center items-center hover:bg-silver',
  Disabled = 'flex bg-grey-light1 rounded justify-center items-center',
  Icon = 'flex border border-silver5 justify-center items-center rounded',
}

export enum ButtonSize {
  NONE = '',
  FULL = 'w-full',
  NORMAL = 'w-48',
  SMALL = 'h-10 pl-4 pr-4 pt-2.5 pb-2.5',
  ERROR = 'w-[15.4rem] h-10 py-2.5 px-4',
  ALERT = 'w-20 h-10 pl-4 pr-4 pt-2.5 pb-2.5',
  WELCOME = 'py-2.5 px-4 whitespace-nowrap',
}

interface InputProps {
  size?: ButtonSize;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  className?: string;
  icon?: any;
  iconRightAlign?: boolean;
  iconGap?: string;
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
    iconRightAlign = false,
    iconGap = 'gap-2',
  }: InputProps) => {
    const theme = useSelector(getCurrentTheme);
    const [style, setStyle] = useState({});

    const setHoverStyle = useCallback(() => {
      if (type === ButtonType.Primary) {
        setStyle({ backgroundColor: theme.btnHoverColor });
      }
    }, [type, theme.btnHoverColor]);

    const labelType = getLabelType(type);
    return (
      <button
        className={`${type} ${size} ${className}`}
        onClick={onClick}
        disabled={type === ButtonType.Disabled}
        style={style}
        onMouseEnter={setHoverStyle}
        onMouseLeave={() => setStyle({})}
      >
        <div
          className={`flex ${
            iconRightAlign ? 'flex-row-reverse' : 'flex-row'
          } ${iconGap}`}
        >
          {icon && <img src={icon} alt='' />}

          <Label text={label} type={labelType} />
        </div>
      </button>
    );
  },
);
