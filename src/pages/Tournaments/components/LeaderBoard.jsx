/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import ModalView from '../../../components/Common/Modal';
import TableContainer from '../../../components/Common/Table';
import { getTournamentLeaderBoardDetailStart } from '../../../store/tournaments/actions';

const KeyValueCell = ({ value }) => value || 0;

const UserName = ({ cell, setPlayerDetail, setShowModal }) => (
	<Link
		onClick={() => {
			setPlayerDetail(cell?.row?.original);
			setShowModal(true);
		}}
	>
		{cell?.value ?? ''}
	</Link>
);

const LeaderBoard = ({ tournamentDetail }) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [showModal, setShowModal] = useState(false);
	const [playerDetail, setPlayerDetail] = useState({});

	const { leaderBoardInfo } = useSelector((state) => state.Tournament);

	useEffect(() => {
		if (tournamentDetail?.id)
			dispatch(
				getTournamentLeaderBoardDetailStart({
					page: currentPage,
					perPage: itemsPerPage,
					tournamentId: tournamentDetail?.id,
				})
			);
	}, [itemsPerPage, currentPage, tournamentDetail?.id]);

	const formattedLeaderBoardData = useMemo(() => {
		if (leaderBoardInfo?.leaderBoard?.length > 0) {
			return leaderBoardInfo?.leaderBoard?.map((info, index) => ({
				...info,
				name: info?.user?.username,
				leaderBoardId: index + 1,
			}));
		}
		return [];
	}, [leaderBoardInfo]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'POSITION',
				accessor: 'leaderBoardId',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'USERNAME',
				accessor: 'name',
				Cell: ({ cell }) => (
					<UserName
						cell={cell}
						setPlayerDetail={setPlayerDetail}
						setShowModal={setShowModal}
					/>
				),
			},
			{
				Header: 'WIN POINTS',
				accessor: 'winPoints',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueCell value={parseFloat(cell?.value).toFixed(2) || 0} />
				),
			},
			{
				Header: 'POINTS',
				accessor: 'points',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueCell value={parseFloat(cell?.value).toFixed(2) || 0} />
				),
			},
			{
				Header: 'PRIZE',
				accessor: 'winPrize',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value || 0} />,
			},
		],
		[]
	);

	const playerDetailKeys = [
		{ label: 'Position', value: 'leaderBoardId' },
		{ label: 'Username', value: 'name' },
		{ label: 'Points', value: 'points' },
		{ label: 'User Id', value: 'userId' },
		{ label: 'Amount spend', value: 'amountSpent' },
		{ label: 'Amount Used', value: 'usedAmount' },
		{ label: 'Rebuy Limit', value: 'rebuyLimit' },
		{ label: 'Prize', value: 'winPrize' },
		{ label: 'Win Points', value: 'winPoints' },
	];

	return (
		<Row lg={12}>
			<TableContainer
				columns={columns || []}
				data={formattedLeaderBoardData || []}
				isPagination
				customPageSize={itemsPerPage}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={leaderBoardInfo?.totalPages || 1}
				isManualPagination
				onChangePagination={setCurrentPage}
				currentPage={currentPage}
				changeRowsPerPageCallback={onChangeRowsPerPage}
				tableClass="table-striped table-hover "
			/>
			<ModalView
				openModal={showModal}
				toggleModal={() => setShowModal((prev) => !prev)}
				headerTitle="Player Details"
				className="modal-dialog modal-lg"
				hideFooter
			>
				<Row lg={12} className="px-5 py-3">
					{Object.keys(playerDetail)?.map((detail) => {
						const key = playerDetailKeys.find(
							(item) => item.value === detail
						)?.label;
						return (
							<div>
								{key && (
									<Row className="p-2 border-bottom">
										<Col lg={6} className="fw-semibold py-2 px-4 font-size-16">
											{key}
										</Col>
										<Col lg={6} className="p-2 font-size-16">
											{playerDetail?.[detail] || 0}
										</Col>
									</Row>
								)}
							</div>
						);
					})}
				</Row>
			</ModalView>
		</Row>
	);
};

export default LeaderBoard;
