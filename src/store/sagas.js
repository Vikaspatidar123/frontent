import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
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
import ProfileDataSaga from './Profile/saga';
import GlobalRegistrationSaga from './registrationformFiels/saga';
import DashboardViewSaga from './dashboardView/saga';
import UserDetailsSaga from './userDetails/saga';
import RestrictedCountriesSaga from './restrictedCountries/saga';

export default function* rootSaga() {
	yield all([
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
		fork(ProfileDataSaga),
		fork(GlobalRegistrationSaga),
		fork(UserDetailsSaga),
		fork(RestrictedCountriesSaga),
		fork(LayoutSaga),
		fork(AdminDetailsSaga),
		fork(aggregatorsSaga),
		fork(DashboardViewSaga),
	]);
}
