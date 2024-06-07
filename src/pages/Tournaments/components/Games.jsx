/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { isEmpty, uniq } from 'lodash';
import { CustomSwitchButton } from '../../../helpers/customForms';
import TableContainer from '../../../components/Common/Table';
// import { getTournamentGamesStart } from '../../../store/actions';
import Filters from '../../../components/Common/Filters';
import {
	Provider,
	Status,
	ThumbnailUrl,
} from '../../CasinoGames/CasinoGamesListCol';
import useGameFilters from '../hooks/useGameFilters';
import { getCasinoGamesStart } from '../../../store/actions';
import Actions from './Actions';
import { showToastr } from '../../../utils/helpers';

// const { VITE_APP_TOURNAMENT_GAME_IDS } = import.meta.env;

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '-');

const CheckboxInput = ({ cell, selectedGames, toggleSelectGame }) => (
	<div className="d-flex justify-content-center">
		<CustomSwitchButton
			type="checkbox"
			// containerClass="false"
			containerClass="form-switch-md"
			className="form-check-input"
			checked={selectedGames?.includes(cell?.row?.original?.id.toString())}
			switchSizeClass="form-switch-sm"
			onClick={() => toggleSelectGame(cell?.row?.original?.id)}
		/>
	</div>
);

const columnsArray = ({
	selectedGames,
	toggleSelectGame,
	formattedCasinoGames,
	setSelectedGames,
}) => [
	{
		Header: () => (
			<div className="d-flex align-items-center">
				<p className="mx-3 mb-0">All </p>
				<CustomSwitchButton
					type="checkbox"
					name="selectAll"
					containerClass="form-switch-md"
					className="form-check-input"
					checked={
						formattedCasinoGames?.length > 0 &&
						formattedCasinoGames?.every((v) =>
							selectedGames?.includes(v?.id?.toString())
						)
					}
					switchSizeClass="form-switch-sm"
					onClick={(e) => {
						const newData = [];
						if (!e.target.checked) {
							formattedCasinoGames?.forEach((v) =>
								newData.push(v.id.toString())
							);
							setSelectedGames((prev) => uniq([...prev, ...newData]));
						} else {
							setSelectedGames((prev) => {
								const filteredGames = prev.filter(
									(id) =>
										!formattedCasinoGames.find(
											(item) => item.id.toString() === id
										)
								);
								return filteredGames;
							});
						}
					}}
				/>
			</div>
		),
		accessor: 'code',
		disableSortBy: true,
		Cell: ({ cell }) => (
			<CheckboxInput
				selectedGames={selectedGames}
				toggleSelectGame={toggleSelectGame}
				cell={cell}
			/>
		),
	},
	{
		Header: 'THUMBNAIL',
		accessor: 'thumbnailUrl',
		filterable: true,
		disableSortBy: true,
		Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
	},
	{
		Header: 'GAME ID',
		disableSortBy: true,
		accessor: 'id',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'NAME',
		disableSortBy: true,
		accessor: 'name',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'CATEGORY',
		disableSortBy: true,
		accessor: 'category',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'PROVIDER',
		accessor: 'providerName',
		filterable: true,
		Cell: ({ cell }) => <Provider value={cell.value || '-'} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		disableFilters: true,
		disableSortBy: true,
		Cell: ({ cell }) => <Status value={cell.value} />,
	},
];

const Games = ({
	selectedGames,
	setSelectedGames,
	casinoTournamentId,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
	activeTab,
}) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const tournamentProvider = JSON.parse(5);

	const { casinoGames, isCasinoGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useGameFilters(casinoTournamentId, tournamentProvider);

	useEffect(() => {
		dispatch(
			getCasinoGamesStart({
				perPage: itemsPerPage,
				page: currentPage,
			})
		);
	}, [itemsPerPage, currentPage]);

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.games?.map((game) => ({
				...game,
				name: game?.name?.EN,
				category: game?.GameCategory?.name?.EN || '',
				providerName: game?.casinoProvider?.name?.EN || '',
			}));
		}
		return [];
	}, [casinoGames]);

	const toggleSelectGame = (gameId) => {
		if (selectedGames?.includes(gameId.toString())) {
			const array = selectedGames?.filter((game) => game !== gameId.toString());
			setSelectedGames(array);
		} else {
			setSelectedGames((prev) => [...prev, gameId.toString()]);
		}
	};

	const handleNextClick = (nextTab) => {
		if (isEmpty(selectedGames)) {
			showToastr({
				message: 'Please select at least one game.',
				type: 'error',
			});
		} else {
			toggleTab(nextTab);
		}
	};

	const columns = useMemo(
		() =>
			columnsArray({
				selectedGames,
				toggleSelectGame,
				formattedCasinoGames,
				setSelectedGames,
			}),
		[selectedGames, formattedCasinoGames]
	);

	return (
		<Row>
			<Filters
				validation={filterValidation}
				filterFields={filterFields}
				actionButtons={actionButtons}
				isAdvanceOpen={isAdvanceOpen}
				toggleAdvance={toggleAdvance}
				isFilterChanged={isFilterChanged}
			/>
			<Col lg="12" className="mb-3">
				<TableContainer
					isLoading={isCasinoGamesLoading}
					columns={columns || []}
					data={formattedCasinoGames || []}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPages={casinoGames?.totalPages || 1}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={setItemsPerPage}
				/>
			</Col>
			<Actions
				handleNextClick={handleNextClick}
				submitButtonLoading={submitButtonLoading}
				activeTab={activeTab}
				toggleTab={toggleTab}
				tabsToShow={tabsToShow}
			/>
		</Row>
	);
};

export default Games;
