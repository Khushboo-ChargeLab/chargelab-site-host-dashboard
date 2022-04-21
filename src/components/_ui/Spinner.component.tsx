import React, { memo } from 'react';

export const Spinner = () => (
  <div className='relative'>
    <div className='w-10 h-10 border-grey-light1 border-2 rounded-full' />
    <div className='w-10 h-10 border-blue border-t-2 animate-spin rounded-full absolute left-0 top-0' />
  </div>
);
