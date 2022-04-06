import React, { memo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend, CategoryScale, LinearScale);

interface DoughnutChartProps {
  items?: Array<any>;
  className?: string;
}

export const DoughnutChart = memo(
  ({ items = [], className = 'flex h-40' }: DoughnutChartProps) => {
    const sortedItems = items.sort((a, b) => (a.value > b.value ? -1 : 1));
    const getLabels = () =>
      sortedItems.map((item: any) => `${item.label} (${item.value})`);
    const getData = () => sortedItems.map((item: any) => item.value);
    const getColors = () => sortedItems.map((item: any) => item.color);
    return (
      <div className={className}>
        <Doughnut
          data={{
            labels: getLabels(),
            datasets: [
              {
                data: getData(),
                backgroundColor: getColors(),
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: 40,
            layout: {
              padding: {
                top: 2,
                bottom: 2,
                left: 2,
                right: 2,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  color: '#4E5968',
                  boxWidth: 12,
                  boxHeight: 12,
                  font: {
                    size: 14,
                  },
                },
              },
            },
          }}
        />
      </div>
    );
  },
);
