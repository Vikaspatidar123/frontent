import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Col } from 'reactstrap';
import leaf from '../../../assets/images/leaf.png';
import logodark from '../../../assets/images/b2c-gs.png';

// img
import authOverlay from '../../../assets/images/login/login-image.png';

const Banner = () => (
	<Col xl={8}>
		<div className="auth-full-bg pt-lg-5 p-4 position-relative">
			<div>
				<img src={logodark} alt="logo" className="w-50" />
			</div>
			<div className="w-100">
				<div
					className="bg-overlay"
					style={{
						background: `url(${authOverlay})`,
						backgroundSize: '50%',
						opacity: 1,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				/>
			</div>
			<div className="position-absolute bottom-0 leaf-position w-100">
				<img src={leaf} alt="leaf" />
			</div>
		</div>
	</Col>
);
export default Banner;
