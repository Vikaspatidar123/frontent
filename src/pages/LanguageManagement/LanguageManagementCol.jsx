/* eslint-disable react/destructuring-assignment */
import { Tooltip } from '@mui/material';
import React from 'react';
import '../../assets/scss/custom/pages/_language-management.scss';

const Keys = (cell) => (cell.value ? cell.value : '');

const Action = (cell) => (cell.value ? cell.value : '');

const English = (cell) =>
	cell.value ? (
		<Tooltip title={cell.value}>
			<div className="english-text">{cell.value}</div>
		</Tooltip>
	) : (
		''
	);

export { Action, Keys, English };
