import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
	getCasinoSubCategoryDetailStart,
	updateCasinoIsFeaturedStart,
	updateSACasinoGamesStatusStart,
} from '../../../store/actions';

const useCasinoGamesListings = (filterValues = {}) => {
	const {
		casinoGames,
		isCasinoGamesLoading,
		casinoProvidersData,
		casinoSubCategoryDetails,
		isEditCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isEmpty(casinoSubCategoryDetails)) {
			dispatch(
				getCasinoSubCategoryDetailStart({
					limit: itemsPerPage,
				})
			);
		}

		if (isEmpty(casinoProvidersData)) {
			dispatch(
				getCasinoProvidersDataStart({
					limit: itemsPerPage,
				})
			);
		}
	}, []);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const getCategoryName = (id) =>
		casinoSubCategoryDetails?.rows.find((val) => val.gameSubCategoryId === id)
			?.name?.EN;

	const getProviderName = (id) =>
		casinoProvidersData?.rows.find((val) => val.casinoProviderId === id)?.name;

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.rows.map((item) => ({
				...item,
				providerName: getProviderName(item?.casinoProviderId),
				subCategoryType: getCategoryName(item?.gameSubCategoryId),
				thumbnail: item?.thumbnailUrl,
			}));
		}
		return [];
	}, [casinoGames]);

	const fetchData = () => {
		dispatch(
			getCasinoGamesStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, show]);

	useEffect(() => {
		if (isEditCasinoGamesSuccess) fetchData();
	}, [isEditCasinoGamesSuccess]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: state, casinoGameId: id } = props;
		dispatch(
			updateSACasinoGamesStatusStart({
				data: {
					code: 'CASINO_GAME',
					casinoGameId: id,
					status: !state,
				},
				// limit,
				// pageNo: page,
				// casinoCategoryId: selectedSubCategoryId,
				// search,
				// isActive: active,
				// tenantId: '',
				// selectedProvider,
			})
		);
		setShow((prev) => !prev);
	};
	const toggleIsFeaturedGames = (event, cell) => {
		event.preventDefault();
		const data = {
			isFeatured: event.target.checked.toString(),
			casinoProviderId: cell.row.original.casinoProviderId,
			casinoGameId: cell.row.original.casinoGameId.toString(),
		};
		dispatch(updateCasinoIsFeaturedStart(data));
	};
	return {
		formattedCasinoGames,
		isCasinoGamesLoading,
		itemsPerPage,
		totalCasinoGamesCount: casinoGames?.count,
		onChangeRowsPerPage,
		page,
		setPage,
		handleStatus,
		toggleIsFeaturedGames,
	};
};

export default useCasinoGamesListings;
