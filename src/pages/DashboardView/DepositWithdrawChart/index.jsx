/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import LineBarChart from './Chart';
import { TABS } from '../constant';
import TabsPage from '../../../components/Common/TabsPage';

const DepositWithdrawChart = ({ statsData, layoutModeType }) => {
	const [activeTab, setActiveTab] = useState(TABS.DEPOSIT);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const depositChart = (isDeposit) => (
		<LineBarChart
			dataColors='["--bs-primary", "--bs-success", "--bs-danger","--bs-info", "--bs-warning"]'
			isDeposit={isDeposit}
			chartData={statsData?.grouped}
			layoutModeType={layoutModeType}
			statsData={statsData}
		/>
	);

	const tabData = [
		{
			id: TABS.DEPOSIT,
			title: 'Deposit',
			component: depositChart(true),
		},
		{
			id: TABS.WITHDRAW,
			title: 'Withdraw',
			component: depositChart(false),
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

export default DepositWithdrawChart;
