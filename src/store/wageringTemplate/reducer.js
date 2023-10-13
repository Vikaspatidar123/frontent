import {
	GET_WAGERING_TEMPLATE_DETAILS,
	GET_WAGERING_TEMPLATE_DETAILS_SUCCESS,
	GET_ALL_WAGERING_TEMPLATE_DETAILS_FAIL,
} from './actionTypes';

const INIT_STATE = {
	wageringTemplateDetailLoading: false,
	wageringTemplateDetailError: null,
	wageringTemplateDetail: null,
};

const WageringTemplate = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_WAGERING_TEMPLATE_DETAILS:
			return {
				...state,
				wageringTemplateDetailLoading: true,
			};

		case GET_WAGERING_TEMPLATE_DETAILS_SUCCESS:
			return {
				...state,
				wageringTemplateDetailLoading: false,
				wageringTemplateDetail: payload,
				wageringTemplateDetailError: null,
			};

		case GET_ALL_WAGERING_TEMPLATE_DETAILS_FAIL:
			return {
				...state,
				wageringTemplateDetailError: payload,
				wageringTemplateDetailLoading: true,
			};

		default:
			return { ...state };
	}
};

export default WageringTemplate;
