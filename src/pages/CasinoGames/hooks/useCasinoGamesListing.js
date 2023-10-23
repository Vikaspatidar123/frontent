import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
	getCasinoSubCategoryDetailStart,
	updateSACasinoGamesStatusStart,
} from '../../../store/actions';

const useCasinoGamesListings = () => {
	const {
		casinoGames,
		isCasinoGamesLoading,
		casinoProvidersData,
		casinoSubCategoryDetails,
		isEditCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
	const [search, setSearch] = useState('');
	const [casinoGameId, setCasinoGameId] = useState();
	const [active, setActive] = useState('');
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState();
	const [selectedProvider, setSelectedProvider] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				limit: '',
				pageNo: '',
				gameCategoryId: '',
				search: '',
				isActive: '',
				tenantId: '',
			})
		);
		dispatch(
			getCasinoProvidersDataStart({ limit: '', pageNo: '', search: '' })
		);
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
				casinoCategoryId: selectedSubCategoryId,
				search,
				isActive: active,
				tenantId: '',
				selectedProvider,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [
		itemsPerPage,
		page,
		selectedSubCategoryId,
		search,
		active,
		selectedProvider,
		show,
	]);

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

	return {
		formattedCasinoGames,
		isCasinoGamesLoading,
		itemsPerPage,
		totalCasinoGamesCount: casinoGames?.count,
		onChangeRowsPerPage,
		search,
		setSearch,
		page,
		setPage,
		selectedSubCategoryId,
		setSelectedSubCategoryId,
		selectedProvider,
		setSelectedProvider,
		casinoGameId,
		setCasinoGameId,
		active,
		setActive,
		status,
		setStatus,
		handleStatus,
		show,
		setShow,
	};
};

export default useCasinoGamesListings;
