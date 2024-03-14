import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getUserDetailsSuccess,
	getUserDetailsFail,
	getUserDocumentsSuccess,
	getUserDocumentsFail,
	getUserBonusSuccess,
	getUserBonusFail,
	getUserCommentsSuccess,
	getUserCommentsFail,
	createUserCommentSuccess,
	createUserCommentFail,
	resetUserLimitFail,
	resetUserLimitSuccess,
	updateSAUserStatusFail,
	updateSAUserStatusSuccess,
	markUserAsInternalSuccess,
	markUserAsInternalFail,
	verifyUserEmailSuccess,
	verifyUserEmailFail,
	getDuplicateUsersSuccess,
	getDuplicateUsersFail,
	getAllBonusSuccess,
	getAllBonusFail,
	getUserBonusDetailsSuccess,
	getUserBonusDetailsFail,
	issueBonusSuccess,
	issueBonusFail,
	depositToOtherSuccess,
	depositToOtherFail,
	updateUserInfoSuccess,
	updateUserInfoFail,
	sendPasswordResetSuccess,
	sendPasswordResetFail,
	updateUserPasswordSuccess,
	updateUserPasswordFail,
	markDocumentRequiredSuccess,
	markDocumentRequiredFail,
	cancelUserBonusSuccess,
	cancelUserBonusFail,
	resolveUserCommentSuccess,
	resolveUserCommentFail,
	acceptUserDocsSuccess,
	acceptUserDocsFail,
	attachTagSuccess,
	attachTagFail,
	getAllTagsSuccess,
	getAllTagsFail,
	removeTagSuccess,
	removeTagFail,
} from './actions';
import {
	ACCEPT_USER_DOC,
	ATTACH_TAG,
	CANCEL_USER_BONUS,
	CREATE_USER_COMMENT,
	DEPOSIT_TO_OTHER,
	DISABLE_USER,
	GET_ALL_BONUS,
	GET_ALL_TAGS,
	GET_BONUS_DETAILS,
	GET_DUPLICATE_USERS,
	GET_USER_BONUS,
	GET_USER_COMMENTS,
	GET_USER_DETAILS,
	GET_USER_DOCUMENTS,
	ISSUE_BONUS,
	MARK_DOCUMENT_REQUIRED,
	MARK_USER_AS_INTERNAL,
	REMOVE_TAG,
	RESET_USER_LIMIT,
	RESOLVE_USER_COMMENT,
	SEND_PASSWORD_RESET,
	UPDATE_SA_USER_STATUS,
	UPDATE_USER_INFO,
	UPDATE_USER_PASSWORD,
	VERIFY_USER_EMAIL,
} from './actionTypes';
import {
	getAllBonus,
	getAllUserTags,
	getBonusDetails,
	getCommentsList,
	getDuplicateUsers,
	getUserBonuses,
	getUserDetails,
	getUserDocument,
} from '../../network/getRequests';
import {
	addDepositToOtherCall,
	attachUserTags,
	createUserCommentEntry,
	disableUserCall,
	issueBonus,
	removeUserTags,
	resetDepositLimitCall,
	resetPasswordEmail,
	resetUserLimitCall,
	updateSAUserStatusCall,
	updateUserInfoCall,
	updateUserPassword,
	verifyPlayerEmail,
} from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import {
	cancelBonus,
	cancelDocumentRequest,
	markUserAsInternal,
	requestDocument,
	updateComment,
	verifyUserDocument,
} from '../../network/putRequests';
import { formPageTitle } from '../../components/Common/constants';

function* getUserDetailsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDetails(payload);

		yield put(getUserDetailsSuccess(data?.data?.user));
	} catch (e) {
		yield put(getUserDetailsFail(e.message));
	}
}

function* getUserDocumentsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDocument(payload);

		yield put(getUserDocumentsSuccess(data?.data?.userDocument));
	} catch (e) {
		yield put(getUserDocumentsFail(e.message));
	}
}

function* getUserBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserBonuses(payload);

		yield put(getUserBonusSuccess(data?.data?.userBonus));
	} catch (e) {
		yield put(getUserBonusFail(e.message));
	}
}

function* getUserCommentsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getCommentsList(payload);

		yield put(getUserCommentsSuccess(data?.data?.comment));
	} catch (e) {
		yield put(getUserCommentsFail(e.message));
	}
}

function* getAllUserTagsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getAllUserTags(payload);

		yield put(getAllTagsSuccess(data?.data?.tags));
	} catch (e) {
		yield put(getAllTagsFail(e.message));
	}
}

function* createUserCommentWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield createUserCommentEntry(payload);

		showToastr({
			message: `Note Added Successfully`,
			type: 'success',
		});

		window.localStorage.removeItem(formPageTitle.notes);
		yield put(createUserCommentSuccess(data?.data?.comment));
	} catch (e) {
		yield put(createUserCommentFail(e.message));
	}
}

function* resetUserLimitWorker(action) {
	try {
		const { userId, value, type, key, reset } = action && action.payload;
		if (type === 'bet') {
			yield resetUserLimitCall({
				userId,
				value,
				key,
				reset,
			});
		} else if (type === 'deposit' || type === 'loss') {
			yield resetDepositLimitCall({
				userId,
				value,
				key,
				reset,
			});
		}
		showToastr({
			message: `Limit ${reset ? 'Reset' : 'Set'} Successfully`,
			type: 'success',
		});
		yield put(resetUserLimitSuccess());
	} catch (e) {
		yield put(resetUserLimitFail(e.message));
	}
}

function* disableUserWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield disableUserCall(payload);
		yield put(resetUserLimitSuccess(data?.data));
		showToastr({
			message: `User ${payload.reset ? 'Enabled' : 'Disabled'} Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(resetUserLimitFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateSAUserStatusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateSAUserStatusCall(payload);
		yield put(updateSAUserStatusSuccess(data?.data));

		showToastr({
			message: `Preferences Saved Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(updateSAUserStatusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* markUserAsInternalWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield markUserAsInternal(payload);
		yield put(markUserAsInternalSuccess(data?.data));

		showToastr({
			message: `User Marked as Internal`,
			type: 'success',
		});
	} catch (e) {
		yield put(markUserAsInternalFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* verifyUserEmailWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield verifyPlayerEmail(payload);
		yield put(verifyUserEmailSuccess(data?.data));

		showToastr({
			message: `User Email Verified Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(verifyUserEmailFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* attachUserTagsWorker(action) {
	try {
		const payload = action && action.payload;
		yield attachUserTags(payload);
		yield put(attachTagSuccess());

		showToastr({
			message: `Tag Attached Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(attachTagFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* removeUserTagsWorker(action) {
	try {
		const payload = action && action.payload;
		yield removeUserTags(payload);
		yield put(removeTagSuccess());

		showToastr({
			message: `Tag Removed Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(removeTagFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getDuplicateUsersWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getDuplicateUsers(payload);
		yield put(getDuplicateUsersSuccess(data?.data));
	} catch (e) {
		yield put(getDuplicateUsersFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getBonusDetailsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getBonusDetails(payload);
		yield put(getUserBonusDetailsSuccess(data?.data?.bonusDetails));
	} catch (e) {
		yield put(getUserBonusDetailsFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getAllBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getAllBonus(payload);
		yield put(getAllBonusSuccess(data?.data?.bonus));
	} catch (e) {
		yield put(getAllBonusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* issueBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield issueBonus(payload);
		yield put(issueBonusSuccess(data?.data?.bonus));
		showToastr({
			message: `Bonus Issued Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(issueBonusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* depositToOtherWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield addDepositToOtherCall(payload);
		yield put(depositToOtherSuccess(data?.data?.bonus));
		showToastr({
			message:
				payload.amount > 0
					? `Deposit Successful`
					: 'Amount Removed from Wallet Successful',
			type: 'success',
		});
	} catch (e) {
		yield put(depositToOtherFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateUserInfoWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateUserInfoCall(payload);
		yield put(updateUserInfoSuccess(data?.data));
		showToastr({
			message: 'User Info Updated Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(updateUserInfoFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* sendPasswordResetWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield resetPasswordEmail(payload);
		yield put(sendPasswordResetSuccess(data?.data));
		showToastr({
			message: 'Reset Link Sent Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(sendPasswordResetFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateUserPasswordWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateUserPassword(payload);
		yield put(updateUserPasswordSuccess(data?.data));
		showToastr({
			message: 'User Password Updated Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(updateUserPasswordFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* markDocumentRequiredWorker(action) {
	try {
		const payload = action && action.payload;

		if (payload.isRequested) {
			yield requestDocument(payload);
		} else yield cancelDocumentRequest(payload);
		yield put(markDocumentRequiredSuccess(true));
		showToastr({
			message: payload.isRequested
				? 'Document Requested Successfully'
				: 'Document Unrequested Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(markDocumentRequiredFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* cancelUserBonusWorker(action) {
	try {
		const payload = action && action.payload;

		yield cancelBonus(payload);
		yield put(cancelUserBonusSuccess(true));
		showToastr({
			message: 'Bonus Cancelled Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(cancelUserBonusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* resolveUserCommentWorker(action) {
	try {
		const payload = action && action.payload;

		yield updateComment(payload);
		yield put(resolveUserCommentSuccess(true));
		showToastr({
			message: 'Resolved Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(resolveUserCommentFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* acceptUserDocWorker(action) {
	try {
		const payload = action && action.payload;

		yield verifyUserDocument(payload);
		yield put(acceptUserDocsSuccess(true));
		showToastr({
			message:
				payload.status === 'approved'
					? 'Accepted Successfully'
					: 'Rejected Succesfully',
			type: 'success',
		});
	} catch (e) {
		yield put(acceptUserDocsFail(e.message));
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* userDetailsWatcher() {
	yield takeLatest(GET_USER_DETAILS, getUserDetailsWorker);
	yield takeLatest(GET_USER_DOCUMENTS, getUserDocumentsWorker);
	yield takeLatest(GET_USER_BONUS, getUserBonusWorker);
	yield takeLatest(GET_USER_COMMENTS, getUserCommentsWorker);
	yield takeLatest(CREATE_USER_COMMENT, createUserCommentWorker);
	yield takeLatest(RESET_USER_LIMIT, resetUserLimitWorker);
	yield takeLatest(DISABLE_USER, disableUserWorker);
	yield takeLatest(UPDATE_SA_USER_STATUS, updateSAUserStatusWorker);
	yield takeLatest(MARK_USER_AS_INTERNAL, markUserAsInternalWorker);
	yield takeLatest(VERIFY_USER_EMAIL, verifyUserEmailWorker);
	yield takeLatest(ATTACH_TAG, attachUserTagsWorker);
	yield takeLatest(GET_DUPLICATE_USERS, getDuplicateUsersWorker);
	yield takeLatest(GET_BONUS_DETAILS, getBonusDetailsWorker);
	yield takeLatest(GET_ALL_BONUS, getAllBonusWorker);
	yield takeLatest(ISSUE_BONUS, issueBonusWorker);
	yield takeLatest(DEPOSIT_TO_OTHER, depositToOtherWorker);
	yield takeLatest(UPDATE_USER_INFO, updateUserInfoWorker);
	yield takeLatest(UPDATE_USER_PASSWORD, updateUserPasswordWorker);
	yield takeLatest(SEND_PASSWORD_RESET, sendPasswordResetWorker);
	yield takeLatest(MARK_DOCUMENT_REQUIRED, markDocumentRequiredWorker);
	yield takeLatest(CANCEL_USER_BONUS, cancelUserBonusWorker);
	yield takeLatest(RESOLVE_USER_COMMENT, resolveUserCommentWorker);
	yield takeLatest(ACCEPT_USER_DOC, acceptUserDocWorker);
	yield takeLatest(GET_ALL_TAGS, getAllUserTagsWorker);
	yield takeLatest(REMOVE_TAG, removeUserTagsWorker);
}

function* UserDetailsSaga() {
	yield all([fork(userDetailsWatcher)]);
}

export default UserDetailsSaga;
