'use client';

import { useEffect, useRef } from 'react';

interface ChartData {
  categories?: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

interface ApexChartProps {
  type: 'bar' | 'line' | 'donut' | 'area';
  data: ChartData;
  height?: number;
  title?: string;
}

export default function ApexChart({ type, data, height = 300, title }: ApexChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Dinamically import ApexCharts
    import('apexcharts').then((ApexChartsModule) => {
      const ApexCharts = ApexChartsModule.default;

      if (chartRef.current && !chartInstanceRef.current) {
        const options: any = {
          chart: {
            type,
            height,
            toolbar: {
              show: false
            },
            fontFamily: 'Open Sans, sans-serif'
          },
          colors: ['#4680ff', '#2ca87f', '#f59e0b', '#dc2626'],
          series: type === 'donut' ? data.series[0].data : data.series,
          labels: type === 'donut' ? data.categories : undefined,
          xaxis: type !== 'donut' ? {
            categories: data.categories || [],
            labels: {
              style: {
                fontSize: '12px'
              }
            }
          } : undefined,
          yaxis: type !== 'donut' ? {
            labels: {
              style: {
                fontSize: '12px'
              }
            }
          } : undefined,
          dataLabels: {
            enabled: type === 'donut'
          },
          stroke: {
            curve: type === 'area' || type === 'line' ? 'smooth' : 'straight',
            width: type === 'line' || type === 'area' ? 2 : 0
          },
          fill: {
            type: type === 'area' ? 'gradient' : 'solid',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: '50%'
            }
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '13px'
          },
          grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 4
          }
        };

        chartInstanceRef.current = new ApexCharts(chartRef.current, options);
        chartInstanceRef.current.render();
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [type, data, height]);

  return (
    <div>
      {title && <h6 className="mb-3">{title}</h6>}
      <div ref={chartRef}></div>
    </div>
  );
}
