import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import useSportsCountriesListing from './hooks/useSportsCountriesList';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useFilters from './hooks/useFilters';
import Modal from '../../components/Common/Modal';
import IconUploader from '../IconUploader';

const SportsCountriesListing = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportLocationPages,
		page,
		setPage,
		itemsPerPage,
		columns,
		onChangeRowsPerPage,
		showUploadModal,
		setShowUploadModal,
		locationId,
		isUploadImageLoading,
	} = useSportsCountriesListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sportsbook" breadcrumbItem="Countries" />
				)}
				<TableContainer
					columns={columns}
					data={formattedSportsCountries}
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={totalSportLocationPages}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={!isSportsCountriesLoading}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					filterComponent={filterComponent}
					selectedFiltersComponent={selectedFiltersComponent}
				/>
				<Modal
					openModal={showUploadModal}
					toggleModal={() => setShowUploadModal(!showUploadModal)}
					headerTitle="Upload an Image (30x30 pixels)"
					secondBtnName="Upload"
					className="modal-dialog modal-lg"
					hideFooter
				>
					<IconUploader
						locationId={locationId}
						isUploading={isUploadImageLoading}
					/>
				</Modal>
			</Container>
		</div>
	);
};

export default SportsCountriesListing;
