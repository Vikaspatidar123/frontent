/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip } from 'reactstrap';

import SimpleBar from 'simplebar-react';
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/Table';
import TabsPage from '../../../components/Common/TabsPage';
import { tableCustomClass } from '../../../constants/config';
import { TABS, dateConstants } from '../constant';
import { CustomSelectField } from '../../../helpers/customForms';
import useKpiSummary from './hooks/useKpiSummary';

const KpiSummary = () => {
	const {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		formattedKpiSummary,
		isKpiSummaryLoading,
		kpiSummaryDate,
		setKpiSummaryDate,
		loadKPISummary,
	} = useKpiSummary();
	const lastDate = new Date();

	// add a day
	lastDate.setDate(lastDate.getDate() + 1);

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px' }}>
			<TableContainer
				isLoading={isKpiSummaryLoading}
				columns={kPISummaryColumn || []}
				data={formattedKpiSummary || []}
				isGlobalFilter={false}
				customPageSize={kPISummary?.length || 300}
				tableClass={`table-bordered align-middle nowrap ${tableCustomClass}`}
			/>
		</SimpleBar>
	);

	const tabData = [
		{
			id: TABS.SPORT,
			title: 'SPORTS',
			component: tabComponent,
		},
		{
			id: TABS.CASINO,
			title: 'CASINO',
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
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<CustomSelectField
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
							/>
							<CSVLink
								data={formattedKpiSummary || []}
								filename="downloaded_data.csv"
								className="btn btn-primary dashboard-export-btn"
							>
								Export Details <i className="bx bx-download align-baseline" />
							</CSVLink>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-18 mb-3">KPI Summary</h4>
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
						<UncontrolledTooltip placement="top" target="refreshKpiSummary">
							Refresh
						</UncontrolledTooltip>
					</div>

					<TabsPage
						activeTab={activeKpiSummTab}
						tabsData={tabData}
						toggle={toggle}
						navClass="bg-light rounded p-0"
					/>
				</CardBody>
			</Card>
		</Col>
	);
};

export default KpiSummary;
