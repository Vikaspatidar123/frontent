/* eslint-disable no-nested-ternary */
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/dateFormatter';

const useUserOverview = ({ user }) => {
	const { userId } = useParams();
	const showStyle = (data) => (data ? 'text-success' : 'text-danger');
	const printData = (data) => (data ? 'Yes' : 'No');

	const basicInfo = [
		{ label: 'ID', value: userId },
		{ label: 'User Name', value: user?.username },
		{ label: 'Full Name', value: `${user?.firstName} ${user?.lastName}` },
		{ label: 'Email', value: user?.email },
		{
			label: 'Email Verified',
			value: printData(user?.isEmailVerified),
			subValue: showStyle(user?.isEmailVerified),
		},
		{
			label: 'NewsLetter',
			value: user?.newsLetter ? 'True' : 'False',
			subValue: showStyle(user?.newsLetter),
		},
		{
			label: 'SMS',
			value: user?.sms ? 'True' : 'False',
			subValue: showStyle(user?.sms),
		},
		{
			label: 'Status',
			value: user?.isActive ? 'Active' : 'In -Active',
			subValue: showStyle(user?.isActive),
		},
		{ label: 'In-Active Reason', value: user?.defaultDisableReason || '-' },
		{
			label: 'Portal',
			value: `${user?.tenant?.name} (${user?.tenant?.domain})`,
		},
		{ label: 'Reason', value: !user?.isActive ? user?.reason : '' },
		{
			label: 'Tags',
			value: user?.tags
				? user?.tags?.length < 1
					? 'N/A'
					: user?.tags?.join(', ')
				: 'N/A',
		},
		{ label: 'Sumsub Applicant Id', value: user?.applicantId },
		{
			label: 'KYC Method',
			value: user?.kycMethod === 1 ? 'Sumsub' : 'System KYC',
		},
		{
			label: 'KYC Status',
			value:
				user?.kycMethod === 1
					? user?.sumsubKycStatus?.toUpperCase()
					: user?.kycStatus,
		},
	];

	const moreInfo = [
		{ label: 'IP Address', value: user?.signInIp, subValue: 'text-success' },
		{ label: 'Date Of Birth', value: formatDate(user?.dateOfBirth) },
		{ label: 'Phone Number', value: user?.phone },
		{ label: 'City', value: user?.city },
		{ label: 'ZipCode', value: user?.zipCode },
		{ label: 'Country Code', value: user?.countryCode },
	];

	return {
		userId,
		showStyle,
		printData,
		basicInfo,
		moreInfo,
	};
};

export default useUserOverview;
