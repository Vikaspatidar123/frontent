import React from 'react';
import CountriesList from '../pages/CountriesList';
import PlayersList from '../pages/Players';
import Admins from '../pages/Admins';
import Cms from '../pages/Cms';
import CreateCMS from '../pages/Cms/CreateCMS';
import EditCMS from '../pages/Cms/EditCMS';
import CMSDetails from '../pages/Cms/CMSDetails';
import CasinoCategory from '../pages/CasinoCategory';
import CasinoSubCategory from '../pages/CasinoSubCategory';
import CasinoAggregators from '../pages/Casino Management/Aggregators';
import BonusDetail from '../pages/Bonus';
import LanguageList from '../pages/LanguageList';
import CurrencyList from '../pages/CurrencyList';
import LanguageManagementList from '../pages/LanguageManagement';
import BetSettings from '../pages/BetSettings';
import TransactionBankingListing from '../pages/TransactionBankingList';
import SportsListing from '../pages/SportsListing';
import ReviewManagementList from '../pages/ReviewManagementList';
import SportsCountriesListing from '../pages/SportsCountriesList';
import SportsTournamentList from '../pages/SportsTournamentList';
import SportsTransactionList from '../pages/SportsTransactionList';
import CasinoTransactionsList from '../pages/CasinoTransactionsList';
import WithdrawRequestsList from '../pages/WithdrawRequestsList';
import CasinoProviders from '../pages/CasinoProviders';
import CasinoGames from '../pages/CasinoGames';
import BannerManagement from '../pages/BannerManagement';
import SportsMatchesList from '../pages/SportsMatchesList';
import SportsMarketsList from '../pages/SportsMarketsList';
import EmailTemplate from '../pages/EmailTemplate';
import KYCLabels from '../pages/KYCLabels';
import WageringTemplate from '../pages/WageringTemplateDetail';
import CreateWageringTemplate from '../pages/WageringTemplateDetail/createWageringTemplate';
import EditWageringTemplate from '../pages/WageringTemplateDetail/editWageringTemplate';
import WageringTemplateDetailList from '../pages/WageringTemplateDetail/WageringTemplateDetailList';
import ProfilePage from '../pages/Profile';
import AddAdmin from '../pages/Admins/addAdmin';
import EditAdmin from '../pages/Admins/editAdmin';
import RegistrationFields from '../pages/RegistrationFormFields';
import LoyaltyManagement from '../pages/LoyaltyManagement';
import DashboardView from '../pages/DashboardView';
import PlayerDetailsPage from '../pages/PlayerDetails';
import ImageGallery from '../pages/ImageGallery';
import CreateBonus from '../pages/Bonus/CreateBonus';
import AdminDetails from '../pages/AdminDetails';
import ViewBlockedCountries from '../pages/ViewBlockedCountries';
import CreateEmailTemplate from '../pages/EmailTemplate/CreateEmailTemplate';
import EditEmailTemplate from '../pages/EmailTemplate/EditEmailTemplate';
import SportsMatchDetail from '../pages/SportsMatchDetail';
import LoginRight from '../pages/Authentication/Login/LoginRight';
import ViewRestrictedGames from '../pages/ViewRestrictedGames';
import ViewRestrictedProviders from '../pages/ViewRestrictedProviders';
import ReorderCategories from '../pages/CasinoCategory/ReorderCategories';
import BonusPreview from '../pages/Bonus/BonusView';
import EditBonus from '../pages/Bonus/EditBonus';
import ReorderSubCategory from '../pages/CasinoSubCategory/components/ReorderSubCategory';
import ReorderGames from '../pages/CasinoGames/components/ReorderGames';
import ReorderBonus from '../pages/Bonus/ReorderBonus';
import AddGamesCasinoSubcategory from '../pages/AddGamesCasinoSubcategory';
import { modules } from '../constants/permissions';

