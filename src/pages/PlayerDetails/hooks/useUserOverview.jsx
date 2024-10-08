/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { formatDateYMD } from '../../../utils/dateFormatter';
import { genderTypes } from '../constants';
// import moment from 'moment';

const useUserOverview = ({ user }) => {
	const { playerId } = useParams();
	const showStyle = (data) => (data ? 'text-success' : 'text-danger');
	const printData = (data) => (data ? 'Yes' : 'No');

	const { currencyById } = useSelector((state) => state.Currencies);
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
		// defaultDisableReason,
		isActive,
		reason,
		kycMethod,
		phone,
		sumsubKycStatus,
		kycStatus,
		userTags,
		publicAddress,
		referral,
		// registration,
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

		{ label: 'Date Of Birth', value: formatDateYMD(dateOfBirth) },

		{
			label: 'Status',
			value: isActive ? 'Active' : 'In -Active',
			subValue: showStyle(isActive),
		},
		// { label: 'Inactive Reason', value: defaultDisableReason || '-' },
		// { label: 'Portal', value: `${tenant?.name} (${tenant?.domain})` },
		{ label: 'Reason', value: !isActive ? reason : '' },
		{
			label: 'Segments',
			value: tags || 'NA',
		},
		// { label: 'SumSub Applicant Id', value: applicantId },
	];

	const addLineBreaks = (str, length) => {
		let result = '';
		for (let i = 0; i < str.length; i += length) {
			result += `${str.substring(i, i + length)} `;
		}
		return result;
	};

	const contactInfo = [
		{ label: 'Phone Number', value: phone },
		{ label: 'Address', value: address },
		...(!isEmpty(referral)
			? [
					{
						label: 'Referred By',
						value: (
							<Link
								className="text-decoration-underline"
								to={`/player-details/${referral?.id}`}
							>
								{`${referral?.firstName || ''} ${referral?.lastName || ''} ${
									!(referral?.firstName && referral?.lastName)
										? referral?.username
										: ''
								}`}
							</Link>
						),
					},
			  ]
			: []),
		...(publicAddress
			? [
					{ label: 'Metamask Registered Player', value: 'Yes' },
					{
						label: 'Wallet Address',
						value: addLineBreaks(publicAddress, 10),
					},
			  ]
			: []),

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

	const otherInfo = [
		{
			label: 'Gender',
			value: genderTypes.find((gen) => gen.value === gender)?.label || '',
		},
		// {
		// 	label: 'Registration Date',
		// 	value: moment(registration).format('ll')
		// },
	];

	const addNumbers = (a, b) => Number((a + b).toFixed(3));

	const totalPlayerStats = useMemo(() => {
		const accumulator = {};
		userStatsData?.forEach((item) => {
			const exchangeRate = Number(
				currencyById?.[item?.currency_id]?.exchangeRate || 1
			);

			accumulator.total_deposit = addNumbers(
				Number(item?.total_deposit || 0) * exchangeRate,
				Number(accumulator?.total_deposit || 0)
			);

			accumulator.total_withdraw = addNumbers(
				Number(item?.total_withdraw || 0) * exchangeRate,
				Number(accumulator?.total_withdraw || 0)
			);

			accumulator.total_casino_bet_count = addNumbers(
				Number(item?.total_casino_bet_count || 0),
				Number(accumulator?.total_casino_bet_count || 0)
			);

			accumulator.total_casino_bet = addNumbers(
				Number(item?.total_casino_bet || 0) * exchangeRate,
				Number(accumulator?.total_casino_bet || 0)
			);

			accumulator.total_casino_win = addNumbers(
				Number(item?.total_casino_win || 0) * exchangeRate,
				Number(accumulator?.total_casino_win || 0)
			);

			accumulator.total_sb_bet_count = addNumbers(
				Number(item?.total_sb_bet_count || 0),
				Number(accumulator?.total_sb_bet_count || 0)
			);

			accumulator.total_sb_bet = addNumbers(
				Number(item?.total_sb_bet || 0) * exchangeRate,
				Number(accumulator?.total_sb_bet || 0)
			);

			accumulator.total_sb_win = addNumbers(
				Number(item?.total_sb_win || 0) * exchangeRate,
				Number(accumulator?.total_sb_win || 0)
			);

			accumulator.total_deposit_count = addNumbers(
				Number(item?.total_deposit_count || 0),
				Number(accumulator?.total_deposit_count || 0)
			);

			accumulator.total_bet_amt = addNumbers(
				Number(accumulator.total_bet_amt || 0),
				Number(item?.total_sb_bet || 0) * exchangeRate +
					Number(item?.total_casino_bet || 0) * exchangeRate
			);
		});

		const {
			total_casino_bet,
			total_sb_bet,
			total_casino_win,
			total_sb_win,
			total_tournament_enrolls,
			total_tournament_payouts,
		} = accumulator;

		accumulator.wagered = Number(
			(
				Number(total_casino_bet || 0) +
				Number(total_sb_bet || 0) +
				Number(total_tournament_enrolls || 0)
			).toFixed(3)
		);

		accumulator.payout = Number(
			(
				Number(total_casino_win || 0) +
				Number(total_sb_win || 0) +
				Number(total_tournament_payouts || 0)
			).toFixed(3)
		);

		accumulator.profit = Number(
			(accumulator.wagered - accumulator.payout).toFixed(3)
		);

		return accumulator;
	}, [userStatsData, currencyById]);

	return {
		basicInfo,
		contactInfo,
		kycInfo,
		totalPlayerStats,
		userStatsData,
		otherInfo,
	};
};

export default useUserOverview;
