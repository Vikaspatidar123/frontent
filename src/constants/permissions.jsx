import React from 'react';

const permissionIcons = () => ({
	CMS: <i className="bx bx-list-ol" />,
	Bonus: <i className="bx bxs-dollar-circle" />,
	Users: <i className="bx bx-user" />,
	Admins: <i className="bx bx-shield-quarter" />,
	Tenant: <i className="mdi mdi-search-web" />,
	Themes: <i className="bx bx-layout" />,
	Reviews: <i className="bx bx-list-check" />,
	KycLabel: <i className="bx bx-user-check" />,
	KpiReport: <i className="bx bxs-report" />,
	Currencies: <i className="bx bx-dollar" />,
	GameReport: <i className="bx bx-football" />,
	UserComment: <i className="bx bx-comment-dots" />,
	BetSettings: <i className="bx bx-wrench" />,
	ImageGallery: <i className="bx bxs-image" />,
	Transactions: <i className="bx bx-wallet-alt" />,
	EmailTemplate: <i className="bx bx-mail-send" />,
	MultiLanguage: <i className="mdi mdi-google-translate" />,
	TenantSettings: <i className="mdi mdi-web-clock" />,
	DemographReport: <i className="mdi mdi-map-marker" />,
	BannerManagement: <i className="mdi mdi-file-presentation-box" />,
	CasinoManagement: <i className="mdi mdi-gamepad-variant-outline" />,
	KpiSummaryReport: <i className="mdi mdi-chart-box-outline" />,
	LivePlayerReport: <i className="mdi mdi-television-play" />,
	WageringTemplate: <i className="mdi mdi-credit-card-plus" />,
	CashierManagement: <i className="mdi mdi-cash" />,
	LoyaltyManagement: <i className="mdi mdi-trophy-outline" />,
	RegistrationField: <i className="bx bx-user-plus" />,
	RestrictedCountry: <i className="mdi mdi-map-marker-off-outline" />,
	TenantCredentials: <i className="mdi mdi-onepassword" />,
	TenantConfigurations: <i className="mdi mdi-content-save-settings-outline" />,
	PlayerLiabilityReport: <i className="mdi mdi-file-chart-outline" />,
	PlayerManagementReport: <i className="bx bxs-user-detail" />,
	SiteConfiguration: <i className="mdi mdi-web" />,
	SportbookManagement: <i className="mdi mdi-hockey-sticks" />,
	SportsbookManagement: <i className="bx bx-ball" />,
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
		case 'T':
			return 'Toggle Status';
		case 'A':
			return 'Apply';
		case 'CC':
			return 'Create Custom';
		case 'AB':
			return 'Manage Money';
		case 'SR':
			return 'Limit';
		case 'TE':
			return 'Test Email';
		case 'EV':
			return 'Verify Email';
		case 'UP':
			return 'Reset Password';
		default:
			return label;
	}
};

const modules = {
	CMS: 'CMS',
	Bonus: 'Bonus',
	Users: 'Users',
	Admins: 'Admins',
	Tenant: 'Tenant',
	Themes: 'Themes',
	Reviews: 'Reviews',
	KycLabel: 'KycLabel',
	KpiReport: 'KpiReport',
	Currencies: 'Currencies',
	GameReport: 'GameReport',
	UserComment: 'UserComment',
	BetSettings: 'BetSettings',
	ImageGallery: 'ImageGallery',
	Transactions: 'Transactions',
	EmailTemplate: 'EmailTemplate',
	MultiLanguage: 'MultiLanguage',
	TenantSettings: 'TenantSettings',
	DemographReport: 'DemographReport',
	BannerManagement: 'BannerManagement',
	CasinoManagement: 'CasinoManagement',
	KpiSummaryReport: 'KpiSummaryReport',
	LivePlayerReport: 'LivePlayerReport',
	WageringTemplate: 'WageringTemplate',
	CashierManagement: 'CashierManagement',
	LoyaltyManagement: 'LoyaltyManagement',
	RegistrationField: 'RegistrationField',
	RestrictedCountry: 'RestrictedCountry',
	TenantCredentials: 'TenantCredentials',
	TenantConfigurations: 'TenantConfigurations',
	PlayerLiabilityReport: 'PlayerLiabilityReport',
	PlayerManagementReport: 'PlayerManagementReport',
	SiteConfiguration: 'SiteConfiguration',
	SportbookManagement: 'SportbookManagement',
	SportsbookManagement: 'SportsbookManagement',
};

export { permissionIcons, permissionLabel, modules };
