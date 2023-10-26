import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody } from 'reactstrap';
import GraphicChart from './GraphicChart';
import DemoGraphicTable from './DemoGraphicTable';
import { dateConstants } from './constant';

const DemographicReport = (props) => {
	const {
		demoGrapFormatedData,
		demoGraphOptions,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
	} = props;
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<select
							value={demoDateOptions}
							className="form-select form-select-sm ms-2"
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
					</div>
					<h4 className="card-title mb-3">Demographic Report</h4>

					<Row>
						<Col xl="5">
							<GraphicChart
								demoGrapFormatedData={demoGrapFormatedData}
								demoGraphOptions={demoGraphOptions}
							/>
						</Col>
						<Col xl="7">
							<DemoGraphicTable
								demoGraphicData={demoGraphicData}
								demoGraphColumn={demoGraphColumn}
								isDemographicLoading={isDemographicLoading}
							/>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	);
};
DemographicReport.propTypes = {
	demoGraphOptions: PropTypes.arrayOf,
	demoGraphicData: PropTypes.arrayOf,
	demoGraphColumn: PropTypes.arrayOf,
	demoDateOptions: PropTypes.arrayOf,
	setDemoDateOptions: PropTypes.func,
	isDemographicLoading: PropTypes.bool,
	demoGrapFormatedData: PropTypes.arrayOf,
};
DemographicReport.defaultProps = {
	demoGraphOptions: PropTypes.arrayOf,
	demoGraphicData: PropTypes.arrayOf,
	demoGraphColumn: PropTypes.arrayOf,
	demoDateOptions: PropTypes.arrayOf,
	setDemoDateOptions: PropTypes.func,
	isDemographicLoading: PropTypes.bool,
	demoGrapFormatedData: PropTypes.arrayOf,
};
export default DemographicReport;
