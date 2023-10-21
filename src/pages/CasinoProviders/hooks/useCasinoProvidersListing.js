import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCasinoProvidersDataStart,
	updateCasinoStatusStart,
} from '../../../store/actions';

const useCasinoProvidersListing = () => {
	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		isCreateProviderSuccess,
		isEditProviderSuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [active, setActive] = useState('');
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getCasinoProvidersDataStart({
				limit: itemsPerPage,
				pageNo: page,
				search,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, search, active, itemsPerPage]);

	useEffect(() => {
		if (isCreateProviderSuccess || isEditProviderSuccess) fetchData();
	}, [isCreateProviderSuccess, isEditProviderSuccess]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, casinoProviderId } = props;
		dispatch(
			updateCasinoStatusStart({
				data: {
					code: 'CASINO_PROVIDER',
					casinoProviderId,
					status: !status,
				},
			})
		);
		setActive((prev) => !prev);
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
		onChangeRowsPerPage,
	};
};

export default useCasinoProvidersListing;
