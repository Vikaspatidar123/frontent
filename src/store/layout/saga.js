import { all, call, fork, takeEvery, put, select } from 'redux-saga/effects';
import { isEqual } from 'lodash';

import {
	CHANGE_LAYOUT,
	CHANGE_LAYOUT_WIDTH,
	CHANGE_SIDEBAR_THEME,
	CHANGE_SIDEBAR_THEME_IMAGE,
	CHANGE_SIDEBAR_TYPE,
	CHANGE_TOPBAR_THEME,
	SHOW_RIGHT_SIDEBAR,
	CHANGE_LAYOUT_MODE,
	CHANGE_PRELOADER,
	SET_TABLE_HEADER_THEME,
	SET_BREADCRUMB,
} from './actionTypes';

import { changeSidebarType as changeSidebarTypeAction } from './actions';
import { updateSiteDetails } from '../../network/postRequests';
import { LAYOUT_INIT_STATE } from './reducer';

let siteLayoutPrevious = LAYOUT_INIT_STATE;

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
	if (document.body) document.body.setAttribute(attribute, value);
	return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass, action = 'toggle') {
	switch (action) {
		case 'add':
			if (document.body) document.body.classList.add(cssClass);
			break;
		case 'remove':
			if (document.body) document.body.classList.remove(cssClass);
			break;
		default:
			if (document.body) document.body.classList.toggle(cssClass);
			break;
	}

	return true;
}

/**
 * Changes the layout type
 * @param {*} param0
 */

function* updateSiteDetailsWorker() {
	try {
		const siteLayout = yield select((state) => state.Layout);
		if (!isEqual(siteLayoutPrevious, siteLayout)) {
			siteLayoutPrevious = siteLayout;
			yield updateSiteDetails({ siteLayout });
		}
	} catch (err) {
		console.log('Error', err);
	}
}

function* changeLayout({ payload: layout }) {
	try {
		if (layout === 'horizontal') {
			// yield put(changeTopbarThemeAction("dark"))
			document.body.removeAttribute('data-sidebar');
			document.body.removeAttribute('data-sidebar-image');
			document.body.removeAttribute('data-sidebar-size');
		} else {
			// yield put(changeTopbarThemeAction("light"))
		}
		yield call(updateSiteDetailsWorker);

		yield call(changeBodyAttribute, 'data-layout', layout);
	} catch (err) {
		// console.log(err)
	}
}

/**
 * Changes the layout mode
 * @param {*} param0
 */

