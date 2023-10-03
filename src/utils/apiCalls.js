import { deleteRequest, getRequest, postRequest, putRequest } from './axios';
// import { safeStringify } from './helpers'

const { VITE_APP_API_URL } = import.meta.env;

const superAdminLogin = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/login`, data);

const getAllAdmins = ({
	limit,
	pageNo,
	orderBy,
	sort,
	search,
	// superAdminId,
	adminRoleId,
	status,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin?orderBy=${orderBy}&pageNo=${pageNo}&limit=${limit}&sort=${sort}&search=${search}&status=${status}&adminRoleId=${adminRoleId}`
	);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/currency?limit=${limit}&pageNo=${pageNo}`
	);

const getAllAffiliates = ({ limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/affiliate/all?limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const getAffiliateById = ({ affiliateId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/affiliate?affiliateId=${affiliateId}`
	);

const getAllCms = ({ pageNo, limit, search, isActive }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/cms?pageNo=${pageNo}&limit=${limit}&search=${search}&isActive=${isActive}`
	);

const getCmsByPageId = ({ cmsPageId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/cms/details?cmsPageId=${cmsPageId}`
	);

const getAllUsers = ({
	limit,
	pageNo,
	search,
	kycStatus,
	affiliateSearch,
	dobStart,
	dobEnd,
	userId,
	phoneNumber,
	orderBy,
	sortBy,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/all?limit=${limit}&pageNo=${pageNo}&search=${search}&kycStatus=${kycStatus}&affiliateName=${affiliateSearch}&dobStart=${dobStart}&dobEnd=${dobEnd}&userId=${userId}&phoneNumber=${phoneNumber}&orderBy=${orderBy}&sort=${sortBy}`
	);

const getAllCasinoProviders = ({ limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/providers?limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const getAllCasinoGames = ({
	bonusId,
	limit,
	pageNo,
	casinoCategoryId,
	search,
	isActive,
	selectedProvider,
	freespins,
	addGame,
	gameSubCategoryId,
	reorder,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/games?limit=${limit}&pageNo=${pageNo}&casinoCategoryId=${casinoCategoryId}&search=${search}&isActive=${isActive}&providerId=${selectedProvider}&freespins=${freespins}&bonusId=${bonusId}&addGames=${addGame}&gameSubCategoryId=${gameSubCategoryId}&reorder=${reorder}`
	);

const createCurrency = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/currency`, data);

const editCurrency = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/currency`, data);

const getCurrencyById = (currencyId) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/currency/details?currencyId=${currencyId}`
	);

const getAdminRole = () => getRequest(`${VITE_APP_API_URL}/api/admin/roles`);

const getAdmin = ({ adminId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/details?adminUserId=${adminId && adminId}`
	);
const getUser = ({ userId }) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user?userId=${userId}`);

// const getAdminRoles = () =>
//   getRequest(`${VITE_APP_API_URL}/api/tenant/admin/roles`)

const getAdminUsers = (limit, pageNo, sort, roleId) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/admin?orderBy=email&limit=${limit}&pageNo=${pageNo}&sort=${sort}&adminRoleId=${roleId}`
	);

const getAdminUserDetails = ({ adminUserId, isTenant }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/${
			isTenant ? 'tenant/admin/details' : 'admin/tenant/admin-details'
		}?adminUserId=${adminUserId}`
	);

const createCms = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/cms`, data);

const getSuperAdminWallet = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/wallets`);

const getMasterGames = ({
	bonusId,
	limit,
	pageNo,
	search,
	casinoCategoryId,
	providerId,
	freespins,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/casino/games?limit=${limit}&pageNo=${pageNo}&search=${search}&casinoCategoryId=${casinoCategoryId}&providerId=${providerId}&freespins=${freespins}&bonusId=${bonusId}&isActive=true`
	);

const createTenantCasinoCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/tenant/casino/category`, data);

const addGamesToSubCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/category-games`, data);

const createTenantCasinoSubCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/tenant/casino/sub-category`, data);

const updateTenantCasinoSubCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/casino/sub-category`, data);

const updateSubCategoryReOrder = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/order-sub-category`, data);

const updateCategoryReOrder = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/order-category`, data);

