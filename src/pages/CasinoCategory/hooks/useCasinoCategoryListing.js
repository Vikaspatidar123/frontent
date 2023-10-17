import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../utils/dateFormatter';
import {
	getCasinoCategoryDetailStart,
	getLanguagesStart,
} from '../../../store/casinoManagement/actions';

const itemsPerPage = 10;

const useCasinoCategoryListing = () => {
	const {
		casinoCategoryDetails,
		iscasinoCategoryDetailsLoading,
		languageData,
	} = useSelector((state) => state.CasinoManagementData);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const dispatch = useDispatch();

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

	useEffect(() => {
		dispatch(
			getCasinoCategoryDetailStart({
				limit,
				pageNo: page,
				search,
			})
		);
	}, [page, limit, search]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	}, []);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: () => null,
			link: '#!',
		},
	]);

	return {
		formattedCasinoCategoriesData,
		iscasinoCategoryDetailsLoading,
		languageData,
		limit,
		setLimit,
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
		buttonList,
	};
};

export default useCasinoCategoryListing;
