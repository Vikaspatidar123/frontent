import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Currencies from './Currency';
import WageringContribution from './WageringContribution';
import BonusCountry from './BonusCountry';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TabsPage from '../../../components/Common/TabsPage';
import { getBonusDetail } from '../../../store/actions';
import GeneralDetails from './GeneralInformation';
// import LoyaltyManagement from '../../LoyaltyManagement';
// import Games from './Games';
import Spinners from '../../../components/Common/Spinner';
import { BONUS_TYPES } from '../constants';

const BonusPreview = () => {
	const dispatch = useDispatch();
	const { bonusId } = useParams();
	const [activeTab, setActiveTab] = useState('1');

	const { isBonusDetailsLoading, gameBonusDetail } = useSelector(
		(state) => state.AllBonusDetails
	);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};
	useEffect(() => {
		dispatch(getBonusDetail({ bonusId }));
	}, [bonusId]);

	const tabData = [
		{
			id: '1',
			title: 'General',
			component: <GeneralDetails bonusDetail={gameBonusDetail} />,
		},
		{
			id: '2',
			title: 'Currency',
			component: <Currencies bonusDetail={gameBonusDetail} />,
			isHidden: [BONUS_TYPES.promotion].includes(gameBonusDetail?.bonusType),
		},
		{
			id: '3',
			title: 'Wagering Contribution',
			component: (
				<WageringContribution
					wageringId={gameBonusDetail?.wageringTemplateId}
				/>
			),
			isHidden: !(
				gameBonusDetail?.bonusType !== 'balance' &&
				gameBonusDetail?.bonusType !== BONUS_TYPES.FREESPINS &&
				gameBonusDetail?.bonusType !== BONUS_TYPES.promotion &&
				gameBonusDetail?.bonusType !== BONUS_TYPES.JOINING
			),
		},
		{
			id: '4',
			title: 'Countries',
			component: (
				<BonusCountry bonusCountryData={gameBonusDetail?.other?.countries} />
			),
			isHidden: gameBonusDetail?.bonusType === BONUS_TYPES.JOINING,
		},
		// {
		// 	id: '5',
		// 	title: 'Loyalty',
		// 	component: <LoyaltyManagement bonusDetails={gameBonusDetail?.other} />,
		// 	isHidden: !(
		// 		gameBonusDetail?.bonusType === 'depositCashback' ||
		// 		gameBonusDetail?.bonusType === 'wagering'
		// 	),
		// },
		// {
		// 	id: '6',
		// 	title: 'Games',
		// 	component: <Games bonusDetails={gameBonusDetail?.other} />,
		// 	isHidden: gameBonusDetail?.bonusType !== BONUS_TYPES.FREESPINS,
		// },
	];

	return (
		<div className="page-content">
			<Breadcrumb
				title="Bonus"
				breadcrumbItem="Create"
				titleLink="/bonus"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				{isBonusDetailsLoading ? (
					<Spinners color="primary" />
				) : (
					<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
				)}
			</Container>
		</div>
	);
};

export default BonusPreview;
