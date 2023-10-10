import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBetSettingsData, getSportsList } from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';

const itemsPerPage = 10;

const useBetSettings = () => {
	const { betSettingsList, isLoading, error } = useSelector(
		(state) => state.BetSettings
	);
	const { sportsListInfo } = useSelector((state) => state.sportsList);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

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
				limit: 1,
				pageNo: 1,
				isAllListing: true,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	return {
		formattedBetSettingsList,
		isLoading,
		error,
		totalBetCount: betSettingsList?.length,
		page,
		setPage,
		itemsPerPage,
	};
};

export default useBetSettings;
