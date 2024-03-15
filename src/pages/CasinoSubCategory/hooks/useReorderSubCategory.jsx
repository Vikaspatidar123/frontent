import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { modules } from '../../../constants/permissions';
import {
	getCasinoCategoryDetailStart,
	getCasinoSubCategoryDetailStart,
	reorderCasinoSubCategoryStart,
} from '../../../store/actions';
import { selectedLanguage } from '../../../constants/config';

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
		if (casinoSubCategoryDetails?.subCategories) {
			setState({
				rows: casinoSubCategoryDetails?.subCategories,
				count: casinoSubCategoryDetails?.subCategories?.length,
			});
		}
	}, [casinoSubCategoryDetails]);

	useEffect(() => {
		if (selectedCategory) {
			dispatch(
				getCasinoSubCategoryDetailStart({
					casinoCategoryId: selectedCategory,
				})
			);
		}
	}, [selectedCategory]);

	const formattedState = useMemo(
		() =>
			state.rows.map((item) => ({
				reorderId: item?.id,
				name: item?.name[selectedLanguage],
				isActive: item?.isActive,
			})),
		[state]
	);

	const handleSave = () => {
		const row = [];
		state.rows.map((list) => row.push(list.id));
		dispatch(
			reorderCasinoSubCategoryStart({
				data: { subCategoryIds: row },
				navigate,
			})
		);
	};

	const buttonList = [
		{
			label: 'Save',
			handleClick: handleSave,
			link: '#!',
			module: modules.casinoManagement,
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
