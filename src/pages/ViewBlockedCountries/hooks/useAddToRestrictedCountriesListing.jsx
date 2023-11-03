/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { casinoProviderId } = useParams();
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
				itemId: casinoProviderId,
				limit: itemsPerPage,
				pageNo: currentPage,
				type: 'providers',
				...filterValues,
			})
		);
	}, [casinoProviderId, currentPage, itemsPerPage]);

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
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'ACTIONS',
				accessor: 'action',
				filterable: false,
				Cell: (cellProps) => (
					<ActionButtons handleStatus={onAddCountry} cell={cellProps} />
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
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'ACTIONS',
				accessor: 'action',
				filterable: false,
				Cell: (cellProps) => (
					<ActionButtons
						type="remove"
						handleStatus={onRemoveCountry}
						cell={cellProps}
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
				type: 'providers',
				countryIds: countries,
				itemId: parseInt(casinoProviderId, 10),
			})
		);
		navigate('/casino-providers');
	};

	const onChangeSearch = (e) => {
		setSearchText(e.target.value);
	};

	return {
		casinoProviderId,
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
