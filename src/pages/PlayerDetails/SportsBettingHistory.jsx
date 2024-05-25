/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	Container,
	UncontrolledTooltip,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import { CreatedAt, Id, KeyValueCell, StatusData } from './TableCol';
import { fetchSportsBetStart } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import Filters from '../../components/Common/Filters';
import useSportBetHistoryFilters from './hooks/useSportBetHistoryFilters';
import CrudSection from '../../components/Common/CrudSection';
import { BET_TYPES, sportsBookStatus } from './constants';
import ModalView from '../../components/Common/Modal';

const SportsBettingHistory = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [viewModal, setViewModal] = useState(false);
	const [betSlipData, setBetSlipData] = useState([]);

	const { sportsBet, loading: isSportsBetLoading } = useSelector(
		(state) => state.SportsBet
	);

	useEffect(() => {
		dispatch(
			fetchSportsBetStart({
				perPage: itemsPerPage,
				page: currentPage,
				email: '',
				userId,
			})
		);
	}, [currentPage, itemsPerPage]);

	const formattedSportsBet = useMemo(() => {
		const formattedValues = [];
		if (sportsBet) {
			sportsBet?.betslips?.map((txn) =>
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
	}, [sportsBet]);

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: formattedSportsBet,
		},
	]);

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
				Cell: ({ cell }) => <StatusData value={cell.value} />,
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

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useSportBetHistoryFilters();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

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
				Cell: ({ cell }) => <StatusData value={cell.value} />,
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

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection
					buttonList={[]}
					exportComponent={exportComponent}
					title="Sport Betting History"
				/>
				<CardBody>
					<Filters
						validation={filterValidation}
						filterFields={filterFields}
						actionButtons={actionButtons}
						isAdvanceOpen={isAdvanceOpen}
						toggleAdvance={toggleAdvance}
						isFilterChanged={isFilterChanged}
					/>
					<TableContainer
						isLoading={isSportsBetLoading}
						columns={columns}
						data={formattedSportsBet}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={sportsBet?.totalPages || 0}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
					<ModalView
						openModal={viewModal}
						toggleModal={() => setViewModal(!viewModal)}
						headerTitle="Bet Slips"
						className="modal-dialog modal-xl"
						hideFooter
					>
						<TableContainer
							isLoading={false}
							columns={betSlipColumns || []}
							data={formattedBetSlips}
							customPageSize={50}
							isShowColSettings={false}
						/>
					</ModalView>
				</CardBody>
			</Card>
		</Container>
	);
};

export default SportsBettingHistory;
