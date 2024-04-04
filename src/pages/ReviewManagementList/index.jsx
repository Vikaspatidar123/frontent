import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useReviewManagementListing from './hooks/useReviewManagementListing';
import { projectName } from '../../constants/config';
import useCreateReview from './hooks/useCreateReview';
import FormModal from '../../components/Common/FormModal';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';

const ReviewManagementList = () => {
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
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateReviewLoading,
		isUpdateReviewLoading,
		buttonList,
		handleEditClick,
		showModal,
		setShowModal,
		isEdit,
	} = useCreateReview();

	const {
		currentPage,
		setCurrentPage,
		totalReviewManagementCount,
		isReviewManagementLoading,
		formattedReviewManagement,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useReviewManagementListing({
		formValues: filterValidation.values,
		handleEditClick,
	});

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Review Management" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Reviews" />
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
									isLoading={isReviewManagementLoading}
									columns={columns}
									data={formattedReviewManagement}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalReviewManagementCount}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					showConfirmationModal={showModal}
					setShowConfirmationModal={setShowModal}
					isEditOpen={isEdit.open}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateReviewLoading || isUpdateReviewLoading}
				/>
				<ConfirmationModal
					openModal={showModal}
					setOpenModal={setShowModal}
					validation={validation}
					pageType={formPageTitle.reviewManagement}
				/>
			</Container>
		</div>
	);
};

ReviewManagementList.propTypes = {
	// t: PropTypes.func,
};

ReviewManagementList.defaultProps = {
	t: (string) => string,
};

export default ReviewManagementList;
