/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import LineBarChart from './Chart';
import { TABS } from '../constant';
import TabsPage from '../../../components/Common/TabsPage';

const BetsChart = ({ statsData, layoutModeType }) => {
	const [activeTab, setActiveTab] = useState(TABS.CASINO);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const betsChart = (isCasino) => (
		<LineBarChart
			dataColors='["--bs-success", "--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
			isCasino={isCasino}
			chartData={statsData?.grouped}
			layoutModeType={layoutModeType}
		/>
	);

	const tabData = [
		{
			id: TABS.CASINO,
			title: 'Casino',
			component: betsChart(true),
		},
		{
			id: TABS.SPORT,
			title: 'Sports',
			component: betsChart(false),
		},
	];
	return (
		<TabsPage
			activeTab={activeTab}
			tabsData={tabData}
			toggle={toggle}
			navClass="rounded p-0"
		/>
	);
};

export default BetsChart;
