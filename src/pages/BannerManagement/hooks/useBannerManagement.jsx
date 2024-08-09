/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pages, BannerPreview } from '../BannerManagementListCol';
import { getSABanners, resetSABannersData } from '../../../store/actions';
import { modules } from '../../../constants/permissions';
import { iconClass } from '../../../utils/constant';
import usePermission from '../../../components/Common/Hooks/usePermission';
import Actions from '../../../components/Common/Actions';

const useBannerManagement = (onClickEdit) => {
	const dispatch = useDispatch();

	const { SABanners, SABannersloading, isEditSABannersSuccess } = useSelector(
		(state) => state.SASettings
	);

	const { isGranted } = usePermission();

	const fetchData = () => {
		dispatch(getSABanners({}));
	};

	// resetting banner list redux state
	useEffect(() => () => dispatch(resetSABannersData()), []);

	useEffect(() => {
		if (isEditSABannersSuccess) fetchData();
	}, [isEditSABannersSuccess]);

	useEffect(() => fetchData(), []);

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: onClickEdit,
			isHidden: !isGranted(modules.banner, 'U'),
			icon: iconClass.edit,
			iconColor: 'text-info',
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'Id',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Id value={cell.value} />,
			// },
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
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[SABanners, isGranted(modules.banner, 'U')]
	);

	return {
		columns,
		formattedSABanners: SABanners || [],
		SABannersloading,
	};
};

export default useBannerManagement;
