import { memo, useEffect, useState } from "react";
import { Label, LabelType } from "./Label.component";

interface InputProps {
  disableLabel?: string;
  enableLabel?: string;
  defaultValue?: boolean;
  onChange?: Function;
}

export const Switch = memo(
  ({
    disableLabel,
    enableLabel,
    defaultValue = false,
    onChange,
  }: InputProps) => {
    const [checked, setChecked] = useState(defaultValue);
    useEffect(() => {
      if (onChange) onChange(checked);
    });

    if (!checked) {
      return (
        <div className="flex flex-row items-center gap-2 ">
          <div
            onClick={() => setChecked(!checked)}
            className="w-12 h-6 rounded-full flex items-center justify-items-start my-1 bg-grey"
          >
            <div className="absolute w-4 h-4 ml-1 rounded-full bg-white"></div>
          </div>
          <span className="mt-1 self-center">
            {disableLabel && (
              <Label text={disableLabel} type={LabelType.BODY2} />
            )}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center gap-2">
          <div
            onClick={() => setChecked(!checked)}
            className="w-12 h-6 rounded-full flex items-center bg-green-light4 my-1"
          >
            <div className="w-4 h-4 ml-auto mr-1 rounded-full bg-white"></div>
          </div>
          <span className="mt-1 self-center">
            {enableLabel && <Label text={enableLabel} type={LabelType.BODY2} />}
          </span>
        </div>
      );
    }
  }
);
