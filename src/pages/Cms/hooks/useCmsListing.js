import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCmsDetails } from '../../../store/cms/actions';

const itemsPerPage = 10;

const useCmsListing = () => {
	const { cmsDetails, isLoading, error } = useSelector(
		(state) => state.getAllCms
	);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');
	const [active, setActive] = useState('');
	const dispatch = useDispatch();

	const formattedCmsDetails = useMemo(() => {
		if (cmsDetails) {
			return cmsDetails?.rows.map((detail) => ({
				...detail,
				title: detail?.title?.EN,
				portal: detail?.tenant?.name
					? `${detail?.tenant?.name} ${detail.tenant?.domain}`
					: 'All',
			}));
		}
		return [];
	}, [cmsDetails]);

	const fetchData = () => {
		dispatch(
			getAllCmsDetails({
				limit: itemsPerPage,
				pageNo: page,
				tenantId: selectedPortal,
				adminId: selectedClient,
				search,
				isActive: active,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, selectedPortal, selectedClient, active, page]);

	return {
		cmsDetails,
		formattedCmsDetails,
		isLoading,
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
