/* eslint-disable react/prop-types */
import React from 'react';
import VerticalBarChart from './VerticalPlayerChart';

const ActivePlayerChart = ({ statsData, layoutModeType }) => (
	<VerticalBarChart
		dataColors='["--bs-success", "--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
		chartData={statsData?.grouped}
		layoutModeType={layoutModeType}
	/>
);

export default ActivePlayerChart;
