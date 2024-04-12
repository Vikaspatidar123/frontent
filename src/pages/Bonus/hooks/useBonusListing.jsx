/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
	deleteBonusStart,
	getBonusesStart,
	getBonusDetail,
	resetBonusDetails,
	updateSABonusStatus,
} from '../../../store/actions';
import { safeStringify } from '../../../utils/helpers';
import {
	BonusId,
	Title,
	BonusType,
	Status,
	Date,
	Custom,
} from '../BonusListCol';
import ActionButtons from '../ActionButtons';

const useBonusListing = (filterValues = {}) => {
	const { bonusDetails, isLoading, gameBonusDetail, isDeleteBonusLoading } =
		useSelector((state) => state.AllBonusDetails);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [isDeleteConfirmationOpen, setDeleteConfirmation] = useState(false);
	const [deleteBonusId, setDeleteBonusId] = useState('');
	const [bonusName, setBonusName] = useState('');
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
				// const bonusType =
				// 	type === BONUS_TYPES.FREESPINS && !isSticky
				// 		? 'CASH FREESPINS'
				// 		: types.find((val) => val.value === type)?.label;

				// const validTill =
				// 	type === 'depositCashback' ||
				// 	type === 'wagering' ||
				// 	type === BONUS_TYPES.JOINING
				// 		? '-'
				// 		: formatDate(validTo);

				// let isExpired;
				// if (
				// 	type === 'depositCashback' ||
				// 	type === 'wagering' ||
				// 	type === BONUS_TYPES.JOINING
				// ) {
				// 	isExpired = 'No';
				// } else {
				// 	isExpired =
				// 		formatDate(validTo) < formatDate(new Date()) ? 'Yes' : 'No';
				// }
				// const isClaimed = claimedCount ? 'Yes' : 'No';
				const isExpired =
					moment(bonus.validTill).valueOf() < moment().valueOf() ? 'Yes' : 'No';
				return {
					...bonus,
					// bonusType,
					// validTill,
					isExpired,
					// isClaimed,
				};
			});
		}
		return [];
	}, [bonusDetails]);

	const fetchData = () => {
		const { bonusType, ...rest } = filterValues;
		dispatch(
			getBonusesStart({
				perPage: itemsPerPage,
				page,
				bonusType: bonusType ? safeStringify([bonusType]) : null,
				...rest,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	// resetting bonus listing redux state
	useEffect(() => () => dispatch(resetBonusDetails()), []);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, bonusId } = props;
		dispatch(
			updateSABonusStatus({
				code: 'BONUS',
				bonusId,
				status: !active,
			})
		);
	};

	const handleClose = () => {
		setDeleteConfirmation(false);
		setDeleteBonusId('');
		setBonusName('');
		fetchData();
	};

	const handleDelete = (props) => {
		const { bonusId, title } = props;
		setDeleteConfirmation(true);
		setDeleteBonusId(bonusId);
		setBonusName(title);
		dispatch(getBonusDetail({ bonusId }));
	};

	const bonusDeleteHandler = () => {
		dispatch(
			deleteBonusStart({
				data: {
					bonusId: deleteBonusId,
					balanceBonus: gameBonusDetail?.balanceBonus,
				},
				handleClose,
			})
		);
	};

	const handleView = (props) => {
		const { id } = props;
		navigate(`/bonus/${id}`);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <BonusId value={cell.value} />,
			},
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
				Cell: ({ cell }) => <Custom value={cell.value} />,
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
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						handleView={handleView}
						handleDelete={handleDelete}
					/>
				),
			},
		],
		[]
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
		bonusName,
		isDeleteBonusLoading,
	};
};

export default useBonusListing;
