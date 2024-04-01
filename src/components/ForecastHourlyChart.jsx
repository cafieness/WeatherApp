import React from "react";
import WeatherData from "../utils/WeatherIcons";
import { XAxis, Tooltip, YAxis, AreaChart, Area, LabelList, ReferenceDot } from "recharts";

function ForecastHourlyChart({ temperatureData, currentWeather, isHovering, handleMouseEnter, handleMouseLeave }) {

  const renderCustomLabels = ({ x, y, value, index }) => {
    const dataPoint = temperatureData[index];
    const xText = x;
    const yText = y + 15;
    const xLine = x;
    const yLineStart = y;
    const yLineEnd = y + 45;
    const weatherIcon = WeatherData[dataPoint.icon];

    let temperatureText = '';
    if (index === 0) {
      temperatureText = `${Math.round(currentWeather.temp)}°`;
    } else {
      temperatureText = `${Math.round(dataPoint.temperature)}°`;
    }

    let labelText = '';
    if (index === 0) {
      labelText = 'Now';
    } else {
      labelText = new Date(dataPoint.timestamp)
        .toLocaleTimeString("en-US", { hour12: false })
        .replace(/^(\d{1,2}:\d{2}):\d{2}$/, "$1");
    }

    return (
      <g>
        <line
          x1={xLine}
          y1={yLineStart}
          x2={xLine}
          y2={yLineEnd - 10}
          stroke="#FFC355"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <text x={xText} y={yText} dy={53} textAnchor="middle" fill="white" fontSize="8px">
          {Number(dataPoint.windSpeed * 3.6).toFixed(1)}km/h
        </text>
        <text x={xText} y={yText} dy={63} textAnchor="middle" fill="white" fontSize="8px">
          {labelText}
        </text>
        <text x={xText + 3} y={yText - 20} dy={-5} textAnchor="middle" fill="white" fontSize="14px">
          {temperatureText}
        </text>
        {weatherIcon && <image x={xText - 13} y={yText + 20} href={weatherIcon.icon} width="25" height="25" />}
      </g>
    );
  };

  const firstDataPoint = temperatureData.length > 0 ? temperatureData[0] : null;

  const xAxisTicks =
    firstDataPoint && !isHovering ? (
      <ReferenceDot
        key={firstDataPoint.timestamp}
        x={firstDataPoint.timestamp}
        y={firstDataPoint.temperature}
        r={4}
        stroke="white"
        fill="white"
      />
    ) : null;

  const temperatures = temperatureData.map(data => data.temperature);
  const minY = Math.min(...temperatures) - 2;
  const maxY = Math.max(...temperatures) + 2;

  const range = maxY - minY;

  const adjustedMinY = minY - range;
  const adjustedMaxY = maxY + range;

  return (
    <AreaChart
      width={800}
      height={200}
      data={temperatureData}
      margin={{ top: -50, bottom: 20, left: 40, right: 30 }}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <XAxis
        dataKey="timestamp"
        hide
      />
      <YAxis dataKey="temperature" hide domain={[adjustedMinY, adjustedMaxY]} />
      <Tooltip active={false} />
      <Area
        type="monotone"
        dataKey={(data) => data.temperature}
        fill="none"
        stroke="#FFC355"
        strokeWidth="2px"
        data={temperatureData.slice(0, 8)}
      >
        <LabelList dataKey="timestamp" content={renderCustomLabels} />
      </Area>
      {!isHovering && xAxisTicks}
    </AreaChart>
  );
}

export default ForecastHourlyChart;