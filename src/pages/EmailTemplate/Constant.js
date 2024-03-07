/* eslint-disable */
export const emailDynamicOptions = ({ type, emailTypes }) => {
	const allOpt = [];

	const checkOptional = (type, keyDesc) => {
		const req = [];
		for (const index in keys) {
			const data = keys[index]?.optional;
			if (data?.includes(keyDesc)) {
				req.push(parseInt(index));
			}
		}
		return req?.includes(type);
	};

	const checkRequired = (type, keyDesc) => {
		const req = [];
		for (const index in keys) {
			const data = keys[index]?.required;
			if (data?.includes(keyDesc)) {
				req.push(parseInt(index));
			}
		}
		return req?.includes(type);
	};
	const keyDescription = emailTypes?.keyDescription;
	const keys = emailTypes?.dynamicKeys;

	for (const keyDesc in keyDescription) {
		const data = {
			key: keyDesc,
			description: keyDescription?.[keyDesc],
			required: checkRequired(parseInt(type), keyDesc),
			optional: checkOptional(parseInt(type), keyDesc),
		};
		allOpt.push(data);
	}

	return allOpt.filter((option) => option.optional || option.required);
};

export const EMAIL_TEMPLATE_EVENT_TYPES = {
	WELCOME: 'welcome',
	FORGOT_PASSWORD: 'forgot_password',
	ACTIVE_USER: 'active_user',
	INACTIVE_USER: 'inactive_user',
	EMAIL_VERIFICATION: 'email_verification',
	RESET_PASSWORD: 'reset_password',
	KYC_REJECTED: 'kyc_rejected',
	KYC_REQUESTED: 'kyc_requested',
	KYC_REMINDER: 'kyc_reminder',
	KYC_RECEIVED: 'kyc_received',
	KYC_VERIFIED: 'kyc_verified',
	WITHDRAW_REQUEST_RECEIVED: 'withdraw_request_received',
	WITHDRAW_REQUEST_APPROVED: 'withdraw_request_approved',
	WITHDRAW_PROCESSED: 'withdraw_processed',
	DEPOSIT_SUCCESS: 'deposit_success',
	DEPOSIT_FAILED: 'deposit_failed',
	WELCOME: 'welcome',
	GAMBLING_REGISTRATION: 'gambling_registration',
	PASSWORD_UPDATED: 'password_updated',
	JOINING_BONUS: 'joining_bonus',
};
