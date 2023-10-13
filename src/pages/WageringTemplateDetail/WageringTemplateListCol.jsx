import PropTypes from 'prop-types';

const WageringTemplateId = ({ cell }) => cell.value ?? '';

const TemplateName = ({ cell }) => cell.value ?? '';

WageringTemplateId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

export { WageringTemplateId, TemplateName };
