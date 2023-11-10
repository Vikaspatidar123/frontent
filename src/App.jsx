/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { createSelector } from 'reselect';

// Import Routes all
import { authProtectedRoutes, publicRoutes } from './routes';

// Import all middleware
import Authmiddleware from './routes/route';

// layouts Format
import VerticalLayout from './components/VerticalLayout';
import HorizontalLayout from './components/HorizontalLayout';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from './helpers/AuthType/fakeBackend';
import LinearLoading from './components/Common/LinearLoading';

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_APIKEY,
//   authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
//   databaseURL: import.meta.env.VITE_APP_DATABASEURL,
//   projectId: import.meta.env.VITE_APP_PROJECTID,
//   storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APP_APPID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = () => {
	const selectLayoutState = (state) => state.Layout;
	const LayoutProperties = createSelector(selectLayoutState, (layout) => ({
		layoutType: layout.layoutType,
	}));

	const { layoutType } = useSelector(LayoutProperties);

	function getLayout(layoutTypeArg) {
		let layoutCls = VerticalLayout;
		switch (layoutTypeArg) {
			case 'horizontal':
				layoutCls = HorizontalLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	}

	const Layout = getLayout(layoutType);

	return (
		<>
			<LinearLoading />
			<Routes>
				{publicRoutes.map((route) => (
					<Route
						path={route.path}
						element={<NonAuthLayout>{route.component}</NonAuthLayout>}
						key={route}
						exact
					/>
				))}

				{authProtectedRoutes.map((route) => (
					<Route
						path={route.path}
						element={
							<Authmiddleware>
								<Layout>{route.component}</Layout>
							</Authmiddleware>
						}
						key={route}
						exact
					/>
				))}
			</Routes>
		</>
	);
};

App.propTypes = {
	layout: PropTypes.any,
};

const mapStateToProps = (state) => {
	return {
		layout: state.Layout,
	};
};

export default connect(mapStateToProps, null)(App);
