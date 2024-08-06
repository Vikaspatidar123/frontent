/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import { isNaN } from 'lodash';
import moment from 'moment';
import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const safeStringify = (object) => object;
// JSON.stringify(object)?.replace(/</g, '\\u003c');

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
		// showToastr({ message: 'File downloaded successfully', type: 'success' });
	}, 4000);
};

const dataURLtoBlob = (dataURL) => {
	const byteString = atob(dataURL.split(',')[1]);
	const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

	const arrayBuffer = new ArrayBuffer(byteString.length);
	const intArray = new Uint8Array(arrayBuffer);

	for (let i = 0; i < byteString.length; i += 1) {
		intArray[i] = byteString.charCodeAt(i);
	}

	return new Blob([arrayBuffer], { type: mimeString });
};

const getPercentage = (current = 0, previous = 0) => {
	current = Number(current || 0);
	previous = Number(previous || 0);
	if (previous == 0 && current > 0) return 100.0;
	const percentage = ((current - previous) / (previous || 1)) * 100;
	return percentage?.toFixed(2);
};

export const percentageFormulaText = (numerator, denominator) => (
	<div style={{ textAlign: 'center' }}>
		<div>
			{numerator} - {denominator}
		</div>
		<div style={{ position: 'relative', marginTop: '5px' }}>
			<div
				style={{
					borderBottom: '1px solid',
					width: '82%',
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)',
				}}
			/>
			<div style={{ marginTop: '-10px', position: 'relative' }}>
				<div style={{ paddingLeft: '150px' }}> * 100 </div>
			</div>
		</div>
		<div>{denominator}</div>
	</div>
);

export const DATE_OPTIONS = {
	today: 'Today',
	yesterday: 'Yesterday',
	last7days: 'Last 7 Days',
	last30days: 'Last 30 Days',
	last90days: 'Last 90 Days',
	custom: 'Custom',
};

// eslint-disable-next-line default-param-last
export const getDashboardFilterText = (dateOption, from, to, currencyName) => {
	switch (dateOption) {
		case 'today':
		case 'yesterday':
		case 'last7days':
		case 'last30days':
		case 'last90days':
			return (
				<p className="pt-2 m-0">
					Showing results of <b>{DATE_OPTIONS[dateOption]}</b>
				</p>
			);

		case 'custom': {
			if (from && to)
				return (
					<p className="pt-2 m-0">
						Showing results from <b>{moment(from).format('Do MMMM YYYY')} </b>{' '}
						to <b>{moment(to).format('Do MMMM YYYY')}</b>
					</p>
				);
			return '';
		}
		default:
			if (currencyName) {
				return (
					<p className="pt-2 m-0">
						Showing results of <b>{currencyName}</b>
					</p>
				);
			}
			return '';
	}
};

const capitalizeString = (str) => {
	if (!str) return '';

	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const addCommasToNumber = (value) => {
	const val = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(val)) {
		return 0;
	}
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatInKMB = (value) => {
	const num = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(num)) {
		return 0;
	}

	const thresholds = [
		{ limit: 1e9, suffix: 'B' }, // Billion
		{ limit: 1e6, suffix: 'M' }, // Million
		{ limit: 1e3, suffix: 'K' }, // Thousand
	];

	for (const { limit, suffix } of thresholds) {
		if (num >= limit) {
			return (num / limit).toFixed(0) + suffix;
		}
	}

	return num.toString();
};

export {
	safeStringify,
	showToastr,
	downloadFileInSameWindow,
	downloadFileInNewWindow,
	dataURLtoBlob,
	getPercentage,
	capitalizeString,
	addCommasToNumber,
	formatInKMB,
};
