/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsCountriesListing from './hooks/useSportsCountriesList';

import { CountryId, CountryName, Icon, Status } from './sportsCountriesListCol';
import ActionButtons from './ActionButtons';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';

const SportsCountriesListing = () => {
	// meta title
	document.title = projectName;

	const {
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportsCountriesCount,
		page,
		setPage,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
	} = useSportsCountriesListing();

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'countryId',
				filterable: true,
				Cell: ({ cell }) => <CountryId cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'countryName',
				filterable: true,
				Cell: ({ cell }) => <CountryName cell={cell} />,
			},
			{
				Header: 'ICON',
				accessor: 'icons',
				disableFilters: true,
				Cell: ({ cell }) => <Icon cell={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: ({ cell }) => <Status cell={cell} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons cell={cell} handleStatus={handleStatus} />
				),
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb title="Sports Book" breadcrumbItem="Countries" />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Countries Listing" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedSportsCountries}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsCountriesCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsCountriesLoading}
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

export default SportsCountriesListing;
