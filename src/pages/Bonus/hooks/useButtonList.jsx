import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../../../constants/permissions';

const useButtonList = () => {
	const navigate = useNavigate();
	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('/bonus/create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.bonus,
			operation: 'C',
		},
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.bonus,
			operation: 'U',
		},
	]);

	return {
		buttonList,
	};
};

export default useButtonList;
