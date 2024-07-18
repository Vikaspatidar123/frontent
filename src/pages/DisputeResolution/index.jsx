import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import DisputeDetails from './components/DisputeDetails';
import DisputeList from './components/DisputeList';
import useDisputeResolution from './hooks/useDisputeResolution';

const DisputeResolution = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);
	const {
		disputes,
		loading,
		selectedDispute,
		setSelectedDispute,
		detailsLoading,
		disputeDetails,
		showReplyForm,
		setShowReplyForm,
		validation,
		sendMessageLoading,
		updateStatus,
		setPage,
		page,
	} = useDisputeResolution();

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
						<DisputeList
							disputes={disputes}
							loading={loading}
							selectedDispute={selectedDispute}
							setSelectedDispute={setSelectedDispute}
							updateStatus={updateStatus}
							setPage={setPage}
							page={page}
						/>
						<DisputeDetails
							detailsLoading={detailsLoading}
							disputeDetails={disputeDetails}
							showReplyForm={showReplyForm}
							setShowReplyForm={setShowReplyForm}
							validation={validation}
							sendMessageLoading={sendMessageLoading}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default DisputeResolution;
