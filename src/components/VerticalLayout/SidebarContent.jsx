import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback } from 'react';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { Link, useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import withRouter from '../Common/withRouter';

// i18n

const SidebarContent = ({ t }) => {
	const ref = useRef();
	const path = useLocation();

	function scrollElement(item) {
		if (item) {
			const currentPosition = item.offsetTop;
			if (currentPosition > window.innerHeight) {
				ref.current.getScrollElement().scrollTop = currentPosition - 300;
			}
		}
	}

	const activateParentDropdown = useCallback((item) => {
		item.classList.add('active');
		const parent = item.parentElement;
		const parent2El = parent.childNodes[1];
		if (parent2El && parent2El.id !== 'side-menu') {
			parent2El.classList.add('mm-show');
		}

		if (parent) {
			parent.classList.add('mm-active');
			const parent2 = parent.parentElement;

			if (parent2) {
				parent2.classList.add('mm-show'); // ul tag

				const parent3 = parent2.parentElement; // li tag

				if (parent3) {
					parent3.classList.add('mm-active'); // li
					parent3.childNodes[0].classList.add('mm-active'); // a
					const parent4 = parent3.parentElement; // ul
					if (parent4) {
						parent4.classList.add('mm-show'); // ul
						const parent5 = parent4.parentElement;
						if (parent5) {
							parent5.classList.add('mm-show'); // li
							parent5.childNodes[0].classList.add('mm-active'); // a tag
						}
					}
				}
			}
			scrollElement(item);
			return false;
		}
		scrollElement(item);
		return false;
	}, []);

	const removeActivation = (items) => {
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			const parent = items[i].parentElement;

			if (item && item.classList.contains('active')) {
				item.classList.remove('active');
			}
			if (parent) {
				const parent2El =
					parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
						? parent.childNodes[1]
						: null;
				if (parent2El && parent2El.id !== 'side-menu') {
					parent2El.classList.remove('mm-show');
				}

				parent.classList.remove('mm-active');
				const parent2 = parent.parentElement;

				if (parent2) {
					parent2.classList.remove('mm-show');

					const parent3 = parent2.parentElement;
					if (parent3) {
						parent3.classList.remove('mm-active'); // li
						parent3.childNodes[0].classList.remove('mm-active');

						const parent4 = parent3.parentElement; // ul
						if (parent4) {
							parent4.classList.remove('mm-show'); // ul
							const parent5 = parent4.parentElement;
							if (parent5) {
								parent5.classList.remove('mm-show'); // li
								parent5.childNodes[0].classList.remove('mm-active'); // a tag
							}
						}
					}
				}
			}
		}
	};

	const activeMenu = useCallback(() => {
		const pathName = path.pathname;
		let matchingMenuItem = null;
		const ul = document.getElementById('side-menu');
		const items = ul.getElementsByTagName('a');
		removeActivation(items);

		for (let i = 0; i < items.length; i += 1) {
			if (pathName === items[i].pathname) {
				matchingMenuItem = items[i];
				break;
			}
		}
		if (matchingMenuItem) {
			activateParentDropdown(matchingMenuItem);
		}
	}, [path.pathname, activateParentDropdown]);

	useEffect(() => {
		ref.current.recalculate();
	}, []);

	useEffect(() => {
		// eslint-disable-next-line no-new
		new MetisMenu('#side-menu');
		activeMenu();
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		activeMenu();
	}, [activeMenu]);

	return (
		<SimpleBar className="h-100" ref={ref}>
			<div id="sidebar-menu">
				<ul className="metismenu list-unstyled" id="side-menu">
					<li className="menu-title">{t('Menu')} </li>
					<li>
						<Link to="/#" className="has-arrow">
							<i className="bx bx-home-circle" />
							<span>{t('Dashboards')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/dashboard">{t('Default')}</Link>
							</li>
							<li>
								<Link to="/listing">{t('Listing')}</Link>
							</li>
							<li>
								<Link to="/dashboard-saas">{t('Saas')}</Link>
							</li>
							<li>
								<Link to="/dashboard-crypto">{t('Crypto')}</Link>
							</li>
							<li>
								<Link to="/blog">{t('Blog')}</Link>
							</li>
							<li>
								<Link to="/dashboard-job">{t('Job')}</Link>
							</li>
						</ul>
					</li>

					<li className="menu-title">{t('Apps')}</li>

					<li>
						<Link to="/calendar" className=" ">
							<i className="bx bx-calendar" />
							<span>{t('Calendar')}</span>
						</Link>
					</li>

					<li>
						<Link to="/chat" className="">
							<i className="bx bx-chat" />
							<span>{t('Chat')}</span>
						</Link>
					</li>
					<li>
						<Link to="/apps-filemanager">
							<i className="bx bx-file" />
							<span>{t('File Manager')}</span>
						</Link>
					</li>

					<li>
						<Link to="/#" className="has-arrow">
							<i className="bx bx-store" />
							<span>{t('Ecommerce')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/ecommerce-products">{t('Products')}</Link>
							</li>
							<li>
								<Link to="/ecommerce-product-detail/1">
									{t('Product Detail')}
								</Link>
							</li>
							<li>
								<Link to="/ecommerce-orders">{t('Orders')}</Link>
							</li>
							<li>
								<Link to="/ecommerce-customers">{t('Customers')}</Link>
							</li>
							<li>
								<Link to="/ecommerce-cart">{t('Cart')}</Link>
							</li>
							<li>
								<Link to="/ecommerce-checkout">{t('Checkout')}</Link>
							</li>
							<li>
								<Link to="/ecommerce-shops">{t('Shops')}</Link>
							</li>
							<li>
								<Link to="/ecommerce-add-product">{t('Add Product')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-bitcoin" />
							<span>{t('Crypto')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/crypto-wallet">{t('Wallet')}</Link>
							</li>
							<li>
								<Link to="/crypto-buy-sell">{t('Buy/Sell')}</Link>
							</li>
							<li>
								<Link to="/crypto-exchange">{t('Exchange')}</Link>
							</li>
							<li>
								<Link to="/crypto-lending">{t('Lending')}</Link>
							</li>
							<li>
								<Link to="/crypto-orders">{t('Orders')}</Link>
							</li>
							<li>
								<Link to="/crypto-kyc-application">{t('KYC Application')}</Link>
							</li>
							<li>
								<Link to="/crypto-ico-landing">{t('ICO Landing')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow">
							<i className="bx bx-envelope" />
							<span>{t('Email')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/email-inbox">{t('Inbox')}</Link>
							</li>
							<li>
								<Link to="/email-read">{t('Read Email')} </Link>
							</li>
							<li>
								<Link to="/#" className="has-arrow">
									<span key="t-email-templates">{t('Templates')}</span>
								</Link>
								<ul className="sub-menu">
									<li>
										<Link to="/email-template-basic">{t('Basic Action')}</Link>
									</li>
									<li>
										<Link to="/email-template-alert">{t('Alert Email')} </Link>
									</li>
									<li>
										<Link to="/email-template-billing">
											{t('Billing Email')}{' '}
										</Link>
									</li>
								</ul>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-receipt" />
							<span>{t('Invoices')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/invoices-list">{t('Invoice List')}</Link>
							</li>
							<li>
								<Link to="/invoices-detail">{t('Invoice Detail')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-briefcase-alt-2" />
							<span>{t('Projects')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/projects-grid">{t('Projects Grid')}</Link>
							</li>
							<li>
								<Link to="/projects-list">{t('Projects List')}</Link>
							</li>
							<li>
								<Link to="/projects-overview">{t('Project Overview')}</Link>
							</li>
							<li>
								<Link to="/projects-create">{t('Create New')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-task" />
							<span>{t('Tasks')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/tasks-list">{t('Task List')}</Link>
							</li>
							<li>
								<Link to="/tasks-kanban">{t('Tasks Kanban')}</Link>
							</li>
							<li>
								<Link to="/tasks-create">{t('Create Task')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bxs-user-detail" />
							<span>{t('Contacts')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/contacts-grid">{t('User Grid')}</Link>
							</li>
							<li>
								<Link to="/contacts-list">{t('User List')}</Link>
							</li>
							<li>
								<Link to="/contacts-profile">{t('Profile')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bxs-detail" />

							<span>{t('Blog')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/blog-list">{t('Blog List')}</Link>
							</li>
							<li>
								<Link to="/blog-grid">{t('Blog Grid')}</Link>
							</li>
							<li>
								<Link to="/blog-details">{t('Blog Details')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#">
							<i className="bx bx-briefcase-alt" />
							<span key="t-jobs">{t('Jobs')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/job-list">{t('Job List')}</Link>
							</li>
							<li>
								<Link to="/job-grid">{t('Job Grid')}</Link>
							</li>
							<li>
								<Link to="/job-apply">{t('Apply Job')}</Link>
							</li>
							<li>
								<Link to="/job-details">{t('Job Details')}</Link>
							</li>
							<li>
								<Link to="/job-categories">{t('Jobs Categories')}</Link>
							</li>
							<li>
								<Link to="/#" className="has-arrow">
									Candidate
								</Link>
								<ul className="sub-menu">
									<li>
										<Link to="/candidate-list">{t('List')}</Link>
									</li>
									<li>
										<Link to="/candidate-overview">{t('Overview')}</Link>
									</li>
								</ul>
							</li>
						</ul>
					</li>

					<li className="menu-title">Pages</li>
					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-user-circle" />
							<span>{t('Authentication')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/pages-login">{t('Login')}</Link>
							</li>
							<li>
								<Link to="/pages-login-2">{t('Login 2')}</Link>
							</li>
							<li>
								<Link to="/pages-register">{t('Register')}</Link>
							</li>
							<li>
								<Link to="/pages-register-2">{t('Register 2')}</Link>
							</li>
							<li>
								<Link to="/page-recoverpw">{t('Recover Password')}</Link>
							</li>
							<li>
								<Link to="/page-recoverpw-2">{t('Recover Password 2')}</Link>
							</li>
							<li>
								<Link to="/auth-lock-screen">{t('Lock Screen')}</Link>
							</li>
							<li>
								<Link to="/auth-lock-screen-2">{t('Lock Screen 2')}</Link>
							</li>
							<li>
								<Link to="/page-confirm-mail">{t('Confirm Mail')}</Link>
							</li>
							<li>
								<Link to="/page-confirm-mail-2">{t('Confirm Mail 2')}</Link>
							</li>
							<li>
								<Link to="/auth-email-verification">
									{t('Email Verification')}
								</Link>
							</li>
							<li>
								<Link to="/auth-email-verification-2">
									{t('Email Verification 2')}
								</Link>
							</li>
							<li>
								<Link to="/auth-two-step-verification">
									{t('Two Step Verification')}
								</Link>
							</li>
							<li>
								<Link to="/auth-two-step-verification-2">
									{t('Two Step Verification 2')}
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-file" />
							<span>{t('Utility')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/pages-starter">{t('Starter Page')}</Link>
							</li>
							<li>
								<Link to="/pages-maintenance">{t('Maintenance')}</Link>
							</li>
							<li>
								<Link to="/pages-comingsoon">{t('Coming Soon')}</Link>
							</li>
							<li>
								<Link to="/pages-timeline">{t('Timeline')}</Link>
							</li>
							<li>
								<Link to="/pages-faqs">{t('FAQs')}</Link>
							</li>
							<li>
								<Link to="/pages-pricing">{t('Pricing')}</Link>
							</li>
							<li>
								<Link to="/pages-404">{t('Error 404')}</Link>
							</li>
							<li>
								<Link to="/pages-500">{t('Error 500')}</Link>
							</li>
						</ul>
					</li>

					<li className="menu-title">{t('Components')}</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-tone" />
							<span>{t('UI Elements')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/ui-alerts">{t('Alerts')}</Link>
							</li>
							<li>
								<Link to="/ui-buttons">{t('Buttons')}</Link>
							</li>
							<li>
								<Link to="/ui-cards">{t('Cards')}</Link>
							</li>
							<li>
								<Link to="/ui-carousel">{t('Carousel')}</Link>
							</li>
							<li>
								<Link to="/ui-dropdowns">{t('Dropdowns')}</Link>
							</li>
							<li>
								<Link to="/ui-grid">{t('Grid')}</Link>
							</li>
							<li>
								<Link to="/ui-images">{t('Images')}</Link>
							</li>
							<li>
								<Link to="/ui-lightbox">{t('Lightbox')}</Link>
							</li>
							<li>
								<Link to="/ui-modals">{t('Modals')}</Link>
							</li>
							<li>
								<Link to="/ui-offcanvas">{t('OffCanvas')}</Link>
							</li>
							<li>
								<Link to="/ui-rangeslider">{t('Range Slider')}</Link>
							</li>
							<li>
								<Link to="/ui-session-timeout">{t('Session Timeout')}</Link>
							</li>
							<li>
								<Link to="/ui-progressbars">{t('Progress Bars')}</Link>
							</li>
							<li>
								<Link to="/ui-placeholders">{t('Placeholders')}</Link>
							</li>
							<li>
								<Link to="/ui-tabs-accordions">{t('Tabs & Accordions')}</Link>
							</li>
							<li>
								<Link to="/ui-typography">{t('Typography')}</Link>
							</li>
							<li>
								<Link to="/ui-toasts">{t('Toasts')}</Link>
							</li>
							<li>
								<Link to="/ui-video">{t('Video')}</Link>
							</li>
							<li>
								<Link to="/ui-general">{t('General')}</Link>
							</li>
							<li>
								<Link to="/ui-colors">{t('Colors')}</Link>
							</li>
							<li>
								<Link to="/ui-rating">{t('Rating')}</Link>
							</li>
							<li>
								<Link to="/ui-notifications">{t('Notifications')}</Link>
							</li>
							<li>
								<Link to="/ui-utilities">{t('Utilities')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="">
							<i className="bx bxs-eraser" />
							<span className="badge rounded-pill bg-danger float-end">10</span>
							<span>{t('Forms')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/form-elements">{t('Form Elements')}</Link>
							</li>
							<li>
								<Link to="/form-layouts">{t('Form Layouts')}</Link>
							</li>
							<li>
								<Link to="/form-validation">{t('Form Validation')}</Link>
							</li>
							<li>
								<Link to="/form-advanced">{t('Form Advanced')}</Link>
							</li>
							<li>
								<Link to="/form-editors">{t('Form Editors')}</Link>
							</li>
							<li>
								<Link to="/form-uploads">{t('Form File Upload')} </Link>
							</li>
							<li>
								<Link to="/form-repeater">{t('Form Repeater')}</Link>
							</li>
							<li>
								<Link to="/form-wizard">{t('Form Wizard')}</Link>
							</li>
							<li>
								<Link to="/form-mask">{t('Form Mask')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-list-ul" />
							<span>{t('Tables')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/tables-basic">{t('Basic Tables')}</Link>
							</li>
							{/* <li>
                  <Link to="/tables-datatable">{t("Data Tables")}</Link>
                </li> */}
							<li>
								<Link to="/tables-responsive">{t('Responsive Table')}</Link>
							</li>
							{/* <li>
                  <Link to="/tables-dragndrop">
                    {t("Drag & Drop Table")}
                  </Link>
                </li> */}
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bxs-bar-chart-alt-2" />
							<span>{t('Charts')}</span>
						</Link>

						<ul className="sub-menu">
							<li>
								<Link to="/apex-charts">{t('Apex charts')}</Link>
							</li>
							<li>
								<Link to="/e-charts">{t('E Chart')}</Link>
							</li>
							<li>
								<Link to="/chartjs-charts">{t('Chartjs Chart')}</Link>
							</li>

							<li>
								<Link to="/charts-knob">{t('Knob Charts')}</Link>
							</li>
							<li>
								<Link to="/sparkline-charts">{t('Sparkline Chart')}</Link>
							</li>
							<li>
								<Link to="/re-charts">{t('Re Chart')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-aperture" />
							<span>{t('Icons')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/icons-boxicons">{t('Boxicons')}</Link>
							</li>
							<li>
								<Link to="/icons-materialdesign">{t('Material Design')}</Link>
							</li>
							<li>
								<Link to="/icons-dripicons">{t('Dripicons')}</Link>
							</li>
							<li>
								<Link to="/icons-fontawesome">{t('Font awesome')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-map" />
							<span>{t('Maps')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/maps-google">{t('Google Maps')}</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/#" className="has-arrow ">
							<i className="bx bx-share-alt" />
							<span>{t('Multi Level')}</span>
						</Link>
						<ul className="sub-menu">
							<li>
								<Link to="/#">{t('Level 1.1')}</Link>
							</li>
							<li>
								<Link to="/#" className="has-arrow">
									{t('Level 1.2')}
								</Link>
								<ul className="sub-menu">
									<li>
										<Link to="/#">{t('Level 2.1')}</Link>
									</li>
									<li>
										<Link to="/#">{t('Level 2.2')}</Link>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</SimpleBar>
	);
};

SidebarContent.defaultProps = {
	t: () => {},
};

SidebarContent.propTypes = {
	t: PropTypes.func,
};

export default withRouter(withTranslation()(SidebarContent));
