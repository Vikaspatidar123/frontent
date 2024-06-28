/* eslint-disable no-nested-ternary */
// eslint-disable-next-line
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDateYMD } from '../../../utils/dateFormatter';
import { genderTypes } from '../constants';

const useUserOverview = ({ user }) => {
	const { playerId } = useParams();
	const showStyle = (data) => (data ? 'text-success' : 'text-danger');
	const printData = (data) => (data ? 'Yes' : 'No');

	const { currencyById, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);
	const { userStatsData } = useSelector((state) => state.UserDetails);

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
	const totalPlayerStats = useMemo(() => {
		const accumulator = {};
		userStatsData?.forEach((item) => {
			const exchangeRate = Number(
				currencyById?.[item?.currency_id]?.exchangeRate || 1
			);
			accumulator.total_deposit =
				Number(item?.total_deposit || 0) * exchangeRate +
				Number(accumulator?.total_deposit || 0);
			accumulator.total_withdraw =
				Number(item?.total_withdraw || 0) * exchangeRate +
				Number(accumulator?.total_withdraw || 0);
			accumulator.total_casino_bet_count =
				Number(item?.total_casino_bet_count || 0) +
				Number(accumulator?.total_casino_bet_count || 0);
			accumulator.total_casino_bet =
				Number(item?.total_casino_bet || 0) * exchangeRate +
				Number(accumulator?.total_casino_bet || 0);
			accumulator.total_casino_win =
				Number(item?.total_casino_win || 0) * exchangeRate +
				Number(accumulator?.total_casino_win || 0);
			accumulator.total_sb_bet_count =
				Number(item?.total_sb_bet_count || 0) +
				Number(accumulator?.total_sb_bet_count || 0);
			accumulator.total_sb_bet =
				Number(item?.total_sb_bet || 0) * exchangeRate +
				Number(accumulator?.total_sb_bet || 0);
			accumulator.total_sb_win =
				Number(item?.total_sb_win || 0) * exchangeRate +
				Number(accumulator?.total_sb_win || 0);
			accumulator.total_deposit_count =
				Number(item?.total_deposit_count || 0) +
				Number(accumulator?.total_deposit_count || 0);
			accumulator.total_bet_amt =
				Number(accumulator.total_bet_amt || 0) +
				Number(item?.total_sb_bet || 0) * exchangeRate +
				Number(item?.total_casino_bet || 0) * exchangeRate;
			accumulator.profit =
				Number(item?.profit || 0) * exchangeRate +
				Number(accumulator?.profit || 0);
		});
		return accumulator;
	}, [userStatsData]);

	const StatsHeaders = [
		{
			title: 'Wagered',
			accessor: 'total_bet_amt',
		},
		{
			title: 'Platform P&L',
			accessor: 'profit',
		},
		{
			title: 'Deposit',
			accessor: 'total_deposit',
		},
		{
			title: 'Withdraw',
			accessor: 'total_withdraw',
		},
		{
			title: 'Deposit Count',
			accessor: 'total_deposit_count',
		},
		{
			title: 'Casino Bet Count',
			accessor: 'total_casino_bet_count',
		},
		{
			title: 'Casino Wagered',
			accessor: 'total_casino_bet',
		},
		{
			title: 'Casino Payout',
			accessor: 'total_casino_win',
		},
		{
			title: 'Sports Bet Count',
			accessor: 'total_sb_bet_count',
		},
		{
			title: 'Sports Wagered',
			accessor: 'total_sb_bet',
		},
		{
			title: 'Sports Payout',
			accessor: 'total_sb_win',
		},
	];

	return {
		showStyle,
		printData,
		basicInfo,
		contactInfo,
		kycInfo,
		StatsHeaders,
		currencyById,
		userStatsData,
		totalPlayerStats,
		defaultCurrency,
	};
};

export default useUserOverview;
