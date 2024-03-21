/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pages, BannerPreview, Id } from '../BannerManagementListCol';
import ActionButtons from '../ActionButtons';
import { getSABanners, resetSABannersData } from '../../../store/actions';

const useBannerManagement = (onClickEdit) => {
	const dispatch = useDispatch();

	const { SABanners, SABannersloading, isEditSABannersSuccess } = useSelector(
		(state) => state.SASettings
	);

	const fetchData = () => {
		dispatch(getSABanners({}));
	};

	// resetting banner list redux state
	useEffect(() => () => dispatch(resetSABannersData()), []);

	useEffect(() => {
		if (isEditSABannersSuccess) fetchData();
	}, [isEditSABannersSuccess]);

	useEffect(() => fetchData(), []);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'PAGES',
				accessor: 'type',
				filterable: true,
				Cell: ({ cell }) => <Pages value={cell.value} />,
			},
			{
				Header: 'BANNER PREVIEW',
				accessor: 'imageUrl',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <BannerPreview value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons row={cell.row} onClickEdit={onClickEdit} />
				),
			},
		],
		[]
	);

	return {
		columns,
		formattedSABanners: SABanners || [],
		SABannersloading,
	};
};

export default useBannerManagement;
