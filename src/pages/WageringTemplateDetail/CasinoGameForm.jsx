/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';

import {
	RTP,
	TemplateName,
	WageringContribution,
	Select,
} from './WageringTemplateListCol';

const columns = (handleChange, selectedId) => [
	{
		Header: 'Select',
		accessor: 'checkField',
		Cell: ({ cell }) => (
			<Select cell={cell} handleChange={handleChange} selectedId={selectedId} />
		),
	},
	{
		Header: 'Name',
		accessor: 'name',
		Cell: ({ cell }) => <TemplateName cell={cell} />,
	},
	{
		Header: 'RTP',
		accessor: 'returnToPlayer',
		Cell: ({ cell }) => <RTP cell={cell} />,
	},
	{
		Header: 'Contribution Percentage',
		accessor: 'gameContributionPercentage',
		Cell: ({ cell }) => <RTP cell={cell} />,
	},
	{
		Header: 'Default Contribution',
		accessor: 'wageringContribution',
		Cell: ({ cell }) => <WageringContribution cell={cell} />,
	},
];

const CasinoGamesForm = ({
	casinoGames,
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
		if (casinoGames?.games) {
			return casinoGames?.games?.map((game) => ({
				...game,
				gameContributionPercentage: selectedId[game.id]
					? selectedId[game.id].contributionPercentage
					: '-',
			}));
		}
		return [];
	}, [casinoGames, wageringTemplateDetail]);

	const handleChange = (e, cell) => {
		const id = cell?.row?.original?.id;
		if (!id) return;
		if (e.target.checked) {
			setSelectedId((prevSelectedId) => ({ ...prevSelectedId, [id]: true }));
		} else {
			setSelectedId((prevSelectedId) => {
				const prev = prevSelectedId;
				delete prev[id];
				return prev;
			});
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
