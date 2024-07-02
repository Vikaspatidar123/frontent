import React from 'react';
import { Card, CardBody, Col, Container, Row, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import useTournaments from './hooks/useTournaments';
import CrudSection from '../../components/Common/CrudSection';
import TableContainer from '../../components/Common/Table/index';
import Filters from '../../components/Common/Filters';
import Modal from '../../components/Common/Modal/index';
import Breadcrumb from '../../components/Common/Breadcrumb';

const Tournament = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		itemsPerPage,
		currentPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalPages,
		tournamentsInfo,
		columns,
		buttonList,
		isTournamentsInfoLoading,
		showSettleModal,
		closeToggleSettleModal,
		acceptSettleToggle,
		showStatusModal,
		closeToggleStatusModal,
		acceptStatusToggle,
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useTournaments();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Tournaments" breadcrumbItem="Tournaments" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Tournaments" />
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
								/>
								<TableContainer
									isLoading={isTournamentsInfoLoading}
									columns={columns || []}
									data={tournamentsInfo?.casinoTournaments || []}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPages}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Modal
					openModal={showSettleModal.isOpen}
					className="modal-dialog"
					hideHeader
					hideFooter
				>
					<p className="fs-4 my-4">
						<b> Do You Really Want to Settle this Tournament?</b>
					</p>
					<div className="text-end">
						<Button
							className=" btn btn-primary me-3"
							type="submit"
							onClick={closeToggleSettleModal}
						>
							No
						</Button>
						<Button
							className=" btn btn-primary"
							color="primary"
							type="submit"
							onClick={acceptSettleToggle}
						>
							Yes
						</Button>
					</div>
				</Modal>
				<Modal
					openModal={showStatusModal.isOpen}
					className="modal-dialog"
					hideHeader
					hideFooter
				>
					<p className="fs-4 my-4">
						<b>
							Do You Really Want to{' '}
							{showStatusModal.type === 'cancel'
								? 'Cancel Tournament'
								: 'Update Status'}
							?
						</b>
					</p>
					<div className="text-end">
						<Button
							className=" btn btn-primary me-3"
							type="submit"
							onClick={closeToggleStatusModal}
						>
							No
						</Button>
						<Button
							className=" btn btn-primary"
							color="primary"
							type="submit"
							onClick={acceptStatusToggle}
						>
							Yes
						</Button>
					</div>
				</Modal>
			</Container>
		</div>
	);
};

Tournament.propTypes = {};

export default Tournament;
