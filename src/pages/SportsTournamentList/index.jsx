/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsTounamentListing from './hooks/useSportsTournamentListing';
import { projectName } from '../../constants/config';
import {
	TournamentId,
	TournamentName,
	CountryName,
	SportName,
} from './sportsTournamentListCol';
import ActionButtons from './ActionButtons';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';

const columns = [
	{
		Header: 'ID',
		accessor: 'tournamentId',
		filterable: true,
		Cell: ({ cell }) => <TournamentId cell={cell} />,
	},
	{
		Header: 'NAME',
		accessor: 'tournamentName',
		filterable: true,
		Cell: ({ cell }) => <TournamentName cell={cell} />,
	},
	{
		Header: ' COUNTRY',
		accessor: 'countryName',
		disableFilters: true,
		Cell: ({ cell }) => <CountryName cell={cell} />,
	},
	{
		Header: 'SPORT',
		accessor: 'sportName',
		disableFilters: true,
		Cell: ({ cell }) => <SportName cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const SportsTournamentList = () => {
	// meta title
	document.title = projectName;

	const {
		formattedSportsTournamenList,
		isSportsTournamentListLoading,
		totalSportsTounamentListCount,
		page,
		setPage,
		itemsPerPage,
	} = useSportsTounamentListing();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb title="Sports Book" breadcrumbItem="Tournaments" />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Tournaments Listing" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedSportsTournamenList}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsTounamentListCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsTournamentListLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SportsTournamentList;
