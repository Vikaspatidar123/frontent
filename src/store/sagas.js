import { all, fork } from 'redux-saga/effects';

// public
import AccountSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import ProfileSaga from './auth/profile/saga';
import LayoutSaga from './layout/saga';
import ecommerceSaga from './e-commerce/saga';
import calendarSaga from './calendar/saga';
import chatSaga from './chat/saga';
import cryptoSaga from './crypto/saga';
import invoiceSaga from './invoices/saga';
import jobsSaga from './jobs/saga';
import projectsSaga from './projects/saga';
import tasksSaga from './tasks/saga';
import mailsSaga from './mails/saga';
import contactsSaga from './contacts/saga';
import dashboardSaga from './dashboard/saga';
import dashboardSaasSaga from './dashboard-saas/saga';
import dashboardCryptoSaga from './dashboard-crypto/saga';
import dashboardBlogSaga from './dashboard-blog/saga';
import dashboardJobSaga from './dashboard-jobs/saga';
import CountriesSaga from './countries/saga';
import AdminRoles from './auth/roles/saga';
import PermissionDetails from './auth/permissionDetails/saga';
import PlayerSaga from './players/saga';
import AdminDetailsSaga from './admins/saga';
import CmsDetailsSaga from './cms/saga';
import aggregatorsSaga from './aggregators/saga';
import BonusDetailsSaga from './bonusListing/saga';
import LanguagesSaga from './languages/saga';
import CurrenciesSaga from './currencies/saga';
import LanguageManagementSaga from './languageManagement/saga';
import BetSettingsSaga from './betSettings/saga';
import TransactionBankingSaga from './transactionBanking/saga';
import sportsBookSaga from './sportsBook/saga';
import ReviewManagementSaga from './reviewManagement/saga';
import SportsTransactionSaga from './sportsTransaction/saga';
import CasinoManagementSaga from './casinoManagement/saga';
import CasinoTransactionsSaga from './casinoTransactions/saga';
import WithdrawRequestsSaga from './withdrawRequests/saga';
import SASettingsSaga from './superAdminSettings/saga';
import SportsMatchesSaga from './sportsMatches/saga';
import adminUserWatcher from './adminUser/saga';
import SportsMarkets from './sportsMarkets/saga';
import EmailTemplateSaga from './emailTemplate/saga';
import WageringTemplateDetailsSaga from './wageringTemplate/saga';

export default function* rootSaga() {
	yield all([
		// New Theme
		fork(AdminRoles),
		fork(CountriesSaga),
		fork(AuthSaga),
		fork(PermissionDetails),
		fork(PlayerSaga),
		fork(CmsDetailsSaga),
		fork(BonusDetailsSaga),
		fork(LanguagesSaga),
		fork(CurrenciesSaga),
		fork(LanguageManagementSaga),
		fork(BetSettingsSaga),
		fork(TransactionBankingSaga),
		fork(sportsBookSaga),
		fork(ReviewManagementSaga),
		fork(SportsTransactionSaga),
		fork(CasinoManagementSaga),
		fork(CasinoTransactionsSaga),
		fork(WithdrawRequestsSaga),
		fork(SASettingsSaga),
		fork(SportsMatchesSaga),
		fork(adminUserWatcher),
		fork(SportsMarkets),
		fork(EmailTemplateSaga),
		fork(WageringTemplateDetailsSaga),
		// public
		fork(AccountSaga),
		fork(ForgetSaga),
		fork(ProfileSaga),
		fork(LayoutSaga),
		fork(ecommerceSaga),
		fork(calendarSaga),
		fork(chatSaga),
		fork(mailsSaga),
		fork(cryptoSaga),
		fork(invoiceSaga),
		fork(jobsSaga),
		fork(projectsSaga),
		fork(tasksSaga),
		fork(contactsSaga),
		fork(dashboardSaga),
		fork(dashboardSaasSaga),
		fork(dashboardCryptoSaga),
		fork(dashboardBlogSaga),
		fork(dashboardJobSaga),
		fork(AdminDetailsSaga),
		fork(AccountSaga),
		fork(aggregatorsSaga),
	]);
}
