/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import {
	Actions,
	Description,
	Id,
	Rating,
	Status,
	UserName,
} from './ReviewManagementListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useReviewManagementListing from './hooks/useReviewManagementListing';
import { projectName } from '../../constants/config';
import useCreateReview from './hooks/useCreateReview';
import FormModal from '../../components/Common/FormModal';
import CrudSection from '../../components/Common/CrudSection';

const columns = [
	{
		Header: 'Id',
		accessor: 'reviewId',
		filterable: true,
		Cell: (cellProps) => <Id {...cellProps} />,
	},
	{
		Header: 'Username',
		accessor: 'userName',
		filterable: true,
		Cell: (cellProps) => <UserName {...cellProps} />,
	},
	{
		Header: 'Description',
		accessor: 'description',
		filterable: true,
		Cell: (cellProps) => <Description {...cellProps} />,
	},
	{
		Header: 'Rating',
		accessor: 'rating',
		filterable: true,
		Cell: (cellProps) => <Rating {...cellProps} />,
	},
	{
		Header: 'Status',
		accessor: 'status',
		filterable: true,
		Cell: (cellProps) => <Status {...cellProps} />,
	},
	{
		Header: 'Actions',
		filterable: true,
		Cell: (cellProps) => <Actions {...cellProps} />,
	},
];

const ReviewManagementList = ({ t }) => {
	document.title = projectName;

	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalReviewManagementCount,
		isReviewManagementLoading,
		formattedReviewManagement,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useReviewManagementListing();

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateReviewLoading,
		buttonList,
	} = useCreateReview();

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Reports')}
					breadcrumbItem={t('Review Management')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Reviews Listing" />
							<CardBody>
								<Row>
									<Col xs="12" sm="3">
										<Input
											className="form-control"
											placeholder="Search Title, Description"
											onChange={({ target }) =>
												setSearchText(target.value.replace(/[^\w\s]/gi, ''))
											}
											value={searchText}
										/>
									</Col>
								</Row>
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
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateReviewLoading}
				/>
			</Container>
		</div>
	);
};

ReviewManagementList.propTypes = {
	t: PropTypes.func,
};

ReviewManagementList.defaultProps = {
	t: (string) => string,
};

export default ReviewManagementList;
