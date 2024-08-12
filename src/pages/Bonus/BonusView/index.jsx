import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Currencies from './Currency';
import WageringContribution from './WageringContribution';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TabsPage from '../../../components/Common/TabsPage';
import { getAllTags, getBonusDetail } from '../../../store/actions';
import GeneralDetails from './GeneralInformation';
import Games from './Games';
import Spinners from '../../../components/Common/Spinner';
import { BONUS_TYPES } from '../constants';
import getViewBonusInitialValues from './helperFunctions';

const BonusPreview = () => {
	const dispatch = useDispatch();
	const { bonusId, bonusType } = useParams();
	const [activeTab, setActiveTab] = useState('1');
	const { isBonusDetailsLoading, gameBonusDetail, gameBonusSegment } =
		useSelector((state) => state.AllBonusDetails);

	useEffect(() => {
		dispatch(getAllTags());
	}, []);

	const bonusDetails = useMemo(
		() => getViewBonusInitialValues(gameBonusDetail),
		[gameBonusDetail]
	);
	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};
	useEffect(() => {
		dispatch(getBonusDetail({ bonusId, bonusType }));
	}, [bonusId]);

	const tabData = [
		{
			id: '1',
			title: 'General',
			component: (
				<GeneralDetails
					bonusDetails={bonusDetails}
					gameBonusSegment={gameBonusSegment}
				/>
			),
		},
		{
			id: '2',
			title: 'Currency',
			component: <Currencies bonusDetails={bonusDetails} />,
		},
		{
			id: '3',
			title: 'Wagering Contribution',
			component: (
				<WageringContribution wageringId={bonusDetails?.wageringTemplateId} />
			),
			isHidden: gameBonusDetail?.bonusType === BONUS_TYPES.JOINING,
		},
		{
			id: '6',
			title: 'Games',
			component: <Games bonusDetails={bonusDetails} />,
			isHidden: gameBonusDetail?.bonusType !== BONUS_TYPES.FREESPINS,
		},
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
