/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup } from 'reactstrap';

import { connect } from 'react-redux';

// SimpleBar
import SimpleBar from 'simplebar-react';

import { Link } from 'react-router-dom';
import {
	changeLayout,
	changeLayoutMode,
	changeLayoutWidth,
	changeSidebarTheme,
	changeSidebarThemeImage,
	changeSidebarType,
	changePreloader,
	changeTopbarTheme,
	showRightSidebarAction,
	setTableHeaderClass,
	setBreadcrumb,
} from '../../store/actions';

import './rightbar.scss';

// Import images
import layout1 from '../../assets/images/layouts/layout-1.jpg';
import layout2 from '../../assets/images/layouts/layout-2.jpg';

// constants
import {
	layoutTypes,
	layoutModeTypes,
	layoutWidthTypes,
	topBarThemeTypes,
	leftSidebarTypes,
	leftSideBarThemeTypes,
	tableHeaderClass,
} from '../../constants/layout';

const RightSidebar = (props) => (
	<>
		<div className="right-bar" id="right-bar">
			<SimpleBar style={{ height: '900px' }}>
				<div data-simplebar className="h-100">
					<div className="rightbar-title px-3 py-4">
						<Link
							to="#!"
							onClick={(e) => {
								e.preventDefault();
								props.showRightSidebarAction(false);
							}}
							className="right-bar-toggle float-end"
						>
							<i className="mdi mdi-close noti-icon" />
						</Link>
						<h5 className="m-0">Settings</h5>
					</div>

					<hr className="my-0" />

					<div className="p-4">
						<div className="radio-toolbar">
							<span className="mb-2 d-block">Layouts</span>
							<input
								type="radio"
								id="radioVertical"
								name="radioFruit"
								value={layoutTypes.VERTICAL}
								checked={props.layoutType === layoutTypes.VERTICAL}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayout(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="radioVertical">
								Vertical
							</label>
							<input
								type="radio"
								id="radioHorizontal"
								name="radioFruit"
								value={layoutTypes.HORIZONTAL}
								checked={props.layoutType === layoutTypes.HORIZONTAL}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayout(e.target.value);
									}
								}}
							/>
							<label htmlFor="radioHorizontal">Horizontal</label>
						</div>

						<hr className="mt-1" />
						<div className="radio-toolbar">
							<span className="mb-2 d-block">Layouts Mode</span>
							<input
								type="radio"
								id="radioLight"
								name="radioLight"
								value={layoutModeTypes.LIGHT}
								checked={props.layoutModeType === layoutModeTypes.LIGHT}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayoutMode(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="radioLight">
								Light
							</label>
							<input
								type="radio"
								id="radioDark"
								name="radioDark"
								value={layoutModeTypes.DARK}
								checked={props.layoutModeType === layoutModeTypes.DARK}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayoutMode(e.target.value);
									}
								}}
							/>
							<label htmlFor="radioDark">Dark</label>
						</div>

						<hr className="mt-1" />
						<div className="radio-toolbar">
							<span className="mb-2 d-block" id="radio-title">
								Layout Width
							</span>
							<input
								type="radio"
								id="radioFluid"
								name="radioWidth"
								value={layoutWidthTypes.FLUID}
								checked={props.layoutWidth === layoutWidthTypes.FLUID}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayoutWidth(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="radioFluid">
								Fluid
							</label>
							<input
								type="radio"
								id="radioBoxed"
								name="radioWidth"
								value={layoutWidthTypes.BOXED}
								checked={props.layoutWidth === layoutWidthTypes.BOXED}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayoutWidth(e.target.value);
									}
								}}
							/>
							<label htmlFor="radioBoxed" className="me-1">
								Boxed
							</label>
							<input
								type="radio"
								id="radioscrollable"
								name="radioscrollable"
								value={layoutWidthTypes.SCROLLABLE}
								checked={props.layoutWidth === layoutWidthTypes.SCROLLABLE}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeLayoutWidth(e.target.value);
									}
								}}
							/>
							<label htmlFor="radioscrollable">Scrollable</label>
						</div>
						<hr className="mt-1" />

						<div className="radio-toolbar">
							<span className="mb-2 d-block" id="radio-title">
								Topbar Theme
							</span>
							<input
								type="radio"
								id="radioThemeLight"
								name="radioTheme"
								value={topBarThemeTypes.LIGHT}
								checked={props.topbarTheme === topBarThemeTypes.LIGHT}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeTopbarTheme(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="radioThemeLight">
								Light
							</label>
							<input
								type="radio"
								id="radioThemeDark"
								name="radioTheme"
								value={topBarThemeTypes.DARK}
								checked={props.topbarTheme === topBarThemeTypes.DARK}
								onChange={(e) => {
									if (e.target.checked) {
										props.changeTopbarTheme(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="radioThemeDark">
								Dark
							</label>
							{props.layoutType === 'vertical' ? null : (
								<>
									<input
										type="radio"
										id="radioThemeColored"
										name="radioTheme"
										value={topBarThemeTypes.COLORED}
										checked={props.topbarTheme === topBarThemeTypes.COLORED}
										onChange={(e) => {
											if (e.target.checked) {
												props.changeTopbarTheme(e.target.value);
											}
										}}
									/>
									<label className="me-1" htmlFor="radioThemeColored">
										Colored
									</label>{' '}
								</>
							)}
						</div>

						{props.layoutType === 'vertical' && (
							<>
								<hr className="mt-1" />
								<div className="radio-toolbar">
									<span className="mb-2 d-block" id="radio-title">
										Left Sidebar Type{' '}
									</span>
									<input
										type="radio"
										id="sidebarDefault"
										name="sidebarType"
										value={leftSidebarTypes.DEFAULT}
										checked={props.leftSideBarType === leftSidebarTypes.DEFAULT}
										onChange={(e) => {
											if (e.target.checked) {
												props.changeSidebarType(e.target.value);
											}
										}}
									/>
									<label className="me-1" htmlFor="sidebarDefault">
										Default
									</label>
									<input
										type="radio"
										id="sidebarCompact"
										name="sidebarType"
										value={leftSidebarTypes.COMPACT}
										checked={props.leftSideBarType === leftSidebarTypes.COMPACT}
										onChange={(e) => {
											if (e.target.checked) {
												props.changeSidebarType(e.target.value);
											}
										}}
									/>
									<label className="me-1" htmlFor="sidebarCompact">
										Compact
									</label>
									<input
										type="radio"
										id="sidebarIcon"
										name="sidebarType"
										value={leftSidebarTypes.ICON}
										checked={props.leftSideBarType === leftSidebarTypes.ICON}
										onChange={(e) => {
											if (e.target.checked) {
												props.changeSidebarType(e.target.value);
											}
										}}
									/>
									<label className="me-1" htmlFor="sidebarIcon">
										Icon
									</label>
								</div>
							</>
						)}

						<hr className="mt-1" />
						<div className="radio-toolbar">
							<span className="mb-2 d-block" id="radio-title">
								Table Header{' '}
							</span>
							<input
								type="radio"
								id="darkHeader"
								// name="sidebarType"
								value={tableHeaderClass.GREY}
								checked={props.tableHeaderClass === tableHeaderClass.GREY}
								onChange={(e) => {
									if (e.target.checked) {
										props.setTableHeaderClass(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="darkHeader">
								GREY
							</label>
							<input
								type="radio"
								id="whiteHeader"
								// name="sidebarType"
								value={tableHeaderClass.TRANSPARENT}
								checked={
									props.tableHeaderClass === tableHeaderClass.TRANSPARENT
								}
								onChange={(e) => {
									if (e.target.checked) {
										props.setTableHeaderClass(e.target.value);
									}
								}}
							/>
							<label className="me-1" htmlFor="whiteHeader">
								LIGHT
							</label>
						</div>

						<hr className="mt-1" />

						<div className="radio-toolbar">
							<span className="mb-2 d-block" id="radio-title">
								Breadcrumb{' '}
							</span>
							<input
								type="radio"
								id="showBreadcrumb"
								value
								checked={props.showBreadcrumb}
								onChange={() => {
									props.setBreadcrumb(true);
								}}
							/>
							<label className="me-1" htmlFor="showBreadcrumb">
								SHOW
							</label>
							<input
								type="radio"
								id="hideBreadcrumb"
								value={false}
								checked={!props.showBreadcrumb}
								onChange={() => {
									props.setBreadcrumb(false);
								}}
							/>
							<label className="me-1" htmlFor="hideBreadcrumb">
								HIDE
							</label>
						</div>

						<hr className="mt-1" />

						{props.layoutType === 'vertical' && (
							<div className="radio-toolbar coloropt-radio">
								<span className="mb-2 d-block" id="radio-title">
									Left Sidebar Color Options
								</span>
								<Row>
									<Col>
										<input
											type="radio"
											id="leftsidebarThemelight"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.LIGHT}
											checked={
												props.leftSideBarTheme === leftSideBarThemeTypes.LIGHT
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemelight"
											className={
												props.layoutModeType === 'dark'
													? 'bg-dark rounded-circle wh-30 me-1'
													: 'bg-light rounded-circle wh-30 me-1'
											}
										/>

										<input
											type="radio"
											id="leftsidebarThemedark"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.DARK}
											checked={
												props.leftSideBarTheme === leftSideBarThemeTypes.DARK
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemedark"
											className={
												props.layoutModeType === 'light'
													? 'bg-dark rounded-circle wh-30 me-1'
													: 'bg-light rounded-circle wh-30 me-1'
											}
										/>

										<input
											type="radio"
											id="leftsidebarThemecolored"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.COLORED}
											checked={
												props.leftSideBarTheme === leftSideBarThemeTypes.COLORED
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemecolored"
											className="bg-colored rounded-circle wh-30 me-1"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<input
											type="radio"
											id="leftsidebarThemewinter"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.WINTER}
											checked={
												props.leftSideBarTheme === leftSideBarThemeTypes.WINTER
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemewinter"
											className="gradient-winter rounded-circle wh-30 me-1"
										/>

										<input
											type="radio"
											id="leftsidebarThemeladylip"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.LADYLIP}
											checked={
												props.leftSideBarTheme === leftSideBarThemeTypes.LADYLIP
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemeladylip"
											className="gradient-lady-lip rounded-circle wh-30 me-1"
										/>

										<input
											type="radio"
											id="leftsidebarThemeplumplate"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.PLUMPLATE}
											checked={
												props.leftSideBarTheme ===
												leftSideBarThemeTypes.PLUMPLATE
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemeplumplate"
											className="gradient-plum-plate rounded-circle wh-30 me-1"
										/>

										<input
											type="radio"
											id="leftsidebarThemestrongbliss"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.STRONGBLISS}
											checked={
												props.leftSideBarTheme ===
												leftSideBarThemeTypes.STRONGBLISS
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemestrongbliss"
											className="gradient-strong-bliss rounded-circle wh-30 me-1"
										/>
										<input
											type="radio"
											id="leftsidebarThemesgreatwhale"
											name="leftsidebarTheme"
											value={leftSideBarThemeTypes.GREATWHALE}
											checked={
												props.leftSideBarTheme ===
												leftSideBarThemeTypes.GREATWHALE
											}
											onChange={(e) => {
												if (e.target.checked) {
													props.changeSidebarTheme(e.target.value);
												}
											}}
										/>
										<label
											htmlFor="leftsidebarThemesgreatwhale"
											className="gradient-strong-great-whale rounded-circle wh-30 me-1"
										/>
									</Col>
								</Row>
							</div>
						)}
						<hr className="mt-1" />
						<FormGroup>
							<span className="mb-2 d-block" id="radio-title">
								Preloader
							</span>

							<div className="form-check form-switch">
								<input
									type="checkbox"
									className="form-check-input checkbox"
									id="checkbox_1"
									checked={props.isPreloader}
									onChange={() => {
										props.changePreloader(!props.isPreloader);
									}}
								/>

								<label className="form-check-label" htmlFor="checkbox_1">
									Preloader
								</label>
							</div>
						</FormGroup>

						<h6 className="text-center">Choose Layouts</h6>

						<div className="mb-2">
							<Link
								to="#!"
								onClick={() => props.changeLayoutMode(layoutModeTypes.LIGHT)}
							>
								<img src={layout1} className="img-fluid img-thumbnail" alt="" />
							</Link>
						</div>

						<div className="mb-2">
							<Link
								to="#!"
								onClick={() => props.changeLayoutMode(layoutModeTypes.DARK)}
							>
								<img src={layout2} className="img-fluid img-thumbnail" alt="" />
							</Link>
						</div>

						{/* <div className="mb-2">
                <Link to="#!" target="_blank" onClick={() => {}}>
                  <img src={layout3} className="img-fluid img-thumbnail" alt="" />
                </Link>
              </div> */}
					</div>
				</div>
			</SimpleBar>
		</div>
		<div className="rightbar-overlay" />
	</>
);

RightSidebar.propTypes = {
	changeLayout: PropTypes.func.isRequired,
	changeLayoutWidth: PropTypes.func.isRequired,
	changePreloader: PropTypes.func.isRequired,
	changeSidebarTheme: PropTypes.func.isRequired,
	changeSidebarType: PropTypes.func.isRequired,
	changeTopbarTheme: PropTypes.func.isRequired,
	isPreloader: PropTypes.objectOf.isRequired,
	layoutType: PropTypes.objectOf.isRequired,
	layoutModeType: PropTypes.objectOf.isRequired,
	changeLayoutMode: PropTypes.func.isRequired,
	layoutWidth: PropTypes.objectOf.isRequired,
	leftSideBarTheme: PropTypes.objectOf.isRequired,
	leftSideBarType: PropTypes.objectOf.isRequired,
	showRightSidebarAction: PropTypes.func.isRequired,
	topbarTheme: PropTypes.objectOf.isRequired,
	setTableHeaderClass: PropTypes.func.isRequired,
	tableHeaderClass: PropTypes.string.isRequired,
	setBreadcrumb: PropTypes.func.isRequired,
	showBreadcrumb: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ ...state.Layout });

export default connect(mapStateToProps, {
	changeLayout,
	changeLayoutMode,
	changeSidebarTheme,
	changeSidebarThemeImage,
	changeSidebarType,
	changeLayoutWidth,
	changeTopbarTheme,
	changePreloader,
	showRightSidebarAction,
	setTableHeaderClass,
	setBreadcrumb,
})(RightSidebar);
