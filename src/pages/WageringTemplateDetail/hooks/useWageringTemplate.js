import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWageringTemplateDetails } from '../../../store/wageringTemplate/actions';

const useWageringTemplate = (filterValues = {}) => {
	const { wageringTemplateDetail, wageringTemplateDetailLoading } = useSelector(
		(state) => state.WageringTemplate
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getWageringTemplateDetails({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page]);

	return {
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		itemsPerPage,
		totalwageringTemplateDetailCount: wageringTemplateDetail?.count,
		page,
		setPage,
		onChangeRowsPerPage,
	};
};

export default useWageringTemplate;
