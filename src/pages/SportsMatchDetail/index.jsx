import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CrudSection from '../../components/Common/CrudSection';

const SportsMatchDetail = () => {
	const { matchId } = useParams();
	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				{/* <Breadcrumb title={t('Sports Book')} breadcrumbItem={t('Matches')} /> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title={`Match - ${matchId}`} />
							<CardBody />
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SportsMatchDetail;
