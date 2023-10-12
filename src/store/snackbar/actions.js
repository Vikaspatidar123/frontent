import { SET_SNACKBAR, RESET_SNACKBAR } from './actionTypes';

export const showSnackbar = (payload) => ({
	type: SET_SNACKBAR,
	payload,
});

export const resetSnackbar = () => ({
	type: RESET_SNACKBAR,
});
