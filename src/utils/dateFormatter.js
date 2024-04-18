import moment from 'moment';
import { dateTimeFormat, YMDFormat } from '../constants/config';

export const formatDateYMD = (date) =>
	date ? moment(date).format(YMDFormat) : date;

export const getDateTime = (dateTime) =>
	dateTime ? moment(dateTime).format(dateTimeFormat) : dateTime;