const getTenantCasinoMenuById = ({ casinoMenuId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/casino/menu?casinoMenuId=${casinoMenuId}`
	);

const updateTenantCasinoCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/casino/category`, data);

const getAllTenantCasinoMenuItems = ({ limit, pageNo, type, isActive }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/menu-items?limit=${limit}&pageNo=${pageNo}&type=${type}&isActive=${isActive}`
	);

const getCountries = ({ limit, pageNo, name, kycMethod = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/list?limit=${limit}&pageNo=${pageNo}&name=${name}&kycMethod=${kycMethod}`
	);

const getRestrictedItems = ({ limit, pageNo, type, countryId, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/restricted-items?limit=${limit}&pageNo=${pageNo}&type=${type}&countryId=${countryId}&search=${search}`
	);

const getUnRestrictedItems = ({ limit, pageNo, type, countryId, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/unrestricted-items?limit=${limit}&pageNo=${pageNo}&type=${type}&countryId=${countryId}&search=${search}`
	);

const addRestrictedItems = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/country/restricted`, data);

const updateSuperAdminUser = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data);

const createSuperAdminUser = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/`, data);

const createCasinoGame = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/games`, data);

const createCasinoProvider = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/provider`, data);

const createCasinoCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/category`, data);

const createCasinoSubCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category`, data);

const updateCasinoGame = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/game`, data);

const updateCasinoCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/category`, data);

const updateCasinoSubCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category`, data);

const updateCasinoProvider = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/provider`, data);

const getSuperAdminDetails = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/details`);

const createTenantCasinoMenuItem = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/tenant/menu-item`, data);

const getAllWageringCasinoGames = ({ providerId, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/all-games?providerId=${providerId}&search=${search}`
	);

const updateTenantCasinoMenuItem = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/menu-item`, data);

const updateTenantAdmin = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/tenant/admin`, data);

const getAllSuperAdminTransactions = ({
	limit,
	pageNo,
	search,
	startDate,
	endDate,
	currencyId,
	transactionType,
	paymentProvider,
	isUserDetail,
	userId,
	status,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/transactions?limit=${limit}&pageNo=${pageNo}&actioneeType=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}&currencyCode=${currencyId}&transactionType=${transactionType}&paymentProvider=${paymentProvider}${
			isUserDetail ? `&userId=${userId}` : ''
		}`
	);

const getSuperAdminTransactionUsers = ({ email }) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/transaction-users?email=${email}`);

const getSuperAdminAggregators = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/aggregators?limit=${limit}&pageNo=${pageNo}`
	);

const createSuperAdminAggregator = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/aggregator`, data);

const getSuperAdminGameCategory = ({ limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/categories?limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const getSuperAdminGameSubCategory = ({
	limit,
	pageNo,
	search,
	gameCategoryId,
	isActive,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/sub-category?pageNo=${pageNo}&gameCategoryId=${gameCategoryId}&search=${search}&limit=${limit}&isActive=${isActive}`
	);

const deleteRestrictedItems = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/country/restricted-items`, data);

const getRestrictedCountries = ({ itemId, type, limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/restricted?itemId=${itemId}&type=${type}&limit=${limit}&pageNo=${pageNo}`
	);

const getUnRestrictedCountries = ({ itemId, type, limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/unrestricted?itemId=${itemId}&type=${type}&limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const deleteRestrictedCountries = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/country/restricted`, data);

const addRestrictedCountries = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/country/restricted-items`, data);

const addDepositToOther = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/add-balance`, data);

const getSuperAdminCasinoTransactions = ({
	limit,
	pageNo,
	startDate,
	endDate,
	currencyCode,
	transactionType,
	tenantId,
	status,
	email,
	adminId,
	userId,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/transactions?limit=${limit}&pageNo=${pageNo}&startDate=${startDate}&endDate=${endDate}&currencyCode=${currencyCode}&transactionType=${transactionType}&tenantId=${tenantId}&status=${status}&email=${email}&adminId=${adminId}&userId=${userId}`
	);

const getSuperAdminSportsTransactions = ({
	limit,
	pageNo,
	startDate,
	endDate,
	currencyCode,
	transactionType,
	email,
	userId,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/transactions?limit=${limit}&pageNo=${pageNo}&startDate=${startDate}&endDate=${endDate}&currencyCode=${currencyCode}&transactionType=${transactionType}&email=${email}&userId=${userId}`
	);

const getAllClients = ({ orderBy, limit, pageNo, sort, search, status }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/tenant/admin-users?orderBy=${orderBy}&limit=${limit}&pageNo=${pageNo}&sort=${sort}&search=${search}&status=${status}`
	);

const getAllPortals = ({ adminId }) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/tenant/list?adminId=${adminId}`);

const getTenantList = () => getRequest(`${VITE_APP_API_URL}/api/tenant/list`);

const updateSuperAdminCMS = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/cms`, data);

