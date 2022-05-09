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
import {
  getShortMonth,
  formatDate,
  convertToDate,
} from '../../../utils/Date.Util';
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
  barBgColor?: string;
  onTickLabel?: Function;
  onTooltipTitle?: Function;
}

const MAX_TICKS_LIMIT = 6;
const MIN_BAR_NUMBER = 12;

export const VerticalBarChart = memo(
  ({
    barBgColor = '#3DBAE3',
    items = [],
    className = 'flex w-full h-60',
    dateField = 'date',
    valueField = 'value',
    onTickLabel,
    onTooltipTitle,
  }: VerticalBarChartProps) => {
    const theme = useSelector(getCurrentTheme);
    const getLabels = () => {
      const labels = items.map((item: any) => getShortMonth(item[dateField]));

      // Chart.js doesn't have a param can make bar left align, so we fill empty data to push it to the left.
      return labels.length < MIN_BAR_NUMBER
        ? labels.concat(Array(MIN_BAR_NUMBER - labels.length).fill(''))
        : labels;
    };
    const getData = () => items.map((item: any) => item[valueField]);

    const getTooltipLabel = (context: any) =>
      formatDate(
        convertToDate(items[context.dataIndex][dateField]),
        'MMM, yyyy',
      );

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
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: max,
                ticks: {
                  maxTicksLimit: MAX_TICKS_LIMIT,
                  callback: (tickValue: any) =>
                    (onTickLabel && onTickLabel(tickValue)) || tickValue,
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
                displayColors: false,
                boxHeight: 0,
                boxWidth: 0,
                xAlign: 'center',
                yAlign: 'bottom',
                titleAlign: 'center',
                callbacks: {
                  label: (context) => getTooltipLabel(context),
                  title: (context) =>
                    (onTooltipTitle && onTooltipTitle(context[0].raw)) ||
                    context[0].raw,
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
