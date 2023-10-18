import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllCmsDetails,
	updateSaCmsStatus,
} from '../../../store/cms/actions';

const itemsPerPage = 10;

const useCmsListing = () => {
	const { cmsDetails, isLoading, error } = useSelector((state) => state.AllCms);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');
	const [active, setActive] = useState('');
	const [show, setShow] = useState(false);
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

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, cmsPageId } = props;
		setShow((prev) => !prev);
		dispatch(
			updateSaCmsStatus({
				data: {
					code: 'CMS',
					cmsPageId,
					status: !status,
				},
				limit,
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
		itemsPerPage,
		totalCmsCount: cmsDetails?.count,
		error,
		setLimit,
		setPage,
		setSearch,
		setSelectedClient,
		setSelectedPortal,
		setActive,
		handleStatus,
		show,
		setShow,
	};
};

export default useCmsListing;
