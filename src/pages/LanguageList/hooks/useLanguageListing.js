import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguagesStart } from '../../../store/actions';

const useLanguageListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
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
				search: searchText,
			})
		);
	}, [currentPage, searchText, itemsPerPage]);

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

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalLanguagesCount: languages?.count,
		isLanguagesLoading,
		formattedLanguages,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useLanguageListing;
