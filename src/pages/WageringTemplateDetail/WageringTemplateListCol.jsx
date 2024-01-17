/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { CustomSwitchButton } from '../../helpers/customForms';

const WageringTemplateId = ({ cell }) => cell.value ?? '';

const TemplateName = ({ cell }) => cell.value ?? '';

const RTP = ({ cell }) => `${cell?.value} %`;

const WageringContribution = ({ cell }) =>
	`${cell?.value ? cell?.value : 100} %`;

const CustomValues = ({ cell }) => `${cell?.value} %`;

const Select = ({ cell, handleChange, selectedId }) => (
	<CustomSwitchButton
		labelClassName="form-check-label"
		htmlFor="customRadioInline1"
		type="switch"
		id="customRadioInline1"
		name="select"
		inputClassName="form-check-input"
		checked={
			!!selectedId?.find(
				(id) => id.casinoGameId === cell.row.original.casinoGameId
			)
		}
		value={
			!!selectedId?.find(
				(id) => id.casinoGameId === cell.row.original.casinoGameId
			)
		}
		onClick={(e) => handleChange(e, cell)}
	/>
);

WageringTemplateId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

export {
	WageringTemplateId,
	TemplateName,
	RTP,
	WageringContribution,
	CustomValues,
	Select,
};
