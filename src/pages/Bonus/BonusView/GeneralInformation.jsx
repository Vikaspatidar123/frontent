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

const GeneralDetails = ({ bonusDetails }) => (
	<Row>
		<Col sm={4}>
			<Card className="p-3">
				<Row>
					<Col>
						<h6 className="text-nowrap">Promotion Title:</h6>
					</Col>
					<Col>
						<p>{bonusDetails?.promotionTitle?.[selectedLanguage] || '-'}</p>
					</Col>
				</Row>

				{bonusDetails?.visibleInPromotions && (
					<Row>
						<Col>
							<h6 className="text-nowrap">Valid on Days:</h6>
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
									{`${bonusDetails?.validOnDays}`?.[idx] && (
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
				{bonusDetails?.bonusType !== BONUS_TYPES.JOINING && (
					<Row>
						<Col>
							<h6 className="text-nowrap">Terms and Conditions:</h6>
						</Col>
						<Col>
							{bonusDetails?.termAndCondition?.[selectedLanguage]
								? Parser(bonusDetails?.termAndCondition?.[selectedLanguage])
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
						<h6 className="text-nowrap">Bonus Type:</h6>
					</Col>
					<Col>
						<p>{bonusDetails?.bonusType?.toUpperCase()}</p>
					</Col>
				</Row>

				{bonusDetails?.bonusType === BONUS_TYPES.FREESPINS && (
					<Row>
						<Col>
							<h6 className="text-nowrap">Quantity:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.quantity}</p>
						</Col>
					</Row>
				)}

				{bonusDetails?.bonusType === BONUS_TYPES.DEPOSIT && (
					<Row>
						<Col>
							<h6 className="text-nowrap">Bonus Percentage</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.depositBonusPercent}%</p>
						</Col>
					</Row>
				)}
				{!bonusDetails?.bonusType === BONUS_TYPES.FREESPINS &&
					bonusDetails?.bonusType !== BONUS_TYPES.JOINING && (
						<>
							<Row>
								<Col>
									<h6 className="text-nowrap">Wagering Type:</h6>
								</Col>
								<Col>
									<p>
										{
											wageringRequirementType?.find(
												(val) =>
													val.value === bonusDetails?.wageringRequirementType
											)?.label
										}
									</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<h6 className="text-nowrap">Wagering Multiplier :</h6>
								</Col>
								<Col>
									<p>{bonusDetails?.wageringMultiplier}</p>
								</Col>
							</Row>
						</>
					)}
				<Row>
					<Col>
						<h6 className="text-nowrap">Days To Clear:</h6>
					</Col>
					<Col>
						<p>{bonusDetails?.daysToClear}</p>
					</Col>
				</Row>
				{bonusDetails?.bonusType === BONUS_TYPES.FREESPINS && (
					<Row>
						<Col>
							<h6 className="text-nowrap">Bet Level:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.other?.betLevel}</p>
						</Col>
					</Row>
				)}
				{checkLabels(bonusDetails?.bonusType).map(({ label, value }) => (
					<Row key={label}>
						<Col>
							<h6 className="text-nowrap">{label}:</h6>
						</Col>
						<Col>
							<Badge
								className="mb-3"
								bg={bonusDetails?.[value] ? 'success' : 'dark'}
							>
								{bonusDetails?.[value] ? (
									<i className="mdi mdi-check-outline" />
								) : (
									<i className="mdi mdi-clock-outline" />
								)}
							</Badge>
						</Col>
					</Row>
				))}
				{![BONUS_TYPES.JOINING].includes(bonusDetails?.bonusType) && (
					<Row>
						<Col>
							<h6 className="text-nowrap">Show Validity:</h6>
						</Col>
						<Col>
							<Badge
								className="mb-3"
								bg={bonusDetails?.other?.showBonusValidity ? 'success' : 'dark'}
							>
								{bonusDetails?.other?.showBonusValidity ? (
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
						<h6 className="text-nowrap">Code:</h6>
					</Col>
					<Col>
						<p>{bonusDetails?.code}</p>
					</Col>
				</Row>
				{bonusDetails?.bonusType !== BONUS_TYPES.JOINING && (
					<Row>
						<Col sm={4}>
							<h6 className="text-nowrap">Description:</h6>
						</Col>
						<Col>
							{bonusDetails?.description?.EN &&
								Parser(bonusDetails?.description?.EN)}
						</Col>
					</Row>
				)}
				{bonusDetails?.bonusType !== BONUS_TYPES.JOINING && (
					<>
						<Row>
							<Col sm={4}>
								<h6 className="text-nowrap">Valid From:</h6>
							</Col>
							<Col>
								<p>{moment(bonusDetails?.validFrom).format(YMDFormat)}</p>
							</Col>
						</Row>
						<Row>
							<Col sm={4}>
								<h6 className="text-nowrap">Valid To:</h6>
							</Col>
							<Col>
								<p>{moment(bonusDetails?.validTo).format(YMDFormat)}</p>
							</Col>
						</Row>
					</>
				)}
				<Row>
					<Col>
						{bonusDetails?.imageUrl && (
							<img
								className="img-thumbnail"
								width="200px"
								src={bonusDetails.imageUrl}
								alt="img"
							/>
						)}
					</Col>
				</Row>
			</Card>
		</Col>
	</Row>
);

GeneralDetails.defaultProps = {
	bonusDetails: {},
};

GeneralDetails.propTypes = {
	bonusDetails: PropTypes.objectOf,
};

export default GeneralDetails;
