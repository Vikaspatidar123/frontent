import React from 'react';
import { Col } from 'reactstrap';
import leaf from '../../../assets/images/leaf.png';
import logodark from '../../../assets/images/ARC-Logo.svg';

// img
import authOverlay from '../../../assets/images/login/login-back.png';

const Banner = () => (
	<Col
		xl={9}
		style={{
			background: `url(${authOverlay})`,
			backgroundSize: '115vw',
			opacity: 1,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
		}}
	>
		<div className="auth-full-bg pt-lg-5 p-4 position-relative">
			<div>
				<img src={logodark} alt="logo" className="w-50" />
			</div>
			<div className="position-absolute bottom-0 leaf-position w-100">
				<img src={leaf} alt="leaf" />
			</div>
		</div>
	</Col>
);
export default Banner;
