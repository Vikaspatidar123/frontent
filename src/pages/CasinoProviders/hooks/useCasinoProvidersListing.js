import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCasinoProvidersDataStart } from '../../../store/actions';

const itemsPerPage = 10;

const useCasinoProvidersListing = () => {
	const { casinoProvidersData, isCasinoProvidersDataLoading } = useSelector(
		(state) => state.CasinoManagementData
	);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const fetchData = () => {
		dispatch(
			getCasinoProvidersDataStart({
				limit,
				pageNo: page,
				search,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, search]);

	return {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		itemsPerPage,
		limit,
		setLimit,
		search,
		setSearch,
		page,
		setPage,
	};
};

export default useCasinoProvidersListing;
