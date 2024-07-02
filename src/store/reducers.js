import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication
import Login from './auth/login/reducer';

// Dashboard
import Dashboard from './dashboard/reducer';

// admin
import AdminRoles from './auth/roles/reducer';
import PermissionDetails from './auth/permissionDetails/reducer';

// Countries
import Countries from './countries/reducer';

// Players
import Players from './players/reducer';

// Admins data
import AllAdmins from './admins/reducer';

// All cms data
import AllCms from './cms/reducer';

// Casino Management
import CasinoManagementData from './casinoManagement/reducer';

// Aggregators
import AggregatorsReducer from './aggregators/reducer';

// Bonus data
import AllBonusDetails from './bonusListing/reducer';

// Languages
import Languages from './languages/reducer';

// Currencies
import Currencies from './currencies/reducer';

// LanguageManagement
import LanguageManagement from './languageManagement/reducer';

// Bet Settings
import BetSettings from './betSettings/reducer';

// Transaction Banking
import TransactionBanking from './transactionBanking/reducer';

// Sports List
import SportsList from './sportsBook/reducer';

// Review Management
import ReviewManagement from './reviewManagement/reducer';

// Sports Transaction
import SportsBet from './sportsBet/reducer';

// Casino Transaction
import CasinoTransactions from './casinoTransactions/reducer';

// Withdraw Requests
import WithdrawRequests from './withdrawRequests/reducer';

// Super Admins Settings
import SASettings from './superAdminSettings/reducer';

// Sports Matches
import SportsMatches from './sportsMatches/reducer';
import AdminUser from './adminUser/reducer';

// import Toastr from './Toastr/reducer';

// Sports Markets
import SportsMarkets from './sportsMarkets/reducer';

// Crm
import EmailTemplate from './emailTemplate/reducer';

// wagering Template
import WageringTemplate from './wageringTemplate/reducer';
import ProgressLoading from './progressLoading/reducer';

// PROFILE UPDATE
import ProfileData from './profile/reducer';

// global registration
import FormFields from './registrationformFiels/reducer';

// Dashboard view
import DashboardViewInfo from './dashboardView/reducer';

// User Details
import UserDetails from './userDetails/reducer';

// Restricted Countries
import RestrictedCountries from './restrictedCountries/reducer';

// Create Update Bonus
import CreateUpdateBonus from './createUpdateBonus/reducer';

import SportsTransaction from './sportsTransactions/reducer';

import GameTransactions from './gameTransactions/reducer';

import PlayerPerformance from './playerPerformance/reducer';

import Tournament from './tournaments/reducer';

import Payment from './payment/reducer';

import Notification from './notifications/reducer';

const rootReducer = combineReducers({
	AdminRoles,
	Countries,
	Players,
	PermissionDetails,
	AllBonusDetails,
	BetSettings,
	SportsList,
	SASettings,
	AdminUser,
	EmailTemplate,
	WageringTemplate,
	ProgressLoading,
	ProfileData,
	FormFields,
	Layout,
	Login,
	AllAdmins,
	AllCms,
	CasinoManagementData,
	AggregatorsReducer,
	Languages,
	Currencies,
	LanguageManagement,
	TransactionBanking,
	SportsTransaction,
	ReviewManagement,
	SportsBet,
	CasinoTransactions,
	WithdrawRequests,
	SportsMatches,
	SportsMarkets,
	DashboardViewInfo,
	UserDetails,
	RestrictedCountries,
	Dashboard,
	CreateUpdateBonus,
	GameTransactions,
	PlayerPerformance,
	Tournament,
	Payment,
	Notification,
});

export default rootReducer;
