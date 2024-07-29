/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannels } from '../../../store/actions';
import { Title, Status, GLobal, Description } from '../ChannelListCol';

const useChannelListing = (filterValues = {}) => {
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const { channels, totalChannelsPages, isLoading } = useSelector(
		(state) => state.Channel
	);

	function onChangeRowsPerPage(value) {
		setItemsPerPage(value);
		setPage(1);
	}

	const formattedchannelDetails = useMemo(() => channels, [channels]);

	const fetchData = () => {
		const { ...rest } = filterValues;
		dispatch(
			getChannels({
				limit: itemsPerPage,
				pageNo: page,
				...rest,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'GLOBAL CHANNEL',
				accessor: 'isGlobal',
				filterable: true,
				Cell: ({ cell }) => <GLobal value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'DESCRIPTION',
			// 	accessor: 'description',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Description value={cell.value} />,
			// },
		],
		[]
	);

	return {
		formattedchannelDetails,
		channels,
		isLoading,
		page,
		setPage,
		totalCount: totalChannelsPages,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useChannelListing;
