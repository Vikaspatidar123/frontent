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
import ActionButtons from '../ActionButtons';

const useSportsCountriesListing = (filterValues = {}) => {
	const {
		sportsCountries,
		isSportsCountriesLoading,
		uploadImageSuccess,
		isUploadImageLoading,
	} = useSelector((state) => state.SportsList);

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [locationId, setLocationId] = useState('');
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedSportsCountries = useMemo(() => {
		if (sportsCountries) {
			return sportsCountries?.rows?.map((item) => ({
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
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		if (uploadImageSuccess) {
			setShowUploadModal(false);
		}
	}, [uploadImageSuccess]);

	const handleUpload = (id) => {
		setLocationId(id);
		setShowUploadModal(true);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, id: sportCountryId } = props;
		dispatch(
			updateStatusStart({
				code: 'LOCATION',
				status: active ? 'false' : 'true',
				locationId: sportCountryId,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, uploadImageSuccess]);

	// resetting sports countries redux state
	useEffect(() => () => dispatch(resetSportsCountries()), []);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
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
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportsCountriesCount: sportsCountries?.count,
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
