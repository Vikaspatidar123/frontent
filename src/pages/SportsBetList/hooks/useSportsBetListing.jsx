/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { json2csv } from 'json-2-csv';
import {
	fetchSportsBetStart,
	resetSportsBetData,
} from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
import {
	CreatedAt,
	Id,
	KeyValueCell,
	Status,
	UserName,
} from '../SportsBetListCol';
import { BETSLIP_TYPES, sportsBookStatus } from '../formDetails';
import { downloadReport } from '../../../helpers/common';
import { getSportsBet } from '../../../network/getRequests';
import { showToastr } from '../../../utils/helpers';
import ExportList from '../../../components/Common/ExportList';

const useSportsBetListing = (filterValues = {}, userId = '') => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [viewModal, setViewModal] = useState(false);
	const [betSlipData, setBetSlipData] = useState([]);
	const [isDownloading, setIsDownloading] = useState({
		fullCsv: false,
	});
	const { sportsBet, loading: isSportsBetLoading } = useSelector(
		(state) => state.SportsBet
	);
	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};
	useEffect(() => {
		dispatch(
			fetchSportsBetStart({
				perPage: itemsPerPage,
				page: currentPage,
				userId,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting sports bet listing redux state
	useEffect(() => () => dispatch(resetSportsBetData()), []);

	const formattedSportsBet = useMemo(() => {
		const formattedValues = [];
		if (sportsBet) {
			sportsBet?.betslips?.map((txn) =>
				formattedValues.push({
					...txn,
					id: txn?.id,
					username: txn?.user?.username || '-',
					walletId: txn?.walletId,
					type: BETSLIP_TYPES.find((type) => type.value === txn?.type)?.label,
					stake: txn?.stake,
					multipliedOdds: txn?.multipliedOdds,
					status: sportsBookStatus.find(
						(status) => status.value === txn?.settlementStatus
					)?.label,
					winningAmount: txn?.winningAmount,
					currency: txn?.wallet?.currency?.code || '-',
					bets: txn?.bets,
					createdAt: getDateTime(txn?.createdAt),
					userId: txn?.user?.id,
				})
			);
		}
		return formattedValues;
	}, [sportsBet]);

	const columns = useMemo(() => {
		const currency =
			currencies?.currencies?.find(
				(curr) => curr.id === filterValues.currencyId
			) || defaultCurrency;

		return [
			{
				Header: 'Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <UserName value={cell.value} cell={cell} />,
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
				Cell: ({ cell }) => (
					<KeyValueCell value={cell.value} defaultCurrency={currency} />
				),
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
				Cell: ({ cell }) => (
					<KeyValueCell value={cell.value} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Currency',
				accessor: 'currency',
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
		];
	}, [filterValues.currencyId]);

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

	const fetchReportData = async (report) => {
		setIsDownloading((prev) => ({
			...prev,
			[report.type]: true,
		}));
		const { data } = await getSportsBet({
			perPage: itemsPerPage,
			page: currentPage,
			userId,
			...filterValues,
		});
		setIsDownloading((prev) => ({
			...prev,
			[report.type]: false,
		}));
		if (!data?.data?.betslips || data.data?.betslips?.length === 0) {
			showToastr({
				message: 'No records found to download.',
				type: 'error',
			});
			return;
		}
		const csvJsonData = data?.data?.betslips?.map((txn) => ({
			...txn,
			id: txn?.id,
			username: txn?.user?.username || '-',
			walletId: txn?.walletId,
			type: BETSLIP_TYPES.find((type) => type.value === txn?.type)?.label,
			stake: txn?.stake,
			multipliedOdds: txn?.multipliedOdds,
			status: sportsBookStatus.find(
				(status) => status.value === txn?.settlementStatus
			)?.label,
			winningAmount: txn?.winningAmount,
			currency: txn?.wallet?.currency?.code || '-',
			bets: txn?.bets,
			createdAt: getDateTime(txn?.createdAt),
			userId: txn?.user?.id,
		}));
		downloadReport('csv', json2csv(csvJsonData), 'Sports Bets Report');
	};

	const exportList = useMemo(() => [
		{
			label: 'Download',
			isDownload: true,
			isCsv: true,
			tooltip: 'Download CSV Report',
			icon: <i className="mdi mdi-file-document-multiple" />,
			buttonColor: 'primary',
			type: 'fullCsv',
			handleDownload: fetchReportData,
			isDownloading: isDownloading.fullCsv,
		},
	]);

	const actionList = <ExportList exportList={exportList} />;

	return {
		currentPage,
		setCurrentPage,
		totalSportsBetCount: sportsBet?.totalPages || 0,
		isSportsBetLoading,
		formattedSportsBet,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		actionList,
		viewModal,
		setViewModal,
		betSlipColumns,
		formattedBetSlips,
	};
};

export default useSportsBetListing;
