import React, { memo } from 'react';

export enum LabelType {
  ERROR = 'block pt-1 text-red text-sm',
  LABEL_M = 'text-base font-semibold font-sans text-black',
  H1 = 'text-3xl text-black font-semibold',
  H3 = 'text-2xl text-black font-semibold',
  H4 = 'text-xl text-black font-semibold',
  H5 = 'text-lg text-black font-semibold',
  H6 = 'text-base text-black font-semibold',
  H7 = 'text-sm text-grey font-semibold',
  BODY1='text-lg font-normal text-grey6',
  BODY2 = 'text-base text-grey font-normal',
  BODY3 = 'text-sm text-black font-normal',
  BODY3_G5 = 'text-sm text-grey5 font-normal',
  LABEL_S = 'text-sm text-grey5 font-medium',
  LABEL_S_BLUE2 = 'text-sm text-blue2 font-semibold',
  LABEL_S_G6 = 'text-sm text-grey6 font-medium',
  LABEL_XS = 'text-xs font-semibold text-grey6',
  PILL = 'text-sm text-white font-medium font-sans pt-0.5 pb-0 pl-2 pr-2',
  PILL_DROPDOWN = 'text-sm text-grey6 font-medium font-sans pl-2 pr-2',
  PILL_DROPDOWN_BTN = 'text-sm text-grey6 font-medium font-sans pr-1',
  BUTTON_PRIMARY = 'text-sm font-semibold font-sans text-white',
  BUTTON_CANCEL = 'text-sm font-semibold font-sans text-grey6',
  BUTTON_DISABLE = 'text-sm font-semibold font-sans text-grey-light2',
  BUTTON_INFO = 'text-sm font-semibold font-sans text-[#18A0D7]',
  BUTTON_ALERT = 'text-sm font-semibold font-sans text-white',
  DROPDOWN_HEADER = 'text-sm font-medium font-sans text-grey6',
  DROPDOWN_ITEM_SELECTED = 'text-sm font-normal font-sans text-blue-light',
  PLACE_HOLDER = 'text-base font-semibold font-sans text-grey4',
}

interface InputProps {
  text: any;
  type?: LabelType;
  className?: string;
  icon?:any;
  style?:any;
}

export const Label = memo(({
 text, type, className = '', icon = null,
 style = {},
}: InputProps) => (
  <div style={style} className={`${type || LabelType.LABEL_M} ${className} ${icon ? 'flex items-center' : ''}`}>
    {icon && (
      <img src={icon} alt="" className="pr-2" />
    )}
    {text}
  </div>
));
