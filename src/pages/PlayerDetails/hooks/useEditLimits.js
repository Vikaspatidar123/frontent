import { userLimitTypes } from '../../../utils/constant';

const useEditLimits = ({ userDetails }) => {
	const { userLimits } = userDetails || [];

	const findLimitValue = (key) => {
		const limit = userLimits?.find((limits) => limits.key === key);
		return limit?.value ? limit?.value : 0;
	};

	const limitLabels = [
		{
			label: 'Daily Wager Limit',
			value: findLimitValue(userLimitTypes.dailyBetLimit),
			minimum: 0,
		},
		{
			label: 'Weekly Wager Limit',
			value: findLimitValue(userLimitTypes.weeklyBetLimit),
			minimum: findLimitValue(userLimitTypes.dailyBetLimit),
		},
		{
			label: 'Monthly Wager Limit',
			value: findLimitValue(userLimitTypes.monthlyBetLimit),
			minimum: findLimitValue(userLimitTypes.weeklyBetLimit),
		},
		{
			label: 'Daily Deposit Limit',
			value: findLimitValue(userLimitTypes.dailyDepositLimit),
			minimum: 0,
		},
		{
			label: 'Weekly Deposit Limit',
			value: findLimitValue(userLimitTypes.weeklyDepositLimit),
			minimum: findLimitValue(userLimitTypes.dailyDepositLimit),
		},
		{
			label: 'Monthly Deposit Limit',
			value: findLimitValue(userLimitTypes.monthlyDepositLimit),
			minimum: findLimitValue(userLimitTypes.weeklyDepositLimit),
		},
		{
			label: 'Daily Loss Limit',
			value: findLimitValue(userLimitTypes.dailyLossLimit),
			minimum: 0,
		},
		{
			label: 'Weekly Loss Limit',
			value: findLimitValue(userLimitTypes.weeklyLossLimit),
			minimum: findLimitValue(userLimitTypes.dailyLossLimit),
		},
		{
			label: 'Monthly Loss Limit',
			value: findLimitValue(userLimitTypes.monthlyLossLimit),
			minimum: findLimitValue(userLimitTypes.weeklyLossLimit),
		},
	];

	return {
		userLimits,
		limitLabels,
	};
};

export default useEditLimits;
