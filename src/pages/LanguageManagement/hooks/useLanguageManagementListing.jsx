/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguageManagementStart } from '../../../store/actions';
import { English, Keys } from '../LanguageManagementCol';

const itemsPerPage = 10;

const useLanguageManagementListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { languageManagement, loading: isLanguageManagementLoading } =
		useSelector((state) => state.LanguageManagement);

	useEffect(() => {
		dispatch(
			fetchLanguageManagementStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText]);

	const formattedLanguageManagement = useMemo(() => {
		const formattedValues = [];
		if (languageManagement && languageManagement.languageKeys) {
			Object.values(languageManagement.languageKeys).map((keys) =>
				keys.map((key) =>
					formattedValues.push({
						keys: key,
						english: languageManagement?.languageData?.[0]?.[key],
					})
				)
			);
		}

		return formattedValues;
	}, [languageManagement]);

	const columns = useMemo(
		() => [
			{
				Header: 'Keys',
				accessor: 'keys',
				filterable: true,
				Cell: ({ cell }) => <Keys value={cell.value} />,
			},
			{
				Header: 'English',
				accessor: 'english',
				filterable: true,
				Cell: ({ cell }) => <English cell={cell} />,
			},
			// {
			// 	Header: 'Action',
			// 	// accessor: 'username',
			// 	filterable: true,
			// 	Cell: (cellProps) => <Action {...cellProps} />,
			// },
		],
		[]
	);

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalLanguageManagementCount: languageManagement?.count,
		isLanguageManagementLoading,
		formattedLanguageManagement,
		itemsPerPage,
		columns,
	};
};

export default useLanguageManagementListing;
