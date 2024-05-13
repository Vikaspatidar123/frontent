/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getWageringTemplateDetails,
	resetWageringTemplateDetail,
} from '../../../store/wageringTemplate/actions';
import {
	WageringTemplateId,
	CustomValues,
	WagerMultiplier,
} from '../WageringTemplateListCol';
import ActionButtons from '../ActionButtons';
import { showLinearProgress } from '../../../store/progressLoading/actions';
import { modules } from '../../../constants/permissions';

const useWageringTemplate = (filterValues = {}) => {
	const { wageringTemplateDetail, wageringTemplateDetailLoading } = useSelector(
		(state) => state.WageringTemplate
	);

	const navigate = useNavigate();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getWageringTemplateDetails({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page]);

	// resetting wagering templates redux state
	useEffect(() => () => dispatch(resetWageringTemplateDetail()), []);

	const handleEditClick = (row) => {
		navigate(`edit/${row.id}`);
		dispatch(showLinearProgress());
	};

	const handleViewClick = (row) => {
		navigate(`details/${row.id}`);
		dispatch(showLinearProgress());
	};

	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.bonus,
			operation: 'C',
		},
	]);

	const columns = useMemo(
		() => [
			{
				Header: 'Template Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <WageringTemplateId cell={cell} />,
			},
			{
				Header: 'Template Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <CustomValues cell={cell} />,
			},
			{
				Header: 'Wagering Requirement Type',
				accessor: 'wageringRequirementType',
				filterable: true,
				Cell: ({ cell }) => <CustomValues cell={cell} />,
			},
			{
				Header: 'Wagering Multiplier',
				accessor: 'wageringMultiplier',
				filterable: true,
				Cell: ({ cell }) => <WagerMultiplier cell={cell} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						cell={cell}
						handleEdit={handleEditClick}
						handleView={handleViewClick}
					/>
				),
			},
		],
		[]
	);

	return {
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		itemsPerPage,
		totalwageringTemplateDetailCount: wageringTemplateDetail?.totalPages,
		page,
		setPage,
		onChangeRowsPerPage,
		columns,
		buttonList,
	};
};

export default useWageringTemplate;
