import {
	ADD_RESTRICTED_COUNTRIES_FAIL,
	ADD_RESTRICTED_COUNTRIES_START,
	ADD_RESTRICTED_COUNTRIES_SUCCESS,
	FETCH_RESTRICTED_COUNTRIES_FAIL,
	FETCH_RESTRICTED_COUNTRIES_START,
	FETCH_RESTRICTED_COUNTRIES_SUCCESS,
	FETCH_UNRESTRICTED_COUNTRIES_FAIL,
	FETCH_UNRESTRICTED_COUNTRIES_START,
	FETCH_UNRESTRICTED_COUNTRIES_SUCCESS,
} from './actionTypes';

const initialState = {
	restrictedCountries: null,
	restrictedCountriesError: '',
	restrictedCountriesLoading: false,
	unrestrictedCountries: null,
	unrestrictedCountriesError: '',
	unrestrictedCountriesLoading: false,
	addToRestrictedCountriesSuccess: null,
	addToRestrictedCountriesError: '',
	addToRestrictedCountriesLoading: false,
};

const restrictedCountriesReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_RESTRICTED_COUNTRIES_START:
			return {
				...state,
				restrictedCountriesLoading: true,
			};

		case FETCH_RESTRICTED_COUNTRIES_FAIL:
			return {
				...state,
				restrictedCountriesLoading: false,
				restrictedCountriesError: true,
			};

		case FETCH_RESTRICTED_COUNTRIES_SUCCESS:
			return {
				...state,
				restrictedCountriesLoading: false,
				restrictedCountries: payload,
			};

		case FETCH_UNRESTRICTED_COUNTRIES_START:
			return {
				...state,
				unrestrictedCountriesLoading: true,
			};

		case FETCH_UNRESTRICTED_COUNTRIES_FAIL:
			return {
				...state,
				unrestrictedCountriesLoading: false,
				unrestrictedCountriesError: true,
			};

		case FETCH_UNRESTRICTED_COUNTRIES_SUCCESS:
			return {
				...state,
				unrestrictedCountriesLoading: false,
				unrestrictedCountries: payload,
			};

		case ADD_RESTRICTED_COUNTRIES_START:
			return {
				...state,
				addToRestrictedCountriesLoading: true,
			};

		case ADD_RESTRICTED_COUNTRIES_FAIL:
			return {
				...state,
				addToRestrictedCountriesSuccess: false,
				addToRestrictedCountriesError: true,
				addToRestrictedCountriesLoading: false,
			};

		case ADD_RESTRICTED_COUNTRIES_SUCCESS:
			return {
				...state,
				addToRestrictedCountriesSuccess: true,
				addToRestrictedCountriesError: false,
				addToRestrictedCountriesLoading: false,
			};

		default:
			return state;
	}
};

export default restrictedCountriesReducer;
