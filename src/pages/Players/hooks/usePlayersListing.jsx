/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersStart, resetPlayersData } from '../../../store/actions';
import {
	Action,
	Email,
	// IsInternal,
	KycStatus,
	PhoneNumber,
	PlayerId,
	Status,
	UserName,
} from '../PlayersListCol';
import { getRandomColor } from '../../../helpers/common';

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
				Header: '#',
				disableFilters: true,
				filterable: true,
				disableSortBy: true,
				accessor: (prop) => {
					const { fullName, randomColor } = prop;
					return (
						<div className="avatar-xs">
							<span
								className={`avatar-title rounded-circle bg-${randomColor}-subtle text-${randomColor}`}
							>
								{fullName.charAt(0).toUpperCase()}
							</span>
						</div>
					);
				},
			},
			{
				Header: 'Player Id',
				accessor: 'id',
				filterable: true,
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
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Phone Number',
				accessor: 'phone',
				filterable: true,
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
				Cell: ({ cell }) => <KycStatus value={cell.value} />,
			},
			// {
			// 	Header: 'Is Internal',
			// 	accessor: 'isInternal',
			// 	Cell: ({ cell }) => <IsInternal value={cell.value} />,
			// },
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
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting players list redux state
	useEffect(() => () => dispatch(resetPlayersData()), []);

	const formattedPlayers = useMemo(() => {
		const formattedValues = [];
		if (players) {
			return players?.users?.map((player) => {
				const randomColor = getRandomColor();
				return {
					...player,
					fullName: `${player.firstName} ${player.lastName}`,
					status: player.isActive ? 'Active' : 'In-Active',
					isInternal: player.isInternalUser ? 'YES' : 'NO',
					kycStatus: player?.kycStatus === 'true' ? 'Completed' : 'Pending',
					randomColor,
				};
			});
		}
		return formattedValues;
	}, [players]);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	return {
		currentPage,
		setCurrentPage,
		totalPlayerPages: players?.totalPages,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default usePlayersListing;
