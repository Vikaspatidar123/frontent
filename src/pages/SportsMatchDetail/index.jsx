/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CrudSection from '../../components/Common/CrudSection';
import TableContainer from '../../components/Common/TableContainer';
import useSportsMatchDetail from './hooks/useSportsMatchDetail';
import AccordianMatchDetails from './components/AccordianMatchDetails';

const SportsMatchDetail = () => {
	const {
		columns,
		matchId,
		matchOdsDetails,
		toggleModal,
		setMatchMarketId,
		toggleDetachMarketModal,
		handleChange,
		setIsAllEvents,
		handleDetachMarket,
		handleVarySubmit,
		showDetachMarketModal,
		varyType,
		setVaryType,
		varyPercentage,
		setVaryPercentage,
		showOddsModal,
		marketDetail,
		setMarketDetail,
		isSportsMatchDetailsLoading,
	} = useSportsMatchDetail();

	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Market Details" />
							<CardBody>
								<TableContainer
									isLoading={isSportsMatchDetailsLoading}
									columns={columns}
									data={matchOdsDetails?.match ? [matchOdsDetails?.match] : []}
									isPagination={false}
									tableClass="table-bordered align-middle nowrap mt-2 match-details-table"
									isMatchDetailsPage
								/>
							</CardBody>
						</Card>
						<Card>
							<CrudSection buttonList={[]} title="Event Detail" />
							<CardBody>
								<AccordianMatchDetails
									matchOdsDetails={matchOdsDetails}
									toggleModal={toggleModal}
									handleChange={handleChange}
									matchId={matchId}
									setIsAllEvents={setIsAllEvents}
									setMatchMarketId={setMatchMarketId}
									toggleDetachMarketModal={toggleDetachMarketModal}
									showDetachMarketModal={showDetachMarketModal}
									handleDetachMarket={handleDetachMarket}
									varyType={varyType}
									setVaryType={setVaryType}
									varyPercentage={varyPercentage}
									setVaryPercentage={setVaryPercentage}
									showOddsModal={showOddsModal}
									marketDetail={marketDetail}
									handleVarySubmit={handleVarySubmit}
									setMarketDetail={setMarketDetail}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SportsMatchDetail;
