/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getSportsTournamentList,
	resetSportsTournamentList,
} from '../../../store/actions';
import {
	TournamentId,
	TournamentName,
	CountryName,
	SportName,
} from '../sportsTournamentListCol';

const useSportsTounamentListing = (filterValues = {}) => {
	const { sportsTournamentList, isSportsTournamentListLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const formattedSportsTournamenList = useMemo(() => {
		if (sportsTournamentList) {
			return sportsTournamentList?.rows?.map((item) => ({
				...item,
				tournamentName: item?.name,
				countryName: item?.location?.name,
				sportName: item.sport?.name,
			}));
		}
		return [];
	}, [sportsTournamentList]);

	useEffect(() => {
		dispatch(
			getSportsTournamentList({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	}, [page, itemsPerPage]);

	// resetting sports tournaments redux state
	useEffect(() => () => dispatch(resetSportsTournamentList()), []);

	const columns = useMemo(() => [
		{
			Header: 'ID',
			accessor: 'id',
			filterable: true,
			Cell: ({ cell }) => <TournamentId value={cell.value} />,
		},
		{
			Header: 'NAME',
			accessor: 'tournamentName',
			filterable: true,
			Cell: ({ cell }) => <TournamentName value={cell.value} />,
		},
		{
			Header: ' COUNTRY',
			accessor: 'countryName',
			disableFilters: true,
			Cell: ({ cell }) => <CountryName value={cell.value} />,
		},
		{
			Header: 'SPORT',
			accessor: 'sportName',
			disableFilters: true,
			Cell: ({ cell }) => <SportName value={cell.value} />,
		},
	]);

	return {
		formattedSportsTournamenList,
		isSportsTournamentListLoading,
		totalSportsTounamentListCount: sportsTournamentList?.totalPage,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsTounamentListing;
