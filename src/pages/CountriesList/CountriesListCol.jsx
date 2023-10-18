/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';

const Id = (cell) => (cell.value ? cell.value : '');

const CountryName = (cell) => (cell.value ? cell.value : '');

const CountryCode = (cell) => (cell.value ? cell.value : '');

const Language = (cell) => (cell.value ? cell.value : '');

const Status = (cell) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

const Icon = (cell) =>
	cell.value ? <img alt="sidebar_bg_image" width="20" src={cell.value} /> : '-';

const Actions = () => <i className="dripicons-dots-3" />;

export { Id, CountryName, Icon, Status, Actions, CountryCode, Language };
