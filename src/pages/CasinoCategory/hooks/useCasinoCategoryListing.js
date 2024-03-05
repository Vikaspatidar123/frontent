import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../utils/dateFormatter';
import {
	getCasinoCategoryDetailStart,
	getLanguagesStart,
	resetCasinoCategoryData,
	updateSACasinoGamesStatusStart,
} from '../../../store/casinoManagement/actions';

const useCasinoCategoryListing = (filterValues = {}) => {
	const {
		casinoCategoryDetails,
		iscasinoCategoryDetailsLoading,
		languageData,
		isCreateCategorySuccess,
		isEditCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const formattedCasinoCategoriesData = useMemo(() => {
		if (casinoCategoryDetails) {
			return casinoCategoryDetails?.categories.map((category) => ({
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
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	// resetting category list redux state
	useEffect(() => () => dispatch(resetCasinoCategoryData()), []);

	useEffect(() => {
		if (isCreateCategorySuccess || isEditCategorySuccess) fetchData();
	}, [isCreateCategorySuccess, isEditCategorySuccess]);

	useEffect(() => {
		dispatch(getLanguagesStart());
	}, []);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: status, gameCategoryId } = props;
		dispatch(
			updateSACasinoGamesStatusStart({
				code: 'CASINO_CATEGORY',
				gameCategoryId,
				status: !status,
			})
		);
	};

	return {
		formattedCasinoCategoriesData,
		iscasinoCategoryDetailsLoading,
		languageData,
		page,
		setPage,
		itemsPerPage,
		totalCasinoCategriesCount: casinoCategoryDetails?.count,
		modal,
		setModal,
		isEdit,
		setIsEdit,
		job,
		setJob,
		handleStatus,
		onChangeRowsPerPage,
	};
};

export default useCasinoCategoryListing;
