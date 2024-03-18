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
	ACTIVE_USER: 'active_user',
	INACTIVE_USER: 'inactive_user',
	FORGOT_PASSWORD: 'forgot_password',
	RESET_PASSWORD: 'reset_password',
	EMAIL_VERIFICATION: 'email_verification',
	DOCUMENT_REJECTED: 'document_rejected',
	DOCUMENT_REMINDER: 'document_reminder',
	DOCUMENT_RECEIVED: 'document_received',
	DOCUMENT_VERIFIED: 'document_verified',
	DOCUMENT_REQUESTED: 'document_requested',
	KYC_ACTIVATED: 'kyc_activated',
	KYC_DEACTIVATED: 'kyc_deactivated',
	WITHDRAW_PROCESSED: 'withdraw_processed',
	WITHDRAW_REQUEST_RECEIVED: 'withdraw_request_received',
	WITHDRAW_REQUEST_APPROVED: 'withdraw_request_approved',
	DEPOSIT_FAILED: 'deposit_failed',
	DEPOSIT_SUCCESS: 'deposit_success',
	GAMBLING_REGISTRATION: 'gambling_registration',
	JOINING_BONUS: 'joining_bonus',
	PASSWORD_UPDATED: 'password_updated',
};
