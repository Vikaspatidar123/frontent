import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguagesStart } from '../../../store/actions';
// import { fetchLanguagesStart } from '../../../store/actions';

const itemsPerPage = 10;

const useLanguageListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { languages, loading: isLanguagesLoading } = useSelector(
		(state) => state.Languages
	);

	useEffect(() => {
		dispatch(
			fetchLanguagesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText]);

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
	};
};

export default useLanguageListing;
