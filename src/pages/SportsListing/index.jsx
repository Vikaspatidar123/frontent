import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import useSportsListing from './hooks/useSportsListing';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useFilters from './hooks/useFilters';
import Modal from '../../components/Common/Modal';
import IconUploader from '../IconUploader';

const SportsListing = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		formattedSportsList,
		isSportsListLoading,
		sportsPages,
		showUploadModal,
		setShowUploadModal,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		sportId,
		isUploadImageLoading,
	} = useSportsListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sportsbook" breadcrumbItem="Sports" />
				)}
				<TableContainer
					columns={columns}
					data={formattedSportsList}
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={sportsPages}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={!isSportsListLoading}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					filterValidation={filterValidation}
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
					<IconUploader sportId={sportId} isUploading={isUploadImageLoading} />
				</Modal>
			</Container>
		</div>
	);
};

export default SportsListing;
