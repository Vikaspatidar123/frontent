import {
	CHANGE_LAYOUT,
	CHANGE_LAYOUT_WIDTH,
	CHANGE_SIDEBAR_THEME,
	CHANGE_SIDEBAR_THEME_IMAGE,
	CHANGE_SIDEBAR_TYPE,
	CHANGE_TOPBAR_THEME,
	SHOW_RIGHT_SIDEBAR,
	SHOW_SIDEBAR,
	CHANGE_PRELOADER,
	TOGGLE_LEFTMENU,
	CHANGE_LAYOUT_MODE,
	SET_TABLE_HEADER_THEME,
	SET_BREADCRUMB,
	GET_SITE_DETAILS,
	GET_SITE_DETAILS_SUCCESS,
	GET_SITE_DETAILS_FAIL,
} from './actionTypes';

export const changeLayout = (layout) => ({
	type: CHANGE_LAYOUT,
	payload: layout,
});

export const changePreloader = (layout) => ({
	type: CHANGE_PRELOADER,
	payload: layout,
});

export const changeLayoutMode = (layoutMode) => ({
	type: CHANGE_LAYOUT_MODE,
	payload: layoutMode,
});

export const changeLayoutWidth = (width) => ({
	type: CHANGE_LAYOUT_WIDTH,
	payload: width,
});

export const changeSidebarTheme = (theme) => ({
	type: CHANGE_SIDEBAR_THEME,
	payload: theme,
});

export const changeSidebarThemeImage = (themeimage) => ({
	type: CHANGE_SIDEBAR_THEME_IMAGE,
	payload: themeimage,
});

export const changeSidebarType = (sidebarType, isMobile) => ({
	type: CHANGE_SIDEBAR_TYPE,
	payload: { sidebarType, isMobile },
});

export const changeTopbarTheme = (topbarTheme) => ({
	type: CHANGE_TOPBAR_THEME,
	payload: topbarTheme,
});

export const showRightSidebarAction = (isopen) => ({
	type: SHOW_RIGHT_SIDEBAR,
	payload: isopen,
});

export const showSidebar = (isopen) => ({
	type: SHOW_SIDEBAR,
	payload: isopen,
});

export const toggleLeftmenu = (isopen) => ({
	type: TOGGLE_LEFTMENU,
	payload: isopen,
});

export const setTableHeaderClass = (className) => ({
	type: SET_TABLE_HEADER_THEME,
	payload: className,
});

export const setBreadcrumb = (value) => ({
	type: SET_BREADCRUMB,
	payload: value,
});

export const getSiteDetailsSuccess = (payload) => ({
	type: GET_SITE_DETAILS_SUCCESS,
	payload,
});

export const getSiteDetailsFail = (payload) => ({
	type: GET_SITE_DETAILS_FAIL,
	payload,
});

export const getSiteDetails = (payload) => ({
	type: GET_SITE_DETAILS,
	payload,
});
