/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCmsDetails } from '../../../store/cms/actions';

const useCmsListing = () => {
	const { cmsDetails, loading, error } = useSelector(
		(state) => state.getAllCms
	);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');
	const [active, setActive] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			getAllCmsDetails({
				limit,
				pageNo: page,
				tenantId: selectedPortal,
				adminId: selectedClient,
				search,
				isActive: active,
			})
		);
	}, [limit, selectedPortal, selectedClient, active]);

	return {
		cmsDetails,
		loading,
		error,
		setLimit,
		setPage,
		setSearch,
		setSelectedClient,
		setSelectedPortal,
		setActive,
	};
};

export default useCmsListing;
