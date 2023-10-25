const STATUS = [
	{
		value: 0,
		optionLabel: 'Pending',
	},
	{
		value: 5,
		optionLabel: 'Approved',
	},
	{
		value: 2,
		optionLabel: 'Cancelled',
	},
];

const getStatus = (status) => {
	switch (status) {
		case 0:
			return 'Pending';

		case 5:
			return 'Approved';

		case 2:
			return 'Cancelled';

		default:
			return 'NA';
	}
};

export { STATUS, getStatus };
