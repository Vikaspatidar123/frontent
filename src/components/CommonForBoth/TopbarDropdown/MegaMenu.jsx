import React, { useState } from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import megamenuImg from '../../../assets/images/megamenu-img.png';
import { getMegaMenuElement } from '../../../constants/sidebar';

const MegaMenu = () => {
	const [megaMenu, setmegaMenu] = useState(false);

	return (
		<Dropdown
			className="dropdown-mega d-none d-lg-block ms-2"
			isOpen={megaMenu}
			toggle={() => {
				setmegaMenu(!megaMenu);
			}}
		>
			<DropdownToggle className="btn header-item " caret tag="button">
				{' '}
				Mega Menu <i className="mdi mdi-chevron-down" />
			</DropdownToggle>
			<DropdownMenu className="dropdown-megamenu">
				<Row>
					<Col sm={12}>
						<Row>
							{getMegaMenuElement()?.map((nav) => (
								<Col md={2} key={nav.label}>
									<h5 className="font-size-14 mt-0">{nav?.label}</h5>
									{nav?.subMenu?.length && (
										<ul className="list-unstyled megamenu-list">
											{nav?.subMenu?.map((sub) => (
												<li key={sub.link}>
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
		</Dropdown>
	);
};

export default MegaMenu;
