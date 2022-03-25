import { memo } from 'react';
import { Label, LabelType } from './Label.component';

export enum PILL_BG_COLOR {
  DEFAULT = 'bg-grey-light',
  LIGHT_FREEN = 'bg-green-light',
  GREEN = 'bg-green',
  YELLOW = 'bg-yellow',
  RED = 'bg-red',
  PURPLE = 'bg-purple',
  BLUE = 'bg-blue',
  GREY = 'bg-grey-dark',
}

interface PillProps {
  label?: string;
  labelType?: LabelType;
  bgColor?: PILL_BG_COLOR;
  isButton?: boolean;
  onClick?: () => void;
  width?: number;
}

export const Pill = ({
  label = '',
  bgColor = PILL_BG_COLOR.DEFAULT,
  labelType = LabelType.PILL,
  isButton = false,
  onClick,
  width,
}: PillProps) => {
  const classes = `flex items-center justify-center rounded-3xl ${bgColor}`;
  if (isButton) {
    return (
      <div className={classes} style={{ width: (width || 95) }}>
        <Label type={labelType} text={label} />
        <button type="button" className="flex" onClick={onClick!}>
          <Label type={labelType} text="x" />
        </button>
      </div>
    );
  }
  return (
    <div className={classes} style={{ width: (width || 95) }}>
      <Label type={labelType} text={label} />
    </div>
  );
};

Pill.defaultProps = {
  label: '',
  labelType: LabelType.PILL,
  bgColor: PILL_BG_COLOR.DEFAULT,
  isButton: false,
  onClick: () => null,
  width: 95,
};

export default memo<PillProps>(Pill);
