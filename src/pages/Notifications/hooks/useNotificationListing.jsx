/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { fetchNotificationsStart } from '../../../store/actions';
import { selectedLanguage } from '../../../constants/config';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { Id, KeyValueCell, Status } from '../NotificationListCol';

const useNotificationListing = () => {
	const dispatch = useDispatch();
	const { permissions } = usePermission();

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
	const buttonList = useMemo(() => [
		{
			label: 'Send Notification',
			link: '/send-notification',
			module: modules.page,
			operation: 'C',
		},
	]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				// filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Title',
				accessor: 'titleEN',
				// filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Description',
				accessor: 'descriptionEN',
				// filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ul className="list-unstyled hstack gap-1 mb-0">
						<li>
							<Button
								type="button"
								className="btn btn-sm btn-soft-info"
								onClick={(e) => {
									e.preventDefault();
									// onClickEdit(cell?.row?.original);
								}}
							>
								<i
									className="mdi mdi-eye-outline"
									id={`view-players-${cell?.row?.original?.id}`}
								/>
								<UncontrolledTooltip
									placement="top"
									target={`view-players-${cell?.row?.original?.id}`}
								>
									Edit
								</UncontrolledTooltip>
							</Button>
						</li>
					</ul>
				),
			},
		],
		[permissions]
	);

	return {
		currentPage,
		setCurrentPage,
		totalNotificationCount: notifications?.totalPages,
		isNotificationLoading,
		formattedNotifications,
		itemsPerPage,
		onChangeRowsPerPage,
		buttonList,
		columns,
	};
};

export default useNotificationListing;
