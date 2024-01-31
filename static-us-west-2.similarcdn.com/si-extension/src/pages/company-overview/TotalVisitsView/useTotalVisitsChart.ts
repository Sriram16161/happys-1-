import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { colorsPalettes } from '@similarweb/styles';
import { Options, Point, Chart, SVGElement, SVGAttributes } from 'highcharts';
import { Trend } from '../../../domain/company';
import { isVersionHigherOrEqual } from '../../../services/checkVersion';
import { getExtensionVersion } from '../../../services/browser';
import { WIDTH_380_VERSION } from '../CompanyOverview';

type ChartDataEntry = {
  y: number;
  date: string;
  prevDate: string;
  change: number;
  marker?: { enabled: boolean };
};

type UseTotalVisistsChartReturnProps = {
  value: ChartDataEntry;
  chartOptions: Options;
  startDate: string;
  endDate: string;
};

type ChartDataEvent = Event & { target: { options: ChartDataEntry } | null };

const getChange = (newValue: number, oldValue: number) => newValue / oldValue - 1;

export const useTotalVisitsChart = (trend: Trend[]): UseTotalVisistsChartReturnProps => {
  const chartDataLength = Math.min(trend.length, 12);
  const chartData = useMemo(
    () =>
      trend.slice(-12).map((trendItem, index) => ({
        y: trendItem.value,
        date: dayjs(trendItem.date).format('MMM YYYY'),
        prevDate: dayjs(trend[index].date).format('MMM YYYY'),
        change: getChange(trendItem.value, trend[index].value),
        marker: { enabled: index === chartDataLength - 1 },
      })),
    [trend]
  );
  const initialValue = chartData[chartDataLength - 1];

  const [value, setValue] = useState<ChartDataEntry>(initialValue);

  const getLastPoint = (points: Point[]): Point => points[points.length - 1];

  const handleSetValue = (event: ChartDataEvent) => {
    if (!event.target || !event.target.options) {
      setValue(initialValue);
      return;
    }
    const { y, date, prevDate, change } = event.target.options;
    setValue({ y, date, prevDate, change });
  };

  const handleAddCrosshair = ({
    chart,
    plotX = 0,
    plotY = 0,
  }: {
    chart: Chart & { customcrosshair?: SVGElement };
    plotX: number | undefined;
    plotY: number | undefined;
  }): void => {
    const x = plotX + chart.plotLeft;
    const y1 = plotY + chart.plotTop + 6;
    const y2 = chart.plotHeight + chart.plotTop;
    if (!chart.customcrosshair) {
      Object.assign(chart, {
        customcrosshair: chart.renderer
          .path()
          .attr({
            'stroke-width': 0.5,
            'stroke-dasharray': '1',
            stroke: colorsPalettes.blue[350],
            zIndex: 3,
          })
          .add(),
      });
    }

    (chart.customcrosshair as SVGElement).attr({ d: ['M', x, y1, 'L', x, y2] } as unknown as SVGAttributes);
  };

  const markerStyle = {
    fillColor: '#195AFE',
    radius: 4.5,
    lineColor: '#FFFFFF',
    lineWidth: 1,
  };

  const chartOptions: Options = {
    title: {
      text: undefined,
    },
    chart: {
      type: 'area',
      width: isVersionHigherOrEqual(getExtensionVersion(), WIDTH_380_VERSION) ? 300 : 275,
      height: 82,
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 5,
      spacingRight: 5,
      events: {
        load: function () {
          const chart = this as unknown as Chart;
          const point = getLastPoint(chart.series[0].points);
          handleAddCrosshair({ chart, plotX: point.plotX, plotY: point.plotY });
        },
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      area: {
        color: '#3E74FE',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#b6caff'],
            [1, '#f7f9ff'],
          ],
        },
        marker: {
          enabled: false,
          ...markerStyle,
          states: {
            hover: markerStyle,
            select: markerStyle,
          },
        },
      },
    },
    series: [
      {
        type: 'area',
        name: 'Total Visits',
        data: chartData,
        point: {
          events: {
            mouseOver: function (event) {
              handleSetValue(event as ChartDataEvent);
              handleAddCrosshair({ chart: this.series.chart, plotX: this.plotX, plotY: this.plotY });

              const point = this.series.points.find((pointItem) => pointItem.plotY === this.plotY) as Point;
              point.select(true);

              const lastPoint = getLastPoint(this.series.points);
              const { y } = (event as ChartDataEvent).target?.options as ChartDataEntry;
              if (y !== lastPoint.y) lastPoint.update({ marker: { enabled: false } });
            },
          },
        },
        states: {
          hover: {
            halo: null,
            lineWidthPlus: 0,
          },
        },
      },
    ],
  };

  return {
    value,
    chartOptions,
    startDate: chartData[0] ? dayjs(chartData[0].date).format('MMM YYYY') : '',
    endDate: chartData[chartData.length - 1] ? dayjs(chartData[chartData.length - 1].date).format('MMM YYYY') : '',
  };
};
