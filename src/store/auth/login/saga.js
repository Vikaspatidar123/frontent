/* eslint-disable no-debugger */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Buffer } from 'buffer';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from './actionTypes';
import { apiError, loginSuccess, logoutUserSuccess } from './actions';

// Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';
import { superAdminLogin } from '../../../network/postRequests';
import { setItem, setLoginToken } from '../../../network/storageUtils';

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
	try {
		const encryptedPass = Buffer.from(user.password).toString('base64');
		const res = yield call(superAdminLogin, {
			user: user.user,
			password: encryptedPass,
		});
		const {
			data: { data },
		} = res;
		const { accessToken } = data;

		setLoginToken(accessToken);
		setItem('role', 'Admin');
		yield put(loginSuccess(data));

		// if (import.meta.env.VITE_APP_DEFAULTAUTH === 'firebase') {
		// 	const response = yield call(
		// 		fireBaseBackend.loginUser,
		// 		user.email,
		// 		user.password
		// 	);
		// 	yield put(loginSuccess(response));
		// } else if (import.meta.env.VITE_APP_DEFAULTAUTH === 'jwt') {
		// 	const response = yield call(postJwtLogin, {
		// 		email: user.email,
		// 		password: user.password,
		// 	});
		// 	localStorage.setItem('authUser', JSON.stringify(response));
		// 	yield put(loginSuccess(response));
		// } else if (import.meta.env.VITE_APP_DEFAULTAUTH === 'fake') {
		// 	const response = yield call(postFakeLogin, {
		// 		email: user.email,
		// 		password: user.password,
		// 	});
		// 	localStorage.setItem('authUser', JSON.stringify(response));
		// 	yield put(loginSuccess(response));
		// }
		history('/dashboard');
	} catch (error) {
		const err =
			error?.response?.data?.errors?.[0]?.description || 'Failed to login';
		yield put(apiError(err, error.message));
		// yield put(apiError(error.message));
	}
}

function* logoutUser({ payload: { history } }) {
	try {
		localStorage.removeItem('authUser');

		if (import.meta.env.VITE_APP_DEFAULTAUTH === 'firebase') {
			const response = yield call(fireBaseBackend.logout);
			yield put(logoutUserSuccess(response));
		}
		history('/login');
	} catch (error) {
		yield put(apiError(error));
	}
}

function* socialLogin({ payload: { type, history } }) {
	try {
		if (import.meta.env.VITE_APP_DEFAULTAUTH === 'firebase') {
			const fireBaseBackendLocal = getFirebaseBackend();
			const response = yield call(fireBaseBackendLocal.socialLoginUser, type);
			if (response) {
				history('/dashboard');
			} else {
				history('/login');
			}
			localStorage.setItem('authUser', JSON.stringify(response));
			yield put(loginSuccess(response));
			if (response) history('/dashboard');
		}
	} catch (error) {
		yield put(apiError(error));
	}
}

function* authSaga() {
	yield takeEvery(LOGIN_USER, loginUser);
	yield takeLatest(SOCIAL_LOGIN, socialLogin);
	yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
