/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip, Row } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import TableContainer from '../../../components/Common/Table';
import { tableCustomClass } from '../../../constants/config';
import { TABS, dateConstants, topPlayerOrder } from '../constant';
import { CustomSelectField } from '../../../helpers/customForms';
import usePlayerReport from './hooks/usePlayerReport';
import { GAME_REPORT } from '../../../constants/messages';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import TabsPage from '../../../components/Common/TabsPage';

const PlayerReport = () => {
	const {
		columns,
		topPlayers,
		topPlayersLoading,
		topPlayersDateOption,
		setTopPlayersDateOption,
		fetchTopPlayers,
		currencyId,
		setCurrencyId,
		orderBy,
		setOrderBy,
		currencies,
		activePerformance,
		toggle,
	} = usePlayerReport();

	const navigate = useNavigate();
	const { isGranted } = usePermission();

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px', minHeight: '300px' }}>
			<TableContainer
				isLoading={topPlayersLoading}
				columns={columns || []}
				data={topPlayers?.reportData || []}
				isGlobalFilter={false}
				customPageSize={topPlayers?.reportData?.length}
				tableClass={`table-bordered align-middle nowrap ${tableCustomClass}`}
				isShowColSettings={false}
				tbodyHeight="300px"
			/>
		</SimpleBar>
	);

	const tabData = [
		{
			id: TABS.CASINO,
			title: 'CASINO',
			component: tabComponent,
		},
		{
			id: TABS.SPORT,
			title: 'SPORTS',
			component: tabComponent,
		},
	];

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					{isGranted(modules.kpiReport, 'R') ? (
						<Row>
							<Col xl={5} className="d-flex align-items-center my-2">
								<h4 className="card-title font-size-18 mb-3">Top Players</h4>
								<i
									role="button"
									tabIndex="0"
									className="mdi mdi-refresh mx-2 font-size-24 mb-3"
									style={{ cursor: 'pointer' }}
									id="refreshGameReport"
									onClick={fetchTopPlayers}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											fetchTopPlayers();
										}
									}}
								/>
								<UncontrolledTooltip placement="top" target="refreshGameReport">
									Refresh
								</UncontrolledTooltip>
								<i
									role="button"
									tabIndex="0"
									className="mdi mdi-arrow-top-right-thick mx-2 font-size-24 mb-3"
									style={{ cursor: 'pointer' }}
									id="playerRedirect"
									onClick={() => navigate('/player-performance')}
									onKeyDown={() => {}}
								/>
								<UncontrolledTooltip placement="top" target="playerRedirect">
									Player Performance Report
								</UncontrolledTooltip>
							</Col>
							<Col xl={7} className="float-end my-2">
								<div className="d-flex justify-content-between align-items-center">
									<CustomSelectField
										name="kpiSummaryDateFilter"
										type="select"
										value={orderBy}
										className="mx-2"
										placeholder="Order By"
										key="my_unique_select_key__kpiSummaryDateFilter"
										onChange={(e) => {
											setOrderBy(e.target.value);
										}}
										options={topPlayerOrder(activePerformance)?.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									/>
									<CustomSelectField
										type="select"
										value={currencyId}
										className="mx-2"
										placeholder="Select Currency"
										key="my_unique_select_key__top_players"
										onChange={(e) => {
											setCurrencyId(e.target.value);
										}}
										options={currencies?.currencies?.map((currency) => (
											<option value={currency.id} key={currency.id}>
												{currency.name}
											</option>
										))}
									/>
									<CustomSelectField
										type="select"
										onChange={(e) => {
											setTopPlayersDateOption(e.target.value);
										}}
										value={topPlayersDateOption}
										key="my_unique_select_key__topPlayersDateFilter"
										options={dateConstants?.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									/>
									<CSVLink
										data={topPlayers?.reportData || []}
										filename="downloaded_data.csv"
										className="btn btn-primary dashboard-export-btn w-80"
									>
										<i className="bx bx-download align-baseline" />
									</CSVLink>
								</div>
							</Col>

							<TabsPage
								activeTab={activePerformance}
								tabsData={tabData}
								toggle={toggle}
								navClass="bg-light rounded p-0"
							/>
						</Row>
					) : (
						<h6>{GAME_REPORT}</h6>
					)}
				</CardBody>
			</Card>
		</Col>
	);
};

export default PlayerReport;
