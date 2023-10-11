import {
	GET_SA_BANNERS,
	GET_SA_BANNERS_SUCCESS,
	GET_SA_BANNERS_FAIL,
} from './actionTypes';

const initialState = {
	SABanners: null,
	SABannersError: null,
	SABannersloading: false,
};

const SASettings = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case GET_SA_BANNERS:
			return {
				...state,
				SABannersloading: true,
			};

		case GET_SA_BANNERS_SUCCESS:
			return {
				...state,
				SABannersloading: false,
				SABanners: payload,
				SABannersError: null,
			};

		case GET_SA_BANNERS_FAIL:
			return {
				...state,
				SABannersloading: false,
				SABannersError: true,
			};

		default:
			return { ...state };
	}
};

export default SASettings;
