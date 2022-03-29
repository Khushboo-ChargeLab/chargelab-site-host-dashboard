import React, { memo, useState } from 'react';
import { avatar, profileSelector } from '../../lib';

interface InputProps {
    className?: string;
    src?:any,
    width?:number;
    profile?:boolean;
    onClick?:()=>void;
    alt?:string;
    circle?:boolean;
  }

  export const ImageViewer = memo(
    ({
      className = '',
      src = null,
      width = 80,
      profile = false,
      onClick,
      circle = false,
      alt = '',
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
            alt={alt}
          />
        );
      }

      return (
        <img
          onMouseOver={() => profile && setHover(true)}
          className={`${circle ? 'border-50-percent' : ''} ${className || ''}`}
          width={width || 80}
          src={src || avatar}
          alt={alt}
        />
      );
    },
  );
