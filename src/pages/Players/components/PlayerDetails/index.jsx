import React, { useState } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import TabsPage from '../../../../components/Common/TabsPage';
import Breadcrumb from '../../../../components/Common/Breadcrumb';
import Overview from './Overview';
import PlayerWallet from './PlayerWallet';

const PlayerDetailsPage = ({ t }) => {
	const [activeTab, setActiveTab] = useState(1);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const tabData = [
		{
			id: 1,
			title: 'Overview',
			component: <Overview />,
		},
		{
			id: 2,
			title: 'Limits',
			component: <div>In Progress</div>,
		},
		{
			id: 4,
			title: 'Wallet',
			component: <PlayerWallet />,
		},
		{
			id: 5,
			title: 'Bet History',
			component: <div>In Progress</div>,
		},
		{
			id: 6,
			title: 'Sports Betting History',
			component: <div>In Progress</div>,
		},
		{ id: 7, title: 'Transactions', component: <div>In Progress</div> },
		{ id: 7, title: 'KYC Settings', component: <div>In Progress</div> },
		{ id: 7, title: 'Your Bonuses', component: <div>In Progress</div> },
		{ id: 7, title: 'Comments', component: <div>In Progress</div> },
	];

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb title={t('Player')} breadcrumbItem={t('Player Details')} />
				<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			</Container>
		</div>
	);
};

PlayerDetailsPage.propTypes = {
	t: PropTypes.func,
};

PlayerDetailsPage.defaultProps = {
	t: (string) => string,
};

export default PlayerDetailsPage;
