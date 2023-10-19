/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsListing from './hooks/useSportsListing';
import { projectName } from '../../constants/config';

import { SportId, SportName, Status, Icon } from './sportsListCol';
import ActionButtons from './ActionButtons';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';

const columns = [
	{
		Header: 'ID',
		accessor: 'sportId',
		filterable: true,
		Cell: ({ cell }) => <SportId cell={cell} />,
	},
	{
		Header: 'NAME',
		accessor: 'sportName',
		filterable: true,
		Cell: ({ cell }) => <SportName cell={cell} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		disableFilters: true,
		Cell: ({ cell }) => <Status cell={cell} />,
	},
	{
		Header: 'ICON',
		accessor: 'icons',
		disableFilters: true,
		Cell: ({ cell }) => <Icon cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const SportsListing = () => {
	// meta title
	document.title = projectName;

	const {
		formattedSportsList,
		isSportsListLoading,
		totalSportsListCount,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useSportsListing();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb title="Sports Book" breadcrumbItem="Sports" />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Sports Listing" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedSportsList}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsListCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsListLoading}
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

export default SportsListing;
