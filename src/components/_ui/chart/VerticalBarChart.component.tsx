import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipPositionerFunction,
  ChartType,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import 'chartjs-plugin-style';
import {
  getShortMonth,
  formatDate,
  convertToDate,
} from '../../../utils/Date.Util';
import { getCurrentTheme } from '../../../stores/selectors/theme.selector';

declare module 'chart.js' {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}

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
    barBgColor = '#18A0D7',
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

    Tooltip.positioners.myCustomPositioner = function (
      elements,
      eventPosition,
    ) {
      return {
        x: elements[0]?.element?.x || 0,
        y: elements[0]?.element?.y ? elements[0].element.y - 4 : 0,
      };
    };

    const getTooltipLabel = (context: any) =>
      formatDate(
        convertToDate(items[context.dataIndex][dateField]),
        'MMM, yyyy',
      );

    const data = getData();
    const max = Math.max(...data);

    const getOrCreateTooltip = (chart: any) => {
      let tooltipEl = chart.canvas.parentNode.querySelector('div');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.width = '91px';
        tooltipEl.style.height = '60px';
        tooltipEl.style.background = 'black';
        tooltipEl.style.borderRadius = '8px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, -100%)';
        tooltipEl.style.filter =
          'drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.15))';
        const table = document.createElement('table');
        table.style.margin = '0px';
        table.style.paddingTop = '4px';
        table.style.paddingRight = '12px';
        table.style.paddingBottom = '4px';
        table.style.paddingLeft = '12px';
        tooltipEl.appendChild(table);
        console.log('tooltipEl:', tooltipEl);
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    };

    const externalTooltipHandler = (context: any) => {
      // Tooltip Element
      const { chart, tooltip } = context;
      const tooltipEl = getOrCreateTooltip(chart);

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: any) => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach((title: any) => {
          const tr = document.createElement('tr');
          tr.style.borderWidth = '0';

          const th = document.createElement('th');
          th.style.borderWidth = '0';
          const text = document.createTextNode(title);

          th.appendChild(text);
          tr.appendChild(th);
          tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body: any, i: number) => {
          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = '0';

          const td = document.createElement('td');
          td.style.borderWidth = '0';

          const text = document.createTextNode(body);

          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
      tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
    };

    return (
      <div className={`${className}`}>
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
                grid: {
                  drawBorder: false,
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
                top: 50,
                bottom: 2,
                left: 2,
                right: 2,
              },
            },
            plugins: {
              tooltip: {
                position: 'myCustomPositioner',
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
                enabled: false,
                external: externalTooltipHandler,
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
