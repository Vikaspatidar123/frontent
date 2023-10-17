/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import {
	Code,
	ExchangeRate,
	Id,
	LoyaltyPoints,
	Name,
	Primary,
	Type,
} from './CurrencyListCol';
import ActionButtons from './ActionButtons';
import useCurrencyListing from './hooks/useCurrencyListing';
import { projectName } from '../../constants/config';
import FormModal from '../../components/Common/FormModal';
import useCreateCurrency from './hooks/useCreateCurrency';
import CrudSection from '../../components/Common/CrudSection';

const columns = [
	{
		Header: 'ID',
		accessor: 'currencyId',
		// filterable: true,
		Cell: (cellProps) => <Id {...cellProps} />,
	},
	{
		Header: 'NAME',
		accessor: 'name',
		// filterable: true,
		Cell: (cellProps) => <Name {...cellProps} />,
	},
	{
		Header: 'CODE',
		accessor: 'code',
		// filterable: true,
		Cell: (cellProps) => <Code {...cellProps} />,
	},
	{
		Header: 'EXCHANGE RATES',
		accessor: 'exchangeRate',
		// filterable: true,
		Cell: (cellProps) => <ExchangeRate {...cellProps} />,
	},
	{
		Header: 'LOYALTY POINTS',
		accessor: 'loyaltyPoint',
		// filterable: true,
		Cell: (cellProps) => <LoyaltyPoints {...cellProps} />,
	},
	{
		Header: 'TYPE',
		accessor: 'type',
		// filterable: true,
		Cell: (cellProps) => <Type {...cellProps} />,
	},
	{
		Header: 'PRIMARY',
		accessor: 'primary',
		// filterable: true,
		Cell: (cellProps) => <Primary {...cellProps} />,
	},
	{
		Header: 'ACTION',
		accessor: 'actions',
		disableFilters: true,
		Cell: (cellProps) => <ActionButtons {...cellProps} />,
	},
];

const CurrencyList = ({ t }) => {
	document.title = projectName;

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
		isCreateCurrencyLoading,
		buttonList,
	} = useCreateCurrency();

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Site Configurations')}
					breadcrumbItem={t('Currencies')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Currency Listing" />
							<CardBody>
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
									// isAddOptions
									// addOptionLabel="Create"
									// handleAddClick={handleAddClick}
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
