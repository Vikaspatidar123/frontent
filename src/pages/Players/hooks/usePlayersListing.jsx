/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);

	const columns = useMemo(
		() => [
			{
				Header: 'Player Id',
				accessor: 'userId',
				filterable: true,
				disableSortBy: false,
				Cell: ({ cell }) => <PlayerId value={cell.value} />,
			},
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <UserName cell={cell} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				disableSortBy: false,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Phone Number',
				accessor: 'phone',
				filterable: true,
				disableSortBy: false,
				Cell: ({ cell }) => <PhoneNumber value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Kyc Status',
				accessor: 'kycStatus',
				disableSortBy: false,
				Cell: ({ cell }) => <KycStatus value={cell.value} />,
			},
			{
				Header: 'Is Internal',
				accessor: 'isInternal',
				disableSortBy: false,
				Cell: ({ cell }) => <IsInternal value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: '',
				disableSortBy: true,
				Cell: ({ cell }) => <Action cell={cell} />,
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
