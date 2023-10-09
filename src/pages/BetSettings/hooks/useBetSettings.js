import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBetSettingsData } from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';

const itemsPerPage = 10;

const useBetSettings = () => {
	const { betSettingsList, isLoading, error } = useSelector(
		(state) => state.BetSettings
	);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const formattedBetSettingsList = useMemo(() => {
		if (betSettingsList) {
			return betSettingsList.map((betSetting) => ({
				...betSetting,
				updatedAt: getDateTime(betSetting.updatedAt),
			}));
		}
		return [];
	}, [betSettingsList]);

	const fetchData = () => {
		dispatch(getBetSettingsData());
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
