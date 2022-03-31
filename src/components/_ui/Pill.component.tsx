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
}

interface InputProps {
  label?: string;
  labelType?: LabelType;
  bgColor?: PILL_BG_COLOR;
  isButton?: boolean;
  onClick?: () => void;
  width?: any;
}

export const Pill = memo(
  ({
    label = '',
    bgColor = PILL_BG_COLOR.DEFAULT,
    labelType = LabelType.PILL,
    isButton = false,
    onClick,
    width = 95,
  }: InputProps) => {
    const renderButton = () => (
      <button type='button' className='flex' onClick={onClick!}>
        <Label type={labelType} text='x' />
      </button>
    );
    const classes = `flex h-6 items-center justify-center rounded-3xl ${bgColor}`;
    return (
      <div className={classes} style={{ width }}>
        <Label type={labelType} text={label} />
        {isButton && renderButton()}
      </div>
    );
  },
);
