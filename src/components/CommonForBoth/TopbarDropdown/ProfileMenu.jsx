import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Badge,
	Button,
} from 'reactstrap';

// i18n
import { withTranslation } from 'react-i18next';

// Redux
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withRouter from '../../Common/withRouter';
import { removeLoginToken } from '../../../network/storageUtils';

const ProfileMenu = ({ t }) => {
	// Declare a new state variable, which we'll call "menu"
	const navigate = useNavigate();
	const [menu, setMenu] = useState(false);

	const { superAdminUser } = useSelector((state) => state.PermissionDetails);
	const name = superAdminUser.firstName || superAdminUser.adminUsername || 'A';

	const logoutAdmin = () => {
		removeLoginToken();
		navigate('/login');
	};

	return (
		<Dropdown
			isOpen={menu}
			toggle={() => setMenu(!menu)}
			className="d-inline-block"
		>
			<DropdownToggle
				className="btn header-item "
				id="page-header-user-dropdown"
				tag="button"
			>
				{/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
				<Badge className="text-badge pill avatar-title rounded-circle bg-primary-subtle text-primary height-per-55">
					{name[0]}
				</Badge>
				{/* <span className="d-none d-xl-inline-block ms-2 me-1">{name}</span> */}
				{/* <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-end">
				<DropdownItem tag="a" href="/profile">
					{' '}
					<i className="bx bx-user font-size-16 align-middle me-1" />
					{t('Profile')}{' '}
				</DropdownItem>
				{/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {t("My Wallet")}
          </DropdownItem> */}
				{/* <DropdownItem tag="a" href="#" onClick={() => showRightSidebarAction(!showRightSidebar)}>
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {t("Settings")}
          </DropdownItem> */}
				{/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {t("Lock screen")}
          </DropdownItem> */}
				<div className="dropdown-divider" />
				<Button className="dropdown-item" onClick={logoutAdmin}>
					<i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
					<span>{t('Logout')}</span>
				</Button>
			</DropdownMenu>
		</Dropdown>
	);
};

ProfileMenu.propTypes = {
	t: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
	const { error, success } = state.Profile;
	return { error, success };
};

export default withRouter(
	connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
