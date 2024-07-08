/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip, Row } from 'reactstrap';
import FlatPickr from 'react-flatpickr';
import SimpleBar from 'simplebar-react';
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/Table';
import { TABS, dateConstants } from '../constant';
import { tableCustomClass } from '../../../constants/config';
import TabsPage from '../../../components/Common/TabsPage';
import { CustomSelectField } from '../../../helpers/customForms';
import useKpiReport from './hooks/useKpiReport';
import { KPI_REPORT } from '../../../constants/messages';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { getDashboardFilterText } from '../../../utils/helpers';

const KpiReport = () => {
	const {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReportColumn,
		kPIReport,
		isKpiReportLoading,
		kpiReportDateOption: { selected, fromDate, toDate },
		setKpiReportDateOption,
		loadKPIReport,
		currencyId,
		setCurrencyId,
		currencies,
	} = useKpiReport();
	const { isGranted } = usePermission();

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px', minHeight: '300px' }}>
			<TableContainer
				isLoading={isKpiReportLoading}
				columns={kPIReportColumn}
				data={kPIReport || []}
				isGlobalFilter={false}
				tableClass={`table-bordered align-middle table-striped nowrap ${tableCustomClass}`}
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
		if (activeKpiReportTab !== tab) {
			setActiveKpiReportTab(tab);
		}
	};
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					{isGranted(modules.kpiReport, 'R') ? (
						<>
							<Row>
								<Col xl={5} className="d-flex align-items-center">
									<h4 className="card-title font-size-18 mb-3 d-flex align-items-center">
										<span className="mdi mdi-chart-bar fs-1 me-3 text-success" />
										KPI Report
									</h4>
									<i
										role="button"
										tabIndex="0"
										className="mdi mdi-refresh mx-2 font-size-24 mb-3"
										style={{ cursor: 'pointer' }}
										id="refreshKpiReport"
										onClick={loadKPIReport}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												loadKPIReport();
											}
										}}
									/>
									<UncontrolledTooltip
										placement="top"
										target="refreshKpiReport"
									>
										Refresh
									</UncontrolledTooltip>
								</Col>
								<Col xl={7} className="float-end my-2">
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
													setKpiReportDateOption((prev) => ({
														...prev,
														fromDate: date[0],
														toDate: date[1],
													}));
												}}
											/>
										) : null}
										<CustomSelectField
											name="kpiReportDateFilter"
											type="select"
											onChange={(e) => {
												setKpiReportDateOption((prev) => ({
													...prev,
													fromDate: '',
													toDate: '',
													selected: e.target.value,
												}));
											}}
											value={selected}
											key="my_unique_select_key__kpiReportDateFilter"
											options={dateConstants?.map((item) => (
												<option value={item.value} key={item.value}>
													{item.label}
												</option>
											))}
										/>
										<CSVLink
											data={kPIReport || []}
											filename="downloaded_data.csv"
											className="btn btn-primary dashboard-export-btn w-80"
										>
											<i className="bx bx-download align-baseline" />
										</CSVLink>
									</div>
								</Col>

								<TabsPage
									activeTab={activeKpiReportTab}
									tabsData={tabData}
									toggle={toggle}
									navClass="bg-light rounded p-0"
								/>
							</Row>
							<Row>
								<div>{getDashboardFilterText(selected, fromDate, toDate)}</div>
							</Row>
						</>
					) : (
						<h6>{KPI_REPORT}</h6>
					)}
				</CardBody>
			</Card>
		</Col>
	);
};

export default KpiReport;
