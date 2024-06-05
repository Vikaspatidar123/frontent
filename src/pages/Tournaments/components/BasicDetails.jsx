/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'reactstrap';
import { detailList } from '../formDetails';
import { formatDateYMD } from '../../../utils/dateFormatter';

const BasicDetails = ({ tournamentDetail }) => {
	// const { clubEliteLevels } = useSelector(
	// 	(state) => state?.ClubEliteLoyaltyLevels
	// );

	// useEffect(() => {
	// 	dispatch(getLoyaltyLevels());
	// }, []);

	// const eligibleTiers = tournamentDetail?.eligibleTiers?.length
	// 	? tournamentDetail?.eligibleTiers?.map((tier) => {
	// 			const tierData = clubEliteLevels?.find(
	// 				(level) => Number(level?.rank) === Number(tier)
	// 			);
	// 			return tierData?.name;
	// 	  })
	// 	: ['All'];

	const formattedTournamentDetail = {
		...tournamentDetail,
		entryFees: `${tournamentDetail?.entryFees}`,
		rebuyFees: `${tournamentDetail?.rebuyFees}`,
		registrationEndDate: tournamentDetail?.registrationEndDate
			? formatDateYMD(tournamentDetail.registrationEndDate)
			: tournamentDetail?.registrationEndDate,
		tournamentPrizeType: tournamentDetail?.tournamentPrizes?.[0]?.type,
		transactionCreditValue: `${tournamentDetail?.transactionCreditValue}`,
	};

	const renderValue = (value) =>
		value !== 0 && value !== null && value !== undefined
			? value
			: 'Not Applicable';

	return (
		<Row lg={12} className="px-5 py-3">
			{detailList?.map((detail) => (
				<Row className="p-2 border-bottom">
					<Col lg={4} className="fw-semibold py-2 px-4 font-size-16">
						{detail?.label}
					</Col>
					<Col lg={8} className="p-2 font-size-16 text-capitalize">
						{Array.isArray(tournamentDetail?.[detail?.value])
							? formattedTournamentDetail?.[detail?.value].join(', ')
							: detail.value === 'name'
							? renderValue(formattedTournamentDetail?.[detail?.value]?.EN)
							: formattedTournamentDetail?.[detail?.value] === 'fiat'
							? 'Flat'
							: renderValue(formattedTournamentDetail?.[detail?.value])}
					</Col>
				</Row>
			))}
		</Row>
	);
};

export default BasicDetails;
