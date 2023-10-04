import { get } from './api_helper';
import * as url from './url_helper';

// Fetch Countries
// eslint-disable-next-line import/prefer-default-export
export const fetchCountriesApi = (data) =>
	get(url.FETCH_COUNTRIES, { params: data });
