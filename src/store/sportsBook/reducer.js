import {
	GET_SPORTS_LIST,
	GET_SPORTS_LIST_SUCCESS,
	GET_SPORTS_LIST_FAIL,
	GET_SPORTS_COUNTRIES,
	GET_SPORTS_COUNTRIES_SUCCESS,
	GET_SPORTS_COUNTRIES_FAIL,
	GET_SPORTS_TOURNAMENT_LIST,
	GET_SPORTS_TOURNAMENT_LIST_SUCCESS,
	GET_SPORTS_TOURNAMENT_LIST_FAIL,
} from './actionTypes';

const INIT_STATE = {
	sportsListInfo: null,
	sportsListError: null,
	isSportsListLoading: true,
	sportsCountries: null,
	sportsCountriesError: null,
	isSportsCountriesLoading: true,
	sportsTournamentList: null,
	sportsTournamentListError: null,
	isSportsTournamentListLoading: true,
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
				sportsListError: null,
			};

		case GET_SPORTS_LIST_FAIL:
			return {
				...state,
				sportsListError: payload,
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
				sportsCountriesError: null,
			};

		case GET_SPORTS_COUNTRIES_FAIL:
			return {
				...state,
				sportsCountriesError: payload,
				isSportsCountriesLoading: true,
			};

		case GET_SPORTS_TOURNAMENT_LIST:
			return {
				...state,
				isSportsTournamentListLoading: false,
			};

		case GET_SPORTS_TOURNAMENT_LIST_SUCCESS:
			return {
				...state,
				isSportsTournamentListLoading: true,
				sportsTournamentList: payload,
				sportsTournamentListError: null,
			};

		case GET_SPORTS_TOURNAMENT_LIST_FAIL:
			return {
				...state,
				sportsTournamentListError: payload,
				SportsTournamentListLoading: true,
			};

		default:
			return { ...state };
	}
};

export default sportsList;
