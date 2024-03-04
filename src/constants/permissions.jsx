import React from 'react';

const modules = {
	CMS: 'cms',
	Bonus: 'bonus',
	Users: 'users',
	Admins: 'admins',
	Reviews: 'reviews',
	KycLabel: 'kycLabel',
	Language: 'language',
	KpiReport: 'kpiReport',
	Currencies: 'currencies',
	GameReport: 'gameReport',
	UserComment: 'userComment',
	BetSettings: 'betSettings',
	ImageGallery: 'imageGallery',
	Transactions: 'transactions',
	EmailTemplate: 'emailTemplate',
	DemographReport: 'demographReport',
	BannerManagement: 'bannerManagement',
	CasinoManagement: 'casinoManagement',
	KpiSummaryReport: 'kpiSummaryReport',
	LivePlayerReport: 'livePlayerReport',
	WageringTemplate: 'wageringTemplate',
	LoyaltyManagement: 'loyalityManagement',
	RegistrationField: 'registrationField',
	RestrictedCountry: 'restrictedCountry',
	PlayerLiabilityReport: 'playerLiabilityReport',
	PlayerManagementReport: 'playerManagementReport',
	SiteConfiguration: 'siteConfiguration',
	SportbookManagement: 'sportsbookManagement',
};

const permissionIcons = () => ({
	[modules.CMS]: <i className="bx bx-list-ol" />,
	[modules.Bonus]: <i className="bx bxs-dollar-circle" />,
	[modules.Users]: <i className="bx bx-user" />,
	[modules.Admins]: <i className="bx bx-shield-quarter" />,
	[modules.Reviews]: <i className="bx bx-list-check" />,
	[modules.KycLabel]: <i className="bx bx-user-check" />,
	[modules.KpiReport]: <i className="bx bxs-report" />,
	[modules.Currencies]: <i className="bx bx-dollar" />,
	[modules.GameReport]: <i className="bx bx-football" />,
	[modules.UserComment]: <i className="bx bx-comment-dots" />,
	[modules.BetSettings]: <i className="bx bx-wrench" />,
	[modules.ImageGallery]: <i className="bx bxs-image" />,
	[modules.Transactions]: <i className="bx bx-wallet-alt" />,
	[modules.EmailTemplate]: <i className="bx bx-mail-send" />,
	[modules.Language]: <i className="mdi mdi-google-translate" />,
	[modules.DemographReport]: <i className="mdi mdi-map-marker" />,
	[modules.BannerManagement]: <i className="mdi mdi-file-presentation-box" />,
	[modules.CasinoManagement]: <i className="mdi mdi-gamepad-variant-outline" />,
	[modules.KpiSummaryReport]: <i className="mdi mdi-chart-box-outline" />,
	[modules.LivePlayerReport]: <i className="mdi mdi-television-play" />,
	[modules.WageringTemplate]: <i className="mdi mdi-credit-card-plus" />,
	[modules.LoyaltyManagement]: <i className="mdi mdi-trophy-outline" />,
	[modules.RegistrationField]: <i className="bx bx-user-plus" />,
	[modules.RestrictedCountry]: <i className="mdi mdi-map-marker-off-outline" />,
	[modules.PlayerLiabilityReport]: <i className="mdi mdi-file-chart-outline" />,
	[modules.PlayerManagementReport]: <i className="bx bxs-user-detail" />,
	[modules.SiteConfiguration]: <i className="mdi mdi-web" />,
	[modules.SportbookManagement]: <i className="mdi mdi-hockey-sticks" />,
	[modules.SportsbookManagement]: <i className="bx bx-ball" />,
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
