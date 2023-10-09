import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguageManagementStart } from '../../../store/actions';

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

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalLanguageManagementCount: languageManagement?.count,
		isLanguageManagementLoading,
		formattedLanguageManagement,
		itemsPerPage,
	};
};

export default useLanguageManagementListing;
