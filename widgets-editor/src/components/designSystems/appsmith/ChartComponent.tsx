import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ZoomScatter from "fusioncharts/fusioncharts.zoomscatter";
import ZoomLine from "fusioncharts/fusioncharts.zoomline";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import OverlappedColumn from "fusioncharts/fusioncharts.overlappedcolumn2d";
import OverlappedBar from "fusioncharts/fusioncharts.overlappedbar2d";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import Maps from "fusioncharts/fusioncharts.maps";
import Gantt from "fusioncharts/fusioncharts.gantt";
import VML from "fusioncharts/fusioncharts.vml";
import { getAppsmithConfigs } from "configs";
import log from "loglevel";
import { ChartData, ChartDataPoint, ChartType } from "widgets/ChartWidget";

FusionCharts.addDep(Charts);
FusionCharts.addDep(FusionTheme);
FusionCharts.addDep(Widgets);
FusionCharts.addDep(ZoomScatter);
FusionCharts.addDep(ZoomLine);
FusionCharts.addDep(PowerCharts);
FusionCharts.addDep(TimeSeries);
FusionCharts.addDep(OverlappedColumn);
FusionCharts.addDep(OverlappedBar);
FusionCharts.addDep(TreeMap);
FusionCharts.addDep(Maps);
FusionCharts.addDep(Gantt);
FusionCharts.addDep(VML);

const { fusioncharts } = getAppsmithConfigs();
FusionCharts.options.license({
  key: fusioncharts.licenseKey,
  creditLabel: false,
});

export interface ChartComponentProps {
  chartType: ChartType;
  chartData: ChartData[];
  customFusionChartConfig: CustomFusionChartConfig;
  xAxisName: string;
  yAxisName: string;
  chartName: string;
  widgetId: string;
  isVisible?: boolean;
  allowHorizontalScroll: boolean;
  onDataPointClick: (selectedDataPoint: { x: any; y: any }) => void;
}

const CanvasContainer = styled.div<
  Omit<ChartComponentProps, "onDataPointClick">
>`
  border: ${(props) => getBorderCSSShorthand(props.theme.borders[2])};
  border-radius: 0;
  height: 100%;
  width: 100%;
  background: white;
  overflow: hidden;
  position: relative;
  ${(props) => (!props.isVisible ? invisible : "")};
  padding: 10px 0 0 0;
}`;

const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<FusionCharts | null>(null);

  useEffect(() => {
    const createGraph = () => {
      // Implementation of createGraph function
    };

    createGraph();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [props]);

  return (
    <CanvasContainer {...props} id={props.widgetId + "chart-container"} ref={chartContainerRef} />
  );
};

export default ChartComponent;
