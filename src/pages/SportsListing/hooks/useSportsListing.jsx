/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getSportsList,
	resetSportsList,
	updateStatusStart,
} from '../../../store/actions';

import { SportId, SportName, Status, Icon } from '../sportsListCol';
import ActionButtons from '../ActionButtons';

const useSportsListing = (filterValues = {}) => {
	const {
		sportsListInfo,
		isSportsListLoading,
		uploadImageSuccess,
		isUploadImageLoading,
	} = useSelector((state) => state.SportsList);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [sportId, setSportId] = useState('');
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const formattedSportsList = useMemo(() => {
		if (sportsListInfo?.sports?.length) {
			return sportsListInfo?.sports?.map((item) => ({
				...item,
				sportName: item.name,
				icons: '-',
			}));
		}
		return [];
	}, [sportsListInfo]);

	const fetchData = () => {
		dispatch(
			getSportsList({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage, uploadImageSuccess]);

	// resetting sports listing redux state
	useEffect(() => () => dispatch(resetSportsList()), []);

	useEffect(() => {
		if (uploadImageSuccess) {
			setShowUploadModal(false);
		}
	}, [uploadImageSuccess]);

	const handleUpload = (sportId) => {
		setSportId(sportId);
		setShowUploadModal(true);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { sportId } = props;
		dispatch(
			updateStatusStart({
				type: 'sport',
				id: sportId,
			})
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <SportId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'sportName',
				filterable: true,
				Cell: ({ cell }) => <SportName value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ICON',
				accessor: 'icon',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Icon value={cell} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						handleUpload={handleUpload}
					/>
				),
			},
		],
		[]
	);

	return {
		formattedSportsList,
		isSportsListLoading,
		sportsPages: sportsListInfo?.totalPages,
		page,
		setPage,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
		columns,
		showUploadModal,
		setShowUploadModal,
		isUploadImageLoading,
		sportId,
	};
};

export default useSportsListing;
