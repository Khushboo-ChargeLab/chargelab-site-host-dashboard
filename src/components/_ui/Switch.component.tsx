import { memo, useState } from "react";
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

    const updateChecked = () => {
      setChecked(!checked);
      onChange && onChange(!checked);
    };

    return (
      <div className="flex flex-row items-center gap-2 ">
        <div
          onClick={updateChecked}
          className={`w-12 h-6 rounded-full flex items-center  my-1  cursor-pointer ${
            !checked ? "bg-grey justify-items-start" : "bg-green-light4 "
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white ${
              !checked ? "absolute ml-1" : "ml-auto mr-1"
            }`}
          ></div>
        </div>
        <span className="self-center">
          <Label
            text={!checked ? disableLabel || "Off" : enableLabel || "On"}
            type={LabelType.BODY2}
          />
        </span>
      </div>
    );
  }
);
