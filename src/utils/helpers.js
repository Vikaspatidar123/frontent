import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const showToastr = ({ type, message, title }) => {
	toastr.options = {
		positionClass: 'toast-top-right',
		timeOut: '4000',
		// extendedTimeOut,
		closeButton: true,
		// debug,
		progressBar: true,
		preventDuplicates: true,
		newestOnTop: true,
		// showEasing,
		// hideEasing,
		// showMethod,
		// hideMethod,
		// showDuration,
		// hideDuration
	};

	// setTimeout(() => toastr.success(`Settings updated `), 300)
	// Toaster Types
	if (type === 'info') toastr.info(message, title);
	else if (type === 'warning') toastr.warning(message, title);
	else if (type === 'error') toastr.error(message, title);
	else toastr.success(message, title);
};

const clearEmptyProperty = (payload = {}) =>
	Object.fromEntries(
		Object.entries(payload).filter(
			([, v]) => v != null || v !== undefined || v !== ''
		)
	);

const getDateDaysAgo = (days) => {
	const now = new Date();
	now.setDate(now.getDate() - days);
	return now;
};
const formatDateYMD = (date) => {
	const d = new Date(date);
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [year, month, day].join('-');
};

const downloadFileInSameWindow = (url) => {
	const element = document.createElement('a');
	element.setAttribute('href', url);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();
	document.body.removeChild(element);

	showToastr({ message: 'File downloaded successfully', type: 'success' });
};

const downloadFileInNewWindow = (url) => {
	const downloadWindow = window.open(
		url,
		'download-file',
		'width=700,height=700'
	);
	setTimeout(() => {
		downloadWindow.close();
		showToastr({ message: 'File downloaded successfully', type: 'success' });
	}, 4000);
};

export {
	safeStringify,
	showToastr,
	getDateDaysAgo,
	formatDateYMD,
	clearEmptyProperty,
	downloadFileInSameWindow,
	downloadFileInNewWindow,
};
