/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss'
// Import menuDropdown
import { withTranslation } from 'react-i18next';
// import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

import logo from '../../assets/images/logo-light.png';
import sun from '../../assets/images/sun.svg';
import moon from '../../assets/images/moon.svg';

// i18n

// Redux Store
import {
	showRightSidebarAction,
	changeLayoutMode,
	toggleLeftmenu,
	changeSidebarType,
	changeSidebarTheme
} from '../../store/actions';
import MegaMenu from '../CommonForBoth/TopbarDropdown/MegaMenu';

const Header = (props) => {
	const [themModem,setThemMode]=useState(false)
	function toggleFullscreen() {
		if (
			!document.fullscreenElement &&
			/* alternative standard method */ !document.mozFullScreenElement &&
			!document.webkitFullscreenElement
		) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(
					Element.ALLOW_KEYBOARD_INPUT
				);
			}
		} else if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}

	function tToggle() {
		const { body } = document;
		if (window.screen.width <= 998) {
			body.classList.toggle('sidebar-enable');
		} else {
			body.classList.toggle('vertical-collpsed');
			body.classList.toggle('sidebar-enable');
		}
	}
	const topbarTheme = useSelector(
		(state) => state.Layout.layoutModeType
	);
	const onThemChange=()=>{
		setThemMode((prev)=>!prev);
		props.changeLayoutMode(themModem?'light':'dark');
		props.changeSidebarTheme(themModem?'light':'dark')
	}
	return (
		<header id="page-topbar">
			<div className="navbar-header" style={{borderBottom: topbarTheme==='light'?'1px solid #e5e7eb':''}}>
				<div className="d-flex">
					<div className="navbar-brand-box d-lg-none d-md-block">
						<Link to="/" className="logo">
							<span className="logo-sm">
								<img src={logo} alt="" height="30" />
							</span>
						</Link>

						{/* <Link to="/" className="logo logo-light">
							<span className="logo-sm">
								<img src={logoLightSvg} alt="" height="22" />
							</span>
						</Link> */}
					</div>

					<button
						type="button"
						onClick={() => {
							tToggle();
						}}
						className="btn btn-sm px-3 font-size-16 header-item "
						id="vertical-menu-btn"
					>
						<i className="fa fa-fw fa-bars" />
					</button>

					{/* <NavigationSearch /> */}

					<MegaMenu />
				</div>
				<div className="d-flex">
					{/* <div className="dropdown d-inline-block d-lg-none ms-2">
						<button
							onClick={() => {
								setsearch(!search);
							}}
							type="button"
							className="btn header-item noti-icon "
							id="page-header-search-dropdown"
						>
							<i className="mdi mdi-magnify" />
						</button>
						<div
							className={
								search
									? 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show'
									: 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0'
							}
							aria-labelledby="page-header-search-dropdown"
						>
							<form className="p-3">
								<div className="form-group m-0">
									<div className="input-group">
										<input
											type="text"
											className="form-control"
											placeholder="Search ..."
											aria-label="Recipient's username"
										/>
										<div className="input-group-append">
											<button className="btn btn-primary" type="submit">
												<i className="mdi mdi-magnify" />
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div> */}

					{/* <LanguageDropdown /> */}

					{/* <SocialDropdown /> */}

					<div className="dropdown d-none d-lg-inline-block ms-1">
						<button
							type="button"
							onClick={() => {
								toggleFullscreen();
							}}
							className="btn header-item noti-icon"
							
							data-toggle="fullscreen"
						>
							<i className="bx bx-fullscreen" />
						
						</button>
					</div>

					{/* <NotificationDropdown /> */}
					<div className="dropdown d-none d-lg-inline-block ms-1 ">
					<div  className='mode'>
					<div className={`mode_img ${themModem?'dark_mode':''}`} role="button" onClick={onThemChange} tabIndex={0}>
						<img src={themModem?moon:sun} alt='' width={20} height={20} />
						</div>
						</div>
					</div>
					<ProfileMenu
						showRightSidebarAction={props.showRightSidebarAction}
						showRightSidebar={props.showRightSidebar}
					/>

					<div
						onClick={() => {
							props.showRightSidebarAction(!props.showRightSidebar);
						}}
						className="dropdown d-inline-block"
						role="button"
						tabIndex={0}
						// style={{position:}}
					>
						<button	
							type="button"
							className="btn header-item noti-icon right-bar-toggle "
						>
						<div className={`mode_img ${themModem?'dark_mode':''}`}>
							<i className="bx bx-cog bx-spin" />
							</div>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	// changeSidebarType: PropTypes.func,
	// leftSideBarType: PropTypes.objectOf,
	showRightSidebar: false,
	showRightSidebarAction: () => {},
	changeLayoutMode:()=>{},
	changeSidebarTheme:()=>{}
	// t: () => {},
};

Header.propTypes = {
	// changeSidebarType: PropTypes.func,
	// leftSideBarType: PropTypes.objectOf,
	showRightSidebar: PropTypes.bool,
	showRightSidebarAction: PropTypes.func,
	changeLayoutMode:PropTypes.func,
	changeSidebarTheme:PropTypes.func,
	// t: PropTypes.func,
};

const mapStatetoProps = (state) => {
	const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
		state.Layout;
	return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
	showRightSidebarAction,
	toggleLeftmenu,
	changeSidebarType,
	changeLayoutMode,
	changeSidebarTheme,
})(withTranslation()(Header));
