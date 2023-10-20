import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWageringTemplateDetails } from '../../../store/wageringTemplate/actions';

const useWageringTemplate = () => {
	const { wageringTemplateDetail, wageringTemplateDetailLoading } = useSelector(
		(state) => state.WageringTemplate
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [wagerSearch, setWagerSearch] = useState('');
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

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
				limit: itemsPerPage,
				pageNo: page,
				search: wagerSearch,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, wagerSearch]);

	return {
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		itemsPerPage,
		totalwageringTemplateDetailCount: wageringTemplateDetail?.count,
		page,
		setPage,
		wagerSearch,
		setWagerSearch,
		onChangeRowsPerPage,
	};
};

export default useWageringTemplate;
