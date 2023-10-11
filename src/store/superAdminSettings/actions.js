import {
	GET_SA_BANNERS,
	GET_SA_BANNERS_SUCCESS,
	GET_SA_BANNERS_FAIL,
} from './actionTypes';

export const getSABanners = (payload) => ({
	type: GET_SA_BANNERS,
	payload,
});

export const getSABannersSuccess = (payload) => ({
	type: GET_SA_BANNERS_SUCCESS,
	payload,
});

export const getSABannersFail = (payload) => ({
	type: GET_SA_BANNERS_FAIL,
	payload,
});
