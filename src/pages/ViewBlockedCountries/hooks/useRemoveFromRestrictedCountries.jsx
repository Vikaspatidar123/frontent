/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	addRestrictedCountriesStart,
	fetchRestrictedCountriesStart,
} from '../../../store/actions';
import { KeyValueCell } from '../RestrictedCountriesListCol';
import ActionButtons from '../ActionButtons';

const useRemoveFromRestrictedCountriesListing = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { casinoProviderId } = useParams();
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
					itemId: casinoProviderId,
					limit: itemsPerPage,
					pageNo: currentPage,
					type: 'providers',
				})
			);
		}
	}, [casinoProviderId, currentPage, itemsPerPage, restrictedCountries]);

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
				type: 'providers',
				countryIds: countries,
				itemId: parseInt(casinoProviderId, 10),
				case: 'remove',
			})
		);
		navigate('/casino-providers');
	};

	return {
		casinoProviderId,
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
