import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsCountriesListing from './hooks/useSportsCountriesList';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import Modal from '../../components/Common/Modal';
import IconUploader from '../IconUploader';

const SportsCountriesListing = () => {
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
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportsCountriesCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		onChangeRowsPerPage,
		showUploadModal,
		setShowUploadModal,
		countryId,
		isUploadImageLoading,
	} = useSportsCountriesListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sports Book" breadcrumbItem="Countries" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Countries" />
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
									data={formattedSportsCountries}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsCountriesCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsCountriesLoading}
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
					<IconUploader
						countryId={countryId}
						code="COUNTRY"
						isUploading={isUploadImageLoading}
					/>
				</Modal>
			</Container>
		</div>
	);
};

export default SportsCountriesListing;
