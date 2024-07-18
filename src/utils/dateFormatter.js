import moment from 'moment';
import {
	dateTimeFormat,
	dateTimeFormatWithA,
	YMDFormat,
} from '../constants/config';

export const formatDateYMD = (date) =>
	date ? moment(date).format(YMDFormat) : date;

export const getDateTimeWithAMPM = (dateTime) =>
	dateTime ? moment(dateTime).format(dateTimeFormatWithA) : dateTime;

export const getDateTime = (dateTime) =>
	dateTime ? moment(dateTime).format(dateTimeFormat) : dateTime;
