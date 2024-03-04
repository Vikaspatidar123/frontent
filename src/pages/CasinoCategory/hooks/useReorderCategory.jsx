import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getCasinoCategoryDetailStart,
	reorderCasinoCategoryStart,
} from '../../../store/casinoManagement/actions';
import { modules } from '../../../constants/permissions';

const useReorderCategory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { casinoCategoryDetails, iscasinoCategoryDetailsLoading } = useSelector(
		(state) => state.CasinoManagementData
	);
	const [state, setState] = useState({ rows: [], count: 0 });

	const fetchData = () => {
		dispatch(
			getCasinoCategoryDetailStart({
				perPage: '',
				page: '',
				search: '',
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (casinoCategoryDetails) {
			setState(casinoCategoryDetails);
		}
	}, [casinoCategoryDetails]);

	useEffect(() => {
		dispatch(
			getCasinoCategoryDetailStart({
				perPage: '',
				page: '',
				search: '',
				tenantId: '',
			})
		);
	}, []);

	const formattedState = useMemo(
		() =>
			state.rows.map((item) => ({
				reorderId: item?.gameCategoryId,
				name: item?.name?.EN,
				isActive: item?.isActive,
			})),
		[state]
	);

	const handleSave = () => {
		const row = [];
		state.rows.map((list) => row.push(list.gameCategoryId));
		dispatch(
			reorderCasinoCategoryStart({
				data: { order: row },
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
		iscasinoCategoryDetailsLoading,
		buttonList,
		formattedState,
	};
};

export default useReorderCategory;
