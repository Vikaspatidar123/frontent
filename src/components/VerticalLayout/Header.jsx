/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';

// Import menuDropdown
import { withTranslation } from 'react-i18next';
// import sideBarElements from '../../constants/sidebar';
import LanguageDropdown from '../CommonForBoth/TopbarDropdown/LanguageDropdown';
import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';
// import megamenuImg from '../../assets/images/megamenu-img.png';

import logo from '../../assets/images/logo.svg';
import logoLightSvg from '../../assets/images/logo-light.svg';

// i18n

// Redux Store
import {
	showRightSidebarAction,
	toggleLeftmenu,
	changeSidebarType,
} from '../../store/actions';
import { socialHandles } from '../../constants/generalConfig';
// import NavigationSearch from './NavigationSearch';

const Header = (props) => {
	const [search, setsearch] = useState(false);
	// const [megaMenu, setmegaMenu] = useState(false);
	const [socialDrp, setsocialDrp] = useState(false);

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

	return (
		<header id="page-topbar">
			<div className="navbar-header">
				<div className="d-flex">
					<div className="navbar-brand-box d-lg-none d-md-block">
						<Link to="/" className="logo logo-dark">
							<span className="logo-sm">
								<img src={logo} alt="" height="22" />
							</span>
						</Link>

						<Link to="/" className="logo logo-light">
							<span className="logo-sm">
								<img src={logoLightSvg} alt="" height="22" />
							</span>
						</Link>
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

					{/* <Dropdown
						className="dropdown-mega d-none d-lg-block ms-2"
						isOpen={megaMenu}
						toggle={() => {
							setmegaMenu(!megaMenu);
						}}
					>
						<DropdownToggle className="btn header-item " caret tag="button">
							{' '}
							{props.t('Mega Menu')} <i className="mdi mdi-chevron-down" />
						</DropdownToggle>
						<DropdownMenu className="dropdown-megamenu">
							<Row>
								<Col sm={12}>
									<Row>
										{sideBarElements?.map((nav) => (
											<Col md={2}>
												<h5 className="font-size-14 mt-0">{nav.label}</h5>
												{nav?.subMenu?.length && (
													<ul className="list-unstyled megamenu-list">
														{nav?.subMenu?.map((sub) => (
															<li>
																<Link to={sub.link}>{sub.label}</Link>
															</li>
														))}
													</ul>
												)}
											</Col>
										))}
										<Col md={2}>
											<div>
												<img
													src={megamenuImg}
													alt=""
													className="img-fluid mx-auto d-block"
												/>
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
						</DropdownMenu>
					</Dropdown> */}
				</div>
				<div className="d-flex">
					<div className="dropdown d-inline-block d-lg-none ms-2">
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
					</div>

					<LanguageDropdown />

					<Dropdown
						className="d-none d-lg-inline-block ms-1"
						isOpen={socialDrp}
						toggle={() => {
							setsocialDrp(!socialDrp);
						}}
					>
						<DropdownToggle className="btn header-item noti-icon " tag="button">
							<i className="bx bx-customize" />
						</DropdownToggle>
						<DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
							<div className="px-lg-2">
								<Row className="no-gutters">
									{socialHandles.map(({ link, label, img, alt }) => (
										<Col>
											<Link className="dropdown-icon-item" to={link}>
												<img src={img} alt={alt} />
												<span>{label}</span>
											</Link>
										</Col>
									))}
								</Row>
							</div>
						</DropdownMenu>
					</Dropdown>

					<div className="dropdown d-none d-lg-inline-block ms-1">
						<button
							type="button"
							onClick={() => {
								toggleFullscreen();
							}}
							className="btn header-item noti-icon "
							data-toggle="fullscreen"
						>
							<i className="bx bx-fullscreen" />
						</button>
					</div>

					<NotificationDropdown />
					<ProfileMenu
						showRightSidebarAction={props.showRightSidebarAction}
						showRightSidebar={props.showRightSidebar}
					/>

					<div
						onClick={() => {
							props.showRightSidebarAction(!props.showRightSidebar);
						}}
						className="dropdown d-inline-block"
					>
						<button
							type="button"
							className="btn header-item noti-icon right-bar-toggle "
						>
							<i className="bx bx-cog bx-spin" />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	// changeSidebarType: PropTypes.func,
	// leftMenu: PropTypes.objectOf,
	// leftSideBarType: PropTypes.objectOf,
	showRightSidebar: () => {},
	showRightSidebarAction: () => {},
	// t: () => {},
	// toggleLeftmenu: PropTypes.func
};

Header.propTypes = {
	// changeSidebarType: PropTypes.func,
	// leftMenu: PropTypes.objectOf,
	// leftSideBarType: PropTypes.objectOf,
	showRightSidebar: PropTypes.objectOf,
	showRightSidebarAction: PropTypes.func,
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
})(withTranslation()(Header));
