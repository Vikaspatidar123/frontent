import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import DivLoader from '../../../components/Common/Loader/divLoader';

const renderStop = (prevProps, nextProps) => {
	if (
		prevProps.title !== nextProps.title ||
		prevProps.description !== nextProps.description ||
		prevProps.iconClass !== nextProps.iconClass ||
		prevProps.isLoading !== nextProps.isLoading
	) {
		return false;
	}
	return true;
};
const ReportList = (props) => {
	const { title, description, iconClass, isLoading, reportClass, customClass } =
		props;
	return (
		<Card className="mini-stats-wid">
			<CardBody className={`${customClass || 'bg-success-subtle'} rounded-3`}>
				<div className="d-flex">
					<div className="flex-grow-1">
						<p className={`text-muted fw-medium ${reportClass}`}>{title}</p>
						<h4 className="mb-0">{description}</h4>
					</div>
					<div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
						<span className="avatar-title rounded-circle bg-primary">
							{isLoading ? (
								<DivLoader isSmall loaderVarient="text-light" />
							) : (
								<i className={`${iconClass} font-size-24`} />
							)}
						</span>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

ReportList.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	iconClass: PropTypes.string,
	isLoading: PropTypes.bool,
	reportClass: PropTypes.string,
	customClass: PropTypes.string,
};
ReportList.defaultProps = {
	title: '',
	description: '',
	iconClass: '',
	isLoading: false,
	reportClass: '',
	customClass: '',
};
export default React.memo(ReportList, renderStop);