const authProtectedRoutes = [
	{
		path: '/',
		component: <DashboardView />,
		modules: [
			modules.DemographReport,
			modules.KpiReport,
			modules.KpiSummaryReport,
			modules.LivePlayerReport,
			modules.GameReport,
		],
		operation: 'R',
		isHome: true,
	},
	{
		path: '/dashboard',
		component: <DashboardView />,
		modules: [
			modules.DemographReport,
			modules.KpiReport,
			modules.KpiSummaryReport,
			modules.LivePlayerReport,
			modules.GameReport,
		],
		operation: 'R',
	},

	// Staff/Admin
	{
		path: '/staff',
		component: <Admins />,
		modules: [modules.admin],
		operation: 'R',
	},
	{
		path: '/staff/add',
		component: <AddAdmin />,
		modules: [modules.admin],
		operation: 'C',
	},
	{
		path: '/staff/details/:adminUserId',
		component: <AdminDetails />,
		modules: [modules.admin],
		operation: 'R',
	},
	{
		path: '/staff/edit/:adminUserId',
		component: <EditAdmin />,
		modules: [modules.admin],
		operation: 'U',
	},

	{
		path: '/categories',
		component: <CasinoCategory />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/categories/reorder',
		component: <ReorderCategories />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/sub-categories',
		component: <CasinoSubCategory />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/sub-categories/reorder',
		component: <ReorderSubCategory />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/sub-categories/addGames/:gameSubCategoryId',
		component: <AddGamesCasinoSubcategory />,
		modules: [modules.casinoManagement],
		operation: 'C',
	},
	{
		path: '/countries',
		component: <CountriesList />,
		modules: [modules.country],
		operation: 'R',
	},
	{
		path: '/countries/restricted-games/:countryId',
		component: <ViewRestrictedGames />,
		modules: [modules.country],
		operation: 'U',
	},
	{
		path: '/countries/restricted-providers/:countryId',
		component: <ViewRestrictedProviders />,
		modules: [modules.country],
		operation: 'U',
	},
	{
		path: '/users',
		component: <PlayersList />,
		modules: [modules.player],
		operation: 'R',
	},

	{ path: '/cms', component: <Cms />, modules: [modules.page], operation: 'R' },
	{
		path: '/cms/create',
		component: <CreateCMS />,
		modules: [modules.page],
		operation: 'C',
	},
	{
		path: '/cms/edit/:cmsPageId',
		component: <EditCMS />,
		modules: [modules.page],
		operation: 'U',
	},
	{
		path: '/cms/details/:cmsPageId',
		component: <CMSDetails />,
		modules: [modules.page],
		operation: 'R',
	},
	{
		path: '/casino-aggregators',
		component: <CasinoAggregators />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/bonus',
		component: <BonusDetail />,
		modules: [modules.bonus],
		operation: 'R',
	},
	{
		path: '/bonus/reorder',
		component: <ReorderBonus />,
		modules: [modules.bonus],
		operation: 'U',
	},
	{
		path: '/bonus/:bonusId',
		component: <BonusPreview />,
		modules: [modules.bonus],
		operation: 'R',
	},
	{
		path: '/bonus/create',
		component: <CreateBonus />,
		modules: [modules.bonus],
		operation: 'C',
	},
	{
		path: '/bonus/edit/:bonusId',
		component: <EditBonus />,
		modules: [modules.bonus],
		operation: 'U',
	},
	{
		path: '/languages',
		component: <LanguageList />,
		modules: [modules.language],
		operation: 'R',
	},
	{
		path: '/currencies',
		component: <CurrencyList />,
		modules: [modules.currency],
		operation: 'R',
	},
	{
		path: '/languages-management',
		component: <LanguageManagementList />,
		modules: [modules.language],
		operation: 'R',
	},
	{
		path: '/bet-settings',
		component: <BetSettings />,
		modules: [modules.BetSettings],
		operation: 'R',
	},
	{
		path: '/transaction-banking',
		component: <TransactionBankingListing />,
		modules: [modules.report],
		operation: 'R',
	},
	{
		path: '/sports',
		component: <SportsListing />,
		modules: [modules.sportsbookManagement],
		operation: 'R',
	},
	{
		path: '/review-management',
		component: <ReviewManagementList />,
		modules: [modules.Reviews],
		operation: 'R',
	},
	{
		path: '/sports/countries',
		component: <SportsCountriesListing />,
		modules: [modules.sportsbookManagement],
		operation: 'R',
	},
	{
		path: '/sports/leagues',
		component: <SportsTournamentList />,
		modules: [modules.sportsbookManagement],
		operation: 'R',
	},
	{
		path: '/sports-transactions',
		component: <SportsTransactionList />,
		modules: [modules.report],
		operation: 'R',
	},
	{
		path: '/casino-transactions',
		component: <CasinoTransactionsList />,
		modules: [modules.report],
		operation: 'R',
	},
	{
		path: '/withdraw-request',
		component: <WithdrawRequestsList />,
		modules: [modules.report],
		operation: 'R',
	},
	{
		path: '/casino-providers',
		component: <CasinoProviders />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/casino-games',
		component: <CasinoGames />,
		modules: [modules.casinoManagement],
		operation: 'R',
	},
	{
		path: '/casino-games/reorder',
		component: <ReorderGames />,
		modules: [modules.casinoManagement],
		operation: 'U',
	},
	{
		path: '/banner-management',
		component: <BannerManagement />,
		modules: [modules.banner],
		operation: 'R',
	},
	{
		path: '/matches',
		component: <SportsMatchesList />,
		modules: [modules.sportsbookManagement],
		operation: 'R',
	},
	{
		path: '/match/:matchId',
		component: <SportsMatchDetail />,
		modules: [modules.sportsbookManagement],
		operation: 'R',
	},
	{
		path: '/markets',
		component: <SportsMarketsList />,
		modules: [modules.sportsbookManagement],
		operation: 'R',
	},
	{
		path: '/email-templates',
		component: <EmailTemplate />,
		modules: [modules.emailTemplate],
		operation: 'R',
	},
	{
		path: '/email-templates/create',
		component: <CreateEmailTemplate />,
		modules: [modules.emailTemplate],
		operation: 'C',
	},
	{
		path: '/email-templates/edit/:emailTemplateId',
		component: <EditEmailTemplate />,
		modules: [modules.emailTemplate],
		operation: 'U',
	},
	{
		path: '/kyc-labels',
		component: <KYCLabels />,
		modules: [modules.kyc],
		operation: 'R',
	},
	{
		path: '/wagering-template',
		component: <WageringTemplate />,
		modules: [modules.WageringTemplate],
		operation: 'R',
	},
	{
		path: '/wagering-template/create',
		component: <CreateWageringTemplate />,
		modules: [modules.WageringTemplate],
		operation: 'C',
	},
	{
		path: '/wagering-template/edit/:wageringTemplateId',
		component: <EditWageringTemplate />,
		modules: [modules.WageringTemplate],
		operation: 'U',
	},
	{
		path: '/wagering-template/details/:wageringTemplateId',
		component: <WageringTemplateDetailList />,
		modules: [modules.WageringTemplate],
		operation: 'R',
	},
	{ path: '/profile', component: <ProfilePage /> },
	{
		path: '/form-fields',
		component: <RegistrationFields />,
		modules: [modules.RegistrationField],
		operation: 'R',
	},
	{
		path: '/loyalty-management',
		component: <LoyaltyManagement />,
		modules: [modules.LoyaltyManagement],
		operation: 'R',
	},
	{
		path: '/player-details/:playerId',
		component: <PlayerDetailsPage />,
		modules: [modules.player],
		operation: 'R',
	},
	{
		path: '/image-gallery',
		component: <ImageGallery />,
		modules: [modules.galley],
		operation: 'R',
	},
	{
		path: '/casino-providers/restrict-countries/:casinoProviderId',
		component: <ViewBlockedCountries />,
		modules: [modules.casinoManagement],
		operation: 'U',
	},
	{
		path: '/casino-games/restrict-countries/:casinoGameId',
		component: <ViewBlockedCountries />,
		modules: [modules.casinoManagement],
		operation: 'U',
	},

	{ path: '*', component: <DashboardView /> },
];

const publicRoutes = [{ path: '/login', component: <LoginRight /> }];

export { authProtectedRoutes, publicRoutes };
