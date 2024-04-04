/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import {
	fetchSportsTransactionStart,
	resetSportsTransactionsData,
} from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
import {
	CreatedAt,
	Id,
	KeyValueCell,
	Status,
} from '../SportsTransactionListCol';
import { BET_TYPES, sportsBookStatus } from '../formDetails';

const useSportsTransactionListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [viewModal, setViewModal] = useState(false);
	const [betSlipData, setBetSlipData] = useState([]);
	const { sportsTransaction, loading: isSportsTransactionLoading } =
		useSelector((state) => state.SportsTransaction);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};
	useEffect(() => {
		dispatch(
			fetchSportsTransactionStart({
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting sports transactions listing redux state
	useEffect(() => () => dispatch(resetSportsTransactionsData()), []);

	const formattedSportsTransaction = useMemo(() => {
		const formattedValues = [];
		if (sportsTransaction) {
			sportsTransaction?.sportsbookBets?.map((txn) =>
				formattedValues.push({
					id: txn?.id,
					walletId: txn?.walletId,
					type: BET_TYPES.find((type) => type.value === txn?.type)?.label,
					stake: txn?.stake,
					multipliedOdds: txn?.multipliedOdds,
					status: sportsBookStatus.find(
						(status) => status.value === txn?.settlementStatus
					)?.label,
					winningAmount: txn?.winningAmount,
					bets: txn?.bets,
					createdAt: getDateTime(txn?.createdAt),
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
				Header: 'Bet Type',
				accessor: 'type',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Stake',
				accessor: 'stake',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Multiplied Odds',
				accessor: 'multipliedOdds',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Winning Amount',
				accessor: 'winningAmount',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
			{
				Header: 'Action',
				Cell: ({ cell }) => (
					<ul className="list-unstyled hstack gap-1 mb-0">
						<li>
							<Button
								to="#"
								className="btn btn-sm btn-soft-primary"
								onClick={(e) => {
									e.preventDefault();
									setViewModal(true);
									setBetSlipData(cell?.row?.original?.bets);
								}}
							>
								<i className="mdi mdi-eye" id="inactivetooltip" />
								<UncontrolledTooltip placement="top" target="inactivetooltip">
									View Bet Details
								</UncontrolledTooltip>
							</Button>
						</li>
					</ul>
				),
			},
		],
		[]
	);

	const formattedBetSlips = useMemo(() => {
		if (betSlipData?.length > 0) {
			return betSlipData?.map((slip) => ({
				...slip,
				fixtureId: slip?.event?.fixtureId,
			}));
		}
		return [];
	}, [betSlipData]);

	const betSlipColumns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Bet Slip Id',
				accessor: 'betslipId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Event Id',
				accessor: 'eventId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Event Market Id',
				accessor: 'eventMarketId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Event Market Outcome Id',
				accessor: 'eventMarketOutcomeId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},

			{
				Header: 'Odds',
				accessor: 'odds',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Winning Amount',
				accessor: 'winningAmount',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
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
		totalSportsTransactionCount: sportsTransaction?.totalPages || 0,
		isSportsTransactionLoading,
		formattedSportsTransaction,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
		viewModal,
		setViewModal,
		betSlipColumns,
		formattedBetSlips,
	};
};

export default useSportsTransactionListing;
