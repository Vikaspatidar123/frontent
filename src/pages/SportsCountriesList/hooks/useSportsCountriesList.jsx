/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getSportsCountries,
	resetSportsCountries,
	updateStatusStart,
} from '../../../store/actions';
import {
	CountryId,
	CountryName,
	Icon,
	Status,
} from '../sportsCountriesListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
import { iconClass } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';

const useSportsCountriesListing = (filterValues = {}) => {
	const {
		sportsCountries,
		isSportsCountriesLoading,
		uploadSportsCountryImageSuccess,
		isUploadImageLoading,
	} = useSelector((state) => state.SportsList);

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [locationId, setLocationId] = useState('');
	const { isGranted, permissions } = usePermission();
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const formattedSportsCountries = useMemo(() => {
		if (sportsCountries?.locations?.length) {
			return sportsCountries?.locations?.map((item) => ({
				...item,
				countryName: item.name,
				icons: '-',
			}));
		}
		return [];
	}, [sportsCountries]);

	const fetchData = () => {
		dispatch(
			getSportsCountries({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		if (uploadSportsCountryImageSuccess) {
			setShowUploadModal(false);
		}
	}, [uploadSportsCountryImageSuccess]);

	const handleUpload = ({ id }) => {
		setLocationId(id);
		setShowUploadModal(true);
	};

	const handleStatus = (props) => {
		const { id } = props;
		dispatch(
			updateStatusStart({
				type: 'location',
				id,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, uploadSportsCountryImageSuccess]);

	// resetting sports countries redux state
	useEffect(() => () => dispatch(resetSportsCountries()), []);

	const actionsList = [
		{
			actionName: 'Toggle Status',
			actionHandler: handleStatus,
			isHidden: !isGranted(modules.sportsbookManagement, 'U'),
			icon: iconClass.toggleStatus,
			iconColor: 'text-success',
		},
		{
			actionName: 'Upload Icon',
			actionHandler: handleUpload,
			isHidden: !isGranted(modules.sportsbookManagement, 'U'),
			icon: iconClass.upload,
			iconColor: 'text-info',
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <CountryId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'countryName',
				filterable: true,
				Cell: ({ cell }) => <CountryName value={cell.value} />,
			},
			{
				Header: 'ICON',
				accessor: 'icon',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Icon value={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[formattedSportsCountries, permissions]
	);

	return {
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportLocationPages: sportsCountries?.totalPages,
		page,
		setPage,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
		columns,
		showUploadModal,
		setShowUploadModal,
		locationId,
		isUploadImageLoading,
	};
};

export default useSportsCountriesListing;
