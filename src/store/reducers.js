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
import getAllAdmins from './admins/reducer';

// All cms data
import getAllCms from './cms/reducer';

// Casino Management
import CasinoManagementData from './casinoManagement/reducer';

// Aggregators
import AggregatorsReducer from './aggregators/reducer';

// Bonus data
import getAllBonusDetails from './bonusListing/reducer';

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
import sportsList from './sportsBook/reducer';

// Review Management
import ReviewManagement from './reviewManagement/reducer';

// Sports Transaction
import SportsTransaction from './sportsTransaction/reducer';

// Casino Transaction
import CasinoTransactions from './casinoTransactions/reducer';

// Withdraw Requests
import WithdrawRequests from './withdrawRequests/reducer';

// Sports Matches
import SportsMatches from './sportsMatches/reducer';

const rootReducer = combineReducers({
	// New theme
	AdminRoles,
	Countries,
	Players,
	PermissionDetails,
	getAllBonusDetails,
	BetSettings,
	sportsList,
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
	getAllAdmins,
	getAllCms,
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
});

export default rootReducer;
