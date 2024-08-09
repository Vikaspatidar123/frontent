/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import {
	Date as DateComponent,
	// Id,
	Name,
	NonSettled,
	StatusBadge,
} from '../TournamentListCol';
import { modules } from '../../../constants/permissions';
import useFilters from './useFilters';
import {
	getTournamentDetailsStart,
	updateTournamentStart,
	updateTournamentStatusStart,
} from '../../../store/tournaments/actions';
import { ThumbnailUrl } from '../../CasinoGames/CasinoGamesListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { iconClass } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';

const useTournaments = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isGranted } = usePermission();

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [showSettleModal, setShowSettleModal] = useState({
		isOpen: false,
		selectedTournament: '',
		type: '',
	});
	const [showStatusModal, setShowStatusModal] = useState({
		isOpen: false,
		selectedTournament: '',
	});

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters(itemsPerPage);

	const { tournamentsInfo, isTournamentsInfoLoading, updateTournament } =
		useSelector((state) => state.Tournament);

	const fetchData = () => {
		const data = {
			perPage: itemsPerPage,
			page: currentPage,
			...filterValidation?.values,
		};

		if (filterValidation?.values?.endDate) {
			data.endDate =
				moment(filterValidation?.values?.endDate)
					.utc()
					.clone()
					.add(1, 'days')
					.format() || '';
		}
		dispatch(getTournamentDetailsStart(data));
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		if (updateTournament) {
			fetchData();
		}
	}, [updateTournament]);

	useEffect(() => {
		if (updateTournament) {
			setShowSettleModal((prev) => ({
				...prev,
				isOpen: false,
			}));
		}
	}, [updateTournament]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const handleEdit = (row) => {
		navigate(`/tournaments/edit/${row?.id}`);
	};

	const handleView = (row) => {
		navigate(`/tournaments/view/${row?.id}`);
	};

	const handleStatus = (row) => {
		dispatch(
			updateTournamentStatusStart({
				tournamentId: row?.id,
			})
		);
	};

	const closeToggleSettleModal = () =>
		setShowSettleModal((prev) => ({
			...prev,
			isOpen: false,
			selectedTournament: '',
		}));

	const closeToggleStatusModal = () =>
		setShowStatusModal((prev) => ({
			...prev,
			isOpen: false,
			selectedTournament: '',
		}));

	const acceptSettleToggle = () => {
		dispatch(
			updateTournamentStart({
				data: {
					tournamentId: showSettleModal?.selectedTournament,
					type: 'settled',
				},
			})
		);
	};

	const acceptStatusToggle = () => {
		dispatch(
			updateTournamentStart({
				data: {
					type: 'cancelled',
					tournamentId: showStatusModal?.selectedTournament.id,
				},
			})
		);
		setShowStatusModal((prev) => ({
			...prev,
			isOpen: false,
			selectedTournament: '',
		}));
	};

	const isDisabled = (row) => {
		const isSettled = row?.status === 'settled';
		const isCancelled = row?.status === 'cancelled';
		const isRegistrationEnded = row?.registrationEndDate
			? new Date(row?.registrationEndDate).getTime() < new Date().getTime()
			: false;

		return isSettled || isCancelled || isRegistrationEnded;
	};

	const isCancelDisable = (row) => {
		const isSettled = row?.status === 'settled';
		const isCancelled = row?.status === 'cancelled';

		return isSettled || isCancelled;
	};

	const handleCancel = (row) =>
		setShowStatusModal((prev) => ({
			...prev,
			isOpen: true,
			selectedTournament: row,
		}));

	const actionsList = [
		{
			actionName: 'View',
			actionHandler: handleView,
			isHidden: !isGranted(modules.tournamentManagement, 'R'),
			icon: iconClass.view,
			iconColor: 'text-success',
		},
		{
			actionName: 'Edit',
			actionHandler: handleEdit,
			isHidden: !isGranted(modules.tournamentManagement, 'U'),
			icon: iconClass.edit,
			iconColor: 'text-info',
			isDisabled,
		},
		{
			actionName: 'Toggle Status',
			actionHandler: handleStatus,
			isHidden: !isGranted(modules.bonus, 'TS'),
			icon: iconClass.toggleStatus,
			iconColor: 'text-success',
			isDisabled,
		},
		{
			actionName: 'Cancel',
			actionHandler: handleCancel,
			isHidden: !isGranted(modules.tournamentManagement, 'U'),
			icon: iconClass.restricted,
			iconColor: 'text-danger',
			isDisabled: isCancelDisable,
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// 	// filterable: true,
			// 	Cell: ({ cell }) => <Id value={cell.value} />,
			// },
			{
				Header: 'NAME',
				accessor: 'name',
				// filterable: true,
				Cell: ({ cell }) => <Name value={cell.value.EN} />,
			},
			// {
			// 	Header: 'TOURNAMENT PERIOD',
			// 	accessor: 'tournamentPeriod',
			// 	// filterable: true,
			// 	Cell: ({ cell }) => <TournamentPeriod value={cell.value} />,
			// },
			{
				Header: 'Thumbnail',
				accessor: 'image',
				// filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			{
				Header: 'START DATE',
				accessor: 'startDate',
				// filterable: true,
				Cell: ({ cell }) => <DateComponent value={cell.value} />,
			},
			{
				Header: 'END DATE',
				accessor: 'endDate',
				// filterable: true,
				Cell: ({ cell }) => <DateComponent value={cell.value} />,
			},
			// {
			// 	Header: 'Image',
			// 	accessor: 'image',
			// 	// filterable: true,
			// 	Cell: ({ cell }) => <Image value={cell.value} />,
			// },
			{
				Header: 'REGISTRATION CLOSE DATE',
				accessor: 'registrationEndDate',
				// filterable: true,
				Cell: ({ cell }) => <DateComponent value={cell.value} />,
			},
			{
				Header: 'SETTLE',
				accessor: 'isSettled',
				// filterable: true,
				Cell: ({ cell }) => (
					<NonSettled cell={cell} setShowSettleModal={setShowSettleModal} />
				),
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				// filterable: true,
				Cell: ({ cell }) => <StatusBadge value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Actions actionsList={actionsList} cell={cell} />,
			},
		],
		[
			tournamentsInfo,
			isGranted(modules.tournamentManagement, 'R'),
			isGranted(modules.tournamentManagement, 'U'),
			isGranted(modules.bonus, 'TS'),
		]
	);

	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.tournamentManagement,
			operation: 'C',
		},
	]);

	return {
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalPages: tournamentsInfo?.totalPages,
		tournamentsInfo,
		columns,
		buttonList,
		isTournamentsInfoLoading,
		showSettleModal,
		setShowSettleModal,
		closeToggleSettleModal,
		acceptSettleToggle,
		showStatusModal,
		setShowStatusModal,
		closeToggleStatusModal,
		acceptStatusToggle,
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	};
};

export default useTournaments;
