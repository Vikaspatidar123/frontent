/* eslint-disable no-nested-ternary */
import { useParams } from 'react-router-dom';
import { formatDateYMD } from '../../../utils/dateFormatter';
import { genderTypes } from '../constants';

const useUserOverview = ({ user }) => {
	const { playerId } = useParams();
	const showStyle = (data) => (data ? 'text-success' : 'text-danger');
	const printData = (data) => (data ? 'Yes' : 'No');

	const {
		addresses,
		emailVerified,
		firstName,
		lastName,
		username,
		gender,
		dateOfBirth,
		email,
		defaultDisableReason,
		isActive,
		reason,
		kycMethod,
		phone,
		sumsubKycStatus,
		kycStatus,
		userTags,
	} = user || {};

	const address = addresses?.length
		? `${addresses[addresses.length - 1]?.address || '-'}, ${
				addresses[addresses.length - 1]?.city || '-'
		  }, ${addresses[addresses.length - 1]?.zipCode || '-'}, ${
				addresses[addresses.length - 1]?.countryCode || '-'
		  } `
		: '-';
	let tags = '';
	userTags?.forEach((t, idx) => {
		tags += `${t?.tag?.tag} ${idx + 1 !== userTags?.length ? ',' : ''}`;
	});

	const basicInfo = [
		{ label: 'ID', value: playerId },
		{ label: 'Email', value: email },
		{
			label: 'Email Verified',
			value: printData(emailVerified),
			subValue: showStyle(emailVerified),
		},
		{ label: 'Full Name', value: `${firstName || ''} ${lastName || '-'}` },
		{ label: 'User Name', value: username },
		{
			label: 'Gender',
			value: genderTypes.find((gen) => gen.value === gender)?.label || '',
		},
		{ label: 'Date Of Birth', value: formatDateYMD(dateOfBirth) },

		{
			label: 'Status',
			value: isActive ? 'Active' : 'In -Active',
			subValue: showStyle(isActive),
		},
		{ label: 'In-Active Reason', value: defaultDisableReason || '-' },
		// { label: 'Portal', value: `${tenant?.name} (${tenant?.domain})` },
		{ label: 'Reason', value: !isActive ? reason : '' },
		{
			label: 'Tags',
			value: tags || 'NA',
		},
		// { label: 'SumSub Applicant Id', value: applicantId },
	];

	const contactInfo = [
		{ label: 'Phone Number', value: phone },
		{ label: 'Address', value: address },
		// { label: 'Country Code', value: address?.countryCode },
		// {
		// 	label: 'NewsLetter',
		// 	value: newsLetter ? 'True' : 'False',
		// 	subValue: showStyle(newsLetter),
		// },
		// {
		// 	label: 'SMS',
		// 	value: sms ? 'True' : 'False',
		// 	subValue: showStyle(sms),
		// },
	];

	const kycInfo = [
		{
			label: 'KYC Method',
			value: kycMethod === 1 ? 'Sumsub' : 'System KYC',
		},
		{
			label: 'KYC Status',
			value:
				kycMethod === 1
					? sumsubKycStatus?.toUpperCase()
					: kycStatus
					? 'Completed'
					: 'Pending',
		},
	];

	return {
		showStyle,
		printData,
		basicInfo,
		contactInfo,
		kycInfo,
	};
};

export default useUserOverview;
