/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uniqBy } from 'lodash';
import { fetchPlayersStart, resetPlayersData } from '../../../store/actions';
import {
	Action,
	CountryName,
	Email,
	// IsInternal,
	KycStatus,
	// PhoneNumber,
	PlayerId,
	// RegistrationDate,
	Status,
	Tags,
	// Tags,
	UserName,
} from '../PlayersListCol';
import { getRandomColor } from '../../../helpers/common';
import { CustomSwitchButton } from '../../../helpers/customForms';
import { modules } from '../../../constants/permissions';
// import { getDateTime } from '../../../utils/dateFormatter';

const usePlayersListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);
	const [showManageMoney, setShowManageMoney] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);
	const selectedPlayers = selectedUsers?.map((user) => parseInt(user.id, 10));

	const onSuccess = () => {
		setSelectedUsers([]);
		setIsOpen(false);
	};

	// eslint-disable-next-line no-shadow
	const CheckboxInput = ({ cell, selectedUsers, toggleSelectUser }) => (
		<div className="d-flex justify-content-center">
			<CustomSwitchButton
				type="checkbox"
				containerClass="form-switch-md"
				className="form-check-input"
				checked={selectedUsers?.find(
					({ id }) => id === cell?.row?.original?.id.toString()
				)}
				switchSizeClass="form-switch-sm"
				onClick={() => toggleSelectUser(cell?.row?.original?.id)}
			/>
		</div>
	);

	const columnsArray = ({
		// eslint-disable-next-line no-shadow
		selectedUsers,
		toggleSelectUser,
		// eslint-disable-next-line no-shadow
		setSelectedUsers,
	}) => [
		{
			Header: () => (
				<div className="d-flex align-items-center">
					<p className="mx-3 mb-0">All</p>
					<CustomSwitchButton
						type="checkbox"
						name="selectAll"
						containerClass="form-switch-md"
						className="form-check-input"
						checked={
							players?.users?.length > 0 &&
							players?.users?.every((v) =>
								selectedUsers?.find(({ id }) => id === v?.id?.toString())
							)
						}
						switchSizeClass="form-switch-sm"
						onClick={(e) => {
							const newData = [];
							if (!e.target.checked) {
								players?.users?.forEach((v) => newData.push({ id: v.id }));
								setSelectedUsers((prev) => uniqBy([...prev, ...newData], 'id'));
							} else {
								setSelectedUsers((prev) => {
									const filteredUsers = prev.filter(
										({ id }) =>
											!players?.users.find((item) => item.id.toString() === id)
									);
									return filteredUsers;
								});
							}
						}}
					/>
				</div>
			),
			accessor: 'code',
			disableSortBy: true,
			Cell: ({ cell }) => (
				<CheckboxInput
					selectedUsers={selectedUsers}
					toggleSelectUser={toggleSelectUser}
					cell={cell}
				/>
			),
		},
		{
			Header: 'Player Id',
			accessor: 'id',
			notHidable: true,
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
			Header: 'Country',
			accessor: 'country',
			filterable: true,
			Cell: ({ cell }) => <CountryName value={cell?.value?.name} />,
		},
		{
			Header: 'Segment',
			accessor: 'userTags',
			filterable: true,
			Cell: ({ cell }) => <Tags value={cell?.value} />,
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
		{
			Header: 'Action',
			accessor: 'action',
			disableSortBy: true,
			Cell: ({ cell }) => <Action cell={cell} />,
		},
	];

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
					status: player.isActive ? 'Active' : 'Inactive',
					isInternal: player.isInternalUser ? 'YES' : 'NO',
					// kycStatus: player?.kycStatus ? 'Approved' : 'Pending',
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

	const handleEdit = () => {
		setIsOpen((prev) => !prev);
	};
	const buttonList = [
		// {
		// 	label: 'Attach Tag',
		// 	link: '/users-bulk-update',
		// 	module: modules.player,
		// 	operation: 'U',
		// },
		{
			label: 'Edit',
			link: '',
			handleClick: handleEdit,
			module: modules.player,
			operation: 'U',
			disabled: !selectedPlayers?.length,
		},
	];

	const toggleSelectUser = (id) => {
		const found = selectedUsers?.find((user) => user.id === id);
		if (found) {
			const updatedUsers = selectedUsers?.filter(
				// eslint-disable-next-line no-shadow
				(user) => user.id !== id.toString()
			);
			setSelectedUsers(updatedUsers);
		} else {
			setSelectedUsers((prev) => [...prev, { id }]);
		}
	};

	const columns = useMemo(
		() =>
			columnsArray({
				selectedUsers,
				toggleSelectUser,
				setSelectedUsers,
			}),
		[selectedUsers, formattedPlayers]
	);

	return {
		currentPage,
		setCurrentPage,
		totalPlayerPages: players?.totalPages,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		showManageMoney,
		setShowManageMoney,
		buttonList,
		isOpen,
		setIsOpen,
		selectedPlayers,
		onSuccess,
	};
};

export default usePlayersListing;
