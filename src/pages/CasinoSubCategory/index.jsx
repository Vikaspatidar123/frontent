/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';

import { Card, CardBody, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';

import { projectName } from '../../constants/config';

import Breadcrumb from '../../components/Common/Breadcrumb';
import { getCasinoSubCategoryDetailStart } from '../../store/actions';
import CrudSection from '../../components/Common/CrudSection';
import useCreateSubCategory from './hooks/useCreateSubCategory';
import FormModal from '../../components/Common/FormModal';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const GetCasinoSubCategoryDetail = () => {
	// meta title
	document.title = projectName;
	const dispatch = useDispatch();

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateSubCategoryLoading,
		buttonList,
		active,
		isEditSubCategoryLoading,
		columns,
		page,
		setPage,
		itemsPerPage,
		setItemsPerPage,
	} = useCreateSubCategory();

	const {
		casinoSubCategoryDetails,
		iscasinoSubCategoryDetailsLoading,
		isCreateSubCategorySuccess,
		isEditSubCategorySuccess,
		isDeleteCasinoSubCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const fetchData = () => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValidation.values,
			})
		);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		if (
			isCreateSubCategorySuccess ||
			isEditSubCategorySuccess ||
			isDeleteCasinoSubCategorySuccess
		)
			fetchData();
	}, [
		isCreateSubCategorySuccess,
		isEditSubCategorySuccess,
		isDeleteCasinoSubCategorySuccess,
	]);

	const formattedgetCasinoSubCategoryDetails = useMemo(() => {
		if (casinoSubCategoryDetails) {
			return casinoSubCategoryDetails?.rows.map((category) => ({
				...category,
				nameEN: category?.name?.EN,
				gameCategory: 'default',
				subcategoryImage: category?.imageUrl,
			}));
		}
		return [];
	}, [casinoSubCategoryDetails]);

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, active, isFilterChanged]);

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
									totalPageCount={casinoSubCategoryDetails?.count}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!iscasinoSubCategoryDetailsLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
							<FormModal
								isOpen={isOpen}
								toggle={() => setIsOpen((prev) => !prev)}
								header={header}
								validation={validation}
								formFields={formFields}
								submitLabel="Submit"
								customColClasses="col-md-12"
								isSubmitLoading={
									isCreateSubCategoryLoading || isEditSubCategoryLoading
								}
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
