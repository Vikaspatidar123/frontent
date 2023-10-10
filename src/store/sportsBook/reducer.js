import {
	GET_SPORTS_LIST,
	GET_SPORTS_LIST_SUCCESS,
	GET_SPORTS_LIST_FAIL,
	GET_SPORTS_COUNTRIES,
	GET_SPORTS_COUNTRIES_SUCCESS,
	GET_SPORTS_COUNTRIES_FAIL,
} from './actionTypes';

const INIT_STATE = {
	sportsListInfo: null,
	isSportsListError: null,
	isSportsListLoading: true,
	sportsCountries: null,
	isSportsCountriesError: null,
	isSportsCountriesLoading: true,
};

const sportsList = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_SPORTS_LIST:
			return {
				...state,
				isSportsListLoading: false,
			};

		case GET_SPORTS_LIST_SUCCESS:
			return {
				...state,
				isSportsListLoading: true,
				sportsListInfo: payload,
				isSportsListError: null,
			};

		case GET_SPORTS_LIST_FAIL:
			return {
				...state,
				isSportsListError: payload,
				isSportsListLoading: true,
			};

		case GET_SPORTS_COUNTRIES:
			return {
				...state,
				isSportsCountriesLoading: false,
			};

		case GET_SPORTS_COUNTRIES_SUCCESS:
			return {
				...state,
				isSportsCountriesLoading: true,
				sportsCountries: payload,
				isSportsCountriesError: null,
			};

		case GET_SPORTS_COUNTRIES_FAIL:
			return {
				...state,
				isSportsCountriesError: payload,
				isSportsCountriesLoading: true,
			};

		default:
			return { ...state };
	}
};

export default sportsList;
