/* eslint-disable no-console */
import { isEmpty } from 'lodash';
import { modules } from './permissions';

const sideBarElements = [
	{
		id: 101,
		isSeparator: true,
		title: 'Menu',
	},
	{
		id: 1,
		link: '/dashboard',
		label: 'Dashboard',
		searchString: 'default dashboard home',
		iconName: 'bx bx-home-circle',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [
			modules.demography,
			modules.kpiReport,
			modules.kpiSummaryReport,
			modules.livePlayerDetail,
			modules.gameReport,
		],
	},
	{
		id: 4,
		link: '/users',
		label: 'Players',
		searchString: 'all users',
		iconName: 'bx bx-group',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		module: modules.player,
	},
	{
		id: 19,
		link: '/#',
		label: 'Reports',
		searchString: 'reports',
		iconName: 'bx bxs-report',
		linkClass: 'has-arrow',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [modules.report, modules.review],
		subMenu: [
			{
				id: 20,
				link: '/transaction-banking',
				label: 'Transactions Banking',
				searchString: 'transaction banking',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.report,
			},
			{
				id: 21,
				link: '/casino-transactions',
				label: 'Casino Transactions',
				searchString: 'casino transactions',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.report,
			},
			{
				id: 22,
				link: '/sports-transactions',
				label: 'Sports Transactions',
				searchString: 'sports transactions',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.report,
			},
			{
				id: 23,
				link: '/game-report',
				label: 'Game Reports',
				searchString: 'game report transactions',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.report,
			},
			{
				id: 107,
				link: '/player-performance',
				label: 'Player Performance',
				searchString: 'player performance',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.report,
			},
			// {
			// 	id: 24,
			// 	link: '/sports-bets',
			// 	label: 'Sport Bet Slips',
			// 	searchString: 'sports bets',
			// 	iconName: '',
			// 	linkClass: '',
			// 	anchorClass: '',
			// 	spanClass: '',
			// 	liTagClass: '',
			// 	ulTagClass: '',
			// 	module: modules.report,
			// },
			// {
			// 	id: 30,
			// 	link: '/withdraw-request',
			// 	label: 'Withdraw Request',
			// 	searchString: 'withdraw requests',
			// 	iconName: '',
			// 	linkClass: '',
			// 	anchorClass: '',
			// 	spanClass: '',
			// 	liTagClass: '',
			// 	ulTagClass: '',
			// 	module: modules.report,
			// },
		],
	},
	{
		id: 6,
		link: '/#',
		label: 'Site Configuration',
		searchString: 'site configuration',
		iconName: 'bx bx-cog',
		linkClass: 'has-arrow',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [modules.currency, modules.country, modules.language],
		subMenu: [
			{
				id: 7,
				link: '/currencies',
				label: 'Currencies',
				searchString: 'currencies',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.currency,
			},
			{
				id: 8,
				link: '/countries',
				label: 'Countries',
				searchString: 'countries',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.country,
			},
			{
				id: 9,
				link: '/languages',
				label: 'Languages',
				searchString: 'languages',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.language,
			},
			{
				id: 10,
				link: '/application-settings',
				label: 'Application Settings',
				searchString: 'application settings',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.review,
			},
			// {
			// 	id: 31,
			// 	link: '/review-management',
			// 	label: 'Review Management',
			// 	searchString: 'review management',
			// 	iconName: '',
			// 	linkClass: '',
			// 	anchorClass: '',
			// 	spanClass: '',
			// 	liTagClass: '',
			// 	ulTagClass: '',
			// 	module: modules.review,
			// },
			// {
			// 	id: 9,
			// 	link: '/languages-management',
			// 	label: 'Languages Management',
			// 	searchString: 'languages management',
			// 	iconName: '',
			// 	linkClass: '',
			// 	anchorClass: '',
			// 	spanClass: '',
			// 	liTagClass: '',
			// 	ulTagClass: '',
			// 	module: modules.language,
			// },
			// {
			// 	id: 10,
			// 	link: '/form-fields',
			// 	label: 'Registration Fields',
			// 	searchString: 'registration fields',
			// 	iconName: '',
			// 	linkClass: '',
			// 	anchorClass: '',
			// 	spanClass: '',
			// 	liTagClass: '',
			// 	ulTagClass: '',
			// 	module: modules.RegistrationField,
			// },
		],
	},
	{
		id: 11,
		link: '/#',
		label: 'Content Management',
		searchString: 'content management',
		iconName: 'bx bx-customize',
		linkClass: 'has-arrow',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [
			modules.page,
			modules.banner,
			modules.emailTemplate,
			modules.gallery,
		],
		subMenu: [
			{
				id: 12,
				link: '/cms',
				label: 'CMS',
				searchString: 'cms',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.page,
			},
			{
				id: 13,
				link: '/email-templates',
				label: 'CRM',
				searchString: 'email crm',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.emailTemplate,
			},
			{
				id: 37,
				link: '/notifications',
				label: 'Notifications',
				searchString: 'notification',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.page,
			},
			{
				id: 14,
				link: '/image-gallery',
				label: 'Image Gallery',
				searchString: 'image gallery',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.gallery,
			},
			{
				id: 15,
				link: '/banner-management',
				label: 'Banner Management',
				searchString: 'banner management home banner',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.banner,
			},
		],
	},
	{
		id: 108,
		link: '/tournaments',
		label: 'Tournaments',
		searchString: 'tournaments',
		iconName: 'bx bxs-trophy',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		module: modules.tournamentManagement,
	},
	{
		id: 109,
		link: '/payment',
		label: 'Payment Management',
		searchString: 'payment',
		iconName: 'bx bx-credit-card',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		module: modules.paymentManagement,
	},
	{
		id: 16,
		link: '/#',
		label: 'Bonus Management',
		searchString: 'bonus management',
		iconName: 'bx bx-money',
		linkClass: 'has-arrow',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [modules.bonus],
		subMenu: [
			{
				id: 17,
				link: '/wagering-template',
				label: 'Wagering Template',
				searchString: 'wagering template',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.bonus,
			},
			{
				id: 18,
				link: '/bonus',
				label: 'Bonus',
				searchString: 'bonus',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.bonus,
			},
			{
				id: 111,
				link: '/referral',
				label: 'Referral',
				searchString: 'referral management',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.LoyaltyManagement,
			},
		],
	},
	// {
	// 	id: 104,
	// 	isSeparator: true,
	// 	title: 'Statements',
	// 	groupedModules: [modules.report, modules.review],
	// },
	{
		id: 102,
		isSeparator: true,
		title: 'Casino',
		groupedModules: [modules.casinoManagement, modules.banner],
	},
	{
		id: 25,
		link: '/#',
		label: 'Casino Management',
		searchString: 'casino management slot',
		iconName: 'bx bx-list-ul',
		linkClass: 'has-arrow',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [modules.casinoManagement],
		subMenu: [
			{
				id: 26,
				link: '/casino-aggregators',
				label: 'Aggregators',
				searchString: 'casino aggregators',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.casinoManagement,
			},
			{
				id: 27,
				link: '/casino-providers',
				label: 'Providers',
				searchString: 'casino providers',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.casinoManagement,
			},
			{
				id: 28,
				link: '/categories',
				label: 'Categories',
				searchString: 'casino categories',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.casinoManagement,
			},
			{
				id: 30,
				link: '/casino-games',
				label: 'Games',
				searchString: 'casino games',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.casinoManagement,
			},
		],
	},
	{
		id: 106,
		isSeparator: true,
		title: 'SportsBook',
		groupedModules: [modules.sportsbookManagement],
	},
	// {
	// 	id: 32,
	// 	link: '/bet-settings',
	// 	label: 'Bet Settings',
	// 	searchString: 'bet settings',
	// 	iconName: 'bx bx-bar-chart-square',
	// 	linkClass: '',
	// 	anchorClass: '',
	// 	spanClass: '',
	// 	liTagClass: '',
	// 	ulTagClass: '',
	// 	module: modules.BetSettings,
	// },
	{
		id: 31,
		link: '/#',
		label: 'Sports Book',
		searchString: 'sportsbook sports book',
		iconName: 'bx bx-football',
		linkClass: 'has-arrow',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		groupedModules: [modules.sportsbookManagement],
		subMenu: [
			{
				id: 32,
				link: '/sports',
				label: 'Sports',
				searchString: 'all sports',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.sportsbookManagement,
			},
			{
				id: 33,
				link: '/sports/countries',
				label: 'Countries',
				searchString: 'sports countries',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.sportsbookManagement,
			},
			{
				id: 34,
				link: '/sports/leagues',
				label: 'Leagues',
				searchString: 'sports leagues',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.sportsbookManagement,
			},
			{
				id: 35,
				link: '/matches',
				label: 'Matches',
				searchString: 'sports matches',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.sportsbookManagement,
			},
			{
				id: 36,
				link: '/markets',
				label: 'Markets',
				searchString: 'sport match markets',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.sportsbookManagement,
			},
		],
	},
	{
		id: 105,
		isSeparator: true,
		title: 'Staff Management',
		groupedModules: [modules.sportsbookManagement],
	},
	{
		id: 3,
		link: '/staff',
		label: 'Staff',
		searchString: 'staff admin superadmin listing',
		iconName: 'bx bx-user-plus',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		module: modules.admin,
	},
	{
		id: 110,
		isSeparator: true,
		title: 'Player verification',
		groupedModules: [modules.sportsbookManagement],
	},
	{
		id: 5,
		link: '/kyc-labels',
		label: 'KYC Labels',
		searchString: 'kyc labels',
		iconName: 'bx bx-list-check',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
		module: modules.kyc,
	},
	// {
	// 	id: 2,
	// 	link: '/profile',
	// 	label: 'Profile',
	// 	searchString: 'profile account my account',
	// 	iconName: 'bx bxs-user-circle',
	// 	linkClass: '',
	// 	anchorClass: '',
	// 	spanClass: '',
	// 	liTagClass: '',
	// 	ulTagClass: '',
	// },
];

// For maintaining single source of truth (SSOT)
const getMegaMenuElement = () => {
	try {
		let id = 1;
		const megaMenu = [];
		let megaEle = {};
		let subMenu = [];

		for (let i = 0; i < sideBarElements?.length; i += 1) {
			const tab = sideBarElements[i];
			if (tab.isSeparator) {
				if (!isEmpty(subMenu)) {
					megaEle.subMenu = subMenu;
					megaMenu.push(megaEle);
					subMenu = [];
				}
				megaEle = {
					id,
					link: '#!',
					label: tab.title,
					...tab,
				};
				id += 1;
			} else {
				subMenu.push(tab);
				if (!isEmpty(tab.subMenu)) {
					subMenu.push(...tab.subMenu);
				}
			}
		}
		megaEle.subMenu = subMenu;
		megaMenu.push(megaEle);

		const filterMenu = [];

		megaMenu.forEach((menu) => {
			filterMenu.push({
				...menu,
				subMenu: menu.subMenu.filter((ele) => ele.link !== '/#'),
			});
		});

		return filterMenu;
	} catch (er) {
		console.log(er);
		return [];
	}
};

export { sideBarElements, getMegaMenuElement };
