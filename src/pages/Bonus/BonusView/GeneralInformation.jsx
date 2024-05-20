/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { Badge, Card, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import Parser from 'html-react-parser';
import {
	BONUS_TYPES,
	checkLabels,
	daysLabels,
	wageringRequirementType,
} from '../constants';
import { YMDFormat, selectedLanguage } from '../../../constants/config';

const GeneralDetails = ({ bonusDetail }) => (
	<Row>
		<Col sm={4}>
			<Card className="p-3">
				<Row>
					<Col>
						<h3 className="h6 text-nowrap">Promotion Title:</h3>
					</Col>
					<Col>
						<p>{bonusDetail?.promotionTitle?.[selectedLanguage] || '-'}</p>
					</Col>
				</Row>

				{bonusDetail?.visibleInPromotions && (
					<Row>
						<Col>
							<h3 className="h6 text-nowrap">Valid on Days:</h3>
						</Col>
						<Col>
							{daysLabels?.map((day, idx) => (
								<Col
									key={day}
									className="d-flex"
									style={{
										verticalAlign: 'middle',
										justifyContent: 'flex-start',
									}}
								>
									<p>{day}</p>
									{`${bonusDetail?.validOnDays}`?.[idx] && (
										<div
											className="rounded-circle mt-2 mx-2"
											style={{
												width: '10px',
												height: '10px',
												background: '#1aa509',
											}}
										/>
									)}
								</Col>
							))}
						</Col>
					</Row>
				)}
				{bonusDetail?.bonusType !== BONUS_TYPES.JOINING && (
					<Row>
						<Col>
							<h3 className="h6 text-nowrap">Terms and Conditions:</h3>
						</Col>
						<Col>
							{bonusDetail?.termAndCondition?.[selectedLanguage]
								? Parser(bonusDetail?.termAndCondition?.[selectedLanguage])
								: '-'}
						</Col>
					</Row>
				)}
			</Card>
		</Col>
		<Col sm={4}>
			<Card className="p-3">
				<Row>
					<Col>
						<h3 className="h6 text-nowrap">Bonus Type:</h3>
					</Col>
					<Col>
						<p>{bonusDetail?.bonusType?.toUpperCase()}</p>
					</Col>
				</Row>

				{bonusDetail?.bonusType === BONUS_TYPES.FREESPINS && (
					<Row>
						<Col>
							<h3 className="h6 text-nowrap">Quantity:</h3>
						</Col>
						<Col>
							<p>{bonusDetail?.quantity}</p>
						</Col>
					</Row>
				)}

				{bonusDetail?.bonusType === BONUS_TYPES.DEPOSIT && (
					<Row>
						<Col>
							<h3 className="h6 text-nowrap">Bonus Percentage</h3>
						</Col>
						<Col>
							<p>{bonusDetail?.depositBonusPercent}%</p>
						</Col>
					</Row>
				)}
				{!bonusDetail?.bonusType === BONUS_TYPES.FREESPINS &&
					bonusDetail?.bonusType !== BONUS_TYPES.JOINING && (
						<>
							<Row>
								<Col>
									<h3 className="h6 text-nowrap">Wagering Type:</h3>
								</Col>
								<Col>
									<p>
										{
											wageringRequirementType?.find(
												(val) =>
													val.value === bonusDetail?.wageringRequirementType
											)?.label
										}
									</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<h3 className="h6 text-nowrap">Wagering Multiplier :</h3>
								</Col>
								<Col>
									<p>{bonusDetail?.wageringMultiplier}</p>
								</Col>
							</Row>
						</>
					)}
				<Row>
					<Col>
						<h3 className="h6 text-nowrap">Days To Clear:</h3>
					</Col>
					<Col>
						<p>{bonusDetail?.daysToClear}</p>
					</Col>
				</Row>
				{bonusDetail?.bonusType === BONUS_TYPES.FREESPINS && (
					<Row>
						<Col>
							<h3 className="h6 text-nowrap">Bet Level:</h3>
						</Col>
						<Col>
							<p>{bonusDetail?.other?.betLevel}</p>
						</Col>
					</Row>
				)}
				{checkLabels(bonusDetail?.bonusType).map(({ label, value }) => (
					<Row key={label}>
						<Col>
							<h3 className="h6 text-nowrap">{label}:</h3>
						</Col>
						<Col>
							<Badge
								className="mb-3"
								bg={bonusDetail?.[value] ? 'success' : 'dark'}
							>
								{bonusDetail?.[value] ? (
									<i className="mdi mdi-check-outline" />
								) : (
									<i className="mdi mdi-clock-outline" />
								)}
							</Badge>
						</Col>
					</Row>
				))}
				{![BONUS_TYPES.JOINING].includes(bonusDetail?.bonusType) && (
					<Row>
						<Col>
							<h3 className="h6 text-nowrap">Show Validity:</h3>
						</Col>
						<Col>
							<Badge
								className="mb-3"
								bg={bonusDetail?.other?.showBonusValidity ? 'success' : 'dark'}
							>
								{bonusDetail?.other?.showBonusValidity ? (
									<i className="mdi mdi-check-outline" />
								) : (
									<i className="mdi mdi-clock-outline" />
								)}
							</Badge>
						</Col>
					</Row>
				)}
			</Card>
		</Col>

		<Col sm={4}>
			<Card className="p-3">
				<Row>
					<Col sm={4}>
						<h3 className="h6 text-nowrap">Code:</h3>
					</Col>
					<Col>
						<p>{bonusDetail?.code}</p>
					</Col>
				</Row>
				{bonusDetail?.bonusType !== BONUS_TYPES.JOINING && (
					<Row>
						<Col sm={4}>
							<h3 className="h6 text-nowrap">Description:</h3>
						</Col>
						<Col>
							{bonusDetail?.description?.EN &&
								Parser(bonusDetail?.description?.EN)}
						</Col>
					</Row>
				)}
				{bonusDetail?.bonusType !== BONUS_TYPES.JOINING && (
					<>
						<Row>
							<Col sm={4}>
								<h3 className="h6 text-nowrap">Valid From:</h3>
							</Col>
							<Col>
								<p>{moment(bonusDetail?.validFrom).format(YMDFormat)}</p>
							</Col>
						</Row>
						<Row>
							<Col sm={4}>
								<h3 className="h6 text-nowrap">Valid To:</h3>
							</Col>
							<Col>
								<p>{moment(bonusDetail?.validTo).format(YMDFormat)}</p>
							</Col>
						</Row>
					</>
				)}
				{bonusDetail?.bonusType !== BONUS_TYPES.JOINING && (
					<Row>
						<Col>
							{bonusDetail?.imageUrl && (
								<img
									className="img-thumbnail"
									width="200px"
									src={bonusDetail?.imageUrl}
									alt="img"
								/>
							)}
						</Col>
					</Row>
				)}
			</Card>
		</Col>
	</Row>
);

GeneralDetails.defaultProps = {
	bonusDetail: {},
};

GeneralDetails.propTypes = {
	bonusDetail: PropTypes.objectOf,
};

export default GeneralDetails;
