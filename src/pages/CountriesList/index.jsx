/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import {
	CountryCode,
	CountryName,
	Id,
	Language,
	Status,
} from './CountriesListCol';
import ActionButtons from './ActionButtons';
import useCountriesListing from './hooks/useCountriesListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';

const CountriesList = ({ t }) => {
	document.title = projectName;

	const {
		name,
		setName,
		currentPage,
		setCurrentPage,
		totalCountriesCount,
		isCountriesLoading,
		formattedCountries,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
	} = useCountriesListing();

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
				Cell: (cellProps) => (
					<ActionButtons {...cellProps} handleStatus={handleStatus} />
				),
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Site Configurations')}
					breadcrumbItem={t('Countries')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Countries Listing" />
							<CardBody>
								<Row>
									<Col xs="12" sm="3">
										<Input
											className="form-control"
											placeholder="Search Countries"
											onChange={({ target }) =>
												setName(target.value.replace(/[^\w\s]/gi, ''))
											}
											value={name}
										/>
									</Col>
								</Row>
								<TableContainer
									isLoading={isCountriesLoading}
									columns={columns}
									data={formattedCountries}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCountriesCount}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

CountriesList.propTypes = {
	t: PropTypes.func,
};

CountriesList.defaultProps = {
	t: (string) => string,
};

export default CountriesList;
