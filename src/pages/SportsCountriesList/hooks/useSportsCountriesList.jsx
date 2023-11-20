/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsCountries, updateStatusStart } from '../../../store/actions';
import {
	CountryId,
	CountryName,
	Icon,
	Status,
} from '../sportsCountriesListCol';
import ActionButtons from '../ActionButtons';

const useSportsCountriesListing = (filterValues = {}) => {
	const { sportsCountries, isSportsCountriesLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedSportsCountries = useMemo(() => {
		if (sportsCountries) {
			return sportsCountries?.rows?.map((item) => ({
				...item,
				countryName: item.countryName[0].name,
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

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, countryId: sportCountryId } = props;
		dispatch(
			updateStatusStart({
				code: 'SPORTCONTRY',
				status: !active,
				sportCountryId,
				limit: itemsPerPage,
				pageNo: page,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'countryId',
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
				accessor: 'icons',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Icon value={cell.value} />,
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
					<ActionButtons row={cell.row} handleStatus={handleStatus} />
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
	};
};

export default useSportsCountriesListing;
