/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Row } from 'reactstrap';

import {
	Provider,
	// ThumbnailUrl,
} from '../../CasinoGames/CasinoGamesListCol';
import TableContainer from '../../../components/Common/Table';
import { selectedLanguage } from '../../../constants/config';

const columns = [
	{
		Header: 'GAME ID',
		accessor: 'casinoGameId',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'NAME',
		accessor: 'name',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'CATEGORY',
		accessor: 'category',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'PROVIDER',
		accessor: 'providerName',
		filterable: true,
		Cell: ({ cell }) => <Provider value={cell.value || '-'} />,
	},
];

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '-');

const GameDetails = ({ tournamentDetail }) => {
	const formattedCasinoGames = useMemo(
		() =>
			tournamentDetail?.casinoTournamentGames?.map((game) => ({
				...game,
				name: game?.casinoGame?.name?.[selectedLanguage],
			})),
		[tournamentDetail?.casinoTournamentGames]
	);

	return (
		<Row lg={12}>
			<TableContainer
				columns={columns || []}
				data={formattedCasinoGames || []}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				customPageSize={formattedCasinoGames?.length || 100}
				tableClass="table-striped table-hover "
			/>
		</Row>
	);
};

export default GameDetails;
