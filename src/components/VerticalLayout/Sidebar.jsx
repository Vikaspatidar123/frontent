// import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/brand-logo2.png';
import withRouter from '../Common/withRouter';
// i18n
import SidebarContent from './SidebarContent';

const Sidebar = () => (
	<div className="vertical-menu">
		<div className="navbar-brand-box">
			<Link to="/" className="logo logo-light">
				<span className="logo-sm">
					{/* <img src={logoLightSvg} alt="" height="22" /> */}
				</span>
				<span className="logo-lg">
					<img
						src={Logo}
						style={{ height: '59px', width: '60px' }}
						alt=""
						height="19"
					/>
				</span>
			</Link>
		</div>
		<div data-simplebar className="h-100">
			<SidebarContent />
		</div>

		<div className="sidebar-background" />
	</div>
);

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