const isDomainExist = ({ domain, tenantId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/check-domain?domain=${domain}&tenantId=${tenantId}`
	);

const tenantViewToggleStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/admin/status`, data);

const superAdminViewToggleStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const deleteTenantAdminCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/casino/category`, data);

const deleteTenantAdminCasinoGames = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/casino/games`, data);

const deleteTenantAdminCasinoProvider = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/casino/provider`, data);

const deleteTenantAdminSubCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category`, data);

const getAllWithdrawRequestAdmin = ({
	name,
	status,
	page,
	limit,
	startDate,
	endDate,
	paymentProvider,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/user/all-withdraw-request?search=${name}&status=${status}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&paymentProvider=${paymentProvider}`
	);

const getAllWithdrawRequestSuperAdmin = ({
	name,
	status,
	page,
	limit,
	startDate,
	endDate,
	tenantId,
	adminId,
	paymentProvider,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/all-withdraw-request?search=${name}&status=${status}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&adminId=${adminId}&tenantId=${tenantId}&paymentProvider=${paymentProvider}`
	);
const getAllSAProviders = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/providers`);

const getAllTAProviders = () =>
	getRequest(`${VITE_APP_API_URL}/api/casino/providers`);

const getGlobalRegistration = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/global-registration`);

const updateGlobalRegistration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/global-registration`, data);

// const getSAConvertAmount = ({ currencyFields, currencyCode, tenantIds }) =>
//   getRequest(`${VITE_APP_API_URL}/api/admin/bonus/convert-amount?currencyFields=${safeStringify(currencyFields)}&currentCurrencyCode=${currencyCode}&tenantIds=${tenantIds}`)

const getAllBonus = ({
	adminId,
	tenantId,
	limit,
	pageNo,
	bonusType,
	isActive,
	search,
	userId,
	reorder,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/bonus?adminId=${adminId}&tenantId=${tenantId}&limit=${limit}&pageNo=${pageNo}&search=${search}&isActive=${isActive}&bonusType=${bonusType}&userId=${userId}&reorder=${reorder}`
	);

const createBonus = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/bonus`, data);

const updateBonus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/bonus`, data);

const getBonus = ({ bonusId, userBonusId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/bonus/detail?bonusId=${bonusId}&userBonusId=${userBonusId}`
	);

const issueBonus = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/bonus/issue`, data);

const getUserBonus = ({ limit, pageNo, bonusType, status, userId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/bonus/user?limit=${limit}&pageNo=${pageNo}&bonusType=${bonusType}&status=${status}&userId=${userId}`
	);

const cancelBonus = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/bonus/cancel`, data);

const getUserDocument = (userId) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user/document?userId=${userId}`);

const verifyUserDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/verify-document`, data);

const getDocumentLabel = (userId) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/document-label?userId=${userId}`);

const getDemographicDetailsSuperAdmin = ({ endDate, startDate, dateOptions }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/demographic?startDate=${startDate}&endDate=${endDate}&dateOptions=${dateOptions}`
	);

const updateDocumentLabel = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/document-label`, data);

const createDocumentLabel = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/document-label`, data);

const requestDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/request-document`, data);

const cancelDocumentRequest = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/admin/user/cancel-document-request`,
		data
	);

const getTenantPlayerManagement = ({
	endDate,
	startDate,
	limit,
	dateOptions,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/report/top-players?startDate=${startDate}&endDate=${endDate}&limit=${limit}&dateOptions=${dateOptions}`
	);

const getSuperAdminPlayerManagement = ({
	endDate,
	startDate,
	limit,
	dateOptions,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/top-players?startDate=${startDate}&endDate=${endDate}&limit=${limit}&dateOptions=${dateOptions}`
	);

const getPaymentMethod = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/payment-methods`);

const getWageringTemplateDetail = ({ wageringTemplateId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/wagering-template/details?wageringTemplateId=${wageringTemplateId}`
	);

const getSuperAdminLivePlayerReport = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/report/live-player`);

const getSuperAdminAllWageringTemplate = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/wagering-template/all`);

