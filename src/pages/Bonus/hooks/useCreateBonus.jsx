import React, { useMemo, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import {
// 	leftStaticFormFields,
// 	rightStaticFormFields,
// 	getInitialValues,
// 	validationSchema,
// } from '../formDetails';
import // showLinearProgress,
'../../../store/progressLoading/actions';
// import useAdminListing from './useAdminListing';
import General from '../FormSections/General';
import { modules } from '../../../constants/permissions';

const useCreateBonus = () => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState('1');
	const [customComponent] = useState();

	const toggleTab = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};
	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('/bonus/create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.Bonus,
			operation: 'C',
		},
	]);

	const tabData = useMemo(() => [
		{
			id: '1',
			title: 'General',
			component: <General activeTab={activeTab} />,
		},
		{
			id: '2',
			title: 'Languages',
			component: <div />,
		},
		{
			id: '3',
			title: 'Currency',
			component: <div />,
		},
		{
			id: '4',
			title: 'Wagering Contribution',
			component: <div />,
		},
		{
			id: '5',
			title: 'Countries',
			component: <div />,
		},
	]);

	return {
		tabData,
		toggleTab,
		activeTab,

		customComponent,
		buttonList,
	};
};

export default useCreateBonus;
