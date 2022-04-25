import React, { memo } from 'react';
import { Label, LabelType } from './Label.component';

export enum PILL_BG_COLOR {
  DEFAULT = 'bg-grey-light',
  LIGHT_FREEN = 'bg-green-light',
  GREEN = 'bg-green',
  YELLOW = 'bg-yellow',
  RED = 'bg-red',
  PURPLE = 'bg-purple',
  BLUE = 'bg-blue',
  GREY = 'bg-grey-dark',
  LIGHT ='bg-grey2',
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
        <Label type={LabelType.PILL_DROPDOWN_BTN} text='x' />
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
