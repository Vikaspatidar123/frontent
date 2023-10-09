/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
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

const ReviewManagementList = ({ t }) => {
	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalReviewManagementCount,
		isReviewManagementLoading,
		formattedReviewManagement,
		itemsPerPage,
	} = useReviewManagementListing();

	const columns = useMemo(
		() => [
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
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Review Management')}
					breadcrumbItem={t('Review Management')}
				/>
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
