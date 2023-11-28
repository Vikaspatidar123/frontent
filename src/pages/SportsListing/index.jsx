import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsListing from './hooks/useSportsListing';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import Modal from '../../components/Common/Modal';
import ImageUploader from '../ImageUploader';

const SportsListing = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const {
		formattedSportsList,
		isSportsListLoading,
		totalSportsListCount,
		showUploadModal,
		setShowUploadModal,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		sportId,
	} = useSportsListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sports Book" breadcrumbItem="Sports" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Sports" />
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
									columns={columns}
									data={formattedSportsList}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsListCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsListLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Modal
					openModal={showUploadModal}
					toggleModal={() => setShowUploadModal(!showUploadModal)}
					headerTitle="Upload an Image (30x30 pixels)"
					secondBtnName="Upload"
					className="modal-dialog modal-lg"
					hideFooter
				>
					<ImageUploader sportId={sportId} code="SPORT" />
				</Modal>
			</Container>
		</div>
	);
};

export default SportsListing;
