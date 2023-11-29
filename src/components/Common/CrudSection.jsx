import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from './Hooks/usePermission';

const CrudSection = ({ title, buttonList }) => {
	const { isGranted } = usePermission();
	return (
		<CardBody className="border-bottom">
			<div className="d-flex align-items-center">
				<h5 className="mb-0 card-title flex-grow-1">{title}</h5>
				<div className="flex-shrink-0">
					{buttonList.map(
						({
							link,
							handleClick,
							label,
							module,
							operation,
							tooltip,
							icon,
						}) => (
							<Fragment key={link}>
								<Link
									key={link}
									hidden={module && operation && !isGranted(module, operation)}
									to={link}
									onClick={handleClick}
									className={`btn btn-primary me-1 ${
										icon ? 'icon-button-padding' : ''
									}`}
									id={`id-${label}`}
								>
									{label}
									{icon}
								</Link>
								{tooltip && (
									<UncontrolledTooltip placement="top" target={`id-${label}`}>
										{tooltip}
									</UncontrolledTooltip>
								)}
							</Fragment>
						)
					)}
				</div>
			</div>
		</CardBody>
	);
};

CrudSection.propTypes = {
	title: PropTypes.string.isRequired,
	buttonList: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			handleClick: PropTypes.func,
			link: PropTypes.string,
			module: PropTypes.string,
			operation: PropTypes.string,
		})
	).isRequired,
};

export default CrudSection;
