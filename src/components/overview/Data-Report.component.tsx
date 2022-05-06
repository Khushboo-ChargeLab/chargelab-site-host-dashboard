import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSimpleStat } from '../../stores/reducers/sessons.reducer';
import { getFormattedSimpleStats } from '../../stores/selectors/session.selector';
import { Button, Card, DateTimePicker, Switch, VerticalBarChart } from '../_ui';
import { ButtonSize, ButtonType } from '../_ui/Button.component';
import './Data-Report.component.scss';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';

export const DataReport = () => {
  const dispatch = useDispatch();
  const [valueField, setValueField] = useState('revenue');
  const stats = useSelector(getFormattedSimpleStats);

  const switchChanges = (checked: string) => {
    switch (checked) {
      case 'Fees collected': {
        setValueField('revenue');
        break;
      }
      case 'Energy used': {
        setValueField('energyDeliveredKWh');
        break;
      }
      case 'Sessions': {
        setValueField('transactions');
        break;
      }
      default:
    }
  };

  const dateChanged = useCallback(
    (selectedDate: any) => {
      dispatch(fetchSimpleStat({ statRange: selectedDate }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchSimpleStat(null));
  }, [dispatch]);

  const getFormattedText = (val: any) => {
    switch (valueField) {
      case 'revenue': {
        return convertToLocaleCurrency(val);
      }
      case 'energyDeliveredKWh': {
        return `${val} kWh`;
      }
      default:
        return val;
    }
  };
  const onTooltipTitle = (value: any) => {
    return getFormattedText(value);
  };

  const onTickLabel = (tickValue: any) => getFormattedText(tickValue);

  return (
    <Card>
      <div className='flex mt-3 mb-8 w-full'>
        <div className='flex w-3/5'>
          <Switch
            className='whitespace-nowrap'
            enableLabel='Enabled'
            disableLabel='Disabled'
            segmented
            options={['Fees collected', 'Energy used', 'Sessions']}
            onChange={switchChanges}
          />
        </div>
        <div className='flex justify-end w-3/5'>
          <DateTimePicker
            white
            dateRange
            dateRangeMove
            format='LLL dd yyyy'
            onChange={dateChanged}
            defaultDate={new Date()}
          />
          <Button
            size={ButtonSize.SMALL}
            label='Export CSV'
            type={ButtonType.Cancel}
          />
        </div>
      </div>
      <VerticalBarChart
        items={stats}
        className='flex h-52 w-full'
        dateField='date'
        valueField={valueField}
        onTickLabel={onTickLabel}
        onTooltipTitle={onTooltipTitle}
      />
    </Card>
  );
};
