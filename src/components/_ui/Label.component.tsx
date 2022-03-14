import { memo } from 'react';

export enum LabelType {
    ERROR = 'block pt-1 text-red text-sm',
    LABEL_M = 'text-base font-semibold font-sans text-black',
    H3 = 'text-2xl text-black font-semibold',
    H4 = 'text-xl text-black font-semibold',
    H5 = 'text-lg text-black font-semibold',
    H7 = 'text-sm text-grey font-semibold',
    BODY2 = 'text-base text-grey font-normal',
    BODY3 = 'text-sm text-black font-normal',
    LABEL_S = 'text-sm text-grey5 font-semibold',
    PILL = 'text-sm text-white font-medium font-sans pt-0.5 pb-0.5 pl-2 pr-2',
}

interface InputProps {
    text:string;
    type?:LabelType;
}

export const Label = memo((
    {text , type}:InputProps) =>{
        
    return (
        <span 
            className={type || LabelType.LABEL_M}
        >
            {text}
        </span>
    );
});