function* changeLayoutMode({ payload: mode }) {
	try {
		// yield call(changeBodyAttribute, "data-layout-mode", mode);
		yield call(changeBodyAttribute, 'data-bs-theme', mode);
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}

function* changePreloader() {
	try {
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}
function* setTableHeader() {
	try {
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}

function* setBreadcrumbWatcher() {
	try {
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}
/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload: width }) {
	try {
		if (width === 'boxed') {
			yield put(changeSidebarTypeAction('icon'));
			yield call(changeBodyAttribute, 'data-layout-size', width);
			yield call(changeBodyAttribute, 'data-layout-scrollable', false);
		} else if (width === 'scrollable') {
			yield put(changeSidebarTypeAction('default'));
			yield call(changeBodyAttribute, 'data-layout-scrollable', true);
		} else {
			yield put(changeSidebarTypeAction('default'));
			yield call(changeBodyAttribute, 'data-layout-size', width);
			yield call(changeBodyAttribute, 'data-layout-scrollable', false);
		}
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload: theme }) {
	try {
		yield call(changeBodyAttribute, 'data-sidebar', theme);
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}

/**
 * Changes the left sidebar theme Image
 * @param {*} param0
 */
function* changeLeftSidebarThemeImage({ payload: theme }) {
	try {
		yield call(changeBodyAttribute, 'data-sidebar-image', theme);
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}

/**
 * Changes the topbar theme
 * @param {*} param0
 */
function* changeTopbarTheme({ payload: theme }) {
	try {
		yield call(changeBodyAttribute, 'data-topbar', theme);
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error);
	}
}

/**
 * Changes the left sidebar type
 * @param {*} param0
 */
function* changeLeftSidebarType({ payload: { sidebarType, isMobile } }) {
	try {
		switch (sidebarType) {
			case 'compact':
				yield call(changeBodyAttribute, 'data-sidebar-size', 'small');
				yield call(manageBodyClass, 'sidebar-enable', 'remove');
				yield call(manageBodyClass, 'vertical-collpsed', 'remove');
				break;
			case 'icon':
				yield call(changeBodyAttribute, 'data-sidebar-size', '');
				yield call(changeBodyAttribute, 'data-keep-enlarged', 'true');
				yield call(manageBodyClass, 'vertical-collpsed', 'add');
				break;
			case 'condensed':
				yield call(manageBodyClass, 'sidebar-enable', 'add');
				if (window.screen.width >= 992) {
					yield call(manageBodyClass, 'vertical-collpsed', 'remove');
					yield call(manageBodyClass, 'sidebar-enable', 'remove');
					yield call(manageBodyClass, 'vertical-collpsed', 'add');
					yield call(manageBodyClass, 'sidebar-enable', 'add');
				} else {
					yield call(manageBodyClass, 'sidebar-enable', 'add');
					yield call(manageBodyClass, 'vertical-collpsed', 'add');
				}
				break;
			default:
				yield call(changeBodyAttribute, 'data-sidebar-size', '');
				yield call(manageBodyClass, 'sidebar-enable', 'remove');
				if (!isMobile)
					yield call(manageBodyClass, 'vertical-collpsed', 'remove');
				break;
		}
		yield call(updateSiteDetailsWorker);
	} catch (error) {
		// console.log(error)
	}
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
	try {
		yield call(manageBodyClass, 'right-bar-enabled', 'add');
	} catch (error) {
		// console.log(error);
	}
}
/**
 * Watchers
 */
export function* watchChangeLayoutType() {
	yield takeEvery(CHANGE_LAYOUT, changeLayout);
}

export function* watchChangeLayoutWidth() {
	yield takeEvery(CHANGE_LAYOUT_WIDTH, changeLayoutWidth);
}

export function* watchChangeLeftSidebarTheme() {
	yield takeEvery(CHANGE_SIDEBAR_THEME, changeLeftSidebarTheme);
}

export function* watchChangeLeftSidebarThemeImage() {
	yield takeEvery(CHANGE_SIDEBAR_THEME_IMAGE, changeLeftSidebarThemeImage);
}

export function* watchChangeLeftSidebarType() {
	yield takeEvery(CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

export function* watchChangeTopbarTheme() {
	yield takeEvery(CHANGE_TOPBAR_THEME, changeTopbarTheme);
}

export function* watchShowRightSidebar() {
	yield takeEvery(SHOW_RIGHT_SIDEBAR, showRightSidebar);
}

export function* watchSChangeLayoutMode() {
	yield takeEvery(CHANGE_LAYOUT_MODE, changeLayoutMode);
	yield takeEvery(CHANGE_PRELOADER, changePreloader);
	yield takeEvery(SET_TABLE_HEADER_THEME, setTableHeader);
	yield takeEvery(SET_BREADCRUMB, setBreadcrumbWatcher);
}

function* LayoutSaga() {
	yield all([
		fork(watchSChangeLayoutMode),
		fork(watchChangeLayoutType),
		fork(watchChangeLayoutWidth),
		fork(watchChangeLeftSidebarTheme),
		fork(watchChangeLeftSidebarThemeImage),
		fork(watchChangeLeftSidebarType),
		fork(watchShowRightSidebar),
		fork(watchChangeTopbarTheme),
	]);
}

export default LayoutSaga;
