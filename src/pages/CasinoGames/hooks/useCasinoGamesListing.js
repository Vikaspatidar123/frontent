import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
	getCasinoSubCategoryDetailStart,
	updateCasinoIsFeaturedStart,
	updateSACasinoGamesStatusStart,
	deleteCasinoGamesStart,
} from '../../../store/actions';
import { modules } from '../../../constants/permissions';

const useCasinoGamesListings = (filterValues = {}) => {
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const dispatch = useDispatch();

	const {
		casinoGames,
		isCasinoGamesLoading,
		casinoProvidersData,
		casinoSubCategoryDetails,
		isEditCasinoGamesSuccess,
		isDeleteCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);

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
	}, [itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const getCategoryName = (id) =>
		casinoSubCategoryDetails?.rows.find((val) => val.gameSubCategoryId === id)
			?.name?.EN;

	const getProviderName = (id) =>
		casinoProvidersData?.rows.find((val) => val.casinoProviderId === id)?.name;

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames?.rows?.length) {
			return casinoGames?.rows.map((item) => ({
				...item,
				providerName: getProviderName(item?.casinoProviderId),
				subCategoryType: getCategoryName(item?.gameSubCategoryId),
				thumbnail: item?.thumbnailUrl,
			}));
		}
		return [];
	}, [casinoGames, casinoProvidersData, casinoSubCategoryDetails]);

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
	}, [itemsPerPage, page]);

	useEffect(() => {
		if (isEditCasinoGamesSuccess || isDeleteCasinoGamesSuccess) fetchData();
	}, [isEditCasinoGamesSuccess, isDeleteCasinoGamesSuccess]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, casinoGameId: id } = props;
		dispatch(
			updateSACasinoGamesStatusStart({
				code: 'CASINO_GAME',
				casinoGameId: id,
				status: !active,
			})
		);
	};

	const handleDeleteItem = (casinoGameId) => {
		dispatch(
			deleteCasinoGamesStart({
				casinoGameId,
				limit: itemsPerPage,
				pageNo: page,
				search: '',
			})
		);
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

	const buttonList = useMemo(() => [
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.CasinoManagement,
			operation: 'U',
		},
	]);

	return {
		casinoGames,
		formattedCasinoGames,
		isCasinoGamesLoading,
		itemsPerPage,
		totalCasinoGamesCount: casinoGames?.count,
		onChangeRowsPerPage,
		page,
		setPage,
		handleStatus,
		toggleIsFeaturedGames,
		handleDeleteItem,
		buttonList,
	};
};

export default useCasinoGamesListings;
