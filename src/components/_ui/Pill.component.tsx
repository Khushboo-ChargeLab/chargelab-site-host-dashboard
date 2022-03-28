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
  width?: number;
}

export const Pill = memo(
  ({
    label = '',
    bgColor = PILL_BG_COLOR.DEFAULT,
    labelType = LabelType.PILL,
    isButton = false,
    onClick,
    width,
  }: InputProps) => {
    const classes = `flex items-center justify-center rounded-3xl ${bgColor}`;
    if (isButton) {
      return (
        <div className={classes} style={{ width: (width || 95) }}>
          <Label type={labelType} text={label} />
          <button type="button" className="flex" onClick={onClick!}>
            <Label type={labelType} text="x" />
          </button>
        </div>
      );
    }
      return (
        <div className={classes} style={{ width: (width || 95) }}>
          <Label type={labelType} text={label} />
        </div>
      );
  },
);
