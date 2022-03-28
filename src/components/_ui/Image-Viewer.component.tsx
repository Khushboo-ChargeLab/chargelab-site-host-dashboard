import React, { memo, useState } from 'react';
import { avatar, profileSelector } from '../../lib';

interface InputProps {
    className?: string;
    src?:any,
    width?:number;
    profile?:boolean;
    onClick?:()=>void;
  }

  export const ImageViewer = memo(
    ({
      className = '',
      src = null,
      width = 80,
      profile = false,
      onClick,
    }: InputProps) => {
      const [hover, setHover] = useState(false);

      if (hover) {
        return (
          <img
            onClick={() => onClick && onClick()}
            onMouseLeave={() => profile && setHover(false)}
            className={`cursor-pointer ${className || ''}`}
            width={width || 80}
            src={profileSelector}
            alt=""
          />
        );
      }

      return (
        <img
          onMouseOver={() => profile && setHover(true)}
          className={className || ''}
          width={width || 80}
          src={src || avatar}
          alt=""
        />
      );
    },
  );
