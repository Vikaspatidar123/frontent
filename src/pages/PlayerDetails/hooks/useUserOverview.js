/* eslint-disable no-nested-ternary */
import { useParams } from 'react-router-dom';
import { formatDateYMD } from '../../../utils/dateFormatter';
import { genderTypes } from '../constants';

const useUserOverview = ({ user }) => {
	const { playerId } = useParams();
	const showStyle = (data) => (data ? 'text-success' : 'text-danger');
	const printData = (data) => (data ? 'Yes' : 'No');
	let tags = '';
	user?.userTags?.forEach((t, idx) => {
		tags += `${t?.tag?.tag} ${idx + 1 !== user?.userTags?.length ? ',' : ''}`;
	});

	const basicInfo = [
		{ label: 'ID', value: playerId },
		{ label: 'Email', value: user?.email },
		{
			label: 'Email Verified',
			value: printData(user?.emailVerified),
			subValue: showStyle(user?.emailVerified),
		},
		{ label: 'Full Name', value: `${user?.firstName} ${user?.lastName}` },
		{ label: 'User Name', value: user?.username },
		{
			label: 'Gender',
			value:
				genderTypes.find((gender) => gender.value === user?.gender)?.label ||
				'',
		},
		{ label: 'Date Of Birth', value: formatDateYMD(user?.dateOfBirth) },

		{
			label: 'Status',
			value: user?.isActive ? 'Active' : 'In -Active',
			subValue: showStyle(user?.isActive),
		},
		{ label: 'In-Active Reason', value: user?.defaultDisableReason || '-' },
		// { label: 'Portal', value: `${user?.tenant?.name} (${user?.tenant?.domain})` },
		{ label: 'Reason', value: !user?.isActive ? user?.reason : '' },
		{
			label: 'Tags',
			value: tags || 'NA',
		},
		// { label: 'SumSub Applicant Id', value: user?.applicantId },
	];

	const moreInfo = [
		{ label: 'IP Address', value: user?.signInIp, subValue: 'text-success' },
		{ label: 'Date Of Birth', value: formatDateYMD(user?.dateOfBirth) },
		{ label: 'Phone Number', value: user?.phone },
		{ label: 'City', value: user?.city },
		{ label: 'ZipCode', value: user?.zipCode },
		{ label: 'Country Code', value: user?.countryCode },
	];

	const contactInfo = [
		{ label: 'Phone Number', value: user?.phone },
		...(user?.addresses?.map((address, idx) => ({
			label: `Address ${idx + 1}`,
			value: address
				? `${address?.address || ''}, ${address?.city || ''}, ${
						address?.zipCode || ''
				  }
					, ${address?.countryCode || ''}`
				: 'NA',
		})) || []),
		// { label: 'Country Code', value: address?.countryCode },
		// {
		// 	label: 'NewsLetter',
		// 	value: user?.newsLetter ? 'True' : 'False',
		// 	subValue: showStyle(user?.newsLetter),
		// },
		// {
		// 	label: 'SMS',
		// 	value: user?.sms ? 'True' : 'False',
		// 	subValue: showStyle(user?.sms),
		// },
	];

	const kycInfo = [
		{
			label: 'KYC Method',
			value: user?.kycMethod === 1 ? 'Sumsub' : 'System KYC',
		},
		{
			label: 'KYC Status',
			value:
				user?.kycMethod === 1
					? user?.sumsubKycStatus?.toUpperCase()
					: user?.kycStatus
					? 'Completed'
					: 'Pending',
		},
	];

	return {
		showStyle,
		printData,
		basicInfo,
		moreInfo,
		contactInfo,
		kycInfo,
	};
};

export default useUserOverview;
