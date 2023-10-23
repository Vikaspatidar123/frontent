import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBetSettingsData, getSportsList } from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';

const useBetSettings = () => {
	const {
		betSettingsList,
		isLoading,
		error,
		isCreateBetSettingsSuccess,
		isEditBetSettingsSuccess,
	} = useSelector((state) => state.BetSettings);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { sportsListInfo } = useSelector((state) => state.SportsList);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const getSportsName = (sportId) => {
		const sportsName = sportsListInfo?.rows?.filter(
			(x) => x.sportId === sportId
		);
		if (sportsName?.length > 0) {
			return sportsName[0].sportName[0].name || '-';
		}
		return 'Default';
	};

	const formattedBetSettingsList = useMemo(() => {
		if (betSettingsList) {
			return betSettingsList.map((betSetting) => ({
				...betSetting,
				sportsName: getSportsName(betSetting?.sportId?.toString()),
				updatedAt: getDateTime(betSetting?.updatedAt),
			}));
		}
		return [];
	}, [betSettingsList, sportsListInfo]);

	const fetchData = () => {
		dispatch(getBetSettingsData());
		dispatch(
			getSportsList({
				limit: itemsPerPage,
				pageNo: page,
				isAllListing: true,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	useEffect(() => {
		if (isCreateBetSettingsSuccess || isEditBetSettingsSuccess) fetchData();
	}, [isCreateBetSettingsSuccess, isEditBetSettingsSuccess]);

	return {
		formattedBetSettingsList,
		isLoading,
		error,
		totalBetCount: betSettingsList?.length,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useBetSettings;
