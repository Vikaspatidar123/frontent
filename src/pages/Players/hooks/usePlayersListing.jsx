/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPlayersStart } from '../../../store/actions';
import {
	Action,
	Email,
	IsInternal,
	KycStatus,
	PhoneNumber,
	PlayerId,
	Status,
	UserName,
} from '../PlayersListCol';

const usePlayersListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);

	const onClickPlayer = (playerId) => {
		navigate(`/player-details/${playerId}`);
	};

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
				Cell: ({ cell }) => (
					<UserName onClickPlayer={onClickPlayer} cell={cell} />
				),
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
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

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

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		currentPage,
		setCurrentPage,
		totalPlayersCount: players?.count,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default usePlayersListing;
