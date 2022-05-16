import { memo } from 'react';
import { Label, LabelType } from './Label.component';

interface InputProps {
  title?: string;
  titleType?: LabelType;
  className?: string;
  children?: any;
  bg?: string;
  padding?: string;
}

export const Card = memo(
  ({
    title = '',
    titleType = LabelType.H4,
    className = '',
    children,
    bg = 'bg-white',
    padding = 'pl-5 pr-5 pt-6 pb-4',
  }: InputProps) => (
    <div className={`rounded-lg ${padding} w-full ${bg} ${className}`}>
      {title && <Label type={titleType} text={title} className='pb-4' />}
      {children}
    </div>
  ),
);
