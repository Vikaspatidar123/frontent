/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { CustomSwitchButton } from '../../helpers/customForms';
import { selectedLanguage } from '../../constants/config';

const WageringTemplateId = ({ cell }) => cell.value ?? '';

const TemplateName = ({ cell }) => cell.value?.[selectedLanguage] ?? '';

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
		checked={!!selectedId?.find((sel) => sel.id === cell.row.original.id)}
		value={!!selectedId?.find((sel) => sel.id === cell.row.original.id)}
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
