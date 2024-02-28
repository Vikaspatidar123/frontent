import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import CrudSection from '../../components/Common/CrudSection';
import TableContainer from '../../components/Common/TableContainer';
import useSportsMatchDetail from './hooks/useSportsMatchDetail';
import AccordionMatchDetails from './components/AccordionMatchDetails';
import Breadcrumb from '../../components/Common/Breadcrumb';
import ModalView from '../../components/Common/Modal';
import eventColumns from './components/SportsMatchDetailsListCol';

const SportsMatchDetail = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);
	const [showModal, setShowModal] = useState(true);
	const {
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
		marketColumns,
		toggleAccordion,
		openAccordion,
	} = useSportsMatchDetail();

	return (
		<div className="page-content">
			{showBreadcrumb && (
				<Breadcrumb
					title="Sports Matches"
					breadcrumbItem="Market Details"
					showBackButton
				/>
			)}
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Event Details" />
							<CardBody>
								<TableContainer
									isLoading={isSportsMatchDetailsLoading}
									columns={eventColumns}
									data={matchOdsDetails?.match ? [matchOdsDetails?.match] : []}
									isPagination={false}
									tableClass="table-bordered align-middle nowrap mt-2 match-details-table"
								/>
							</CardBody>
						</Card>
						{!isEmpty(matchOdsDetails?.rows) && (
							<Card>
								<CrudSection buttonList={[]} title="Market Details" />
								<CardBody>
									<AccordionMatchDetails
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
										marketColumns={marketColumns}
										toggleAccordion={toggleAccordion}
										openAccordion={openAccordion}
									/>
								</CardBody>
							</Card>
						)}
					</Col>
				</Row>
				<ModalView
					openModal={showModal}
					toggleModal={() => setShowModal(!showModal)}
					headerTitle="Arriving shortly!!"
					hideFooter
					className="modal-dialog"
				>
					{' '}
					Stay tuned for an intuitive and powerful odd manipulation
					functionality!
				</ModalView>
			</Container>
		</div>
	);
};

export default SportsMatchDetail;
