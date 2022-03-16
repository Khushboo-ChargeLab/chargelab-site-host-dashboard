import { memo } from "react";
import { Label, LabelType } from "./Label.component";

interface InputProps {
  data: Array<Array<string>>;
  renderTitle?: Function;
  renderContent?: Function;
}

export const Timeline = memo(
  ({ renderTitle, renderContent, data }: InputProps) => {
    return (
      <div className="p-4">{renderItem(data, renderTitle, renderContent)}</div>
    );
  }
);

const renderItem = (
  data: Array<Array<string>>,
  renderTitle?: Function,
  renderContent?: Function
) => {
  return data.map((row: Array<string>, index) => (
    <div key={index} className="flex items-center relative ">
      <div className="border-r-2 border-black absolute h-full left-1 top-2 mb-10 z-0"></div>
      <div className="w-5 h-5 rounded-full bg-white top-0.5 -left-1 absolute z-9"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-black top-2 absolute z-10"></div>

      <div className="ml-10 flex flex-col mb-5">
        <div className="mb-2">
          {renderTitle ? (
            renderTitle(row[0])
          ) : (
            <Label text={row[0]} type={LabelType.H3} />
          )}
        </div>

        {renderContent ? (
          renderContent(row[1])
        ) : (
          <Label text={row[1]} type={LabelType.LABEL_M} />
        )}
      </div>
    </div>
  ));
};
