// import PropTypes from 'prop-types';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import withRouter from '../Common/withRouter';

// i18n
import SidebarContent from './SidebarContent';

// import logo from '../../assets/images/logo.svg';
// import logoLightPng from '../../assets/images/logo-light.png';
// import logoLightSvg from '../../assets/images/logo-light.svg';
// import logoDark from '../../assets/images/logo-dark.png';

const Sidebar = () => {
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	return (
		<div className="vertical-menu">
			<div className="navbar-brand-box">
				<Link to="/" className="logo logo-dark">
					<span className="logo-sm">
						{/* <img src={logo} alt="" height="22" /> */}
					</span>
					<span className="logo-lg">
						{/* <img src={logoDark} alt="" height="17" /> */}
						<h2 className="text-wrap my-2 text-light">
							{superAdminUser?.firstName}
						</h2>
						<h6 className="text-wrap my-2 text-light">
							{superAdminUser?.email}
						</h6>
					</span>
				</Link>

				<Link to="/" className="logo logo-light">
					<span className="logo-sm">
						{/* <img src={logoLightSvg} alt="" height="22" /> */}
					</span>
					<span className="logo-lg">
						{/* <img src={logoLightPng} alt="" height="19" /> */}
						<h2 className="text-wrap my-2 text-light">
							{superAdminUser?.firstName}
						</h2>
						<h6 className="text-wrap my-2 text-light">
							{superAdminUser?.email}
						</h6>
					</span>
				</Link>
			</div>
			<div data-simplebar className="h-100">
				<SidebarContent />
			</div>

			<div className="sidebar-background" />
		</div>
	);
};

Sidebar.defaultProps = {
	// type: '',
};

Sidebar.propTypes = {
	// type: PropTypes.string,
};

const mapStatetoProps = (state) => ({
	layout: state.Layout,
});
export default connect(
	mapStatetoProps,
	{}
)(withRouter(withTranslation()(Sidebar)));
