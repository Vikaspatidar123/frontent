export const keyArray = [
	{ id: 1, label: 'Currency', accessor: 'currencyCode' },
	{ id: 2, accessor: 'totalAmount', label: 'Total Balance' },
	{ id: 3, accessor: 'cash', label: 'Cash Balance' },
	{ id: 4, accessor: 'bonus', label: 'Bonus Balance' },
	{ id: 5, accessor: 'pendingWithdrawals', label: 'Pending Withdrawals' },
	{ id: 6, accessor: 'pendingDeposits', label: 'Pending Deposits' },
	{ id: 7, accessor: 'netLoss', label: 'Net Loss' },
	{ id: 8, accessor: 'userDeposits', label: 'User Deposits' },
	{ id: 9, accessor: 'addMoney', label: 'Add Money' },
	{ id: 10, accessor: 'totalWithdrawals', label: 'Total Withdrawals' },
	{ id: 11, accessor: 'totalBonus', label: 'Total Bonuses' },
	{ id: 12, accessor: 'depositToBonus', label: 'Deposit to bonus ratio' },
	{ id: 13, accessor: 'averageDeposit', label: 'Average Deposit' },
	{ id: 14, accessor: 'averageWithdrawal', label: 'Average Withdrawal' },
	{ id: 14, accessor: 'averageBonus', label: 'Average Bonus' },
	{ id: 15, accessor: 'createdAt', label: 'Enrolled since' },
];

export const bonusKeyArray = [
	{ id: 1, label: 'Promotion Title', accessor: 'title' },
	{ id: 2, accessor: 'bonusType', label: 'Bonus Type' },
	{ id: 3, accessor: 'bonusPercentage', label: 'Bonus Percentage' },
	{ id: 4, accessor: 'isSticky', label: 'Sticky' },
	{ id: 5, accessor: 'bonusBetOnly', label: 'Bonus Bet Only' },
	{ id: 6, accessor: 'validFrom', label: 'Valid From' },
	{ id: 7, accessor: 'validTo', label: 'Valid To' },
	{ id: 8, accessor: 'daysToClear', label: 'Days To Clear' },
	{ id: 9, accessor: 'wageringRequirementType', label: 'Wagering Type' },
	{ id: 10, accessor: 'wageringMultiplier', label: 'Wagering Multiplier' },
];

export const portalValues = [
	{
		optionLabel: 'Current',
		value: 'current',
	},
	{
		optionLabel: 'All',
		value: 'all',
	},
];

export const timePeriodValues = [
	{
		optionLabel: 'Permanent',
		value: 'permanent',
	},
	{
		optionLabel: 'Custom Value',
		value: 'custom',
	},
];

export const userDisableReasons = [
	'Bonus abuser',
	'Duplicate account',
	'Fraudulent',
	'Risk country',
	'Rude behaviour',
	'Bannec country - connect with VPN or Tor Browser',
	'KYC declined',
	'Suspicios - constant deposits and withdrawals (money laundering)',
	'Contacts support for bigger amount of deposit than allowed',
	'Resonsible Gambling',
	'pending',
	'frozen',
	'deactivated',
	'permbanned',
	'tempbannedblocked',
	'gambling_issues',
	'self_excluded',
	'dpo_erasure_requested',
	'kyc_blocked_suspended',
	'kyc_blocked_duplicate',
	'kyc_blocked_bonus_abuse',
	'kyc_blocked_chargeback',
	'kyc_fraud',
	'failed_kyc',
	'aml_failed_sow',
	'aml_management_ban',
	'aml_on_hold',
	'aml_under_review',
	'rg_underaged',
	'rg_under_review',
	'enforced_self_ex',
	'location_ban',
	'cs_management_ban',
	'validated',
	'Other',
];

