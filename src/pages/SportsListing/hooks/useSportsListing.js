import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsList } from '../../../store/actions';

const useSportsListing = () => {
	const { sportsListInfo, isSportsListLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [searchByName, setSearchByName] = useState('');
	const [searchByStatus, setSearchByStatus] = useState('');
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedSportsList = useMemo(() => {
		if (sportsListInfo) {
			return sportsListInfo?.rows?.map((item) => ({
				...item,
				sportName: item.sportName[0].name,
				icons: '-',
			}));
		}
		return [];
	}, [sportsListInfo]);

	const fetchData = () => {
		let isActive = '';
		if (searchByStatus === '1') {
			isActive = 'true';
		} else if (searchByStatus === '0') {
			isActive = 'false';
		}
		dispatch(
			getSportsList({
				limit: itemsPerPage,
				pageNo: page,
				search: searchByName,
				isActive,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage, searchByName, searchByStatus]);

	return {
		formattedSportsList,
		isSportsListLoading,
		totalSportsListCount: sportsListInfo?.count,
		page,
		setPage,
		itemsPerPage,
		searchByName,
		setSearchByName,
		searchByStatus,
		setSearchByStatus,
		onChangeRowsPerPage,
	};
};

export default useSportsListing;
