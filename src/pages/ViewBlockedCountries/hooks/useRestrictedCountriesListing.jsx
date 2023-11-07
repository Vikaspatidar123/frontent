/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestrictedCountriesStart } from '../../../store/actions';
import { KeyValueCell } from '../RestrictedCountriesListCol';

const useRestrictedCountriesListing = () => {
	const dispatch = useDispatch();
	const { state: casinoState } = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const paramId = useParams();
	const id =
		casinoState?.type === 'providers'
			? paramId?.casinoProviderId
			: paramId?.casinoGameId;
	const { restrictedCountries, restrictedCountriesLoading } = useSelector(
		(state) => state.RestrictedCountries
	);

	useEffect(() => {
		dispatch(
			fetchRestrictedCountriesStart({
				itemId: id,
				limit: itemsPerPage,
				pageNo: currentPage,
				type: casinoState?.type,
			})
		);
	}, [id, currentPage, itemsPerPage]);

	const columns = useMemo(() => [
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
	]);

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

	return {
		id,
		setCurrentPage,
		setItemsPerPage,
		itemsPerPage,
		currentPage,
		restrictedCountriesLoading,
		columns,
		formattedRestrictedCountries,
		restrictedCountriesCount: restrictedCountries?.count,
		onChangeRowsPerPage,
	};
};

export default useRestrictedCountriesListing;
