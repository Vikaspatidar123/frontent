/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip } from 'reactstrap';

import SimpleBar from 'simplebar-react';
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/TableContainer';
import { TABS, dateConstants } from '../constant';
import { tableCustomClass } from '../../../constants/config';
import TabsPage from '../../../components/Common/TabsPage';
import { CustomSelectField } from '../../../helpers/customForms';
import useKpiReport from './hooks/useKpiReport';

const KpiReport = () => {
	const {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReportColumn,
		kPIReport,
		isKpiReportLoading,
		kpiReportDateOption,
		setKpiReportDateOption,
		loadKPIReport,
	} = useKpiReport();

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px', minHeight: '300px' }}>
			<TableContainer
				isLoading={isKpiReportLoading}
				columns={kPIReportColumn}
				data={kPIReport || []}
				isGlobalFilter={false}
				customPageSize={kPIReport || 300}
				tableClass={`table-bordered align-middle nowrap ${tableCustomClass}`}
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
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<CustomSelectField
								name="kpiReportDateFilter"
								type="select"
								onChange={(e) => {
									setKpiReportDateOption(e.target.value);
								}}
								value={kpiReportDateOption}
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
								className="btn btn-primary dashboard-export-btn"
							>
								Export Details <i className="bx bx-download align-baseline" />
							</CSVLink>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-18 mb-3">KPI Report</h4>
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
						<UncontrolledTooltip placement="top" target="refreshKpiReport">
							Refresh
						</UncontrolledTooltip>
					</div>

					<TabsPage
						activeTab={activeKpiReportTab}
						tabsData={tabData}
						toggle={toggle}
						navClass="bg-light rounded p-0"
					/>
				</CardBody>
			</Card>
		</Col>
	);
};

export default KpiReport;
