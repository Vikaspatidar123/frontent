/* eslint-disable no-case-declarations */
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
	UPDATE_STATUS_START,
	UPDATE_STATUS_SUCCESS,
	UPDATE_STATUS_FAIL,
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
	updateStatus: false,
	updateStatusError: null,
	isUpdateStatusLoading: false,
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

		case UPDATE_STATUS_START:
			return {
				...state,
				isUpdateStatusLoading: true,
			};

		case UPDATE_STATUS_SUCCESS:
			const data = {
				...state,
				isUpdateStatusLoading: false,
				updateStatus: true,
			};
			if (payload.code === 'SPORTS') {
				const temp = { ...state.sportsListInfo };
				const newObject = temp?.sportsList?.rows?.map((obj) => obj.sportId === payload.sportId
						? { ...obj, isActive: !!payload.status }
						: obj);
				const newData = {
					...state.sportsListInfo,
					sportsList: {
						...state.sportsListInfo.sportsList,
						rows: newObject,
					},
				};
				data.sportsListInfo = newData;
			} else if (payload.code === 'SPORTCONTRY') {
				const temp = { ...state.sportsCountries };
				const newObject = temp?.countryList?.rows?.map((obj) => obj.countryId === payload.sportCountryId
						? { ...obj, isActive: !!payload.status }
						: obj);
				const newData = {
					...state.sportsCountries,
					countryList: {
						...state.sportsCountries.countryList,
						rows: newObject,
					},
				};
				data.sportsCountries = newData;
			}
			return {
				...state,
				...data,
			};

		case UPDATE_STATUS_FAIL:
			return {
				...state,
				updateStatusError: payload,
				isUpdateStatusLoading: false,
				updateStatus: false,
			};

		default:
			return { ...state };
	}
};

export default sportsList;
