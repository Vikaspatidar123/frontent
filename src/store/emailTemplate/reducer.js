import {
	GET_ALL_EMAIL_TEMPLATES,
	GET_ALL_EMAIL_TEMPLATES_SUCCESS,
	GET_ALL_EMAIL_TEMPLATES_FAIL,
	GET_IMAGE_GALLERY,
	GET_IMAGE_GALLERY_SUCCESS,
	GET_IMAGE_GALLERY_FAIL,
	UPLOAD_IMAGE_GALLERY,
	UPLOAD_IMAGE_GALLERY_SUCCESS,
	UPLOAD_IMAGE_GALLERY_FAIL,
	DELETE_IMAGE_GALLERY,
	DELETE_IMAGE_GALLERY_SUCCESS,
	DELETE_IMAGE_GALLERY_FAIL,
} from './actionTypes';

const INIT_STATE = {
	emailTemplates: [],
	emailTemplateOrder: [],
	templateCount: 0,
	emailTemplateloading: false,
	emailTemplateError: null,
	imageGallery: [],
	imageGalleryloading: false,
	imageGalleryError: null,
	uploadGallery: false,
	uploadGalleryloading: false,
	uploadGalleryError: null,
	deleteGallery: false,
	deleteGalleryloading: false,
	deleteGalleryError: null,
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

		case GET_IMAGE_GALLERY:
			return {
				...state,
				imageGalleryloading: true,
			};

		case GET_IMAGE_GALLERY_SUCCESS:
			return {
				...state,
				imageGalleryloading: false,
				imageGallery: payload,
			};

		case GET_IMAGE_GALLERY_FAIL:
			return {
				...state,
				imageGalleryloading: false,
				imageGalleryError: payload,
			};

		case UPLOAD_IMAGE_GALLERY:
			return {
				...state,
				uploadGalleryloading: true,
			};

		case UPLOAD_IMAGE_GALLERY_SUCCESS:
			return {
				...state,
				uploadGalleryloading: false,
				uploadGallery: true,
				uploadGalleryError: null,
			};

		case UPLOAD_IMAGE_GALLERY_FAIL:
			return {
				...state,
				uploadGalleryloading: false,
				uploadGalleryError: payload,
				uploadGallery: false,
			};

		case DELETE_IMAGE_GALLERY:
			return {
				...state,
				deleteGalleryloading: true,
			};

		case DELETE_IMAGE_GALLERY_SUCCESS:
			return {
				...state,
				deleteGalleryloading: false,
				deleteGallery: true,
				deleteGalleryError: null,
			};

		case DELETE_IMAGE_GALLERY_FAIL:
			return {
				...state,
				deleteGalleryloading: false,
				deleteGalleryError: payload,
				deleteGallery: false,
			};

		default:
			return { ...state };
	}
};

export default EmailTemplate;
