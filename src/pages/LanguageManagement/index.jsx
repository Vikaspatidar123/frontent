/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useLanguageManagementListing from './hooks/useLanguageManagementListing';
import { Action, English, Keys } from './LanguageManagementCol';

const LanguageManagementList = ({ t }) => {
	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalLanguageManagementCount,
		isLanguageManagementLoading,
		formattedLanguageManagement,
		itemsPerPage,
	} = useLanguageManagementListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Keys',
				accessor: 'keys',
				filterable: true,
				Cell: (cellProps) => <Keys {...cellProps} />,
			},
			{
				Header: 'Action',
				// accessor: 'username',
				filterable: true,
				Cell: (cellProps) => <Action {...cellProps} />,
			},
			{
				Header: 'English',
				accessor: 'english',
				filterable: true,
				Cell: (cellProps) => <English {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('LanguageManagement')}
					breadcrumbItem={t('LanguageManagement')}
				/>
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search LanguageManagement"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
				<TableContainer
					isLoading={isLanguageManagementLoading}
					columns={columns}
					data={formattedLanguageManagement}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalLanguageManagementCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

LanguageManagementList.propTypes = {
	t: PropTypes.func,
};

LanguageManagementList.defaultProps = {
	t: (string) => string,
};

export default LanguageManagementList;
