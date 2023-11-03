/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestrictedCountriesStart } from '../../../store/actions';
import { KeyValueCell } from '../RestrictedCountriesListCol';

const useRestrictedCountriesListing = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { casinoProviderId } = useParams();
	const { restrictedCountries, restrictedCountriesLoading } = useSelector(
		(state) => state.RestrictedCountries
	);

	useEffect(() => {
		dispatch(
			fetchRestrictedCountriesStart({
				itemId: casinoProviderId,
				limit: itemsPerPage,
				pageNo: currentPage,
				type: 'providers',
			})
		);
	}, [casinoProviderId, currentPage, itemsPerPage]);

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
		casinoProviderId,
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
