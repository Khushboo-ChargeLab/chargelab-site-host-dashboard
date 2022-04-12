import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import { Label, LabelType } from '../_ui';
import { sun, halfsun, moon } from '../../lib';

export interface TimePriceSliderProps {
  blocks: Array<any>;
  min?: number;
  max?: number;
  onChange?: Function;
}

export const TimePriceSlider = memo(
  ({
    blocks = [],
    min = 0,
    max = 24,
    onChange = () => {},
  }: TimePriceSliderProps) => {
    const [_blocks, setBlocks] = useState(blocks);
    const [curBlockIndex, setCurBlockIndex] = useState(-1);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [barWidth, setBarWidth] = useState(0);

    const barRef: any = useRef(null);

    const getPercent = (value: number) => (value / (max - min)) * 100 + min;
    const getValue = (percent: number) =>
      Math.floor(((max - min) * percent) / 100 + min);

    const getColor = (index: number) => {
      switch (index) {
        case 0:
          return '#18A0D7';
        case 1:
          return '#E8F7FC';
        case 2:
          return '#AFAFAF';
        default:
          return '#18A0D7';
      }
    };

    const handleMouseMove = (e: any) => {
      const offsetPercent = ((e.clientX - startPosition) / barWidth) * 100;
      const curPercent = getPercent(_blocks[curBlockIndex].value);
      const newPercent = offsetPercent + curPercent;
      const preValue = _blocks[curBlockIndex - 1]?.value || min;
      const nextValue = _blocks[curBlockIndex + 1]?.value || max;
      let value = getValue(newPercent);
      value = Math.max(preValue + 1, value);
      value = Math.min(nextValue - 1, value);
      const newBlocks = _blocks.map((_block, index) => ({
        ..._block,
        value: curBlockIndex === index ? value : _block.value,
      }));
      setBlocks(newBlocks);
    };

    const handleMouseDown = (e: any, index: number) => {
      e.stopPropagation();
      e.preventDefault();
      setCurBlockIndex(index);
      setStartPosition(e.clientX);
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    useEffect(() => {
      if (!isMouseDown) {
        return;
      }
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
        setIsMouseDown(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMouseDown]);

    useEffect(() => {
      setBarWidth(barRef?.current?.clientWidth || 0);
    }, [barRef]);

    useEffect(() => {
      onChange(_blocks);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_blocks]);

    const renderBlocks = () => (
      <div className='absolute top-1 bottom-1 left-0 right-0 box-border '>
        {_blocks.length > 1 &&
          _blocks.map((block, index) => (
            <div
              key={`${block.label}-${block.value}`}
              className='absolute bottom-2/4'
              style={{
                left: `${getPercent(block.value)}%`,
              }}
            >
              <div
                onMouseDown={(e) => handleMouseDown(e, index)}
                className='bottom-2/4 shadow-lg h-5 w-5 rounded-full bg-white absolute transform translate-y-2/4 -ml-2.5'
              />
            </div>
          ))}
      </div>
    );

    const renderBars = () => (
      <div
        ref={barRef}
        className='w-full h-2 bg-mainColor rounded-full overflow-hidden'
      >
        {_blocks
          .map((block, index) => (
            <div
              key={`${block.label}-${block.value}`}
              className='absolute h-2 rounded-full overflow-hidden'
              style={{
                width: `${getPercent(block.value)}%`,
                backgroundColor: getColor(index),
              }}
            />
          ))
          .reverse()}
      </div>
    );

    const renderLabel = (label: string, value: number, key: string) => (
      <div
        key={key}
        className='flex self-center items-center justify-center'
        style={{
          width: `${getPercent(value)}%`,
        }}
      >
        <Label className='truncate' text={label} type={LabelType.LABEL_M} />
      </div>
    );

    const renderLabels = () => {
      const divs = [];
      if (_blocks.length > 1) {
        for (let i = 0; i <= _blocks.length; i += 1) {
          const value =
            i < _blocks.length
              ? _blocks[i].value - (_blocks[i - 1]?.value || 0)
              : max - _blocks[_blocks.length - 1].value;
          const label = _blocks[i]?.label || _blocks[0].label;
          divs.push(renderLabel(label, value, `${label}-${value}-${i}`));
        }
      } else {
        divs.push(
          renderLabel(
            _blocks[0].label,
            max,
            `${_blocks[0].label}-${_blocks[0].value}`,
          ),
        );
      }

      return (
        <div className='flex flex-row w-full divide-x-2 divide-darkGrey border-2 border-y-white border-x-darkGrey border-b-darkGrey'>
          {divs}
        </div>
      );
    };

    const getTimeLabel = (value: number) => {
      if (value === min || value === max) return '12 AM';
      if (value === max / 2) return '12 PM';
      return `${Math.floor(value % (max / 2))} ${
        value > max / 2 ? 'PM' : 'AM'
      }`;
    };

    const getTimeLabelPosition = (i: number, num: number) => {
      const timeLabelWith = 48; // w-12 means 48px
      const percent =
        i === 0 ? 0 : i === num - 1 ? 100 : getPercent(_blocks[i - 1].value);
      const offset =
        (timeLabelWith / 2 / (barRef?.current?.clientWidth || timeLabelWith)) *
        100;
      return `${percent - offset}%`;
    };

    // Check Jake's icon design here: https://chargelab.atlassian.net/browse/WEB-441?focusedCommentId=16771
    const getTimeIcon = (i: number, num: number) => {
      const time = i === 0 || i === num - 1 ? 0 : _blocks[i - 1].value;
      if (time >= 7 && time < 17) return sun;
      if (time >= 17 && time < 20) return halfsun;
      return moon;
    };

    const renderTime = (
      label: string,
      left: string,
      icon: any,
      key: string,
    ) => (
      <div
        key={key}
        className='absolute'
        style={{
          left,
        }}
      >
        <div className='flex flex-col items-center w-12'>
          <Label className='truncate' text={label} type={LabelType.LABEL_M} />
          <img width={20} height={20} src={icon} alt='' />
        </div>
      </div>
    );

    const renderTimes = () => {
      const divs = [];
      const num = _blocks.length + 2; // 2 for start and end points
      for (let i = 0; i < num; i += 1) {
        // eslint-disable-next-line no-continue
        if (i === 1 && _blocks.length === 1) continue;
        const isEdge = i === 0 || i === num - 1;
        const label = getTimeLabel(isEdge ? 0 : _blocks[i - 1].value);
        const left = getTimeLabelPosition(i, num);
        const icon = getTimeIcon(i, num);
        const key = `${i}`;

        divs.push(renderTime(label, left, icon, key));
      }
      return <div className='relative block'>{divs}</div>;
    };

    return (
      <div className='flex flex-col gap-4 px-4'>
        <div className='h-5 w-full relative flex items-center justify-center'>
          {renderBars()}
          {renderBlocks()}
        </div>
        {renderLabels()}
        {renderTimes()}
      </div>
    );
  },
);
