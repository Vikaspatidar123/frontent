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
// Admins data
import getCasinoCategory from './casinoCategory/reducer';

// Aggregators
import AggregatorsReducer from './aggregators/reducer';

const rootReducer = combineReducers({
	// New theme
	AdminRoles,
	Countries,
	Players,
	PermissionDetails,
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
	getCasinoCategory,
	AggregatorsReducer,
});

export default rootReducer;
