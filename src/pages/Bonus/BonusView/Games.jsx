import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import {
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
} from '../../../store/actions';
import { CustomSelectField } from '../../../helpers/customForms';
import TableContainer from '../../../components/Common/TableContainer';

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '');

const columns = [
	{
		Header: 'GAME ID',
		disableSortBy: true,
		accessor: 'casinoGameId',
		Cell: (cell) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'NAME',
		disableSortBy: true,
		accessor: 'name',
		Cell: (cell) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'PROVIDER',
		disableSortBy: true,
		accessor: 'providerName',
		Cell: (cell) => <KeyValueCell cell={cell} />,
	},
];

const Games = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedProvider, setSelectedProvider] = useState('');
	const { casinoProvidersData, casinoGames, isCasinoGamesLoading } =
		useSelector((state) => state.CasinoManagementData);

	useEffect(() => {
		dispatch(getCasinoProvidersDataStart());
	}, []);

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
				search: '',
				providerId: selectedProvider || '',
				freespins: true,
			})
		);
	}, [itemsPerPage, currentPage, selectedProvider]);

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
			<Col lg="12" className="mb-3">
				<TableContainer
					isLoading={!isCasinoGamesLoading}
					columns={columns}
					data={formattedCasinoGames}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
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
