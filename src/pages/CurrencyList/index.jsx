/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Container, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import {
	Actions,
	CountryCode,
	CountryName,
	Id,
	Language,
	Status,
} from './CurrencyListCol';
import useCurrencyListing from './hooks/useCurrencyListing';

const CurrencyList = ({ t }) => {
	const {
		currentPage,
		setCurrentPage,
		totalCurrenciesCount,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
	} = useCurrencyListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'countryId',
				// filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Country Code',
				accessor: 'countryCode',
				// filterable: true,
				Cell: (cellProps) => <CountryCode {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'countryName',
				// filterable: true,
				Cell: (cellProps) => <CountryName {...cellProps} />,
			},
			{
				Header: 'Language',
				accessor: 'language',
				// filterable: true,
				Cell: (cellProps) => <Language {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				// filterable: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Actions',
				// accessor: "actions",
				// filterable: true,
				Cell: (cellProps) => <Actions {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Currencies')} breadcrumbItem={t('Currencies')} />
				{isCurrenciesLoading ? (
					<Spinner
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<TableContainer
						columns={columns}
						data={formattedCurrencies}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={totalCurrenciesCount}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
					/>
				)}
			</Container>
		</div>
	);
};

CurrencyList.propTypes = {
	t: PropTypes.func,
};

CurrencyList.defaultProps = {
	t: (string) => string,
};

export default CurrencyList;
