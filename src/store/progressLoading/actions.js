import { SHOW_LINEAR_PROGRESS, RESET_LINEAR_PROGRESS } from './actionTypes';

export const showLinearProgress = (payload) => ({
	type: SHOW_LINEAR_PROGRESS,
	payload,
});

export const resetSnackbar = () => ({
	type: RESET_LINEAR_PROGRESS,
});
