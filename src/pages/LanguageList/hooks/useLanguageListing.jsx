/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguagesStart } from '../../../store/actions';
import { Id, LanguageCode, LanguageName } from '../LanguageListCol';

const useLanguageListing = () => {
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
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Language Code',
				accessor: 'code',
				filterable: true,
				Cell: (cellProps) => <LanguageCode {...cellProps} />,
			},
			{
				Header: 'Language Name',
				accessor: 'languageName',
				filterable: true,
				Cell: (cellProps) => <LanguageName {...cellProps} />,
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
