import {
	GET_ALL_EMAIL_TEMPLATES,
	GET_ALL_EMAIL_TEMPLATES_SUCCESS,
	GET_ALL_EMAIL_TEMPLATES_FAIL,
} from './actionTypes';

const INIT_STATE = {
	emailTemplates: [],
	emailTemplateOrder: [],
	templateCount: 0,
	emailTemplateloading: false,
	emailTemplateError: null,
};

const EmailTemplate = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ALL_EMAIL_TEMPLATES:
			return {
				...state,
				emailTemplateloading: true,
			};

		case GET_ALL_EMAIL_TEMPLATES_SUCCESS:
			return {
				...state,
				emailTemplateloading: false,
				emailTemplates: payload?.emailTemplate,
				templateCount: payload.templateCount,
				emailTemplateOrder: payload?.emailTemplateOrder,
			};

		case GET_ALL_EMAIL_TEMPLATES_FAIL:
			return {
				...state,
				emailTemplateloading: false,
				emailTemplateError: payload,
			};

		default:
			return { ...state };
	}
};

export default EmailTemplate;
