/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/Table';
import { tableCustomClass } from '../../../constants/config';
import { GAME_ORDER_BY, TABS, dateConstants } from '../constant';
import { CustomSelectField } from '../../../helpers/customForms';
import TabsPage from '../../../components/Common/TabsPage';
import useGameReport from './hooks/useGameReport';
import { GAME_REPORT } from '../../../constants/messages';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';

const GameReport = () => {
	const {
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
		isGameReportLoading,
		gameReportDateOption,
		setGameReportDateOption,
		loadGameReport,
		currencyId,
		setCurrencyId,
		orderBy,
		setOrderBy,
		currencies,
	} = useGameReport();
	const { isGranted } = usePermission();

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px' }}>
			<TableContainer
				isLoading={isGameReportLoading}
				columns={gameReportColumn || []}
				data={gameReport || []}
				isGlobalFilter={false}
				customPageSize={gameReport?.length || 300}
				tableClass={`table-bordered align-middle nowrap ${tableCustomClass}`}
				isShowColSettings={false}
			/>
		</SimpleBar>
	);

	const tabData = [
		{
			id: TABS.GAME,
			title: 'GAME',
			component: tabComponent,
		},
		{
			id: TABS.PROVIDER,
			title: 'PROVIDER',
			component: tabComponent,
		},
	];

	const toggle = (tab) => {
		if (activeGameReportTab !== tab) {
			setActiveGameReportTab(tab);
		}
	};

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					{isGranted(modules.kpiReport, 'R') ? (
						<Row>
							<Col xl={5} className="d-flex align-items-center my-2">
								<h4 className="card-title font-size-18 mb-3">{`Top ${activeGameReportTab}s`}</h4>
								<i
									role="button"
									tabIndex="0"
									className="mdi mdi-refresh mx-2 font-size-24 mb-3"
									style={{ cursor: 'pointer' }}
									id="refreshGameReport"
									onClick={loadGameReport}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											loadGameReport();
										}
									}}
								/>
								<UncontrolledTooltip placement="top" target="refreshGameReport">
									Refresh
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
										options={GAME_ORDER_BY?.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									/>
									<CustomSelectField
										name="kpiSummaryDateFilter"
										type="select"
										value={currencyId}
										className="mx-2"
										placeholder="Select Currency"
										key="my_unique_select_key__kpiSummaryDateFilter"
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
										name="gameReportDateFilter"
										type="select"
										onChange={(e) => {
											setGameReportDateOption(e.target.value);
										}}
										value={gameReportDateOption}
										key="my_unique_select_key__gameReportDateFilter"
										options={dateConstants?.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									/>
									<CSVLink
										data={gameReport || []}
										filename="downloaded_data.csv"
										className="btn btn-primary dashboard-export-btn w-80"
									>
										<i className="bx bx-download align-baseline" />
									</CSVLink>
								</div>
							</Col>

							<TabsPage
								activeTab={activeGameReportTab}
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

export default GameReport;
