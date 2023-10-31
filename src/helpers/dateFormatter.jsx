export const formatDateYMD = (date) => {
	const d = new Date(date);
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [year, month, day].join('-');
};

const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const formatDateYMDAlt = (date) => {
	const d = new Date(date);
	const month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (day.length < 2) day = `0${day}`;

	return `${day} ${monthNames[month]},${year}`;
};

export const getDateTime = (dateTime) => {
	const d = new Date(dateTime);
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();
	let hours = d.getHours();
	let minutes = d.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours %= 12;
	hours = hours || 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	const time = `${hours}:${minutes} ${ampm}`;

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	const formatedDateTime = `${month}-${day}-${year} ${time}`;

	return formatedDateTime;
};
