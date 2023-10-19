/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import '../../assets/scss/custom/pages/_language-management.scss';
import { Tooltip } from 'reactstrap';

const Keys = (cell) => (cell.value ? cell.value : '');

const Action = (cell) => (cell.value ? cell.value : '');

const English = (cell) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);

	return cell.value ? (
		<>
			<div id={`text-${cell?.cell?.row?.id}`} className="english-text">
				{cell.value}
			</div>
			<Tooltip
				target={`text-${cell?.cell?.row?.id}`}
				toggle={toggle}
				isOpen={tooltipOpen}
			>
				{cell.value}
			</Tooltip>
		</>
	) : (
		''
	);
};

export { Action, Keys, English };
