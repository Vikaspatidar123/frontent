/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersStart, resetPlayersData } from '../../../store/actions';
import {
	Action,
	CountryName,
	Email,
	// IsInternal,
	KycStatus,
	// PhoneNumber,
	// PlayerId,
	// RegistrationDate,
	Status,
	Tags,
	// Tags,
	UserName,
} from '../PlayersListCol';
import { getRandomColor } from '../../../helpers/common';
import { CustomSwitchButton } from '../../../helpers/customForms';
import { modules } from '../../../constants/permissions';
import { PER_PAGE } from '../../../constants/config';
// import { getDateTime } from '../../../utils/dateFormatter';

const usePlayersListing = (
	filterValues = {},
	userIds = {},
	toggleUserId = () => {}
) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(PER_PAGE);
	const [currentPage, setCurrentPage] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);
	const [showManageMoney, setShowManageMoney] = useState('');
	const selectedPlayers = Object.keys(userIds || {})?.map((key) => key);

	const onSuccess = () => {
		toggleUserId('', true); // clear the selected users
		setIsOpen(false);
		dispatch(
			fetchPlayersStart({
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	};

	const CheckboxInput = ({ cell }) => (
		<div className=" d-flex justify-content-center">
			<CustomSwitchButton
				type="checkbox"
				containerClass="false"
				className="form-check-input"
				checked={userIds[cell?.row?.original?.id]}
				switchSizeClass="form-switch-md"
				onClick={() => toggleUserId(cell?.row?.original?.id)}
			/>
		</div>
	);

	const columns = useMemo(
		() => [
			userIds
				? {
						Header: 'SELECT',
						accessor: 'select',
						disableSortBy: true,
						notHidable: true,
						Cell: ({ cell }) => <CheckboxInput cell={cell} />,
				  }
				: {
						Header: '#',
						disableFilters: true,
						filterable: true,
						notHidable: true,
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
			// {
			// 	Header: 'Player Id',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	filterable: true,
			// 	Cell: ({ cell }) => <PlayerId value={cell.value} />,
			// },
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
			// {
			// 	Header: 'Phone Number',
			// 	accessor: 'phone',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <PhoneNumber value={cell.value} />,
			// },
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
			// {
			// 	Header: 'Registration Date',
			// 	accessor: 'createdAt',
			// 	Cell: ({ cell }) => (
			// 		<RegistrationDate value={getDateTime(cell?.value)} />
			// 	),
			// },
			// {
			// 	Header: 'Is Internal',
			// 	accessor: 'isInternal',
			// 	Cell: ({ cell }) => <IsInternal value={cell.value} />,
			// },

			{
				Header: 'Action',
				accessor: 'action',
				disableSortBy: true,
				Cell: ({ cell }) => (
					<Action cell={cell} setShowManageMoney={setShowManageMoney} />
				),
			},
		],
		[userIds]
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
		{
			label: 'Edit',
			link: '',
			handleClick: handleEdit,
			module: modules.player,
			operation: 'U',
			disabled: !selectedPlayers?.length,
		},
	];

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
