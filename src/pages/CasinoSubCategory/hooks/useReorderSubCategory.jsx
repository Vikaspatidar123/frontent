import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { modules } from '../../../constants/permissions';
import {
	getCasinoCategoryDetailStart,
	getCasinoSubCategoryDetailStart,
	reorderCasinoSubCategoryStart,
} from '../../../store/actions';

const useReorderSubCategory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { casinoCategoryDetails, casinoSubCategoryDetails } = useSelector(
		(state) => state.CasinoManagementData
	);

	const [state, setState] = useState({ rows: [], count: 0 });
	const [selectedCategory, setSelectedCategory] = useState('');

	const fetchData = () => {
		dispatch(getCasinoCategoryDetailStart({}));
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (casinoSubCategoryDetails) {
			setState(casinoSubCategoryDetails);
		}
	}, [casinoSubCategoryDetails]);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(
				getCasinoSubCategoryDetailStart({
					perPage: '',
					page: '',
					search: '',
					gameCategoryId: selectedCategory,
				})
			);
		}
	}, [selectedCategory]);

	const formattedState = useMemo(
		() =>
			state.rows.map((item) => ({
				reorderId: item?.gameSubCategoryId,
				name: item?.name?.EN,
				isActive: item?.isActive,
			})),
		[state]
	);

	const handleSave = () => {
		const row = [];
		state.rows.map((list) => row.push(list.gameSubCategoryId));
		dispatch(
			reorderCasinoSubCategoryStart({
				data: { order: row, gameCategoryId: Number(selectedCategory) },
				navigate,
			})
		);
	};

	const buttonList = [
		{
			label: 'Save',
			handleClick: handleSave,
			link: '#!',
			module: modules.CasinoManagement,
			operation: 'U',
		},
	];

	return {
		state,
		setState,
		buttonList,
		formattedState,
		selectedCategory,
		setSelectedCategory,
		casinoCategoryDetails,
	};
};

export default useReorderSubCategory;
