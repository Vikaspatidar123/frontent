/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsList, updateStatusStart } from '../../../store/actions';

import { SportId, SportName, Status, Icon } from '../sportsListCol';
import ActionButtons from '../ActionButtons';

const useSportsListing = (filterValues = {}) => {
	const { sportsListInfo, isSportsListLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
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
		dispatch(
			getSportsList({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: status, sportId } = props;
		dispatch(
			updateStatusStart({
				code: 'SPORTS',
				status: !status,
				sportId,
				limit: itemsPerPage,
				pageNo: page,
			})
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'sportId',
				filterable: true,
				Cell: ({ cell }) => <SportId cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'sportName',
				filterable: true,
				Cell: ({ cell }) => <SportName cell={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: ({ cell }) => <Status cell={cell} />,
			},
			{
				Header: 'ICON',
				accessor: 'icons',
				disableFilters: true,
				Cell: ({ cell }) => <Icon cell={cell} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons cell={cell} handleStatus={handleStatus} />
				),
			},
		],
		[]
	);

	return {
		formattedSportsList,
		isSportsListLoading,
		totalSportsListCount: sportsListInfo?.count,
		page,
		setPage,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsListing;