const getSuperAdminWageringTemplateDetail = ({
	wageringTemplateId,
	limit,
	pageNo,
	providerId,
	search,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/wagering-template/details?wageringTemplateId=${wageringTemplateId}&pageNo=${pageNo}&limit=${limit}&providerId=${providerId}&search=${search}`
	);

const createWageringTemplate = (isTenant, data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/wagering-template`, data);

const updateWageringTemplate = (isTenant, data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/wagering-template`, data);
const getBalanceBonuses = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/balance`);

const getSuperAdminWageringTemplate = ({ search, limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/wagering-template?adminId=pageNo=${pageNo}&limit=${limit}&search=${search}`
	);

const getTenantWageringTemplate = ({ search, limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/tenant/wagering-template?pageNo=${pageNo}&limit=${limit}&search=${search}`
	);

const getSAPlayerLiability = ({ startDate, endDate, dateOptions }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/players-liability?startDate=${startDate}&endDate=${endDate}&dateOptions=${dateOptions}`
	);

const getSAKPISummary = ({ startDate, endDate }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/kpi-summary?startDate=${startDate}&endDate=${endDate}`
	);

const getSAKPIReport = ({ startDate, endDate, dateOptions, selectedTab }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/kpi?tab=${selectedTab}&customStartDate=${startDate}&customEndDate=${endDate}&dateOptions=${dateOptions}`
	);

const getSAGameReport = ({ startDate, endDate, dateOptions, selectedTab }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/game?customStartDate=${startDate}&customEndDate=${endDate}&dateOptions=${dateOptions}&tab=${selectedTab}`
	);

const getSAPlayerGameReport = ({
	userId,
	limit,
	startDate,
	endDate,
	dateOptions,
	selectedTab,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/report/game?userId=${userId}&limit=${limit}&customStartDate=${startDate}&customEndDate=${endDate}&dateOptions=${dateOptions}&tab=${selectedTab}`
	);

const getFreeSpinGames = ({ providerId, bonusId, limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/freespin-games?providerId=${providerId}&bonusId=${bonusId}&limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const getEmailTemplates = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/email/all`);

const getEmailTemplate = ({ emailTemplateId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/email?emailTemplateId=${emailTemplateId}`
	);

const updateEmailTemplate = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/email`, data);

const getDynamicKeys = ({ type }) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/email/dynamic-data?type=${type}`);

const createEmailTemplate = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/email`, data);

const primaryEmailTemplate = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/email/mark-primary`, data);

const deleteEmailTemplate = ({ data }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/email `, data);

const getloyaltyLevel = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/loyalty-level`);

const updateloyaltyLevel = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/bonus/loyalty-level`, data);

const updateLoyaltyPoint = ({ loyaltyPoint }) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/loyalty-point`, loyaltyPoint);

const updateLoyaltyLimit = ({ loyaltyLimit }) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/limit`, loyaltyLimit);

const getLanguages = ({ limit, pageNo, name }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/language?limit=${limit}&pageNo=${pageNo}&name=${name}`
	);

const updateProfile = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/profile`, data);

const updateSiteConfiguration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/site-information`, data);

const getSiteConfiguration = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/site-information`, data);

const getAdminChildren = ({ superAdminId, superRoleId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/childs?adminId=${superAdminId}&adminRoleId=${superRoleId}`
	);

const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/all-group`);

const getTags = () => getRequest(`${VITE_APP_API_URL}/api/tenant/user/tags`);

const updateTags = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/tags`, data);

const getImageGallery = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/gallery`);

const deleteFromGallery = ({ data }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/gallery`, data);

const getDuplicateUsers = ({ limit, pageNo, userId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/duplicate?limit=${limit}&pageNo=${pageNo}&userId=${userId}`
	);

const testEmailTemplateEndPoint = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/email/test`, data);

const setDailyLimit = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/user/daily-limit`, data);

const setDepositLimit = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/user/deposit-limit`, data);

const setLossLimit = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/user/loss-limit`, data);

const getOwnerPermissions = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/tenant/owner-permission`);

const setEmailCreds = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/email/credentials`, data);

const disableUser = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/user/disable-until`, data);

const setSessionLimit = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/user/session-time`, data);

const getCMSDynamicKeys = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/cms/dynamic-data`);

const getAllSABanners = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/banner?limit=${limit}&pageNo=${pageNo}`
	);

const deleteSABanners = ({ bannerType }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/banner?bannerKey=${bannerType}`);

const uploadSABanner = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/banner`, data);

