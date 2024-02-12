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
import './assets/scss/theme.scss';
import LinearLoading from './components/Common/LinearLoading';

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
							<Authmiddleware
								modules={route.modules}
								operation={route.operation}
								isHome={route.isHome}
							>
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

const mapStateToProps = (state) => ({
	layout: state.Layout,
});

export default connect(mapStateToProps, null)(App);
