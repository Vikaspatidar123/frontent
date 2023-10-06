import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
// import { fetchLanguagesStart } from '../../../store/actions';

const itemsPerPage = 10;

const useLanguageListing = () => {
	// const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { languages, loading: isLanguagesLoading } = useSelector(
		(state) => state.Language
	);

	useEffect(() => {
		// dispatch(
		//   fetchLanguagesStart({
		//     limit: itemsPerPage,
		//     pageNo: currentPage,
		//     search: searchText,
		//   })
		// );
	}, [currentPage, searchText]);

	const formattedLanguage = useMemo(() => {
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
		totalLanguageCount: languages?.count,
		isLanguagesLoading,
		formattedLanguage,
		itemsPerPage,
	};
};

export default useLanguageListing;
