import {
	GET_WAGERING_TEMPLATE_DETAILS,
	GET_WAGERING_TEMPLATE_DETAILS_SUCCESS,
	GET_ALL_WAGERING_TEMPLATE_DETAILS_FAIL,
	CREATE_WAGERING_TEMPLATE_DETAILS,
	CREATE_WAGERING_TEMPLATE_DETAILS_SUCCESS,
	CREATE_ALL_WAGERING_TEMPLATE_DETAILS_FAIL,
} from './actionTypes';

export const getWageringTemplateDetailsSuccess = (payload) => ({
	type: GET_WAGERING_TEMPLATE_DETAILS_SUCCESS,
	payload,
});

export const getWageringTemplateDetailsFail = (payload) => ({
	type: GET_ALL_WAGERING_TEMPLATE_DETAILS_FAIL,
	payload,
});

export const getWageringTemplateDetails = (payload) => ({
	type: GET_WAGERING_TEMPLATE_DETAILS,
	payload,
});

export const createWageringTemplateDetailsSuccess = (payload) => ({
	type: CREATE_WAGERING_TEMPLATE_DETAILS_SUCCESS,
	payload,
});

export const createWageringTemplateDetailsFail = (payload) => ({
	type: CREATE_ALL_WAGERING_TEMPLATE_DETAILS_FAIL,
	payload,
});

export const createWageringTemplateDetails = (payload) => ({
	type: CREATE_WAGERING_TEMPLATE_DETAILS,
	payload,
});
