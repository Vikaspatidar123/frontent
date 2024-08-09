/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
	deleteBonusStart,
	getBonusesStart,
	resetBonusDetails,
	updateSABonusStatus,
} from '../../../store/actions';
import { Title, BonusType, Status, Date, Custom } from '../BonusListCol';
import { modules } from '../../../constants/permissions';
import { BONUS_TYPES } from '../constants';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { iconClass } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';

const useBonusListing = (filterValues = {}) => {
	const { bonusDetails, isLoading, isDeleteBonusLoading } = useSelector(
		(state) => state.AllBonusDetails
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [isDeleteConfirmationOpen, setDeleteConfirmation] = useState(false);
	const [deleteBonusId, setDeleteBonusId] = useState('');
	const { isGranted } = usePermission();
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const formattedBonusDetails = useMemo(() => {
		if (bonusDetails?.bonus?.length) {
			return bonusDetails?.bonus.map((bonus) => {
				const isExpired =
					moment(bonus.validTill).valueOf() < moment().valueOf() ? 'Yes' : 'No';
				return {
					...bonus,
					isExpired,
				};
			});
		}
		return [];
	}, [bonusDetails]);

	const fetchData = () => {
		dispatch(
			getBonusesStart({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	// resetting bonus listing redux state
	useEffect(() => () => dispatch(resetBonusDetails()), []);

	const handleStatus = (props) => {
		const { id } = props;
		dispatch(
			updateSABonusStatus({
				bonusId: id,
			})
		);
	};

	const handleClose = () => {
		setDeleteConfirmation(false);
		setDeleteBonusId('');
		fetchData();
	};

	const handleDelete = (props) => {
		setDeleteConfirmation(true);
		setDeleteBonusId(props?.id);
	};

	const bonusDeleteHandler = () => {
		dispatch(
			deleteBonusStart({
				data: {
					bonusId: deleteBonusId,
				},
				handleClose,
			})
		);
	};

	const handleView = (props) => {
		const { id, bonusType } = props;
		navigate(`/bonus/${id}/${bonusType}`);
	};

	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('/bonus/create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.bonus,
			operation: 'C',
		},
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.bonus,
			operation: 'U',
		},
	]);

	const handleEdit = (row) =>
		navigate(`/bonus/edit/${row?.id}/${row?.bonusType}`);

	const isDisabled = (row) => row?.claimedCount;

	const actionsList = [
		{
			actionName: 'View',
			actionHandler: handleView,
			isHidden: !isGranted(modules.bonus, 'R'),
			icon: iconClass.view,
			iconColor: 'text-success',
		},
		{
			actionName: 'Edit',
			actionHandler: handleEdit,
			isHidden: !isGranted(modules.bonus, 'U'),
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
		},
		{
			actionName: 'Delete',
			actionHandler: handleDelete,
			isHidden: !isGranted(modules.bonus, 'D'),
			icon: iconClass.delete,
			iconColor: 'text-danger',
			isDisabled,
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'Id',
			// 	accessor: 'id',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <BonusId value={cell.value} />,
			// },
			{
				Header: 'Title',
				accessor: 'promotionTitle',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'Bonus Type',
				accessor: 'bonusType',
				filterable: true,
				Cell: ({ cell }) => <BonusType value={cell.value} />,
			},
			{
				Header: 'Days To Clear',
				accessor: 'daysToClear',
				filterable: true,
				Cell: ({ cell }) => (
					<Custom
						value={
							cell?.row?.original?.bonusType === BONUS_TYPES.JOINING
								? '-'
								: cell.value
						}
					/>
				),
			},
			{
				Header: 'Claimed Count',
				accessor: 'claimedCount',
				filterable: true,
				Cell: ({ cell }) => <Custom value={cell.value} />,
			},
			{
				Header: 'Valid From',
				accessor: 'validFrom',
				filterable: true,
				Cell: ({ cell }) => <Date value={cell.value} />,
			},
			{
				Header: 'Valid Till',
				accessor: 'validTo',
				filterable: true,
				Cell: ({ cell }) => <Date value={cell.value} />,
			},
			{
				Header: 'Is Expired',
				accessor: 'isExpired',
				filterable: true,
				Cell: ({ cell }) => <Custom value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Actions',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[
			formattedBonusDetails,
			isGranted(modules.bonus, 'R'),
			isGranted(modules.bonus, 'U'),
			isGranted(modules.bonus, 'D'),
			isGranted(modules.bonus, 'TS'),
		]
	);

	return {
		bonusDetails,
		formattedBonusDetails,
		isLoading,
		totalBonusCount: bonusDetails?.count,
		itemsPerPage,
		page,
		setPage,
		onChangeRowsPerPage,
		columns,
		isDeleteConfirmationOpen,
		setDeleteConfirmation,
		bonusDeleteHandler,
		isDeleteBonusLoading,
		buttonList,
	};
};

export default useBonusListing;
