import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	deleteSABannersStart,
	getSABanners,
	resetSABannersData,
} from '../../../store/actions';

const useBannerManagement = () => {
	const dispatch = useDispatch();

	const {
		SABanners,
		SABannersloading,
		isCreateSABannersSuccess,
		isEditSABannersSuccess,
		isDeleteSABannersSuccess,
	} = useSelector((state) => state.SASettings);
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');

	const formattedSABanners = useMemo(() => {
		if (SABanners?.rows) {
			return SABanners?.rows
				?.map((banner) =>
					Object.keys(banner.value).map((key) => {
						const pages = key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
						const bannerPreview = banner?.value[key];
						return { key, pages, bannerPreview };
					})
				)
				.flat();
		}
		return [];
	}, [SABanners]);

	const fetchData = () => {
		dispatch(
			getSABanners({
				limit: '',
				pageNo: '',
				adminId: selectedPortal ? '' : selectedClient,
				tenantId: selectedPortal,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [selectedClient, selectedPortal]);

	// resetting banner list redux state
	useEffect(() => () => dispatch(resetSABannersData()), []);

	const onClickDelete = (bannerType) => {
		dispatch(deleteSABannersStart({ bannerType }));
	};

	useEffect(() => {
		if (
			isCreateSABannersSuccess ||
			isEditSABannersSuccess ||
			isDeleteSABannersSuccess
		)
			fetchData();
	}, [
		isCreateSABannersSuccess,
		isEditSABannersSuccess,
		isDeleteSABannersSuccess,
	]);

	return {
		formattedSABanners,
		SABannersloading,
		selectedPortal,
		setSelectedPortal,
		selectedClient,
		setSelectedClient,
		onClickDelete,
	};
};

export default useBannerManagement;
