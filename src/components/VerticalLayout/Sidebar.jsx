// import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/ARC-Logo.svg';
import LogoLight from '../../assets/images/Frame 20541.jpg';

import withRouter from '../Common/withRouter';
// i18n
import SidebarContent from './SidebarContent';

const Sidebar = () => {
	const leftSideBarTheme = useSelector(
		(state) => state.Layout.leftSideBarTheme
	);

	return (
		<div className="vertical-menu" style={{borderRight: leftSideBarTheme==='light'?'1px solid #e5e7eb':''}}>
			<div className="navbar-brand-box" style={{borderBottom: leftSideBarTheme==='light'?'1px solid #e5e7eb':'',top: '0px'}}> 
				<Link to="/" className="logo">
					<span className="logo-sm">
						{/* <img src={logoLightSvg} alt="" height="22" /> */}
					</span>
					<span className="logo-lg" style={{lineHeight: '68px'}}>
						{leftSideBarTheme === 'light' ? (
							<img
								src={LogoLight}
								style={{ height: '58px', width: '115px' }}
								alt=""
							/>
						) : (
							<img
								src={LogoLight}
								style={{ height: '58px', width: '115px' }}
								alt=""
							/>
						)}
					</span>
				</Link>
			</div>
			<div data-simplebar className="h-100" >
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
