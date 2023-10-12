/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
import { projectName } from '../../constants/config';
import FormModal from '../../components/Common/FormModal';
import useCreateCurrency from './hooks/useCreateCurrency';

const columns = [
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
];

const CurrencyList = ({ t }) => {
	document.title = `Currencies | ${projectName}`;

	const {
		currentPage,
		setCurrentPage,
		totalCurrenciesCount,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
	} = useCurrencyListing();

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		handleAddClick,
		isCreateCurrencyLoading,
	} = useCreateCurrency();

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Site Configurations')}
					breadcrumbItem={t('Currencies')}
				/>
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
					isAddOptions
					addOptionLabel="Create"
					handleAddClick={handleAddClick}
				/>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateCurrencyLoading}
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
