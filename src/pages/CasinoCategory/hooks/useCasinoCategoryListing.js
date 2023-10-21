import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../utils/dateFormatter';
import {
	getCasinoCategoryDetailStart,
	getLanguagesStart,
	updateSACasinoGamesStatusStart,
} from '../../../store/casinoManagement/actions';

const useCasinoCategoryListing = () => {
	const {
		casinoCategoryDetails,
		iscasinoCategoryDetailsLoading,
		languageData,
		isCreateCategorySuccess,
		isEditCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedCasinoCategoriesData = useMemo(() => {
		if (casinoCategoryDetails) {
			return casinoCategoryDetails?.rows.map((category) => ({
				...category,
				nameEN: category?.name?.EN,
				createdAt: formatDate(category?.createdAt),
				updatedAt: formatDate(category?.updatedAt),
			}));
		}
		return [];
	}, [casinoCategoryDetails]);

	const fetchData = () => {
		dispatch(
			getCasinoCategoryDetailStart({
				limit: itemsPerPage,
				pageNo: page,
				search,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, search, itemsPerPage, active]);

	useEffect(() => {
		if (isCreateCategorySuccess || isEditCategorySuccess) fetchData();
	}, [isCreateCategorySuccess, isEditCategorySuccess]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	}, []);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: status, gameCategoryId } = props;
		dispatch(
			updateSACasinoGamesStatusStart({
				data: {
					code: 'CASINO_CATEGORY',
					gameCategoryId,
					status: !status,
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
		setActive((prev) => !prev);
	};

	return {
		formattedCasinoCategoriesData,
		iscasinoCategoryDetailsLoading,
		languageData,
		page,
		setPage,
		search,
		setSearch,
		itemsPerPage,
		totalCasinoCategriesCount: casinoCategoryDetails?.count,
		modal,
		setModal,
		isEdit,
		setIsEdit,
		job,
		setJob,
		handleStatus,
		active,
		setActive,
		onChangeRowsPerPage,
	};
};

export default useCasinoCategoryListing;
