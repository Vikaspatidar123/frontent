import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TabsPage from '../../components/Common/TabsPage';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Overview from './Overview';
import PlayerWallet from './PlayerWallet';
import useUserDetails from './hooks/useUserDetails';
import BetHistory from './BetHistory';
import SportsBettingHistory from './SportsBettingHistory';
// import YourBonuses from './YourBonuses';
import Limits from './Limits';
import { modules } from '../../constants/permissions';
import { getUserDetails, resetUserLimitData } from '../../store/actions';
import usePermission from '../../components/Common/Hooks/usePermission';
import UserDocsList from './components/UserDocsList';
import Ledger from './Ledger';

const PlayerDetailsPage = ({ t }) => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState(1);
	const { playerId } = useParams();
	const {
		resetUserLimitSuccess,
		markUserAsInternalSuccess,
		updateSAUserStatusSuccess,
		verifyUserEmailSuccess,
		updateUserTagsSuccess,
		depositToOtherSuccess,
		updateUserInfoSuccess,
		createTag: createTagSuccess,
		attachTag: attachTagSuccess,
		removeUserTag: removeUserTagSuccess,
	} = useSelector((state) => state.UserDetails);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	useEffect(() => {
		if (
			resetUserLimitSuccess ||
			markUserAsInternalSuccess ||
			updateSAUserStatusSuccess ||
			verifyUserEmailSuccess ||
			updateUserTagsSuccess ||
			depositToOtherSuccess ||
			updateUserInfoSuccess ||
			createTagSuccess ||
			attachTagSuccess ||
			removeUserTagSuccess
		) {
			dispatch(getUserDetails({ playerId }));
			dispatch(resetUserLimitData());
		}
	}, [
		resetUserLimitSuccess,
		markUserAsInternalSuccess,
		updateSAUserStatusSuccess,
		verifyUserEmailSuccess,
		updateUserTagsSuccess,
		depositToOtherSuccess,
		updateUserInfoSuccess,
		createTagSuccess,
		attachTagSuccess,
		removeUserTagSuccess,
	]);

	const { userWalletData, userDetails, userDetailsLoading, duplicateUsers } =
		useUserDetails({
			userId: playerId,
		});

	const tabData = [
		{
			id: 1,
			title: 'Overview',
			component: (
				<Overview
					userDetails={userDetails}
					userDetailsLoading={userDetailsLoading}
					duplicateUsers={duplicateUsers}
				/>
			),
		},
		{
			id: 2,
			title: 'Limits',
			component: (
				<Limits
					userDetails={userDetails}
					userId={playerId}
					userDetailsLoading={userDetailsLoading}
				/>
			),
		},
		{
			id: 4,
			title: 'Wallet',
			component: (
				<PlayerWallet
					userDetails={userDetails}
					userWalletData={userWalletData}
				/>
			),
		},
		{
			id: 5,
			title: 'History', // Combined dropdown for Bet and Sports Betting History
			isHidden: !isGranted(modules.report, 'R'),
			isDropdown: true,
			dropdownItems: [
				{
					id: 1,
					title: 'Casino Bet History',
					component: <BetHistory userId={playerId} />,
				},
				{
					id: 2,
					title: 'Sport Betting History',
					component: <SportsBettingHistory userId={playerId} />,
				},
			],
		},
		{
			id: 6,
			title: 'Ledger',
			component: <Ledger userId={playerId} />,
			isHidden: !isGranted(modules.report, 'R'),
		},
		{
			id: 7,
			title: 'KYC Settings',
			component: <UserDocsList userDetails={userDetails} userId={playerId} />,
		},
		// {
		// 	id: 8,
		// 	title: 'Bonuses',
		// 	component: <YourBonuses userId={playerId} />,
		// 	isHidden: !isGranted(modules.bonus, 'R'),
		// },
		// {
		// 	id: 9,
		// 	title: 'Notes',
		// 	component: <Notes userId={playerId} />,
		// 	isHidden: !isGranted(modules.comment, 'R'),
		// },
	];

	const leftTitle = userDetailsLoading
		? 'Player Details'
		: `Player Details : ${userDetails?.firstName} ${userDetails?.lastName}`;

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb
					leftTitle={leftTitle}
					title={t('Player')}
					breadcrumbItem={t('Player Details')}
					showBackButton
				/>
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
