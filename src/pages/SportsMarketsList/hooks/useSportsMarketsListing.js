import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSportsMarketsStart } from '../../../store/actions';

const itemsPerPage = 10;

const useSportsMarketsListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsMarkets, loading: isSportsMarketsLoading } = useSelector(
		(state) => state.SportsMarkets
	);

	useEffect(() => {
		dispatch(
			fetchSportsMarketsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText]);

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

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalSportsMarketsCount: sportsMarkets?.totalPage,
		isSportsMarketsLoading,
		formattedSportsMarkets,
		itemsPerPage,
	};
};

export default useSportsMarketsListing;
