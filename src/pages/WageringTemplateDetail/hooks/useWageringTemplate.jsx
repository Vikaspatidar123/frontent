/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getWageringTemplateDetails,
	resetWageringTemplateDetail,
} from '../../../store/wageringTemplate/actions';
import { WageringTemplateId, TemplateName } from '../WageringTemplateListCol';
import ActionButtons from '../ActionButtons';
import { showLinearProgress } from '../../../store/progressLoading/actions';

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
		navigate(`edit/${row.wageringTemplateId}`);
		dispatch(showLinearProgress());
	};

	const handleViewClick = (row) => {
		navigate(`details/${row.wageringTemplateId}`);
		dispatch(showLinearProgress());
	};

	const columns = useMemo(
		() => [
			{
				Header: 'TEMPLATE ID',
				accessor: 'wageringTemplateId',
				filterable: true,
				Cell: ({ cell }) => <WageringTemplateId cell={cell} />,
			},
			{
				Header: 'TEMPLATE NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <TemplateName cell={cell} />,
			},
			{
				Header: 'ACTION',
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
		totalwageringTemplateDetailCount: wageringTemplateDetail?.count,
		page,
		setPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useWageringTemplate;
