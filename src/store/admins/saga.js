/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
import {
	put,
	takeLatest,
	all,
	fork,
	takeEvery,
	select,
} from 'redux-saga/effects';

// Crypto Redux States
import { cloneDeep } from 'lodash';
import {
	getAllAdminsSuccess,
	getAllAdminsFail,
	addSuperAdminUserSuccess,
	addSuperAdminUserFail,
	updateSuperAdminUserSuccess,
	updateSuperAdminUserFail,
	getAdminChildrenSuccess,
	getAdminChildrenFail,
} from './actions';
import {
	GET_ADMINS_DATA,
	ADD_SUPER_ADMIN_USER,
	UPDATE_SUPER_ADMIN_USER,
	GET_ADMIN_CHILDREN,
} from './actionTypes';

import { getAllAdminsList, getAdminChildren } from '../../network/getRequests';
import { addSuperAdminUser } from '../../network/postRequests';
import { updateSuperAdminUser } from '../../network/putRequests';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';
import { formPageTitle } from '../../components/Common/constants';

function* getAllAdmins(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getAllAdminsList(payload);
		yield put(getAllAdminsSuccess(data?.data));
	} catch (error) {
		yield put(getAllAdminsFail(error?.response?.data?.errors[0]?.description));
	}
}

function* addSuperAdminUserWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		delete data.role;
		yield addSuperAdminUser(data);

		showToastr({
			message: `${data?.role} Created Successfully`,
			type: 'success',
		});

		yield put(addSuperAdminUserSuccess());
		window.localStorage.removeItem(formPageTitle.staff);

		if (navigate) yield navigate('/staff');
	} catch (e) {
		yield put(addSuperAdminUserFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateSuperAdminUserWorker(action) {
	try {
		const { data, navigate } = action && action.payload;

		yield updateSuperAdminUser(data);

		showToastr({
			message: `${data?.role} Updated Successfully`,
			type: 'success',
		});

		yield put(updateSuperAdminUserSuccess());

		if (navigate) yield navigate('/staff');
	} catch (e) {
		yield put(updateSuperAdminUserFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getAdminChildrenWorker(action) {
	try {
		const { superAdminId } = action && action.payload;
		const { adminChildren } = yield select((state) => state.AllAdmins);

		const addChildrenToAdmin = (newAdminChildren, id, children) => {
			if (newAdminChildren?.id === id) {
				return (newAdminChildren.children = [...children]);
			}

			if (newAdminChildren?.children?.length) {
				for (const admin of newAdminChildren.children) {
					addChildrenToAdmin(admin, id, children);
				}
			}
		};

		const { data } = yield getAdminChildren({ superAdminId });

		const newAdminChildren = cloneDeep(adminChildren);
		const children = data?.data?.details?.map((item) => ({
			id: item.id,
			name: `${item.firstName || ''} (${item.childCount})`,
			children: [],
			data: item,
		}));
		yield addChildrenToAdmin(newAdminChildren, superAdminId, children);

		yield put(getAdminChildrenSuccess(newAdminChildren));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(getAdminChildrenFail());
	}
}

export function* watchGetAdminsData() {
	yield takeLatest(GET_ADMINS_DATA, getAllAdmins);
	yield takeEvery(ADD_SUPER_ADMIN_USER, addSuperAdminUserWorker);
	yield takeEvery(UPDATE_SUPER_ADMIN_USER, updateSuperAdminUserWorker);
	yield takeEvery(GET_ADMIN_CHILDREN, getAdminChildrenWorker);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
