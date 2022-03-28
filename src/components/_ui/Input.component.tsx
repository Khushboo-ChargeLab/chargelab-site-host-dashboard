import React from 'react';
import { Label, LabelType } from './Label.component';

interface InputProps {
    label?: string;
    error?: string;
    props?: any;
  }

export const FormInput = ({ label = '', error = '', props }: InputProps) => (
  <div className="block">
    <div className="block pb-2">
      <Label type={LabelType.LABEL_M} text={label} />
    </div>

    <div className="block">
      <input
        className="pl-3 pr-3 pt-2.5 pb-2.5 rounded text-sm font-sans text-black bg-silver"
        {...props}
      />
    </div>

    {error && (
    <Label type={LabelType.ERROR} text={error} />
            )}
  </div>
    );