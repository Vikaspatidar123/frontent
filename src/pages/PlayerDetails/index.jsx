import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TabsPage from '../../components/Common/TabsPage';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Overview from './Overview';
import PlayerWallet from './PlayerWallet';
import useUserDetails from './hooks/useUserDetails';
import Limits from './Limits';
import { modules } from '../../constants/permissions';
import { getUserDetails, resetUserLimitData } from '../../store/actions';
import usePermission from '../../components/Common/Hooks/usePermission';
import UserDocsList from './components/UserDocsList';
// import Ledger from './Ledger';
import Notes from './Notes';
import TransactionBankingList from '../TransactionBankingList';
import CasinoTransactionsList from '../CasinoTransactionsList';
import SportsTransactionsList from '../SportsTransactionsList';
import SportsBetList from '../SportsBetList';
import Referrals from './Referrals';

const PlayerDetailsPage = ({ t }) => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState(1);
	const { playerId } = useParams();
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const tabNumber = params.get('tabNumber');

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
		activeKyc,
		inActiveKyc,
		createUserCommentsSuccess,
		updateUserCommentSuccess,
		deleteUserCommentSuccess,
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
			removeUserTagSuccess ||
			activeKyc ||
			inActiveKyc ||
			updateUserCommentSuccess ||
			deleteUserCommentSuccess ||
			createUserCommentsSuccess
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
		activeKyc,
		inActiveKyc,
		updateUserCommentSuccess,
		deleteUserCommentSuccess,
		createUserCommentsSuccess,
	]);

	useEffect(() => setActiveTab(Number(tabNumber || 1)), [playerId, tabNumber]);

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
			id: 3,
			title: 'Wallet',
			component: (
				<PlayerWallet
					userDetails={userDetails}
					userWalletData={userWalletData}
				/>
			),
		},
		{
			id: 4,
			title: 'Reports', // Combined dropdown for all player reports
			isHidden: !isGranted(modules.report, 'R'),
			isDropdown: true,
			dropdownItems: [
				{
					id: 1,
					title: 'Banking',
					component: <TransactionBankingList userId={playerId} />,
				},
				{
					id: 2,
					title: 'Casino',
					component: <CasinoTransactionsList userId={playerId} />,
				},
				{
					id: 3,
					title: 'Sports Book',
					component: <SportsTransactionsList userId={playerId} />,
				},
				{
					id: 4,
					title: 'Betslips',
					component: <SportsBetList userId={playerId} />,
				},
			],
		},

		{
			id: 5,
			title: 'KYC Settings',
			component: <UserDocsList userDetails={userDetails} userId={playerId} />,
		},
		{
			id: 6,
			title: 'Referrals',
			component: <Referrals userId={playerId} />,
			isHidden: !isGranted(modules.player, 'R'),
		},
		{
			id: 7,
			title: 'Notes',
			component: <Notes userId={playerId} userDetails={userDetails} />,
			isHidden: !isGranted(modules.comment, 'R'),
		},
	];

	const leftTitle = userDetailsLoading
		? 'Player Details'
		: `Player Details : ${userDetails?.firstName || ''} ${
				userDetails?.lastName || ''
		  }`;

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
