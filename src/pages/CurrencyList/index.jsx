/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import {
	Actions,
	Code,
	ExchangeRate,
	Id,
	LoyaltyPoints,
	Name,
	Primary,
	Type,
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
				accessor: 'currencyId',
				// filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				// filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'Code',
				accessor: 'code',
				// filterable: true,
				Cell: (cellProps) => <Code {...cellProps} />,
			},
			{
				Header: 'Exchange Rate',
				accessor: 'exchangeRate',
				// filterable: true,
				Cell: (cellProps) => <ExchangeRate {...cellProps} />,
			},
			{
				Header: 'Loyalty Points',
				accessor: 'loyaltyPoint',
				// filterable: true,
				Cell: (cellProps) => <LoyaltyPoints {...cellProps} />,
			},
			{
				Header: 'Type',
				accessor: 'type',
				// filterable: true,
				Cell: (cellProps) => <Type {...cellProps} />,
			},
			{
				Header: 'Primary',
				accessor: 'primary',
				// filterable: true,
				Cell: (cellProps) => <Primary {...cellProps} />,
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
				<TableContainer
					isLoading={isCurrenciesLoading}
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
