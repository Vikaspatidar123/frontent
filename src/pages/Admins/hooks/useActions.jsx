import { useMemo } from 'react';

const useActions = () => {
	// const handleAddClick = (e) => {
	// 	e.preventDefault();
	// 	setHeader('Add Staff');
	// 	setIsEdit(false);
	// 	toggleModal();
	// };

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			// handleClick: handleAddClick,
			link: '#!',
		},
	]);
	return { buttonList };
};

export default useActions;