const updateSABanner = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/banner`, data);

const deleteEmailTemplateLanguage = ({ data }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/email/language`, data);

const getEmailTypes = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/email/dynamic-data`);

const deleteCMSLanguage = ({ data }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/cms`, data);

const updateReorderGames = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/order-casino-games`, data);

const addInternalTag = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/internal`, data);

const getLanguageSupportKeys = ({ language }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/language/support-keys?language=${language}`
	);

const uploadLanguageCSV = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/language/load-file`, data);

const updateLanguageSupport = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/language/support-keys`, data);

const getCMSLanguage = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/cms/language`);

const getElasticHealth = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/report/elastic-health-check`);

const sendMail = ({ email }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/forget-password`, { email });

const resetPassword = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/verify-forget-password`, data);

const updateUserAffiliate = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/affiliate/user`, data);

const addUserAffiliate = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/affiliate/add-user`, data);

const getPaymentAggregators = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/payment/aggregators`);

const getPaymentProvider = ({
	paymentType,
	aggregator,
	tenant,
	group,
	status,
	tenantIds,
	category,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/payment/providers?paymentType=${paymentType}&aggregator=${aggregator}&tenant=${tenant}&group=${group}&status=${status}&tenantIds=${tenantIds}&category=${category}`
	);

const getProviderDetails = ({ providerId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/payment/provider-details?providerId=${providerId}`
	);

const configProviderSettings = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/payment/provider-settings`, data);

const updateKycMethod = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/country/kyc-method`, data);

const updatePaymentProviderStatus = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/update-provider-status`, data);

const reOrderPaymentProviders = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/tenant/payment/order-providers`, data);

const getCommentsList = ({ limit, search, pageNo, userId, role, status }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/comments?limit=${limit}&pageNo=${pageNo}&search=${search}&userId=${userId}&role=${role}&status=${status}`
	);

const addComments = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/user/comment`, data);

const updateSAUserStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const updateComment = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/comment-status`, data);
const reorderBonus = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/bonus/order`, data);

const getSegments = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/segments`);

const deleteBonus = ({ data }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/bonus`, data);

const verifyPlayerEmail = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/verify-email`, data);

const getAllReviews = ({ limit, search, pageNo, status }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/review?limit=${limit}&pageNo=${pageNo}&search=${search}&status=${status}`
	);

const addReview = ({ data }) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/review`, data);

const updateReview = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/review`, data);

const resetProfilePassword = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/change-password`, data);

const resetPasswordEmail = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/reset-password`, data);

const resetUserPassword = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/update-password`, data);

const getPaymentCategories = ({ paymentType }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/payment/category?paymentType=${paymentType}`
	);

const orderPaymentCategories = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/payment/order-category`, data);

const updateUser = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user`, data);

const getCashbackData = ({ userId, level, currencyCode }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/cashback?userId=${userId}&level=${level}&currencyCode=${currencyCode}`
	);

const getBetSettings = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/bet-settings`);

const updateBetSettings = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/bet-settings`, data);

const addBetSettings = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/bet-settings`, data);

const getSportsList = ({
	search = '',
	limit,
	pageNo,
	isAllListing = false,
	isActive = '',
}) =>
	isAllListing
		? getRequest(
				`${VITE_APP_API_URL}/api/admin/sportsbook/sport?limit=${limit}&pageNo=${pageNo}&search=${search}&isActive=${isActive}&listing=all`
		  )
		: getRequest(
				`${VITE_APP_API_URL}/api/admin/sportsbook/sport?limit=${limit}&pageNo=${pageNo}&search=${search}&isActive=${isActive}`
		  );

