import React from 'react';

const modules = {
	kyc: 'kyc',

	tag: 'tag',

	page: 'page',

	admin: 'admin',

	bonus: 'bonus',

	banner: 'banner',

	galley: 'galley',

	limits: 'limits',

	player: 'player',

	report: 'report',

	comment: 'comment',

	country: 'country',

	currency: 'currency',

	language: 'language',

	emailTemplate: 'emailTemplate',

	casinoManagement: 'casinoManagement',

	contentManagement: 'contentManagement',

	applicationSetting: 'applicationSetting',

	sportsbookManagement: 'sportsbookManagement',

	kpiSummaryReport: 'kpiSummaryReport',

	livePlayerDetail: 'livePlayerDetail',

	gameReport: 'gameReport',

	kpiReport: 'kpiReport',

	demography: 'demography',

	review: 'review',
};

const permissionIcons = () => ({
	[modules.page]: <i className="bx bx-list-ol" />,
	[modules.bonus]: <i className="bx bxs-dollar-circle" />,
	[modules.player]: <i className="bx bx-user" />,
	[modules.admin]: <i className="bx bx-shield-quarter" />,
	[modules.review]: <i className="bx bx-list-check" />,
	[modules.kyc]: <i className="bx bx-user-check" />,
	[modules.kpiReport]: <i className="bx bxs-report" />,
	[modules.currency]: <i className="bx bx-dollar" />,
	[modules.gameReport]: <i className="bx bx-football" />,
	[modules.comment]: <i className="bx bx-comment-dots" />,
	[modules.BetSettings]: <i className="bx bx-wrench" />,
	[modules.galley]: <i className="bx bxs-image" />,
	[modules.report]: <i className="bx bx-wallet-alt" />,
	[modules.emailTemplate]: <i className="bx bx-mail-send" />,
	[modules.language]: <i className="mdi mdi-google-translate" />,
	[modules.demography]: <i className="mdi mdi-map-marker" />,
	[modules.banner]: <i className="mdi mdi-file-presentation-box" />,
	[modules.casinoManagement]: <i className="mdi mdi-gamepad-variant-outline" />,
	[modules.kpiSummaryReport]: <i className="mdi mdi-chart-box-outline" />,
	[modules.livePlayerDetail]: <i className="mdi mdi-television-play" />,
	[modules.country]: <i className="mdi mdi-map-marker-off-outline" />,
	[modules.applicationSetting]: <i className="mdi mdi-web" />,
	[modules.sportsbookManagement]: <i className="mdi mdi-hockey-sticks" />,
	[modules.tag]: <i className="mdi mdi-tag" />,
	[modules.limits]: <i className="mdi mdi-currency-usd-off" />,
	[modules.contentManagement]: <i className="mdi mdi-file-chart" />,

	[modules.WageringTemplate]: <i className="mdi mdi-credit-card-plus" />,
	[modules.LoyaltyManagement]: <i className="mdi mdi-trophy-outline" />,
	[modules.RegistrationField]: <i className="bx bx-user-plus" />,
	[modules.PlayerLiabilityReport]: <i className="mdi mdi-file-chart-outline" />,
});

const permissionLabel = (label) => {
	switch (label) {
		case 'C':
			return 'Create';
		case 'R':
			return 'Read';
		case 'U':
			return 'Update';
		case 'D':
			return 'Delete';
		case 'TS':
			return 'Toggle Status';
		case 'A':
			return 'Apply';
		case 'CC':
			return 'Create Custom';
		case 'MM':
			return 'Manage Money';
		case 'L':
			return 'Limit';
		case 'TE':
			return 'Test Email';
		case 'VE':
			return 'Verify Email';
		case 'RP':
			return 'Reset Password';
		case 'I':
			return 'Issue';
		default:
			return label;
	}
};

export { permissionIcons, permissionLabel, modules };
