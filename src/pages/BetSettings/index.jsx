/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useBetSettings from './hooks/useBetSettings';

import {
	BetSettingId,
	SportsName,
	MaxBetAmount,
	MinBetAmount,
	MaxBetCount,
	MaxWinAmount,
	CashoutPercentage,
	MinOddLimit,
	MaxOddLimit,
	MaxEventCount,
	MaxMarketOutcomeCount,
	UpdatedAt,
} from './BetSettingsListCol';
import ActionButtons from './ActionButtons';

const columns = [
	{
		Header: 'ID',
		accessor: 'betSettingId',
		filterable: true,
		Cell: ({ cell }) => <BetSettingId cell={cell} />,
	},
	{
		Header: 'SPORTS NAME',
		accessor: 'sportsName',
		filterable: true,
		Cell: ({ cell }) => <SportsName cell={cell} />,
	},
	{
		Header: 'MAX BET AMOUNT',
		accessor: 'maxBetAmount',
		filterable: true,
		Cell: ({ cell }) => <MaxBetAmount cell={cell} />,
	},
	{
		Header: 'MIN BET AMOUNT',
		accessor: 'minBetAmount',
		filterable: true,
		Cell: ({ cell }) => <MinBetAmount cell={cell} />,
	},
	{
		Header: 'MAX BET COUNT',
		accessor: 'maxBetCount',
		filterable: true,
		Cell: ({ cell }) => <MaxBetCount cell={cell} />,
	},
	{
		Header: 'MAX WIN AMOUNT',
		accessor: 'maxWinAmount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxWinAmount cell={cell} />,
	},
	{
		Header: 'CASHOUT PERCENTAGE',
		accessor: 'cashoutPercentage',
		disableFilters: true,
		Cell: ({ cell }) => <CashoutPercentage cell={cell} />,
	},
	{
		Header: 'MIN ODD LIMIT',
		accessor: 'minOddLimit',
		disableFilters: true,
		Cell: ({ cell }) => <MinOddLimit cell={cell} />,
	},
	{
		Header: 'MAX ODD LIMIT',
		accessor: 'maxOddLimit',
		disableFilters: true,
		Cell: ({ cell }) => <MaxOddLimit cell={cell} />,
	},
	{
		Header: 'MAX EVENT COUNT',
		accessor: 'maxEventCount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxEventCount cell={cell} />,
	},
	{
		Header: 'MAX MARKET OUTCOME COUNT',
		accessor: 'maxMarketOutcomeCount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxMarketOutcomeCount cell={cell} />,
	},
	{
		Header: 'UPDATED AT',
		accessor: 'updatedAt',
		disableFilters: true,
		Cell: ({ cell }) => <UpdatedAt cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const BetSettings = () => {
	// meta title
	document.title =
		'Bet Settings | Skote - Vite React Admin & Dashboard Template';

	const {
		formattedBetSettingsList,
		isLoading,
		totalBetCount,
		page,
		setPage,
		itemsPerPage,
	} = useBetSettings();

	return (
		<div className="page-content">
			<Container fluid>
				<TableContainer
					columns={columns}
					data={formattedBetSettingsList}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalBetCount}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={!isLoading}
				/>
			</Container>
		</div>
	);
};

export default BetSettings;
