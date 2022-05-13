import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { noData } from '../../lib';
import { downloadCSV } from '../../services/utils';
import { fetchSimpleStat } from '../../stores/reducers/sessons.reducer';
import { fetchStatisticsCSVRequest } from '../../stores/reducers/stats.reducer';
import { getFormattedSimpleStats } from '../../stores/selectors/session.selector';
import { selectRecentStats } from '../../stores/selectors/stats.selector';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { Button, Card, DateTimePicker, Label, LabelType, Switch, VerticalBarChart } from '../_ui';
import { ButtonSize, ButtonType } from '../_ui/Button.component';
import './Data-Report.component.scss';

export const DataReport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [valueField, setValueField] = useState('revenue');
  const stats = useSelector(getFormattedSimpleStats);
  const statsObj = useSelector(selectRecentStats);
  const [downloadReady, setDownloadReady] = useState(false);

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

  const handleButtonClick = () => {
    dispatch(fetchStatisticsCSVRequest({
      getBlob: true,
    }));
    setDownloadReady(true);
  };

  const renderExportCSVButton = () => {
    if (stats?.length > 0) {
      return (
        <Button
          size={ButtonSize.SMALL}
          label='Export CSV'
          type={ButtonType.Cancel}
          onClick={handleButtonClick}
        />
      );
    }
  };

  useEffect(() => {
    if (downloadReady && statsObj.statsCSV) {
      downloadCSV(statsObj.statsCSV, 'Export Statistics');
    }
  }, [statsObj.statsCSV, downloadReady]);

  const getFormattedText = (val: any) => {
    switch (valueField) {
      case 'revenue': {
        return convertToLocaleCurrency(val);
      }
      case 'energyDeliveredKWh': {
        return `${val.toFixed(1)} kWh`;
      }
      case 'transactions': {
        return val.toFixed(0);
      }
      default:
        return val;
    }
  };
  const onTooltipTitle = (value: any) => {
    return getFormattedText(value);
  };

  const onTickLabel = (tickValue: any) => getFormattedText(tickValue);

  const renderVerticalBarChart = () => {
    if (stats?.length > 0) {
      return (
        <VerticalBarChart
          items={stats}
          className='flex h-52 w-full'
          dateField='date'
          valueField={valueField}
          onTickLabel={onTickLabel}
          onTooltipTitle={onTooltipTitle}
        />
      );
    }
    return (
      <div className='flex flex-col justify-center h-52'>
        <div className='flex justify-center'>
          <img className='w-8 h-7 grey5' src={noData} alt='' />
        </div>
        <div className='flex justify-center my-2'>
          <Label text={t('vertical_bar_chart_no_data')} type={LabelType.H4} />
        </div>
        <div className='flex justify-center mt-2'>
          <Label text={t('vertical_bar_chart_no_data_desc')} type={LabelType.BODY3_G5} className='text-base' />
        </div>
      </div>
    );
  };

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
          {renderExportCSVButton()}
        </div>
      </div>
      {renderVerticalBarChart()}
    </Card>
  );
};
