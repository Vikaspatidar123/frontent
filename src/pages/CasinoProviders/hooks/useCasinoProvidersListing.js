import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCasinoProvidersDataStart,
	updateCasinoStatusStart,
} from '../../../store/actions';

const itemsPerPage = 10;

const useCasinoProvidersListing = () => {
	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		isCreateProviderSuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [active, setActive] = useState('');
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
	}, [limit, page, search, active]);

	useEffect(() => {
		if (isCreateProviderSuccess) fetchData();
	}, [isCreateProviderSuccess]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, casinoProviderId } = props;
		setActive((prev) => !prev);
		dispatch(
			updateCasinoStatusStart({
				data: {
					code: 'CASINO_PROVIDER',
					casinoProviderId,
					status: !status,
				},
			})
		);
	};

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
		handleStatus,
		active,
		setActive,
	};
};

export default useCasinoProvidersListing;
