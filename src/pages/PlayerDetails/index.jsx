import React, { useState } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import TabsPage from '../../components/Common/TabsPage';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Overview from './Overview';
import PlayerWallet from './PlayerWallet';
import useUserDetails from './hooks/useUserDetails';
import BetHistory from './BetHistory';
import SportsBettingHistory from './SportsBettingHistory';
import Transactions from './Transactions';
import KYCSettings from './KYCSettings';
import YourBonuses from './YourBonuses';
import Comments from './Comments';

const PlayerDetailsPage = ({ t }) => {
	const [activeTab, setActiveTab] = useState(1);
	const { playerId } = useParams();

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const { userDetails } = useUserDetails({ userId: playerId });

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
			component: <PlayerWallet userDetails={userDetails} />,
		},
		{
			id: 5,
			title: 'Bet History',
			component: <BetHistory userId={playerId} />,
		},
		{
			id: 6,
			title: 'Sports Betting History',
			component: <SportsBettingHistory userId={playerId} />,
		},
		{
			id: 7,
			title: 'Transactions',
			component: <Transactions userId={playerId} />,
		},
		{
			id: 8,
			title: 'KYC Settings',
			component: <KYCSettings userDetails={userDetails} userId={playerId} />,
		},
		{
			id: 9,
			title: 'Your Bonuses',
			component: <YourBonuses userId={playerId} />,
		},
		{
			id: 10,
			title: 'Comments',
			component: <Comments userId={playerId} />,
		},
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
