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
		id: 2,
		link: '/profile',
		label: 'Profile',
		searchString: 'profile account my account',
		iconName: 'bx bxs-user-circle',
		linkClass: '',
		anchorClass: '',
		spanClass: '',
		liTagClass: '',
		ulTagClass: '',
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
				id: 7,
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
				id: 8,
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
				id: 40,
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
			{
				id: 31,
				link: '/review-management',
				label: 'Review Management',
				searchString: 'review management',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.review,
			},
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
			modules.galley,
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
				module: modules.galley,
			},
			{
				id: 21,
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
		id: 102,
		isSeparator: true,
		title: 'Casino 	service',
		groupedModules: [modules.casinoManagement, modules.banner],
	},
	{
		id: 15,
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
				id: 16,
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
				id: 17,
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
				id: 18,
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
				id: 19,
				link: '/sub-categories',
				label: 'Sub Categories',
				searchString: 'casino sub categories',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.casinoManagement,
			},
			{
				id: 20,
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
	// {
	// 	id: 103,
	// 	isSeparator: true,
	// 	title: 'Reward administration',
	// 	groupedModules: [modules.bonus, modules.bonus],
	// },
	// {
	// 	id: 22,
	// 	link: '/#',
	// 	label: 'Bonus Management',
	// 	searchString: 'bonus management',
	// 	iconName: 'bx bx-money',
	// 	linkClass: 'has-arrow',
	// 	anchorClass: '',
	// 	spanClass: '',
	// 	liTagClass: '',
	// 	ulTagClass: '',
	// 	groupedModules: [modules.bonus],
	// 	subMenu: [
	// 		// {
	// 		// 	id: 23,
	// 		// 	link: '/loyalty-management',
	// 		// 	label: 'Loyalty Management',
	// 		// 	searchString: 'loyalty management',
	// 		// 	iconName: '',
	// 		// 	linkClass: '',
	// 		// 	anchorClass: '',
	// 		// 	spanClass: '',
	// 		// 	liTagClass: '',
	// 		// 	ulTagClass: '',
	// 		// 	module: modules.LoyaltyManagement,
	// 		// },
	// 		{
	// 			id: 24,
	// 			link: '/wagering-template',
	// 			label: 'Wagering Template',
	// 			searchString: 'wagering template',
	// 			iconName: '',
	// 			linkClass: '',
	// 			anchorClass: '',
	// 			spanClass: '',
	// 			liTagClass: '',
	// 			ulTagClass: '',
	// 			module: modules.bonus,
	// 		},
	// 		{
	// 			id: 25,
	// 			link: '/bonus',
	// 			label: 'Bonus',
	// 			searchString: 'bonus',
	// 			iconName: '',
	// 			linkClass: '',
	// 			anchorClass: '',
	// 			spanClass: '',
	// 			liTagClass: '',
	// 			ulTagClass: '',
	// 			module: modules.bonus,
	// 		},
	// 	],
	// },
	{
		id: 104,
		isSeparator: true,
		title: 'Statements',
		groupedModules: [modules.report, modules.review],
	},
	{
		id: 26,
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
				id: 27,
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
				id: 28,
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
				id: 29,
				link: '/sports-transactions',
				label: 'Sport Bet Slips',
				searchString: 'sports transactions',
				iconName: '',
				linkClass: '',
				anchorClass: '',
				spanClass: '',
				liTagClass: '',
				ulTagClass: '',
				module: modules.report,
			},
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
		id: 105,
		isSeparator: true,
		title: 'Sports Management',
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
		id: 33,
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
				id: 34,
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
				id: 35,
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
				id: 36,
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
				id: 38,
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
				id: 39,
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
