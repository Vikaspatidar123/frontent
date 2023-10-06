import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminDetails } from '../../../store/actions';

const itemsPerPage = 10;

const useAdminListing = () => {
	const dispatch = useDispatch();

	const { adminDetails, isLoading, error } = useSelector(
		(state) => state.getAllAdmins
	);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState('adminUserId');
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('desc');
	const [status, setStatus] = useState('');

	const formattedAdminDetails = useMemo(() => {
		if (adminDetails) {
			return adminDetails?.rows.map((admin) => ({
				...admin,
				fullName: `${admin.firstName} ${admin.lastName}`,
			}));
		}
		return [];
	}, [adminDetails]);

	const fetchData = () => {
		dispatch(
			getAdminDetails({
				limit: itemsPerPage,
				pageNo: page,
				orderBy,
				sort,
				search,
				adminRoleId: adminDetails?.adminRoleId,
				status,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, orderBy, sort, status]);

	return {
		adminDetails,
		formattedAdminDetails,
		isLoading,
		error,
		limit,
		setLimit,
		page,
		setPage,
		orderBy,
		setOrderBy,
		search,
		setSearch,
		sort,
		setSort,
		status,
		setStatus,
	};
};

export default useAdminListing;
