import React from 'react';
import logodark from '../../../assets/images/ARC-Logo.svg';

// img
import authOverlay from '../../../assets/images/login/login-banner.png';

const Banner = () => (
    <div
        style={{
            background: `url(${authOverlay})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100%',
            display: 'flex',
            opacity: 1,
            borderRadius: '25px',
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px', 
        }}
        className="w-100 h-100" 
    >
        {/* <div className="position-relative">
            <img
                src={logodark}
                alt="logo"
                className="img-fluid"
                style={{ maxWidth: '200px', width: '100%' }}
            />
        </div> */}
    </div>
);

export default Banner;