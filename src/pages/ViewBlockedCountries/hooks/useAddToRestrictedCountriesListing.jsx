/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	addRestrictedCountriesStart,
	fetchUnrestrictedCountriesStart,
} from '../../../store/actions';
import { KeyValueCell } from '../RestrictedCountriesListCol';
import ActionButtons from '../ActionButtons';

const useAddToRestrictedCountriesListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state: casinoState } = useLocation();
	const paramId = useParams();
	const id =
		casinoState?.type === 'providers'
			? paramId?.casinoProviderId
			: paramId?.casinoGameId;
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const {
		unrestrictedCountries,
		unrestrictedCountriesLoading,
		addToRestrictedCountriesLoading,
	} = useSelector((state) => state.RestrictedCountries);
	const [unrestrictedCountriesState, setUnrestrictedCountriesState] = useState(
		[]
	);
	const [selectedCountriesState, setSelectedCountriesState] = useState([]);

	useEffect(() => {
		dispatch(
			fetchUnrestrictedCountriesStart({
				itemId: id,
				limit: itemsPerPage,
				pageNo: currentPage,
				type: casinoState?.type,
				...filterValues,
			})
		);
	}, [id, currentPage, itemsPerPage]);

	const onAddCountry = (cell) => {
		setSelectedCountriesState((prev) => [...prev, cell]);
		setUnrestrictedCountriesState((prev) =>
			prev.filter((country) => country.countryId !== cell.countryId)
		);
	};

	const onRemoveCountry = (cell) => {
		setSelectedCountriesState((prev) =>
			prev.filter((country) => country.countryId !== cell.countryId)
		);
		setUnrestrictedCountriesState((prev) => [...prev, cell]);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'countryId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'ACTIONS',
				accessor: 'action',
				disableSortBy: true,
				filterable: false,
				Cell: ({ cell }) => (
					<ActionButtons handleStatus={onAddCountry} row={cell.row} />
				),
			},
		],
		[]
	);

	const selectedTableColumns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'countryId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'ACTIONS',
				accessor: 'action',
				disableSortBy: true,
				filterable: false,
				Cell: ({ cell }) => (
					<ActionButtons
						type="remove"
						handleStatus={onRemoveCountry}
						row={cell.row}
					/>
				),
			},
		],
		[]
	);

	const formattedUnrestrictedCountries = useMemo(() => {
		const formattedValues = [];
		if (unrestrictedCountries) {
			unrestrictedCountries.rows.map((country) =>
				formattedValues.push({
					...country,
				})
			);
		}
		return formattedValues;
	}, [unrestrictedCountries]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		if (formattedUnrestrictedCountries.length) {
			setUnrestrictedCountriesState(formattedUnrestrictedCountries);
		} else setUnrestrictedCountriesState([]);
	}, [formattedUnrestrictedCountries]);

	const onSubmitSelected = () => {
		const countries = selectedCountriesState.map((g) => g.countryId);
		dispatch(
			addRestrictedCountriesStart({
				type: casinoState?.type,
				countryIds: countries,
				itemId: parseInt(id, 10),
			})
		);
		navigate(`/casino-${casinoState?.type}`);
	};

	const onChangeSearch = (e) => {
		setSearchText(e.target.value);
	};

	return {
		id,
		setCurrentPage,
		setItemsPerPage,
		itemsPerPage,
		currentPage,
		columns,
		onChangeRowsPerPage,
		unrestrictedCountries,
		unrestrictedCountriesLoading,
		unrestrictedCountriesCount: unrestrictedCountries?.count,
		formattedUnrestrictedCountries,
		unrestrictedCountriesState,
		selectedCountriesState,
		selectedTableColumns,
		onSubmitSelected,
		addToRestrictedCountriesLoading,
		searchText,
		onChangeSearch,
	};
};

export default useAddToRestrictedCountriesListing;
