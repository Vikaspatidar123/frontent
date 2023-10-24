import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication
import Login from './auth/login/reducer';
import Account from './auth/register/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';
import Profile from './auth/profile/reducer';

// E-commerce
import ecommerce from './e-commerce/reducer';

// Calendar
import calendar from './calendar/reducer';

// chat
import chat from './chat/reducer';

// crypto
import crypto from './crypto/reducer';

// invoices
import invoices from './invoices/reducer';

// jobs
import JobReducer from './jobs/reducer';

// projects
import projects from './projects/reducer';

// tasks
import tasks from './tasks/reducer';

// contacts
import contacts from './contacts/reducer';

// mails
import mails from './mails/reducer';

// Dashboard
import Dashboard from './dashboard/reducer';

// Dasboard saas
import DashboardSaas from './dashboard-saas/reducer';

// Dasboard crypto
import DashboardCrypto from './dashboard-crypto/reducer';

// Dasboard blog
import DashboardBlog from './dashboard-blog/reducer';

// Dasboard job
import DashboardJob from './dashboard-jobs/reducer';

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
import SportsTransaction from './sportsTransaction/reducer';

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
import ProfileData from './Profile/reducer';

// global registration
import FormFields from './registrationformFiels/reducer';

// Dashboard view
import DashboardViewInfo from './dashboardView/reducer';

// User Details
import UserDetails from './userDetails/reducer';

const rootReducer = combineReducers({
	// New theme
	AdminRoles,
	Countries,
	Players,
	PermissionDetails,
	AllBonusDetails,
	BetSettings,
	SportsList,
	SASettings,
	AdminUser,
	// Toastr,
	EmailTemplate,
	WageringTemplate,
	ProgressLoading,
	ProfileData,
	FormFields,
	// public
	Layout,
	Login,
	Account,
	ForgetPassword,
	Profile,
	ecommerce,
	calendar,
	chat,
	mails,
	crypto,
	invoices,
	JobReducer,
	projects,
	tasks,
	contacts,
	Dashboard,
	DashboardSaas,
	DashboardCrypto,
	DashboardBlog,
	DashboardJob,
	AllAdmins,
	AllCms,
	CasinoManagementData,
	AggregatorsReducer,
	Languages,
	Currencies,
	LanguageManagement,
	TransactionBanking,
	ReviewManagement,
	SportsTransaction,
	CasinoTransactions,
	WithdrawRequests,
	SportsMatches,
	SportsMarkets,
	DashboardViewInfo,
	UserDetails,
});

export default rootReducer;
