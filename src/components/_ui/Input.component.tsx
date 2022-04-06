import React from 'react';
import { Label, LabelType } from './Label.component';
import { search } from '../../lib';

export enum InputIconType {
  NONE,
  SEARCH,
}

interface InputProps {
  label?: string;
  iconType?: InputIconType;
  error?: string;
  props?: any;
  placeholder?: string;
  onChange?: Function;
}

export const FormInput = ({
  label = '',
  error = '',
  iconType = InputIconType.NONE,
  placeholder = '',
  onChange = () => null,
  props,
}: InputProps) => {
  const hasIcon = iconType !== InputIconType.NONE;
  return (
    <div className='block'>
      <div className='block pb-2'>
        <Label type={LabelType.LABEL_M} text={label} />
      </div>

      <div className='relative'>
        {hasIcon && (
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <img src={search} alt='' />
          </span>
        )}
        <input
          placeholder={placeholder}
          className={`${
            hasIcon ? 'pl-7' : 'pl-3'
          } pr-3 pt-2.5 pb-2.5 rounded text-sm font-sans text-black bg-silver`}
          onChange={onChange}
          {...props}
        />
      </div>

      {error && <Label type={LabelType.ERROR} text={error} />}
    </div>
  );
};
