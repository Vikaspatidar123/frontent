/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const GraphicChart = ({ demoGrapFormatedData, demoGraphOptions }) => (
	<ReactApexChart
		options={demoGraphOptions || []}
		series={demoGrapFormatedData || []}
		type="bar"
		height="359"
		className="apex-charts"
	/>
);

GraphicChart.propTypes = {
	demoGrapFormatedData: PropTypes.array,
	demoGraphOptions: PropTypes.array,
};
export default GraphicChart;
