import { memo } from 'react';
import { Label, LabelType } from './Label.component';

interface InputProps {
  title?: string;
  className?: string;
  children?: any;
}

export const Card = memo(({ title = '', className, children }: InputProps) => (
  <div
    className={`bg-white rounded-lg pl-5 pr-5 pt-4 pb-4 w-full ${className}`}
  >
    {title && <Label type={LabelType.H4} text={title} className='pb-6' />}
    {children}
  </div>
));
