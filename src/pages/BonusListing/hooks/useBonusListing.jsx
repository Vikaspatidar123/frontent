/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBonusDetails, updateSABonusStatus } from '../../../store/actions';
import { formatDate } from '../../../utils/dateFormatter';
import { safeStringify } from '../../../utils/helpers';
import types from '../contants';
import {
	BonusId,
	Title,
	BonusType,
	ValidTill,
	IsExpired,
	IsClaimed,
	Status,
} from '../BonusListCol';
import ActionButtons from '../ActionButtons';

const useBonusListing = () => {
	const { bonusDetails, isLoading } = useSelector(
		(state) => state.AllBonusDetails
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');
	const [page, setPage] = useState(1);
	const [bonusTyp, setBonusTyp] = useState('');
	const [search, setSearch] = useState('');
	const [isActive, setIsActive] = useState('');
	const [status, setStatus] = useState(false);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedBonusDetails = useMemo(() => {
		if (bonusDetails) {
			return bonusDetails?.rows.map((bonus) => {
				const {
					promotionTitle,
					bonusType: type,
					validTo,
					claimedCount,
					isSticky,
				} = bonus;

				const title = promotionTitle.EN || 'NA';

				const bonusType =
					type === 'freespins' && !isSticky
						? 'CASH FREESPINS'
						: types.find((val) => val.value === type)?.label;

				const validTill =
					type === 'depositCashback' ||
					type === 'wagering' ||
					type === 'joining'
						? '-'
						: formatDate(validTo);

				let isExpired;
				if (
					type === 'depositCashback' ||
					type === 'wagering' ||
					type === 'joining'
				) {
					isExpired = 'No';
				} else {
					isExpired =
						formatDate(validTo) < formatDate(new Date()) ? 'Yes' : 'No';
				}
				const isClaimed = claimedCount ? 'Yes' : 'No';

				return {
					...bonus,
					title,
					bonusType,
					validTill,
					isExpired,
					isClaimed,
				};
			});
		}
		return [];
	}, [bonusDetails]);

	const fetchData = () => {
		dispatch(
			getBonusDetails({
				adminId: selectedClient,
				tenantId: selectedPortal,
				limit: itemsPerPage,
				pageNo: page,
				search,
				bonusType: bonusTyp === '' ? '' : safeStringify([bonusTyp]),
				isActive,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [
		selectedPortal,
		bonusTyp,
		isActive,
		page,
		search,
		selectedClient,
		status,
		itemsPerPage,
	]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, bonusId } = props;
		dispatch(
			updateSABonusStatus({
				data: {
					code: 'BONUS',
					bonusId,
					status: !active,
				},
				// adminId: selectedClient,
				// tenantId: selectedPortal,
				// limit,
				// pageNo: page,
				// search,
				// bonusType: bonusTyp === '' ? '' : safeStringify([bonusTyp]),
				// isActive,
			})
		);
		setStatus((prev) => !prev);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'bonusId',
				filterable: true,
				Cell: ({ cell }) => <BonusId cell={cell} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title cell={cell} />,
			},
			{
				Header: 'BONUS TYPE',
				accessor: 'bonusType',
				filterable: true,
				Cell: ({ cell }) => <BonusType cell={cell} />,
			},
			{
				Header: 'VALID TILL',
				accessor: 'validTill',
				filterable: true,
				Cell: ({ cell }) => <ValidTill cell={cell} />,
			},
			{
				Header: 'IS EXPIRED',
				accessor: 'isExpired',
				filterable: true,
				Cell: ({ cell }) => <IsExpired cell={cell} />,
			},
			{
				Header: 'IS CLAIMED',
				accessor: 'isClaimed',
				filterable: true,
				Cell: (cell) => <IsClaimed cell={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: (cell) => <Status cell={cell} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				Cell: (cell) => (
					<ActionButtons cell={cell} handleStatus={handleStatus} />
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
		selectedClient,
		setSelectedClient,
		selectedPortal,
		setSelectedPortal,
		itemsPerPage,
		page,
		setPage,
		bonusTyp,
		setBonusTyp,
		search,
		setSearch,
		isActive,
		setIsActive,
		status,
		setStatus,
		onChangeRowsPerPage,
		columns,
	};
};

export default useBonusListing;
