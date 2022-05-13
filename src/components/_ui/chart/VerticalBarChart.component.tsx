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

    const getTooltipLabel = (context: any) =>
      formatDate(
        convertToDate(items[context.dataIndex][dateField]),
        'MMM, yyyy',
      );

    const data = getData();
    const max = Math.max(...data);

    const getOrCreateTooltip = (chart: any) => {
      let tooltipRoot = chart.canvas.parentNode.querySelector('div');

      if (!tooltipRoot) {
        tooltipRoot = document.createElement('div');
        tooltipRoot.style.display = 'flex';
        tooltipRoot.style.flexDirection = 'column';
        tooltipRoot.style.justifyContent = 'center';
        tooltipRoot.style.alignItems = 'center';
        tooltipRoot.style.width = '91px';
        tooltipRoot.style.height = '60px';
        tooltipRoot.style.position = 'absolute';
        tooltipRoot.style.transform = 'translate(-50%, -100%)';
        tooltipRoot.style.pointerEvents = 'none';
        tooltipRoot.style.margin = 0;
        tooltipRoot.style.padding = 0;
        const triangleShape = document.createElement('div');
        triangleShape.style.width = '0px';
        triangleShape.style.height = '0px';
        triangleShape.style.borderWidth = '0 8px 8px';
        triangleShape.style.borderColor = 'transparent transparent #202223';
        triangleShape.style.borderStyle = 'solid';
        triangleShape.style.transform = 'rotate(-180deg)';

        const tooltipEl = document.createElement('div');
        tooltipEl.style.width = '91px';
        tooltipEl.style.height = '52px';
        tooltipEl.style.background = '#202223';
        tooltipEl.style.borderRadius = '8px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.padding = '0px';
        tooltipEl.style.margin = '0px';
        tooltipEl.style.filter =
          'drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.15))';
        const table = document.createElement('table');
        table.style.margin = '0px';
        table.style.paddingTop = '4px';
        table.style.paddingRight = '12px';
        table.style.paddingBottom = '4px';
        table.style.paddingLeft = '12px';
        table.style.display = 'flex';
        table.style.flexDirection = 'column';
        table.style.justifyContent = 'center';
        table.style.alignItems = 'center';
        tooltipEl.appendChild(table);
        tooltipRoot.appendChild(tooltipEl);
        tooltipRoot.appendChild(triangleShape);
        chart.canvas.parentNode.appendChild(tooltipRoot);
      }

      return tooltipRoot;
    };

    const externalTooltipHandler = (context: any) => {
      // Tooltip Element
      const { chart, tooltip } = context;
      const tooltipRoot = getOrCreateTooltip(chart);
      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipRoot.style.opacity = 0;
        return;
      }
      const tooltipEl = tooltipRoot.querySelector('div');
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
          th.style.fontSize = '16px';
          const text = document.createTextNode(title);

          th.appendChild(text);
          tr.appendChild(th);
          tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body: any, i: number) => {
          const tr = document.createElement('tr');
          tr.style.borderWidth = '0';

          const td = document.createElement('td');
          td.style.borderWidth = '0';
          td.style.fontSize = '12px';
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
      tooltipRoot.style.opacity = 1;
      tooltipRoot.style.left = `${positionX + tooltip.caretX}px`;
      tooltipRoot.style.top = `${positionY + tooltip.caretY - 4}px`;
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
