/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Date, Id, Name, Status, PoolPrize } from '../TournamentListCol';
import { modules } from '../../../constants/permissions';
import useFilters from './useFilters';
import ActionButtons from '../components/ActionButtons';
import {
	getTournamentDetailsStart,
	updateTournamentStart,
	updateTournamentStatusStart,
} from '../../../store/tournaments/actions';

const useTournaments = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const {
		tournamentsInfo,
		isTournamentsInfoLoading,
		updateTournament,
		tournamentStatus,
	} = useSelector((state) => state.Tournament);

	const fetchData = () => {
		const data = {
			limit: itemsPerPage,
			pageNo: currentPage,
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
		if (updateTournament || tournamentStatus) {
			fetchData();
		}
	}, [updateTournament, tournamentStatus]);

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

	const handleEdit = (id) => {
		navigate(`/tournaments/edit/${id}`);
	};

	const handleView = (id) => {
		navigate(`/tournaments/view/${id}`);
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
					id: showSettleModal?.selectedTournament,
					type: 'settled',
				},
			})
		);
	};

	const acceptStatusToggle = () => {
		dispatch(
			updateTournamentStatusStart({
				status:
					showStatusModal?.type === 'cancel'
						? 'cancelled'
						: showStatusModal?.selectedTournament?.isActive
						? 'inactive'
						: 'active',
				tournamentId: showStatusModal?.selectedTournament.id,
			})
		);
		setShowStatusModal((prev) => ({
			...prev,
			isOpen: false,
			selectedTournament: '',
		}));
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				// filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
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
				Header: 'Pool Prize',
				accessor: 'poolPrize',
				// filterable: true,
				Cell: ({ cell }) => (
					<PoolPrize
						value={cell?.row?.original?.tournamentCurrencies?.[0]?.poolPrize}
					/>
				),
			},

			{
				Header: 'START DATE',
				accessor: 'startDate',
				// filterable: true,
				Cell: ({ cell }) => <Date value={cell.value} />,
			},
			{
				Header: 'END DATE',
				accessor: 'endDate',
				// filterable: true,
				Cell: ({ cell }) => <Date value={cell.value} />,
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
				Cell: ({ cell }) => <Date value={cell.value} />,
			},
			// {
			// 	Header: 'SETTLE',
			// 	accessor: 'isSettled',
			// 	// filterable: true,
			// 	Cell: ({ cell }) => (
			// 		<NonSettled cell={cell} setShowSettleModal={setShowSettleModal} />
			// 	),
			// },
			{
				Header: 'STATUS',
				accessor: 'status',
				// filterable: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons
						cell={cell}
						handleEdit={handleEdit}
						handleView={handleView}
						setShowStatusModal={setShowStatusModal}
					/>
				),
			},
		],
		[tournamentsInfo]
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
