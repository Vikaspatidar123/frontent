import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getCasinoGamesStart } from '../../../store/actions';
import TableContainer from '../../../components/Common/Table';
import { selectedLanguage } from '../../../constants/config';

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '');

const columns = [
	{
		Header: 'GAME ID',
		disableSortBy: true,
		accessor: 'id',
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
	const { casinoGames, isCasinoGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	useEffect(() => {
		dispatch(
			getCasinoGamesStart({
				freespins: true,
			})
		);
	}, []);

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames?.games) {
			return casinoGames?.games?.map((game) => ({
				...game,
				name: game.name[selectedLanguage],
			}));
		}
		return [];
	}, [casinoGames]);

	return (
		<Row>
			<Col lg="12" className="mb-3">
				<TableContainer
					isLoading={!isCasinoGamesLoading}
					columns={columns}
					data={formattedCasinoGames}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
				/>
			</Col>
		</Row>
	);
};

export default Games;
