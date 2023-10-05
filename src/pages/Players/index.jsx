/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchPlayersStart } from '../../store/players/actions';
import Breadcrumb from '../../components/Common/Breadcrumb';

const itemsPerPage = 10;

const PlayersList = ({ t }) => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { players, loading } = useSelector((state) => state.Players);

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

	useEffect(() => {
		dispatch(
			fetchPlayersStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText]);

	const formattedPlayers = useMemo(() => {
		const formattedValues = [];
		if (players) {
			players.rows.map((player) =>
				formattedValues.push({
					...player,
					fullName: `${player.firstName} ${player.lastName}`,
					status: player.isActive ? 'Active' : 'In-Active',
					isInternal: player.isInternalUser ? 'YES' : 'NO',
				})
			);
		}
		return formattedValues;
	}, [players]);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Players')} breadcrumbItem={t('Players')} />
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
				{loading ? (
					<Spinner
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<TableContainer
						columns={columns}
						data={formattedPlayers}
						isPagination
						customPageSize={10}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={players?.count}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
					/>
				)}
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
