// @flow
import {
	CHANGE_LAYOUT,
	CHANGE_LAYOUT_WIDTH,
	CHANGE_SIDEBAR_THEME,
	CHANGE_SIDEBAR_TYPE,
	CHANGE_TOPBAR_THEME,
	SHOW_RIGHT_SIDEBAR,
	CHANGE_SIDEBAR_THEME_IMAGE,
	CHANGE_PRELOADER,
	TOGGLE_LEFTMENU,
	SHOW_SIDEBAR,
	CHANGE_LAYOUT_MODE,
	SET_TABLE_HEADER_THEME,
	SET_BREADCRUMB,
	GET_SITE_DETAILS_SUCCESS,
	GET_SITE_DETAILS_FAIL,
} from './actionTypes';

// constants
import {
	layoutTypes,
	layoutModeTypes,
	layoutWidthTypes,
	topBarThemeTypes,
	leftBarThemeImageTypes,
	leftSidebarTypes,
	leftSideBarThemeTypes,
	tableHeaderClass,
} from '../../constants/layout';

const INIT_STATE = {
	layoutType: layoutTypes.VERTICAL,
	layoutModeType: layoutModeTypes.LIGHT,
	layoutWidth: layoutWidthTypes.FLUID,
	leftSideBarTheme: leftSideBarThemeTypes.DARK,
	leftSideBarThemeImage: leftBarThemeImageTypes.NONE,
	leftSideBarType: leftSidebarTypes.DEFAULT,
	topbarTheme: topBarThemeTypes.LIGHT,
	isPreloader: false,
	showRightSidebar: false,
	isMobile: false,
	showSidebar: true,
	leftMenu: false,
	tableHeaderClass: tableHeaderClass.GREY,
	showBreadcrumb: false,
	error: null,
	isLoading: true,
};

const Layout = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case CHANGE_LAYOUT:
			return {
				...state,
				layoutType: payload,
			};
		case CHANGE_PRELOADER:
			return {
				...state,
				isPreloader: payload,
			};
		case CHANGE_LAYOUT_MODE:
			return {
				...state,
				layoutModeType: payload,
			};
		case CHANGE_LAYOUT_WIDTH:
			return {
				...state,
				layoutWidth: payload,
			};
		case CHANGE_SIDEBAR_THEME:
			return {
				...state,
				leftSideBarTheme: payload,
			};
		case CHANGE_SIDEBAR_THEME_IMAGE:
			return {
				...state,
				leftSideBarThemeImage: payload,
			};
		case CHANGE_SIDEBAR_TYPE:
			return {
				...state,
				leftSideBarType: payload.sidebarType,
			};
		case CHANGE_TOPBAR_THEME:
			return {
				...state,
				topbarTheme: payload,
			};
		case SHOW_RIGHT_SIDEBAR:
			return {
				...state,
				showRightSidebar: payload,
			};
		case SHOW_SIDEBAR:
			return {
				...state,
				showSidebar: payload,
			};
		case TOGGLE_LEFTMENU:
			return {
				...state,
				leftMenu: payload,
			};
		case SET_TABLE_HEADER_THEME:
			return {
				...state,
				tableHeaderClass: payload,
			};
		case SET_BREADCRUMB:
			return {
				...state,
				showBreadcrumb: payload,
			};

		case GET_SITE_DETAILS_SUCCESS:
			return {
				...state,
				...payload,
				error: null,
			};
		case GET_SITE_DETAILS_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export default Layout;
