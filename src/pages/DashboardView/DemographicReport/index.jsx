/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Row, Col, Card, CardBody, UncontrolledTooltip } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { isEmpty } from 'lodash';
import GraphicChart from './GraphicChart';
import DemoGraphicTable from './DemoGraphicTable';
import { dateConstants } from '../constant';
import useDemoGraphicReport from './hooks/useDemoGraphicReport';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { DEMOGRAPHY } from '../../../constants/messages';

const DemographicReport = () => {
	const { isGranted } = usePermission();
	const {
		demoGrapFormatedData,
		demoGraphOptions,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		fetchData,
	} = useDemoGraphicReport();

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					{isGranted(modules.demography, 'R') ? (
						<>
							<div className="float-end">
								<div className="d-flex justify-content-between align-items-center">
									<select
										value={demoDateOptions}
										className="form-select form-select-sm me-2"
										onChange={(e) => {
											setDemoDateOptions(e.target.value);
										}}
									>
										{dateConstants?.map((item) => (
											<option value={item.value} key={item.value}>
												{item.label}
											</option>
										))}
									</select>
									{!isEmpty(demoGraphicData?.demograph) && (
										<CSVLink
											data={demoGraphicData?.demograph || []}
											filename="downloaded_data.csv"
											className="btn btn-sm btn-primary"
										>
											<i className="bx bx-download align-baseline" />
										</CSVLink>
									)}
								</div>
							</div>

							<div className="d-flex align-items-center">
								<h4 className="card-title font-size-16">Demographic Report</h4>
								<i
									className="mdi mdi-refresh mx-2 font-size-24 mb-2"
									style={{ cursor: 'pointer' }}
									id="refreshDemo"
									onClick={fetchData}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											fetchData();
										}
									}}
								/>
								<UncontrolledTooltip placement="top" target="refreshDemo">
									Refresh
								</UncontrolledTooltip>
							</div>

							<Row>
								<Col xl="7">
									<GraphicChart
										demoGrapFormatedData={demoGrapFormatedData}
										demoGraphOptions={demoGraphOptions}
									/>
								</Col>
								<Col xl="5">
									<DemoGraphicTable
										demoGraphicData={demoGraphicData}
										demoGraphColumn={demoGraphColumn}
										isDemographicLoading={isDemographicLoading}
									/>
								</Col>
							</Row>
						</>
					) : (
						<h6>{DEMOGRAPHY}</h6>
					)}
				</CardBody>
			</Card>
		</Col>
	);
};

export default DemographicReport;
