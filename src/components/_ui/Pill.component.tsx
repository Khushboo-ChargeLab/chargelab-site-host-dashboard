import React, { memo } from 'react';
import { Label, LabelType } from './Label.component';

export enum PILL_BG_COLOR {
  DEFAULT = 'bg-grey-light',
  LIGHT_GREEN = 'bg-alert_positive',
  GREEN = 'bg-green',
  YELLOW = 'bg-alerts_warning',
  RED = 'bg-red',
  PURPLE = 'bg-purple',
  BLUE = 'bg-alerts_accent',
  GREY = 'bg-grey-dark',
  LIGHT = 'bg-grey2',
  GREY4 = 'bg-grey4',
}

interface InputProps {
  label?: string;
  labelType?: LabelType;
  bgColor?: PILL_BG_COLOR;
  isButton?: boolean;
  onClick?: () => void;
  width?: string;
  className?: string;
  autoWidth?: boolean;
}

export const Pill = memo(
  ({
    label = '',
    bgColor = PILL_BG_COLOR.DEFAULT,
    labelType = LabelType.PILL,
    isButton = false,
    onClick,
    width = '95',
    autoWidth = false,
    className = '',
  }: InputProps) => {
    const renderButton = () => (
      <button type='button' className='flex' onClick={onClick!}>
        <Label type={labelType} text='x' />
      </button>
    );

    const renderContent = () => (
      <div className='flex'>
        <Label type={labelType} text={label} className={className} />
        {isButton && renderButton()}
      </div>
    );

    const classes = `flex h-6 items-center justify-center rounded-3xl ${bgColor} whitespace-nowrap`;
    if (autoWidth) {
      return <div className={classes}>{renderContent()}</div>;
    }
    return (
      <div className={classes} style={{ width: `${width}px` }}>
        {renderContent()}
      </div>
    );
  },
);
