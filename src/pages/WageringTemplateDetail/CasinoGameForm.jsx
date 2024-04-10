/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';

import {
	RTP,
	TemplateName,
	WageringContribution,
	CustomValues,
	Select,
} from './WageringTemplateListCol';

const columns = (handleChange, selectedId) => [
	{
		Header: 'SELECT',
		accessor: 'checkField',
		Cell: ({ cell }) => (
			<Select cell={cell} handleChange={handleChange} selectedId={selectedId} />
		),
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
		Header: 'CUSTOM VALUE',
		accessor: 'gameContribution',
		Cell: ({ cell }) => <CustomValues cell={cell} />,
	},
];

const CasinoGamesForm = ({
	casinoGames,
	validation,
	wageringTemplateDetail,
	selectedId,
	setSelectedId,
	onChangeRowsPerPage,
	itemsPerPage,
	isCasinoGamesLoading,
	page,
	setPage,
}) => {
	const formattedCasinoGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.games?.map((game) => {
				const data = wageringTemplateDetail?.wageringTemplates?.find(
					(templateData) =>
						templateData.gameContribution &&
						templateData.gameContribution[game.id]
				);

				const gameContribution = data ? data.gameContribution[game.id] : null;

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
			setSelectedId((prevSelectedId) => {
				return [
					...prevSelectedId,
					{
						id: cell?.row?.original?.id,
					},
				];
			});
		} else {
			setSelectedId((prevSelectedId) =>
				prevSelectedId.filter(
					(item) => !item.id || item.id !== cell?.row?.original?.id
				)
			);
		}
	};

	return (
		<Container fluid>
			<TableContainer
				columns={columns(handleChange, selectedId)}
				data={formattedCasinoGames}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={casinoGames?.totalPages}
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
