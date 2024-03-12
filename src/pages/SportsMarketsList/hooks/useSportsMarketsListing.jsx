/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchSportsMarketsStart,
	resetSportsMarketsData,
} from '../../../store/actions';
import { Id, Name } from '../SportsMarketsListCol';

const useSportsMarketsListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsMarkets, loading: isSportsMarketsLoading } = useSelector(
		(state) => state.SportsMarkets
	);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchSportsMarketsStart({
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting match details redux state
	useEffect(() => () => dispatch(resetSportsMarketsData()), []);

	const formattedSportsMarkets = useMemo(() => {
		const formattedValues = [];
		if (sportsMarkets?.markets?.length) {
			sportsMarkets.markets.map((market) =>
				formattedValues.push({
					...market,
					name: market?.name,
				})
			);
		}
		return formattedValues;
	}, [sportsMarkets?.markets]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalSportsMarketsCount: sportsMarkets?.totalPages,
		isSportsMarketsLoading,
		formattedSportsMarkets,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsMarketsListing;
