const API_NAMESPACE = '/api/v2';
const MANAGEMENT = {
	CASINO: '/casino-management/',
	CONTENT: '/content-management/',
	SETTINGS: '/settings/',
	LANGUAGE: '/language/',
	SPORTS: '/sports/',
	ADMIN: '/admin/',
	COUNTRY: '/country/',
	REPORT: '/report/',
};

const METHODS = {
	get: 'GET',
	post: 'POST',
	put: 'PUT',
	delete: 'DELETE',
};

const filterEmptyPayload = (payload) => {
	const updatedPayload = {};
	Object.keys(payload || {}).forEach((key) => {
		if (
			!(
				payload[key] === null ||
				payload[key] === undefined ||
				payload[key] === ''
			)
		) {
			updatedPayload[key] = payload[key];
		}
	});
	return updatedPayload;
};

export { API_NAMESPACE, METHODS, filterEmptyPayload, MANAGEMENT };