const getCountriesList = ({ limit, pageNo, search = '', isActive = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/countries?search=${search}&limit=${limit}&pageNo=${pageNo}&isActive=${isActive}`
	);

const getMatchesList = ({
	limit,
	pageNo,
	isLive = '',
	eventStatus,
	search = '',
	isActive = '',
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/matches?search=${search}&isActive=${isActive}&limit=${limit}&pageNo=${pageNo}&isLive=${isLive}&eventStatus=${eventStatus}`
	);

const getMarketsList = ({ limit, pageNo, isLive, providerSportId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/markets?limit=${limit}&pageNo=${pageNo}&isLive=${isLive}&providerSportId=${providerSportId}`
	);

const getTournamentsList = ({
	limit,
	pageNo,
	providerCountryId,
	providerSportId,
	search,
	isActive,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/tournaments?limit=${limit}&pageNo=${pageNo}&providerCountryId=${providerCountryId}&providerSportId=${providerSportId}&search=${search}&isActive=${isActive}`
	);

const updateStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const addFeaturedApi = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/addFeatured`, data);

const uploadImageApi = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/upload-thumbnails`,
		data
	);

const getSportsMatchesDetailApi = ({ matchId = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/match-markets?matchId=${matchId}`
	);

const getSpecificSportDetailApi = ({ matchId = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/match-markets?matchId=${matchId}`
	);

const updateOddsVariationApi = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/odd-settings`, data);

const detachOddsVariationApi = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/detach-market`, data);

export {
	addReview,
	getAllReviews,
	updateReview,
	superAdminLogin,
	// tenantLogin,
	// getAllTenants,
	getAllAdmins,
	// createTenant,
	// getThemeData,
	// getAllThemes,
	getAllCurrencies,
	// getAllTenantAffiliates,
	// getAllTenantAdmins,
	// getAllTenantCMS,
	createCurrency,
	editCurrency,
	getAllAffiliates,
	getAllCms,
	getAllUsers,
	// createTenantAdmin,
	// getTenant,
	// editTenant,
	getAdminRole,
	getAdmin,
	getCurrencyById,
	getUser,
	// getAllCredKeys,
	// updateTheme,
	// createTheme,
	// getAllCredentials,
	// createCredentials,
	// getAllCreds,
	// getCredByKey,
	// updateCreds,
	// getTenantDetails,
	// getAllTenantUsers,
	// createTenantCredentials,
	// getTenantUserDetails,
	// getUserFields,
	// updateUserFields,
	// updateTenantCredentials,
	// getAdminRoles,
	getAdminUsers,
	getAdminUserDetails,
	// createAdminUser,
	// createTenantUser,
	// updateTenantUser,
	// getAllThemesTenant,
	// updateThemeTenant,
	// getTenantAffiliateById,
	// updateTenantAffiliate,
	createCms,
	// getCmsDetails,
	// updateCms,
	// getTenantRole,
	// getTenantAdminRole,
	// getTenantWallet,
	getSuperAdminWallet,
	getAffiliateById,
	getCmsByPageId,
	// getTenantCasinoCategories,
	// getTenantCasinoSubCategories,
	createTenantCasinoCategory,
	getTenantCasinoMenuById,
	updateTenantCasinoCategory,
	getAllCasinoProviders,
	getAllCasinoGames,
	getCountries,
	createSuperAdminUser,
	updateSuperAdminUser,
	getAllTenantCasinoMenuItems,
	getSuperAdminDetails,
	createCasinoGame,
	createCasinoProvider,
	updateCasinoGame,
	updateCasinoProvider,
	createTenantCasinoMenuItem,
	getAllWageringCasinoGames,
	// getAllTenantCasinoTables,
	updateTenantCasinoMenuItem,
	// updateTenantAdminUser,
	updateTenantAdmin,
	getAllSuperAdminTransactions,
	// getAllTenantTransactions,
	// getAllTenantCasinoTransactions,
	// getTenantTransactionUsers,
	getSuperAdminTransactionUsers,
	// getTenantCountries,
	getSuperAdminAggregators,
	createSuperAdminAggregator,
	getSuperAdminGameCategory,
	getSuperAdminGameSubCategory,
	createTenantCasinoSubCategory,
	updateTenantCasinoSubCategory,
	// getTenantGames,
	getMasterGames,
	addGamesToSubCategory,
	// deleteTenantCasinoGame,
	// updateTenantCategoryGame,
	updateSubCategoryReOrder,
	updateCategoryReOrder,
	getRestrictedItems,
	getUnRestrictedItems,
	addRestrictedItems,
	deleteRestrictedItems,
	getRestrictedCountries,
	getUnRestrictedCountries,
	deleteRestrictedCountries,
	addRestrictedCountries,
	// getAllTenantCurrencies,
	addDepositToOther,
	getSuperAdminCasinoTransactions,
	getAllClients,
	getAllPortals,
	getTenantList,
	isDomainExist,
	updateSuperAdminCMS,
	superAdminViewToggleStatus,
	tenantViewToggleStatus,
	deleteTenantAdminCategory,
	deleteTenantAdminSubCategory,
	getAllWithdrawRequestAdmin,
	getAllWithdrawRequestSuperAdmin,
	getAllSAProviders,
	getAllTAProviders,
	getGlobalRegistration,
	updateGlobalRegistration,
	getAllBonus,
	createBonus,
	updateBonus,
	getBonus,
	issueBonus,
	getUserBonus,
	cancelBonus,
	getUserDocument,
	verifyUserDocument,
	getDocumentLabel,
	updateDocumentLabel,
	// getDemographicDetailsTenant,
	getDemographicDetailsSuperAdmin,
	createDocumentLabel,
	requestDocument,
	cancelDocumentRequest,
	getPaymentMethod,
	getWageringTemplateDetail,
	getSuperAdminPlayerManagement,
	getTenantPlayerManagement,
	getSuperAdminLivePlayerReport,
	// getTenantLivePlayerReport,
	getSuperAdminAllWageringTemplate,
	// getTenantAllWageringTemplate,
	getSuperAdminWageringTemplateDetail,
	createWageringTemplate,
	updateWageringTemplate,
	getBalanceBonuses,
	// getTAConvertAmount,
	// getAllTABonus,
	// getTAWageringTemplateDetail,
	getSuperAdminWageringTemplate,
	getTenantWageringTemplate,
	// getTenantWageringTemplateDetail,
	// getTABalanceBonuses,
	getSAPlayerLiability,
	// getTAPlayerLiability,
	getSAKPISummary,
	// getTAKPISummary,
	getSAKPIReport,
	// getTAKPIReport,
	getSAGameReport,
	// getTAGameReport,
	getSAPlayerGameReport,
	// getTAPlayerGameReport,
	getFreeSpinGames,
	// getTenantOwnerDetails,
	getloyaltyLevel,
	updateloyaltyLevel,
	getLanguages,
	getEmailTemplates,
	getEmailTemplate,
	primaryEmailTemplate,
	updateEmailTemplate,
	createEmailTemplate,
	updateLoyaltyPoint,
	updateLoyaltyLimit,
	getDynamicKeys,
	getAdminChildren,
	updateProfile,
	// updateAdminProfile,
	getAllGroups,
	getTags,
	updateTags,
	getImageGallery,
	deleteFromGallery,
	getDuplicateUsers,
	testEmailTemplateEndPoint,
	setDailyLimit,
	setDepositLimit,
	setLossLimit,
	getOwnerPermissions,
	setEmailCreds,
	disableUser,
	setSessionLimit,
	// getBanners,
	// uploadBanner,
	getCMSDynamicKeys,
	deleteEmailTemplateLanguage,
	getEmailTypes,
	getAllSABanners,
	uploadSABanner,
	updateSABanner,
	deleteCMSLanguage,
	updateReorderGames,
	// getTenantLanguages,
	addInternalTag,
	getLanguageSupportKeys,
	uploadLanguageCSV,
	updateLanguageSupport,
	getCMSLanguage,
	getElasticHealth,
	sendMail,
	resetPassword,
	updateUserAffiliate,
	addUserAffiliate,
	updateKycMethod,
	getPaymentAggregators,
	getPaymentProvider,
	getProviderDetails,
	configProviderSettings,
	updatePaymentProviderStatus,
	reOrderPaymentProviders,
	getCommentsList,
	addComments,
	updateSAUserStatus,
	updateComment,
	reorderBonus,
	getSegments,
	deleteBonus,
	verifyPlayerEmail,
	resetProfilePassword,
	resetPasswordEmail,
	resetUserPassword,
	getPaymentCategories,
	orderPaymentCategories,
	updateUser,
	getCashbackData,
	updateSiteConfiguration,
	getSiteConfiguration,
	getSuperAdminSportsTransactions,
	deleteTenantAdminCasinoProvider,
	deleteTenantAdminCasinoGames,
	updateCasinoSubCategory,
	updateCasinoCategory,
	createCasinoCategory,
	createCasinoSubCategory,
	deleteSABanners,
	deleteEmailTemplate,
	getBetSettings,
	updateBetSettings,
	addBetSettings,
	getSportsList,
	getCountriesList,
	getMatchesList,
	getMarketsList,
	getTournamentsList,
	updateStatus,
	addFeaturedApi,
	uploadImageApi,
	getSportsMatchesDetailApi,
	getSpecificSportDetailApi,
	updateOddsVariationApi,
	detachOddsVariationApi,
};
