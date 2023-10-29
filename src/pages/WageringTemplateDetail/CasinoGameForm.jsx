/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';

import {
	RTP,
	TemplateName,
	WageringContribution,
	CustomValues,
	Select,
} from './WageringTemplateListCol';

const columns = (handleChange) => [
	{
		Header: 'SELECT',
		accessor: 'checkField',
		Cell: ({ cell }) => <Select cell={cell} handleChange={handleChange} />,
	},
	{
		Header: 'NAME',
		accessor: 'name',
		Cell: ({ cell }) => <TemplateName cell={cell} />,
	},
	{
		Header: 'RTP',
		accessor: 'returnToPlayer',
		Cell: ({ cell }) => <RTP cell={cell} />,
	},
	{
		Header: 'DEFAULT',
		accessor: 'wageringContribution',
		Cell: ({ cell }) => <WageringContribution cell={cell} />,
	},
	{
		Header: 'DEFAULT',
		accessor: 'gameContribution',
		Cell: ({ cell }) => <CustomValues cell={cell} />,
	},
];

const CasinoGamesForm = ({
	casinoGames,
	validation,
	wageringTemplateDetail,
	setSelectedId,
	onChangeRowsPerPage,
	itemsPerPage,
	isCasinoGamesLoading,
	page,
	setPage,
}) => {
	const formattedCasinoGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.rows?.map((game) => {
				const data = wageringTemplateDetail?.rows?.find(
					(templateData) =>
						templateData.gameContribution &&
						templateData.gameContribution[game.casinoGameId]
				);

				const gameContribution = data
					? data.gameContribution[game.casinoGameId]
					: null;

				return {
					...game,
					gameContribution:
						validation?.values?.customValue || gameContribution || 100,
				};
			});
		}
		return [];
	}, [casinoGames, wageringTemplateDetail]);

	const handleChange = (e, cell) => {
		if (e.target.checked) {
			setSelectedId((prevSelectedId) => [
				...prevSelectedId,
				{
					casinoGameId: cell?.row?.original?.casinoGameId,
				},
			]);
		} else {
			setSelectedId((prevSelectedId) =>
				prevSelectedId.filter(
					(item) =>
						!item.casinoGameId ||
						item.casinoGameId !== cell?.row?.original?.casinoGameId
				)
			);
		}
	};

	return (
		<Container fluid>
			<TableContainer
				columns={columns(handleChange)}
				data={formattedCasinoGames}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={casinoGames?.count}
				isManualPagination
				onChangePagination={setPage}
				currentPage={page}
				isLoading={isCasinoGamesLoading}
				changeRowsPerPageCallback={onChangeRowsPerPage}
			/>
		</Container>
	);
};

export default CasinoGamesForm;
