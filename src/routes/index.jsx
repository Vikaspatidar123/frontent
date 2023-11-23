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
import CasinoAddGames from '../pages/CasinoSubCategory/CasinoAddGames';
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
import EditBonus from '../pages/Bonus/EditBonus';

const authProtectedRoutes = [
	{ path: '/', component: <DashboardView /> },
	{ path: '/dashboard', component: <DashboardView /> },

	// Staff/Admin
	{ path: '/staff', component: <Admins /> },
	{ path: '/staff/add', component: <AddAdmin /> },
	{ path: '/staff/details/:adminUserId', component: <AdminDetails /> },
	{ path: '/staff/edit/:adminUserId', component: <EditAdmin /> },

	{ path: '/categories', component: <CasinoCategory /> },
	{ path: '/sub-categories', component: <CasinoSubCategory /> },
	{
		path: '/sub-categories/addGames/:gameSubCategoryId',
		component: <CasinoAddGames />,
	},
	{ path: '/countries', component: <CountriesList /> },
	{
		path: '/countries/restricted-games/:countryId',
		component: <ViewRestrictedGames />,
	},
	{
		path: '/countries/restricted-providers/:countryId',
		component: <ViewRestrictedProviders />,
	},
	{ path: '/users', component: <PlayersList /> },

	{ path: '/cms', component: <Cms /> },
	{ path: '/cms/create', component: <CreateCMS /> },
	{ path: '/cms/edit/:cmsPageId', component: <EditCMS /> },
	{ path: '/cms/details/:cmsPageId', component: <CMSDetails /> },
	{ path: '/casino-aggregators', component: <CasinoAggregators /> },
	{ path: '/bonus', component: <BonusDetail /> },
	{ path: '/bonus/create', component: <CreateBonus /> },
	{ path: '/bonus/edit/:bonusId', component: <EditBonus /> },
	{ path: '/languages', component: <LanguageList /> },
	{ path: '/currencies', component: <CurrencyList /> },
	{ path: '/languages-management', component: <LanguageManagementList /> },
	{ path: '/bet-settings', component: <BetSettings /> },
	{ path: '/transaction-banking', component: <TransactionBankingListing /> },
	{ path: '/sports', component: <SportsListing /> },
	{ path: '/review-management', component: <ReviewManagementList /> },
	{ path: '/sports/countries', component: <SportsCountriesListing /> },
	{ path: '/sports/leagues', component: <SportsTournamentList /> },
	{ path: '/sports-transactions', component: <SportsTransactionList /> },
	{ path: '/casino-transactions', component: <CasinoTransactionsList /> },
	{ path: '/withdraw-request', component: <WithdrawRequestsList /> },
	{ path: '/casino-providers', component: <CasinoProviders /> },
	{ path: '/casino-games', component: <CasinoGames /> },
	{ path: '/banner-management', component: <BannerManagement /> },
	{ path: '/matches', component: <SportsMatchesList /> },
	{ path: '/match/:matchId', component: <SportsMatchDetail /> },
	{ path: '/markets', component: <SportsMarketsList /> },
	{ path: '/email-templates', component: <EmailTemplate /> },
	{ path: '/email-templates/create', component: <CreateEmailTemplate /> },
	{
		path: '/email-templates/edit/:emailTemplateId',
		component: <EditEmailTemplate />,
	},
	{ path: '/kyc-labels', component: <KYCLabels /> },
	{ path: '/wagering-template', component: <WageringTemplate /> },
	{ path: '/wagering-template/create', component: <CreateWageringTemplate /> },
	{
		path: '/wagering-template/edit/:wageringTemplateId',
		component: <EditWageringTemplate />,
	},
	{
		path: '/wagering-template/details/:wageringTemplateId',
		component: <WageringTemplateDetailList />,
	},
	{ path: '/profile', component: <ProfilePage /> },
	{ path: '/form-fields', component: <RegistrationFields /> },
	{ path: '/loyalty-management', component: <LoyaltyManagement /> },
	{ path: '/player-details/:playerId', component: <PlayerDetailsPage /> },
	{ path: '/loyalty-management', component: <LoyaltyManagement /> },
	{ path: '/image-gallery', component: <ImageGallery /> },
	{
		path: '/casino-providers/restrict-countries/:casinoProviderId',
		component: <ViewBlockedCountries />,
	},
	{
		path: '/casino-games/restrict-countries/:casinoGameId',
		component: <ViewBlockedCountries />,
	},

	{ path: '*', component: <DashboardView /> },
];

const publicRoutes = [{ path: '/login', component: <LoginRight /> }];

export { authProtectedRoutes, publicRoutes };
