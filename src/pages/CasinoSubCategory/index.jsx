import React from 'react';

import { Card, CardBody, Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';

import { projectName } from '../../constants/config';

import Breadcrumb from '../../components/Common/Breadcrumb';

import CrudSection from '../../components/Common/CrudSection';
import useCreateSubCategory from './hooks/useCreateSubCategory';
import FormModal from '../../components/Common/FormModal';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';
import useSubCategoryListing from './hooks/useSubCategoryListing';

const GetCasinoSubCategoryDetail = () => {
	// meta title
	document.title = projectName;

	const {
		isOpen,
		formFields,
		header,
		validation,
		isCreateSubCategoryLoading,
		buttonList,
		isEditSubCategoryLoading,
		showModal,
		setShowModal,
		toggleFormModal,
		onClickEdit,
	} = useCreateSubCategory();

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
		columns,
		formattedgetCasinoSubCategoryDetails,
		itemsPerPage,
		casinoSubCategoryDetails,
		setPage,
		iscasinoSubCategoryDetailsLoading,
		page,
		onChangeRowsPerPage,
	} = useSubCategoryListing(filterValidation, isFilterChanged, onClickEdit);

	return (
		<div className="page-content">
			<div className="container-fluid">
				{showBreadcrumb && (
					<Breadcrumb
						Breadcrumbs
						title="Casino Management "
						breadcrumbItem="Casino Sub Categories"
					/>
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title="Casino Sub Categories"
							/>
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
									data={formattedgetCasinoSubCategoryDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={casinoSubCategoryDetails?.totalPages}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!iscasinoSubCategoryDetailsLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
							<FormModal
								isOpen={isOpen}
								toggle={toggleFormModal}
								header={header}
								validation={validation}
								formFields={formFields}
								submitLabel="Submit"
								customColClasses="col-md-12"
								isSubmitLoading={
									isCreateSubCategoryLoading || isEditSubCategoryLoading
								}
							/>
							<ConfirmationModal
								openModal={showModal}
								setOpenModal={setShowModal}
								validation={validation}
								pageType={formPageTitle.subCategories}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

GetCasinoSubCategoryDetail.propTypes = {
	// t: PropTypes.func,
};

GetCasinoSubCategoryDetail.defaultProps = {
	t: (string) => string,
};

export default GetCasinoSubCategoryDetail;
