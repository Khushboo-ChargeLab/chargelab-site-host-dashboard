import { memo } from 'react';
import { Label, LabelType } from './Label.component';

interface InputProps {
  title?: string;
  titleType?: LabelType;
  className?: string;
  children?: any;
}

export const Card = memo(
  ({
    title = '',
    titleType = LabelType.H4,
    className = '',
    children,
  }: InputProps) => (
    <div
      className={`bg-white rounded-lg pl-5 pr-5 pt-6 pb-4 w-full ${className}`}
    >
      {title && <Label type={titleType} text={title} className='pb-4' />}
      {children}
    </div>
  ),
);
