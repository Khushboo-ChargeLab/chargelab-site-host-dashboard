import { memo } from 'react';

interface InputProps {
    label?: string;
    icon?:any;
  }
export const Badge = memo(({
    label = '0',
    icon,
  }: InputProps) => (
    <div className='w-10 h-10 flex items-center  border-circle bg-white'>
      <div className={`text-xs font-semibold absolute bg-red text-white w-5 h-5 border-circle ${+label === 0 ? 'hidden' : 'flex'} justify-center items-center ml-6 mb-7`}>
        {label}
      </div>
      <img src={icon} alt='' className='inline-block my-0 mx-auto' />
    </div>
    ));