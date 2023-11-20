/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguagesStart } from '../../../store/actions';
import { Id, LanguageCode, LanguageName } from '../LanguageListCol';

const useLanguageListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { languages, loading: isLanguagesLoading } = useSelector(
		(state) => state.Languages
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchLanguagesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	const formattedLanguages = useMemo(() => {
		const formattedValues = [];
		if (languages) {
			languages.rows.map((language) =>
				formattedValues.push({
					...language,
				})
			);
		}
		return formattedValues;
	}, [languages]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'languageId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Language Name',
				accessor: 'languageName',
				filterable: true,
				Cell: ({ cell }) => <LanguageName value={cell.value} />,
			},
			{
				Header: 'Language Code',
				accessor: 'code',
				filterable: true,
				Cell: ({ cell }) => <LanguageCode value={cell.value} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalLanguagesCount: languages?.count,
		isLanguagesLoading,
		formattedLanguages,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useLanguageListing;
