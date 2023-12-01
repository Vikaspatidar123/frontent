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
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchSportsMarketsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting match details redux state
	useEffect(() => () => dispatch(resetSportsMarketsData()), []);

	const formattedSportsMarkets = useMemo(() => {
		const formattedValues = [];
		if (sportsMarkets) {
			sportsMarkets.rows.map((market) =>
				formattedValues.push({
					...market,
					name: market.marketName[0].name,
				})
			);
		}
		return formattedValues;
	}, [sportsMarkets]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'marketId',
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
		totalSportsMarketsCount: sportsMarkets?.totalPage,
		isSportsMarketsLoading,
		formattedSportsMarkets,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsMarketsListing;
