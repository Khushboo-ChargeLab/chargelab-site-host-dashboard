import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { convertToLocaleCurrency } from '../../../utils/Currency.Util';
import { getShortMonth, formatDate } from '../../../utils/Date.Util';
import { getCurrentTheme } from '../../../stores/selectors/theme.selector';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface VerticalBarChartProps {
  items?: Array<any>;
  className?: string;
  dateField?: string;
  valueField?: string;
  barBgColor?:string;
}

const MAX_TICKS_LIMIT = 6;

export const VerticalBarChart = memo(
  ({ barBgColor = '#3DBAE3', items = [], className = 'flex w-full h-60', dateField = 'date', valueField = 'value' }: VerticalBarChartProps) => {
    const theme = useSelector(getCurrentTheme);
    const getLabels = () => items.map((item: any) => getShortMonth(item[dateField]));
    const getData = () => items.map((item: any) => item[valueField]);
    const getTickLabel = (val: number) => convertToLocaleCurrency(val);
    const getTooltipTitle = (context: any) =>
      convertToLocaleCurrency(context[0].raw);

    const getTooltipLabel = (context: any) =>
      formatDate(items[context.dataIndex][dateField], 'MMM, yyyy');

    const data = getData();
    const max = Math.max(...data);
    return (
      <div className={className}>
        <Bar
          data={{
            labels: getLabels(),
            datasets: [
              {
                data,
                backgroundColor: theme.chartColor || barBgColor,
                maxBarThickness: 32,
                borderRadius: 4,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: max,
                ticks: {
                  maxTicksLimit: MAX_TICKS_LIMIT,
                  callback: (tickValue: any) => getTickLabel(tickValue),
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 2,
                bottom: 2,
                left: 2,
                right: 2,
              },
            },
            plugins: {
              tooltip: {
                boxHeight: 0,
                boxWidth: 0,
                xAlign: 'center',
                yAlign: 'bottom',
                titleAlign: 'center',
                callbacks: {
                  label: (context) => getTooltipLabel(context),
                  title: (context) => getTooltipTitle(context),
                },
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    );
  },
);
