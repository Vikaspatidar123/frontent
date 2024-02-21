import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCasinoProvidersDataStart,
	resetCasinoProvidersData,
	updateCasinoStatusStart,
} from '../../../store/actions';

const useCasinoProvidersListing = (filterValues = {}) => {
	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		isCreateProviderSuccess,
		isEditProviderSuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getCasinoProvidersDataStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, itemsPerPage]);

	// resetting providers list redux state
	useEffect(() => () => dispatch(resetCasinoProvidersData()), []);

	useEffect(() => {
		if (isCreateProviderSuccess || isEditProviderSuccess) fetchData();
	}, [isCreateProviderSuccess, isEditProviderSuccess]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, casinoProviderId } = props;
		dispatch(
			updateCasinoStatusStart({
				code: 'CASINO_PROVIDER',
				casinoProviderId,
				status: !status,
			})
		);
	};

	return {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		itemsPerPage,
		limit,
		setLimit,
		page,
		setPage,
		handleStatus,
		onChangeRowsPerPage,
	};
};

export default useCasinoProvidersListing;
