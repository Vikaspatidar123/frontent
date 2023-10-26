const useEditLimits = ({ userDetails }) => {
	const { userLimit: userLimits } = userDetails || {};
	// console.log('limits', userDetails)

	const limitLabels = [
		{
			label: 'Daily Wager Limit',
			value: userLimits?.dailyBetLimit,
			minimum: 0,
		},
		{
			label: 'Weekly Wager Limit',
			value: userLimits?.weeklyBetLimit,
			minimum: userLimits?.dailyBetLimit,
		},
		{
			label: 'Monthly Wager Limit',
			value: userLimits?.monthlyBetLimit,
			minimum: userLimits?.weeklyBetLimit,
		},
		{
			label: 'Daily Deposit Limit',
			value: userLimits?.dailyDepositLimit,
			minimum: 0,
		},
		{
			label: 'Weekly Deposit Limit',
			value: userLimits?.weeklyDepositLimit,
			minimum: userLimits?.dailyDepositLimit,
		},
		{
			label: 'Monthly Deposit Limit',
			value: userLimits?.monthlyDepositLimit,
			minimum: userLimits?.weeklyDepositLimit,
		},
		{
			label: 'Daily Loss Limit',
			value: userLimits?.dailyLossLimit,
			minimum: 0,
		},
		{
			label: 'Weekly Loss Limit',
			value: userLimits?.weeklyLossLimit,
			minimum: userLimits?.dailyLossLimit,
		},
		{
			label: 'Monthly Loss Limit',
			value: userLimits?.monthlyLossLimit,
			minimum: userLimits?.weeklyLossLimit,
		},
	];

	return {
		limitLabels,
	};
};

export default useEditLimits;
