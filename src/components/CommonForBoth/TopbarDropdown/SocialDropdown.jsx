import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { socialHandles } from '../../../constants/generalConfig';

const SocialDropdown = () => {
	const [socialDrp, setsocialDrp] = useState(false);

	return (
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
	);
};

export default SocialDropdown;
