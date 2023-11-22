/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import {
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
} from '../../../store/actions';
import {
	CustomInputField,
	CustomSelectField,
	CustomSwitchButton,
} from '../../../helpers/customForms';
import TableContainer from '../../../components/Common/TableContainer';

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '');

const CheckboxInput = ({ cell, selectedGames, toggleSelectGame }) => (
	<div className=" d-flex justify-content-center">
		<CustomSwitchButton
			type="checkbox"
			containerClass="false"
			className="form-check-input"
			checked={selectedGames.includes(
				cell?.row?.original?.casinoGameId?.toString()
			)}
			switchSizeClass="form-switch-sm"
			onClick={() =>
				toggleSelectGame(cell?.row?.original?.casinoGameId?.toString())
			}
		/>
	</div>
);

const columnsArray = ({ selectedGames, toggleSelectGame }) => [
	{
		Header: 'SELECT',
		accessor: '',
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
		Header: 'GAME ID',
		disableSortBy: true,
		accessor: 'casinoGameId',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'NAME',
		disableSortBy: true,
		accessor: 'name',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'PROVIDER',
		disableSortBy: true,
		accessor: 'providerName',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
];

const Games = ({
	nextPressed,
	setAllFields,
	setActiveTab,
	setNextPressed,
	selectedGames,
	setSelectedGames,
}) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchText, setSearchText] = useState('');
	const [selectedProvider, setSelectedProvider] = useState('');
	const { casinoProvidersData, casinoGames, isCasinoGamesLoading } =
		useSelector((state) => state.CasinoManagementData);

	useEffect(() => {
		dispatch(getCasinoProvidersDataStart());
	}, []);

	useEffect(() => {
		if (nextPressed.currentTab === 'games') {
			setAllFields((prev) => ({
				...prev,
				selectedGames,
			}));
			setActiveTab(nextPressed.nextTab);
			window.scrollTo(0, 0);
			setNextPressed('');
		}
	}, [nextPressed]);

	const providerOptions = useMemo(() => {
		if (casinoProvidersData) {
			return casinoProvidersData?.rows?.map((provider) => ({
				optionLabel: provider.name,
				value: provider.casinoProviderId,
			}));
		}
		return [];
	}, [casinoProvidersData]);

	useEffect(() => {
		dispatch(
			getCasinoGamesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
				providerId: selectedProvider || '',
				freespins: true,
			})
		);
	}, [itemsPerPage, currentPage, searchText, selectedProvider]);

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.rows?.map((game) => ({
				...game,
				providerName: casinoProvidersData?.rows?.find(
					(obj) => obj.casinoProviderId === game.casinoProviderId
				)?.name,
			}));
		}
		return [];
	}, [casinoGames, casinoProvidersData]);

	const toggleSelectGame = (gameId) => {
		if (selectedGames.includes(gameId)) {
			const array = selectedGames.filter((game) => game !== gameId);
			setSelectedGames(array);
		} else {
			setSelectedGames((prev) => [...prev, gameId]);
		}
	};

	const columns = useMemo(
		() => columnsArray({ selectedGames, toggleSelectGame }),
		[selectedGames]
	);

	return (
		<Row>
			<Col sm="6" className="mb-3">
				<CustomSelectField
					label="Provider"
					type="select"
					onChange={(e) => {
						setSelectedProvider(e.target.value);
					}}
					placeholder="Select Provider"
					value={selectedProvider}
					options={
						<>
							<option value="" selected>
								Select Provider
							</option>
							{providerOptions?.map(({ optionLabel, value }) => (
								<option key={value} value={value}>
									{optionLabel}
								</option>
							))}
						</>
					}
				/>
			</Col>
			<Col sm="6" className="mb-3">
				<CustomInputField
					label="Search"
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
					placeholder="Enter Game Name"
					value={searchText}
				/>
			</Col>
			<Col lg="12" className="mb-3">
				<TableContainer
					isLoading={!isCasinoGamesLoading}
					columns={columns}
					data={formattedCasinoGames}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={casinoGames?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={setItemsPerPage}
				/>
			</Col>
		</Row>
	);
};

export default Games;
