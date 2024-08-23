/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/Table';
import TabsPage from '../../../components/Common/TabsPage';
import { tableCustomClass } from '../../../constants/config';
// import { TABS, dateConstants } from '../constant';
import { TABS } from '../constant';
import { CustomSelectField } from '../../../helpers/customForms';
import useKpiSummary from './hooks/useKpiSummary';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { KPI_SUMMARY } from '../../../constants/messages';
import { getDashboardFilterText } from '../../../utils/helpers';

const KpiSummary = () => {
	const {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		formattedKpiSummary,
		isKpiSummaryLoading,
		// kpiSummaryDate,
		// setKpiSummaryDate,
		loadKPISummary,
		currencyId,
		setCurrencyId,
		currencies,
		currencyById,
	} = useKpiSummary();

	const { isGranted } = usePermission();

	const lastDate = new Date();

	// add a day
	lastDate.setDate(lastDate.getDate() + 1);

	const tabComponent = (
		<SimpleBar>
			<TableContainer
				isLoading={isKpiSummaryLoading}
				columns={kPISummaryColumn || []}
				data={formattedKpiSummary || []}
				isGlobalFilter={false}
				customPageSize={kPISummary?.length || 300}
				tableClass={`table-bordered align-middle table-striped nowrap ${tableCustomClass}`}
				isShowColSettings={false}
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

	const toggle = (tab) => {
		if (activeKpiSummTab !== tab) {
			setActiveKpiSummTab(tab);
		}
	};

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					{isGranted(modules.kpiSummaryReport, 'R') ? (
						<>
							<Row>
								<Col xl={9} className="d-flex align-items-center my-2">
									<h4 className="card-title font-size-18 mb-3 d-flex align-items-center">
										<span className="mdi mdi-chart-areaspline fs-1 me-3 text-success" />
										KPI Summary
									</h4>
									<i
										role="button"
										tabIndex="0"
										className="mdi mdi-refresh mx-2 font-size-24 mb-3"
										style={{ cursor: 'pointer' }}
										id="refreshKpiSummary"
										onClick={loadKPISummary}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												loadKPISummary();
											}
										}}
									/>
									<UncontrolledTooltip
										placement="top"
										target="refreshKpiSummary"
									>
										Refresh
									</UncontrolledTooltip>
								</Col>
								<Col xl={3} className="float-end my-2">
									<div className="d-flex justify-content-between align-items-center">
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
										{/* <CustomSelectField
										name="kpiSummaryDateFilter"
										type="select"
										value={kpiSummaryDate}
										key="my_unique_select_key__kpiSummaryDateFilter"
										onChange={(e) => {
											setKpiSummaryDate(e.target.value);
										}}
										options={dateConstants?.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									/> */}
										<CSVLink
											data={formattedKpiSummary || []}
											filename="downloaded_data.csv"
											className="btn btn-primary dashboard-export-btn w-80"
										>
											<i className="bx bx-download align-baseline" />
										</CSVLink>
									</div>
								</Col>

								<TabsPage
									activeTab={activeKpiSummTab}
									tabsData={tabData}
									toggle={toggle}
									navClass="rounded p-0"
									nonActiveClass="bg-light"
									navLinkClass="custom-border"
									tabCardClass="mb-0"
								/>
							</Row>
							<Row>
								<div>
									{getDashboardFilterText(
										'',
										'',
										'',
										currencyById?.[currencyId]?.name
									)}
								</div>
							</Row>
						</>
					) : (
						<h6>{KPI_SUMMARY}</h6>
					)}
				</CardBody>
			</Card>
		</Col>
	);
};

export default KpiSummary;
