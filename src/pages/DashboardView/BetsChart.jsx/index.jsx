/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import LineBarChart from './Chart';
import { TABS } from '../constant';
import TabsPage from '../../../components/Common/TabsPage';

const BetsChart = ({
	statsData,
	layoutModeType,
	dashFilters,
	statsDataLoading,
}) => {
	const [activeTab, setActiveTab] = useState(TABS.CASINO);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	useEffect(() => {
		const isCasino = dashFilters?.categories?.find(
			(cate) => cate.value === 'casino'
		);
		const isSportsbook = dashFilters?.categories?.find(
			(cate) => cate.value === 'sportsbook'
		);
		if (isCasino && !isSportsbook) {
			setActiveTab(TABS.CASINO);
		} else if (isSportsbook && !isCasino) {
			setActiveTab(TABS.SPORT);
		}
	}, [dashFilters?.categories]);

	const betsChart = (casino) => (
		<LineBarChart
			dataColors='["--bs-success", "--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
			isCasino={casino}
			chartData={statsData?.grouped}
			layoutModeType={layoutModeType}
			statsDataLoading={statsDataLoading}
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
			nonActiveClass="bg-light"
			navLinkClass="custom-border"
		/>
	);
};

export default BetsChart;
