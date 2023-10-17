import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSABanners } from '../../../store/actions';

const useBannerManagement = () => {
	const dispatch = useDispatch();

	const { SABanners, SABannersloading } = useSelector(
		(state) => state.SASettings
	);
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');

	const formattedSABanners = useMemo(() => {
		if (SABanners) {
			return SABanners.map((banner) =>
				Object.keys(banner.value).map((key) => {
					const pages = key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
					const bannerPreview = banner?.value[key];
					return { pages, bannerPreview };
				})
			).flat();
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

	return {
		formattedSABanners,
		SABannersloading,
		selectedPortal,
		setSelectedPortal,
		selectedClient,
		setSelectedClient,
	};
};

export default useBannerManagement;
