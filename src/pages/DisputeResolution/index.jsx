import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import DisputeDetails from './components/DisputeDetails';
import DisputeList from './components/DisputeList';

const DisputeResolution = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);
	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Content Management"
						breadcrumbItem="Dispute resolution"
					/>
				)}
				<Row>
					<Col lg="12">
						<DisputeList />
						<DisputeDetails />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default DisputeResolution;
