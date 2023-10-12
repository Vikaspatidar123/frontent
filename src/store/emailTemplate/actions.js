import {
	GET_ALL_EMAIL_TEMPLATES,
	GET_ALL_EMAIL_TEMPLATES_SUCCESS,
	GET_ALL_EMAIL_TEMPLATES_FAIL,
} from './actionTypes';

export const getAllEmailTemplatesSuccess = (payload) => ({
	type: GET_ALL_EMAIL_TEMPLATES_SUCCESS,
	payload,
});

export const getAllEmailTemplatesFail = (payload) => ({
	type: GET_ALL_EMAIL_TEMPLATES_FAIL,
	payload,
});

export const getAllEmailTemplates = (payload) => ({
	type: GET_ALL_EMAIL_TEMPLATES,
	payload,
});
