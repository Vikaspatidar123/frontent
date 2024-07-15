/* eslint-disable import/prefer-default-export */

const channelCriteria = [
	{
		label: 'KYC  Verification',
		value: 'KYC_CRITERIA',
		message: 'Create a KYC Verified Chat Room',
		name: 'kycToggle',
		valueContent: 'kycValue',
	},
	{
		label: 'Wagering Requirement',
		value: 'WAGERING_CRITERIA',
		message: 'Create a Wager-Amount Specific Chat Room',
		name: 'wageringToggle',
		valueContent: 'wageringValue',
	},
	{
		label: 'Tier Level',
		value: 'RANKING_LEVEL_CRITERIA',
		message: 'Create a Tier-Level Based Chat Room',
		name: 'tierToggle',
		valueContent: 'tierValue',
	},
	{
		label: 'Time Duration',
		value: 'TIME_CRITERIA',
		message: 'Create Time Period Specific Chat Room	',
		name: 'timeToggle',
		valueContent: 'timeValue',
	},
];

export { channelCriteria };
