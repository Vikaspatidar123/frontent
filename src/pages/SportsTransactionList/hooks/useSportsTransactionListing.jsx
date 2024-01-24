/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchSportsTransactionStart,
	resetSportsTransactionsData,
} from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
import {
	ActionTypes,
	Amount,
	CreatedAt,
	CurrencyCode,
	Email,
	Id,
	Status,
} from '../SportsTransactionListCol';
import { Purpose } from '../../PlayerDetails/TableCol';

const useSportsTransactionListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsTransaction, loading: isSportsTransactionLoading } =
		useSelector((state) => state.SportsTransaction);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};
	useEffect(() => {
		dispatch(
			fetchSportsTransactionStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting sports transactions listing redux state
	useEffect(() => () => dispatch(resetSportsTransactionsData()), []);

	const formattedSportsTransaction = useMemo(() => {
		const formattedValues = [];
		if (sportsTransaction) {
			sportsTransaction.rows.map((txn) =>
				formattedValues.push({
					id: txn?.id,
					email: txn?.user?.email,
					amount: txn?.amount,
					currencyCode: txn?.wallet?.currency?.code,
					type: txn?.type,
					purpose: txn?.purpose,
					status: txn?.transaction?.status,
					createdAt: getDateTime(txn.createdAt),
				})
			);
		}
		return formattedValues;
	}, [sportsTransaction]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			// {
			// 	Header: 'Non Cash Amount',
			// 	accessor: 'nonCashAmount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <NonCashAmount value={cell.value} />,
			// },
			{
				Header: 'Currency Code',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'type',
				Cell: ({ cell }) => <ActionTypes value={cell.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				Cell: ({ cell }) => <Purpose value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Created At',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		],
		[]
	);

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: formattedSportsTransaction,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalSportsTransactionCount: sportsTransaction?.count,
		isSportsTransactionLoading,
		formattedSportsTransaction,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useSportsTransactionListing;
