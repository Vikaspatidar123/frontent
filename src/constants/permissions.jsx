import React from 'react';

import {
	TocRounded,
	CurrencyExchangeRounded,
	PeopleOutlineRounded,
	AdminPanelSettingsRounded,
	AccessibilityTwoTone,
	PaletteTwoTone,
	ReviewsTwoTone,
	FactCheckTwoTone,
	ReceiptLongTwoTone,
	MonetizationOnTwoTone,
	SportsSoccerTwoTone,
	CommentTwoTone,
	CollectionsTwoTone,
	AccountBalanceWalletTwoTone,
	ContactMailTwoTone,
	GTranslateTwoTone,
	ManageAccountsTwoTone,
	PlaceTwoTone,
	ViewCarouselTwoTone,
	CasinoTwoTone,
	AssessmentTwoTone,
	LiveTvTwoTone,
	SynagogueTwoTone,
	LocalAtmTwoTone,
	CardMembershipTwoTone,
	SpeakerNotesTwoTone,
	LocationOffTwoTone,
	QrCode2TwoTone,
	PsychologyTwoTone,
	ManageHistoryTwoTone,
} from '@mui/icons-material';

const permissionIcons = () => ({
	CMS: <TocRounded />,
	Bonus: <CurrencyExchangeRounded />,
	Users: <PeopleOutlineRounded />,
	Admins: <AdminPanelSettingsRounded />,
	Tenant: <AccessibilityTwoTone />,
	Themes: <PaletteTwoTone />,
	Reviews: <ReviewsTwoTone />,
	KycLabel: <FactCheckTwoTone />,
	KpiReport: <ReceiptLongTwoTone />,
	Currencies: <MonetizationOnTwoTone />,
	GameReport: <SportsSoccerTwoTone />,
	UserComment: <CommentTwoTone />,
	ImageGallery: <CollectionsTwoTone />,
	Transactions: <AccountBalanceWalletTwoTone />,
	EmailTemplate: <ContactMailTwoTone />,
	MultiLanguage: <GTranslateTwoTone />,
	TenantSettings: <ManageAccountsTwoTone />,
	DemographReport: <PlaceTwoTone />,
	BannerManagement: <ViewCarouselTwoTone />,
	CasinoManagement: <CasinoTwoTone />,
	KpiSummaryReport: <AssessmentTwoTone />,
	LivePlayerReport: <LiveTvTwoTone />,
	WageringTemplate: <SynagogueTwoTone />,
	CashierManagement: <LocalAtmTwoTone />,
	LoyaltyManagement: <CardMembershipTwoTone />,
	RegistrationField: <SpeakerNotesTwoTone />,
	RestrictedCountry: <LocationOffTwoTone />,
	TenantCredentials: <QrCode2TwoTone />,
	TenantConfigurations: <PsychologyTwoTone />,
	PlayerLiabilityReport: <AssessmentTwoTone />,
	PlayerManagementReport: <ManageHistoryTwoTone />,
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

export { permissionIcons, permissionLabel };
