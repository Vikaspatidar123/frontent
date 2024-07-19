import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotificationsStart } from '../../../store/actions';
import { selectedLanguage } from '../../../constants/config';

const useNotificationListing = () => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { notifications, loading: isNotificationLoading } = useSelector(
		(state) => state.Notification
	);

	const fetchData = () => {
		dispatch(
			fetchNotificationsStart({
				perPage: itemsPerPage,
				page: currentPage,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	const formattedNotifications = useMemo(() => {
		const formattedValues = [];
		if (notifications) {
			notifications?.notification?.map((notification) =>
				formattedValues.push({
					...notification,
					titleEN: notification?.title?.[selectedLanguage],
					descriptionEN: notification?.description?.[selectedLanguage],
				})
			);
		}
		return formattedValues;
	}, [notifications]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		currentPage,
		setCurrentPage,
		totalNotificationCount: notifications?.totalPages,
		isNotificationLoading,
		formattedNotifications,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useNotificationListing;
