/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Input, Row, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { fetchCountriesStart } from '../../store/actions';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { Actions, CountryName, Icon, Id, Status } from './CountriesListCol';

const itemsPerPage = 10;

const CountriesList = ({ t }) => {
	// meta title
	document.title = 'Login | Skote - Vite React Admin & Dashboard Template';
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { countries, loading } = useSelector((state) => state.Countries);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'countryId',
				// filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'countryName',
				// filterable: true,
				Cell: (cellProps) => <CountryName {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				// filterable: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Icon',
				accessor: 'icon',
				// filterable: true,
				Cell: (cellProps) => <Icon {...cellProps} />,
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

	useEffect(() => {
		dispatch(
			fetchCountriesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: name,
			})
		);
	}, [currentPage, name]);

	const formattedCountries = useMemo(() => {
		const formattedValues = [];
		if (countries) {
			countries.rows.map((country) =>
				formattedValues.push({
					...country,
					countryName: country.countryName?.[0]?.name,
					status: country.isActive ? 'Active' : 'Not Active',
				})
			);
		}
		return formattedValues;
	}, [countries]);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Countries')} breadcrumbItem={t('Countries')} />
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
				{loading ? (
					<Spinner
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<TableContainer
						columns={columns}
						data={formattedCountries}
						isPagination
						customPageSize={10}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={countries?.count}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
					/>
				)}
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
