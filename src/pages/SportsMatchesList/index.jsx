/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import {
	Id,
	IsFeatured,
	Live,
	Sport,
	StartDate,
	Status,
	Title,
	Tournament,
} from './SportsMatchesListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsMatchesListing from './hooks/useSportsMatchesListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';

const SportsMatchesList = ({ t }) => {
	document.title = projectName;

	const {
		currentPage,
		setCurrentPage,
		totalSportsMatchesCount,
		isSportsMatchesLoading,
		formattedSportsMatches,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useSportsMatchesListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'matchId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Title',
				accessor: 'title',
				filterable: true,
				Cell: (cellProps) => <Title {...cellProps} />,
			},
			{
				Header: 'Tournament',
				accessor: 'tournamentName',
				filterable: true,
				Cell: (cellProps) => <Tournament {...cellProps} />,
			},
			{
				Header: 'Sport',
				accessor: 'sportName',
				filterable: true,
				Cell: (cellProps) => <Sport {...cellProps} />,
			},
			{
				Header: 'Is Featured',
				accessor: 'isFeatured',
				filterable: true,
				Cell: (cellProps) => <IsFeatured {...cellProps} />,
			},
			{
				Header: 'Start Date',
				accessor: 'startDate',
				Cell: (cellProps) => <StartDate {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Live',
				accessor: 'isLive',
				Cell: (cellProps) => <Live {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Sports Book')} breadcrumbItem={t('Matches')} />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Matches Listing" />
							<CardBody>
								<TableContainer
									isLoading={isSportsMatchesLoading}
									columns={columns}
									data={formattedSportsMatches}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsMatchesCount}
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

SportsMatchesList.propTypes = {
	t: PropTypes.func,
};

SportsMatchesList.defaultProps = {
	t: (string) => string,
};

export default SportsMatchesList;
