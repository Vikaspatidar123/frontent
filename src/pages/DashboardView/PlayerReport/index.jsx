/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip, Row } from 'reactstrap';
import FlatPickr from 'react-flatpickr';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
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
import { getDashboardFilterText } from '../../../utils/helpers';

const PlayerReport = () => {
	const {
		columns,
		topPlayerFormatted,
		topPlayersLoading,
		topPlayersDateOption: { selected, fromDate, toDate },
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

	const { isGranted } = usePermission();

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px', minHeight: '300px' }}>
			<TableContainer
				isLoading={topPlayersLoading}
				columns={columns || []}
				data={topPlayerFormatted}
				isGlobalFilter={false}
				tableClass={`table-bordered align-middle table-striped nowrap ${tableCustomClass}`}
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
						<>
							<Row>
								<Col xl={4} className="d-flex align-items-center my-2">
									<h4 className="card-title font-size-18 mb-3 d-flex align-items-center">
										<span className="mdi mdi-account-tie fs-1 me-3 text-success" />
										Top 5 Players
									</h4>
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
									<UncontrolledTooltip
										placement="top"
										target="refreshGameReport"
									>
										Refresh
									</UncontrolledTooltip>

									<Link
										style={{ marginTop: -13, fontSize: 15 }}
										variant="outline"
										key="view"
										to="/player-performance"
										className="text-decoration-underline"
										id="playerRedirect"
									>
										View All
									</Link>

									<UncontrolledTooltip placement="top" target="playerRedirect">
										Player Performance Report
									</UncontrolledTooltip>
								</Col>
								<Col xl={8} className="float-end my-2">
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
											options={topPlayerOrder(activePerformance)?.map(
												(item) => (
													<option value={item.value} key={item.value}>
														{item.label}
													</option>
												)
											)}
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
										{selected === 'custom' ? (
											<FlatPickr
												className="form-control mx-2"
												value={[fromDate, toDate]}
												placeholder="Select Date Range"
												options={{
													mode: 'range',
													dateFormat: 'd M Y',
													maxDate: new Date(),
												}}
												onChange={(date) => {
													setTopPlayersDateOption((prev) => ({
														...prev,
														fromDate: date[0],
														toDate: date[1],
													}));
												}}
											/>
										) : null}
										<CustomSelectField
											type="select"
											onChange={(e) => {
												setTopPlayersDateOption((prev) => ({
													...prev,
													fromDate: '',
													toDate: '',
													selected: e.target.value,
												}));
											}}
											value={selected}
											key="my_unique_select_key__topPlayersDateFilter"
											options={dateConstants?.map((item) => (
												<option value={item.value} key={item.value}>
													{item.label}
												</option>
											))}
										/>
										<CSVLink
											data={topPlayerFormatted || []}
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
									navClass="rounded p-0"
									nonActiveClass="bg-light"
									navLinkClass="custom-border"
								/>
							</Row>
							<Row>
								<div>{getDashboardFilterText(selected, fromDate, toDate)}</div>
							</Row>
						</>
					) : (
						<h6>{GAME_REPORT}</h6>
					)}
				</CardBody>
			</Card>
		</Col>
	);
};

export default PlayerReport;
