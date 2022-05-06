import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadCSV } from '../../services/utils';
import { fetchSimpleStat } from '../../stores/reducers/sessons.reducer';
import { fetchStatisticsCSVRequest } from '../../stores/reducers/stats.reducer';
import { selectSimpleStats } from '../../stores/selectors/session.selector';
import { selectRecentStats } from '../../stores/selectors/stats.selector';
import { Button, Card, DateTimePicker, Switch, VerticalBarChart } from '../_ui';
import { ButtonSize, ButtonType } from '../_ui/Button.component';
import './Data-Report.component.scss';

export const DataReport = () => {
  const dispatch = useDispatch();
  const [valueField, setValueField] = useState('revenue');
  const stats = useSelector(selectSimpleStats);
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
      <VerticalBarChart
        items={stats}
        className='flex h-52 w-full'
        dateField='date'
        valueField={valueField}
      />
    </Card>
  );
};
