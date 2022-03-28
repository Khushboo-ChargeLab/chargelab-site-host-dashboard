import React, { memo } from 'react';
import { avatar } from '../../lib';

interface InputProps {
    className?: string;
    src?:any,
    width?:number;
  }

  export const ImageViewer = memo(
    ({
      className = '',
      src = null,
      width = 80,
    }: InputProps) => (
      <img className={className || ''} width={width || 80} src={src || avatar} alt="" />

      ),
  );
