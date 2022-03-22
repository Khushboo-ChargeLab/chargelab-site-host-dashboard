import { memo } from "react";

export enum LabelType {
    ERROR = 'block pt-1 text-red text-sm',
    LABEL_M = 'text-base font-semibold font-sans text-black',
    H3 = 'text-2xl text-black font-semibold',
    H4 = 'text-xl text-black font-semibold',
    H5 = 'text-lg text-black font-semibold',
    H6 = 'text-base text-black font-semibold',
    H7 = 'text-sm text-grey font-semibold',
    BODY2 = 'text-base text-grey font-normal',
    BODY3 = 'text-sm text-black font-normal',
    LABEL_S = 'text-sm text-grey5 font-semibold',
    LABEL_S_BLUE2 = 'text-sm text-blue2 font-semibold',
    LABEL_S_G6 = 'text-sm text-grey6 font-semibold',
    LABEL_XS = 'text-xs font-semibold text-grey6',
    PILL = 'text-sm text-white font-medium font-sans pt-0.5 pb-0.5 pl-2 pr-2',
    BUTTON_PRIMARY = "text-sm font-semibold font-sans text-white",
    BUTTON_CANCEL = "text-sm font-semibold font-sans text-grey6",
    BUTTON_DISABLE = "text-sm font-semibold font-sans text-grey-light2",
    BUTTON_INFO = "text-sm font-semibold font-sans text-[#18A0D7]",
    BUTTON_ALERT = "text-sm font-semibold font-sans text-white",
}

interface InputProps {
  text: string;
  type?: LabelType;
  className?: string;
}

export const Label = memo(({ text, type, className }: InputProps) => {
  return (
    <span className={`${type || LabelType.LABEL_M} ${className || ""}`}>
      {text}
    </span>
  );
});
