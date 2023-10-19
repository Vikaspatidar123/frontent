import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../utils/dateFormatter';
import {
	getCasinoCategoryDetailStart,
	getLanguagesStart,
} from '../../../store/casinoManagement/actions';

const useCasinoCategoryListing = () => {
	const {
		casinoCategoryDetails,
		iscasinoCategoryDetailsLoading,
		languageData,
		isCreateCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedCasinoCategoriesData = useMemo(() => {
		if (casinoCategoryDetails) {
			return casinoCategoryDetails?.rows.map((category) => ({
				...category,
				name: category?.name?.EN,
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
	}, [page, search, itemsPerPage]);

	useEffect(() => {
		if (isCreateCategorySuccess) fetchData();
	}, [isCreateCategorySuccess]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	}, []);

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
		onChangeRowsPerPage,
	};
};

export default useCasinoCategoryListing;