export const countryMasks = {
	af: '..-...-....',
	ax: '(...)...-..-..',
	al: '(...)...-...',
	dz: '..-...-....',
	as: '(684)...-....',
	ad: '...-...',
	ao: '(...)...-...',
	ai: '(264)...-....',
	aq: '1..-...',
	ag: '(268)...-....',
	ar: '(...)...-....',
	am: '..-...-...',
	aw: '...-....',
	ac: '....',
	au: '.-....-....',
	at: '(...)...-....',
	az: '..-...-..-..',
	bs: '(242)...-....',
	bh: '....-....',
	bd: '1...-......',
	bb: '(246)...-....',
	by: '(..)...-..-..',
	be: '(...)...-...',
	bz: '...-....',
	bj: '..-..-....',
	bm: '(441)...-....',
	bt: ['17-...-...', '77-...-...', '.-...-...'],
	bo: '.-...-....',
	ba: ['..-....', '..-.....'],
	bw: '..-...-...',
	br: ['(..)....-....', '(..).....-....'],
	io: '...-....',
	bn: '...-....',
	bg: '(...)...-...',
	bf: '..-..-....',
	bi: '..-..-....',
	kh: '..-...-...',
	cm: '....-....',
	ca: '(...)...-....',
	cv: '(...)..-..',
	ky: '(345)...-....',
	cf: '..-..-....',
	td: '..-..-..-..',
	cl: '.-....-....',
	cn: ['(...)....-...', '(...)....-....', '..-.....-.....'],
	cx: '.-....-....',
	cc: '.-....-....',
	co: '(...)...-....',
	km: '..-.....',
	cg: '..-.....',
	ck: '..-...',
	cr: '....-....',
	hr: '..-...-...',
	cu: '.-...-....',
	cy: '..-...-...',
	cz: '(...)...-...',
	cd: '(...)...-...',
	dk: '..-..-..-..',
	dj: '..-..-..-..',
	dm: '(767)...-....',
	do: ['(809)...-....', '(829)...-....', '(849)...-....'],
	ec: ['.-...-....', '..-...-....'],
	eg: '(...)...-....',
	sv: '..-..-....',
	gq: '..-...-....',
	er: '.-...-...',
	ee: ['...-....', '....-....'],
	sz: '..-..-....',
	et: '..-...-....',
	fk: '.....',
	fo: '...-...',
	fj: '..-.....',
	fi: '(...)...-..-..',
	fr: '(...)...-...',
	gf: '.....-....',
	pf: '..-..-..',
	ga: '.-..-..-..',
	gm: '(...)..-..',
	ge: '(...)...-...',
	de: [
		'...-...',
		'(...)..-..',
		'(...)..-...',
		'(...)..-....',
		'(...)...-....',
		'(....)...-....',
	],
	gh: '(...)...-...',
	gi: '...-.....',
	gr: '(...)...-....',
	gl: '..-..-..',
	gd: '(473)...-....',
	gp: '(...)...-...',
	gu: '(671)...-....',
	gt: '.-...-....',
	gg: '(....)......',
	gn: '..-...-...',
	gw: '.-......',
	gy: '...-....',
	ht: '..-..-....',
	va: '06 698.....',
	hn: '....-....',
	hk: '....-....',
	hu: '(...)...-...',
	is: '...-....',
	in: '...-...-....',
	id: [
		'..-...-..',
		'..-...-...',
		'..-...-....',
		'(8..)...-...',
		'(8..)...-..-...',
	],
	ir: '(...)...-....',
	iq: '(...)...-....',
	ie: '(...)...-...',
	im: '(....)......',
	il: ['.-...-....', '5.-...-....'],
	it: '(...)....-...',
	ci: '..-...-...',
	jm: '(876)...-....',
	jp: ['(...)...-...', '..-....-....'],
	je: '(....)....-......',
	jo: '.-....-....',
	kz: ['(6..)...-..-..', '(7..)...-..-..'],
	ke: '...-......',
	ki: '..-...',
	kp: [
		'...-...',
		'....-....',
		'..-...-...',
		'...-....-...',
		'191-...-....',
		'....-.............',
	],
	kr: '..-...-....',
	xk: ['..-...-...', '...-...-...'],
	kw: '....-....',
	kg: '(...)...-...',
	la: ['..-...-...', '(20..)...-...'],
	lv: '..-...-...',
	lb: ['.-...-...', '..-...-...'],
	ls: '.-...-....',
	lr: '..-...-...',
	ly: ['..-...-...', '21-...-....'],
	li: '(...)...-....',
	lt: '(...)..-...',
	lu: '(...)...-...',
	mo: '....-....',
	mg: '..-..-.....',
	mw: ['1-...-...', '.-....-....'],
	my: ['.-...-...', '..-...-...', '(...)...-...', '..-...-....'],
	mv: '...-....',
	ml: '..-..-....',
	mt: '...-...-..',
	mh: '...-....',
	mq: '(...)..-..-..',
	mr: '..-..-....',
	mu: '...-....',
	yt: '.....-....',
	mx: ['..-..-....', '(...)...-....'],
	fm: '...-....',
	md: '....-....',
	mc: ['..-...-...', '(...)...-...'],
	mn: '..-..-....',
	me: '..-...-...',
	ms: '(664)...-....',
	ma: '..-....-...',
	mz: '..-...-...',
	mm: ['...-...', '.-...-...', '..-...-...'],
	na: '..-...-....',
	nr: '...-....',
	np: '..-...-...',
	nl: '..-...-....',
	an: ['...-....', '9...-....'],
	nc: '..-....',
	nz: ['.-...-...', '(...)...-...', '(...)...-....'],
	ni: '....-....',
	ne: '..-..-....',
	ng: ['..-...-..', '..-...-...', '(...)...-....'],
	nu: '....',
	nf: '3..-...',
	mk: '..-...-...',
	mp: '(670)...-....',
	no: '(...)..-...',
	om: '..-...-...',
	pk: '(...)...-....',
	pw: '...-....',
	ps: '..-...-....',
	pa: '...-....',
	pg: '(...)..-...',
	py: '(...)...-...',
	pe: '(...)...-...',
	ph: '(...)...-....',
	pn: '...-...-...',
	pl: '(...)...-...',
	pt: '..-...-....',
	pr: ['(787) ... ....', '(939) ... ....'],
	qa: '....-....',
	re: '.....-....',
	ro: '..-...-....',
	ru: '(...)...-..-..',
	rw: '(...)...-...',
	bl: '...-..-..-..',
	sh: '....',
	kn: '(869)...-....',
	lc: '(758)...-....',
	mf: '(...)...-...',
	pm: '..-....',
	vc: '(784)...-....',
	ws: '..-....',
	sm: '....-......',
	st: '..-.....',
	sa: ['.-...-....', '5.-....-....'],
	sn: '..-...-....',
	rs: '..-...-....',
	sc: '.-...-...',
	sl: '..-......',
	sg: '....-....',
	sx: '(721)...-....',
	sk: '(...)...-...',
	si: '..-...-...',
	sb: ['.....', '...-....'],
	so: ['.-...-...', '..-...-...'],
	za: '..-...-....',
	gs: '.....',
	ss: '..-...-....',
	es: '(...)...-...',
	lk: '..-...-....',
	sd: '..-...-....',
	sr: ['...-...', '...-....'],
	sj: '(...)..-...',
	se: '..-...-....',
	ch: '..-...-....',
	sy: '..-....-...',
	tw: ['....-....', '.-....-....'],
	tj: '..-...-....',
	tz: '..-...-....',
	th: ['..-...-...', '..-...-....'],
	tl: ['...-....', '77.-.....', '78.-.....'],
	tg: '..-...-...',
	tk: '....',
	to: '.....',
	tt: '(868)...-....',
	tn: '..-...-...',
	tr: '(...)...-....',
	tm: '.-...-....',
	tc: '(249)...-...',
	tv: ['2....', '90....'],
	ug: '(...)...-...',
	ua: '(..)...-..-..',
	ae: ['.-...-....', '5.-...-....'],
	gb: '..-....-....',
	us: '(...)...-....',
	uy: '.-...-..-..',
	uz: '..-...-....',
	vu: ['.....', '..-.....'],
	ve: '(...)...-....',
	vn: ['..-....-...', '(...)....-...'],
	vg: '(284)...-....',
	vi: '(340)...-....',
	wf: '..-....',
	ye: ['.-...-...', '..-...-...', '...-...-...'],
	zm: '..-...-....',
	zw: '.-......',
};

export const bonusStatus = [
	{ label: 'All', value: '' },
	{ label: 'Active', value: 'ACTIVE' },
	{ label: 'Pending', value: 'PENDING' },
	{ label: 'Cancelled', value: 'CANCELLED' },
	{ label: 'Forfeited', value: 'FORFEITED' },
	{ label: 'Expired', value: 'EXPIRED' },
	{ label: 'Completed', value: 'COMPLETED' },
];

export const bonusTypes = [
	{ label: 'All', value: '' },
	{ label: 'MATCH', value: 'match', id: 0 },
	{ label: 'BALANCE', value: 'balance', id: 1 },
	{ label: 'FREESPINS', value: 'freespins', id: 2 },
	{ label: 'DEPOSIT(CASHBACK)', value: 'deposit', id: 3 },
	{ label: 'WAGERING(CASHBACK)', value: 'wagering', id: 4 },
];
