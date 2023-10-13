import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWageringTemplateDetails } from '../../../store/wageringTemplate/actions';

const itemsPerPage = 10;

const useWageringTemplate = () => {
	const { wageringTemplateDetail, wageringTemplateDetailLoading } = useSelector(
		(state) => state.WageringTemplate
	);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [wagerSearch, setWagerSearch] = useState('');
	const dispatch = useDispatch();

	// const formattedCmsDetails = useMemo(() => {
	// 	if (cmsDetails) {
	// 		return cmsDetails?.rows.map((detail) => ({
	// 			...detail,
	// 			title: detail?.title?.EN,
	// 			portal: detail?.tenant?.name
	// 				? `${detail?.tenant?.name} ${detail.tenant?.domain}`
	// 				: 'All',
	// 		}));
	// 	}
	// 	return [];
	// }, [cmsDetails]);

	const fetchData = () => {
		dispatch(
			getWageringTemplateDetails({
				limit,
				pageNo: page,
				search: wagerSearch,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, wagerSearch]);

	return {
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		itemsPerPage,
		totalwageringTemplateDetailCount: wageringTemplateDetail?.count,
		limit,
		setLimit,
		page,
		setPage,
		wagerSearch,
		setWagerSearch,
	};
};

export default useWageringTemplate;
