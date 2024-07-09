/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	getLedgerDetailsStart,
	resetTransactionBankingData,
} from '../../../store/actions';
import { LEDGER_TYPES } from '../constants';
import { ActionTypes, Amount, CreatedAt, Id, Purpose } from '../TableCol';

const useLedgerDetails = (userId, filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { ledgerDetail, ledgerDetailLoading } = useSelector(
		(state) => state.TransactionBanking
	);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			getLedgerDetailsStart({
				perPage: itemsPerPage,
				page: currentPage,
				userId: userId || '',
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage, userId]);

	const formattedLedgerDetails = useMemo(() => {
		const formattedValues = [];
		if (ledgerDetail) {
			ledgerDetail?.ledgers?.map((ledger) =>
				formattedValues.push({
					...ledger,
					type: LEDGER_TYPES.find((type) => type.value === ledger?.type)?.label,
					createdAt: moment(ledger?.createdAt)
						.local()
						.format('YYYY-MM-DD HH:mm:ss'),
				})
			);
		}
		return formattedValues;
	}, [ledgerDetail]);

	// resetting transactions listing redux state
	useEffect(() => () => dispatch(resetTransactionBankingData()), []);

	const columns = useMemo(
		() => [
			{
				Header: 'Ledger Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Wallet Id',
				accessor: 'walletId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Ledger Type',
				accessor: 'type',
				Cell: ({ cell }) => <ActionTypes value={cell.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				filterable: true,
				Cell: ({ cell }) => <Purpose value={cell.value} />,
			},
			{
				Header: 'Date',
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
			data: formattedLedgerDetails,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalLedgerCount: ledgerDetail?.totalPages || 0,
		ledgerDetail,
		ledgerDetailLoading,
		formattedLedgerDetails,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useLedgerDetails;
