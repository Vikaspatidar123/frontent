/* eslint-disable react/prop-types */
import React from 'react';
import UserDocsList from './components/UserDocsList';

const KYCSettings = ({ userDetails, userId }) =>
	userDetails?.kycMethod === 1 ? (
		<>TablePage</>
	) : (
		<UserDocsList userId={userId} />
	);

export default KYCSettings;
