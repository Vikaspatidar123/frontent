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

const useSportsCountriesListing = () => {
	const { sportsCountries, isSportsCountriesLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [page, setPage] = useState(1);
	const [active, setActive] = useState(false);
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
			})
		);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: status, countryId: sportCountryId } = props;
		dispatch(
			updateStatusStart({
				code: 'SPORTCONTRY',
				status: !status,
				sportCountryId,
				limit: itemsPerPage,
				pageNo: page,
			})
		);
		setActive((prev) => !prev);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, active]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'countryId',
				filterable: true,
				Cell: ({ cell }) => <CountryId cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'countryName',
				filterable: true,
				Cell: ({ cell }) => <CountryName cell={cell} />,
			},
			{
				Header: 'ICON',
				accessor: 'icons',
				disableFilters: true,
				Cell: ({ cell }) => <Icon cell={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: ({ cell }) => <Status cell={cell} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons cell={cell} handleStatus={handleStatus} />
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
		active,
		setActive,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsCountriesListing;
