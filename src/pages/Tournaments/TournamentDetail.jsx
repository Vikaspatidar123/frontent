import React, { useEffect, useState } from 'react';
import { Badge, Col, Card, CardBody, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { formatDateYMD, getDateTime } from '../../utils/dateFormatter';
import TabsPage from '../../components/Common/TabsPage';
import BasicDetails from './components/BasicDetails';
import PrizeDetails from './components/PrizeDetails';
import GameDetails from './components/GameDetails';
import LeaderBoard from './components/LeaderBoard';
import Transactions from './components/Transactions';
import { getTournamentDetailByIdStart } from '../../store/tournaments/actions';

const TournamentDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState('1');

	const { tournamentDetail, tournamentDetailLoading } = useSelector(
		(state) => state.Tournament
	);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	useEffect(() => {
		if (id) {
			dispatch(
				getTournamentDetailByIdStart({
					tournamentId: Number(id),
				})
			);
		}
	}, [id]);

	const tabData = [
		{
			id: '1',
			title: 'Overview',
			component: (
				<BasicDetails
					tournamentDetail={tournamentDetail}
					tournamentDetailLoading={tournamentDetailLoading}
				/>
			),
		},
		{
			id: '2',
			title: 'Prize Distribution',
			component: <PrizeDetails tournamentDetail={tournamentDetail} />,
		},
		{
			id: '3',
			title: 'Selected Games',
			component: <GameDetails tournamentDetail={tournamentDetail} />,
		},
		{
			id: '4',
			title: 'LeaderBoard',
			component: <LeaderBoard tournamentDetail={tournamentDetail} />,
		},
		{
			id: '5',
			title: 'Bet History',
			component: <Transactions tournamentDetail={tournamentDetail} />,
		},
	];

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Tournaments"
				breadcrumbItem="View"
				titleLink="/tournaments"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Card>
				<CardBody>
					<Row lg={12} className="mt-2">
						<Col lg={4} className="p-4">
							<img
								alt="tournament"
								src={tournamentDetail?.image ? tournamentDetail?.image : ''}
								width="100%"
								height="auto"
							/>
						</Col>
						<Col lg={8} className="mt-2">
							<h3>{tournamentDetail?.name?.EN}</h3>
							<div className="hstack gap-3 flex-wrap">
								<div className="text-muted">
									Active :{' '}
									{tournamentDetail?.isActive ? (
										<Badge className="bg-success font-size-12">Yes</Badge>
									) : (
										<Badge className="bg-danger font-size-12">No</Badge>
									)}
								</div>
								<div className="vr" />
								<div className="text-muted">
									Registration Closed :{' '}
									{tournamentDetail?.isRegistrationClosed ? (
										<Badge className="bg-success font-size-12">Yes</Badge>
									) : (
										<Badge className="bg-danger font-size-12">No</Badge>
									)}
								</div>
								<div className="vr" />
								<div className="text-muted">
									Created At : {formatDateYMD(tournamentDetail?.createdAt)}
								</div>
							</div>

							<Row className="mt-4">
								<Col lg={3} sm={6}>
									<div className="p-2 border rounded text-center">
										<p className="text-muted fw-medium mb-1 font-size-16">
											Pool Prize
										</p>
										<h5 className="fs-17 text-success mb-0">
											<i className="mdi mdi-ethereum me-1" />
											{tournamentDetail?.poolPrize}
										</h5>
									</div>
								</Col>
								<Col lg={3} sm={6}>
									<div className="p-2 border rounded text-center">
										<p className="text-muted fw-medium mb-1 font-size-16">
											Credit Points
										</p>
										<h5 className="fs-17 text-success  mb-0">
											{tournamentDetail?.creditPoints}
										</h5>
									</div>
								</Col>
								<Col lg={3} sm={6}>
									<div className="p-2 border rounded text-center">
										<p className="text-muted fw-medium mb-1 font-size-16">
											Start Date
										</p>
										<h5 className="fs-17 text-warning  mb-0">
											{getDateTime(tournamentDetail?.startDate)}
										</h5>
									</div>
								</Col>
								<Col lg={3} sm={6}>
									<div className="p-2 border rounded text-center">
										<p className="text-muted fw-medium mb-1 font-size-16">
											End Date
										</p>
										<h5 id="auction-time-1" className="mb- text-danger">
											{getDateTime(tournamentDetail?.endDate)}
										</h5>
									</div>
								</Col>
							</Row>

							<div className="mt-4 text-muted">
								<h4 className="fs-12">Description :</h4>
								{tournamentDetail?.description?.EN}
							</div>

							<Row className="mt-4 text-muted">
								<h4 className="mb-3 fs-12">Tournament Info :</h4>
								<TabsPage
									activeTab={activeTab}
									tabsData={tabData}
									toggle={toggle}
									navClass="p-0"
									tabType="tab"
									tabContentClass="border border-top-0"
									tabCardClass="mb-0 shadow-none"
								/>
							</Row>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</div>
	);
};

export default TournamentDetail;
