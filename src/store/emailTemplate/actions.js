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

export const getImageGallerySuccess = (payload) => ({
	type: GET_IMAGE_GALLERY_SUCCESS,
	payload,
});

export const getImageGalleryFail = (payload) => ({
	type: GET_IMAGE_GALLERY_FAIL,
	payload,
});

export const getImageGallery = (payload) => ({
	type: GET_IMAGE_GALLERY,
	payload,
});

export const uploadImageGallerySuccess = (payload) => ({
	type: UPLOAD_IMAGE_GALLERY_SUCCESS,
	payload,
});

export const uploadImageGalleryFail = (payload) => ({
	type: UPLOAD_IMAGE_GALLERY_FAIL,
	payload,
});

export const uploadImageGallery = (payload) => ({
	type: UPLOAD_IMAGE_GALLERY,
	payload,
});

export const deleteImageGallerySuccess = (payload) => ({
	type: DELETE_IMAGE_GALLERY_SUCCESS,
	payload,
});

export const deleteImageGalleryFail = (payload) => ({
	type: DELETE_IMAGE_GALLERY_FAIL,
	payload,
});

export const deleteImageGallery = (payload) => ({
	type: DELETE_IMAGE_GALLERY,
	payload,
});
