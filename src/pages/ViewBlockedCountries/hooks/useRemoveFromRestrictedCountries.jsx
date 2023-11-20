/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	addRestrictedCountriesStart,
	fetchRestrictedCountriesStart,
} from '../../../store/actions';
import { KeyValueCell } from '../RestrictedCountriesListCol';
import ActionButtons from '../ActionButtons';

const useRemoveFromRestrictedCountriesListing = () => {
	const dispatch = useDispatch();
	const { state: casinoState } = useLocation();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const paramId = useParams();
	const id =
		casinoState?.type === 'providers'
			? paramId?.casinoProviderId
			: paramId?.casinoGameId;
	const {
		restrictedCountries,
		restrictedCountriesLoading,
		addToRestrictedCountriesLoading,
	} = useSelector((state) => state.RestrictedCountries);
	const [restrictedCountriesState, setRestrictedCountriesState] = useState([]);
	const [selectedCountriesState, setSelectedCountriesState] = useState([]);

	useEffect(() => {
		if (!restrictedCountries) {
			dispatch(
				fetchRestrictedCountriesStart({
					itemId: id,
					limit: itemsPerPage,
					pageNo: currentPage,
					type: casinoState?.type,
				})
			);
		}
	}, [id, currentPage, itemsPerPage, restrictedCountries]);

	const onAddCountry = (cell) => {
		setSelectedCountriesState((prev) => [...prev, cell]);
		setRestrictedCountriesState((prev) =>
			prev.filter((country) => country.countryId !== cell.countryId)
		);
	};

	const onRemoveCountry = (cell) => {
		setSelectedCountriesState((prev) =>
			prev.filter((country) => country.countryId !== cell.countryId)
		);
		setRestrictedCountriesState((prev) => [...prev, cell]);
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

	const formattedRestrictedCountries = useMemo(() => {
		const formattedValues = [];
		if (restrictedCountries) {
			restrictedCountries.rows.map((country) =>
				formattedValues.push({
					...country,
				})
			);
		}
		return formattedValues;
	}, [restrictedCountries]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		if (formattedRestrictedCountries.length) {
			setRestrictedCountriesState(formattedRestrictedCountries);
		} else setRestrictedCountriesState([]);
	}, [formattedRestrictedCountries]);

	const onSubmitSelected = () => {
		const countries = selectedCountriesState.map((g) => g.countryId);
		dispatch(
			addRestrictedCountriesStart({
				type: casinoState?.type,
				countryIds: countries,
				itemId: parseInt(id, 10),
				case: 'remove',
			})
		);
		navigate(`/casino-${casinoState?.type}`);
	};

	return {
		id,
		setCurrentPage,
		setItemsPerPage,
		itemsPerPage,
		currentPage,
		columns,
		onChangeRowsPerPage,
		restrictedCountries,
		restrictedCountriesLoading,
		restrictedCountriesCount: restrictedCountries?.count,
		formattedRestrictedCountries,
		restrictedCountriesState,
		selectedCountriesState,
		selectedTableColumns,
		onSubmitSelected,
		addToRestrictedCountriesLoading,
	};
};

export default useRemoveFromRestrictedCountriesListing;
