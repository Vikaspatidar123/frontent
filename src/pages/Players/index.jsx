/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import {
	Action,
	Email,
	IsInternal,
	KycStatus,
	PhoneNumber,
	PlayerId,
	Status,
	UserName,
} from './PlayersListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import usePlayersListing from './hooks/usePlayersListing';
import { projectName } from '../../constants/config';

const PlayersList = ({ t }) => {
	document.title = projectName;

	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalPlayersCount,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
	} = usePlayersListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Player Id',
				accessor: 'userId',
				filterable: true,
				Cell: (cellProps) => <PlayerId {...cellProps} />,
			},
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: (cellProps) => <UserName {...cellProps} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => <Email {...cellProps} />,
			},
			{
				Header: 'Phone Number',
				accessor: 'phone',
				filterable: true,
				Cell: (cellProps) => <PhoneNumber {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				filterable: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Kyc Status',
				accessor: 'kycStatus',
				Cell: (cellProps) => <KycStatus {...cellProps} />,
			},
			{
				Header: 'Is Internal',
				accessor: 'isInternal',
				Cell: (cellProps) => <IsInternal {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: '',
				Cell: (cellProps) => <Action {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Player')} breadcrumbItem={t('Players')} />
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Players"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
				<TableContainer
					isLoading={isPlayersLoading}
					columns={columns}
					data={formattedPlayers}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalPlayersCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

PlayersList.propTypes = {
	t: PropTypes.func,
};

PlayersList.defaultProps = {
	t: (string) => string,
};

export default PlayersList;
