import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import usePermission from './Hooks/usePermission';

const CrudSection = ({ title, buttonList, exportComponent }) => {
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
				<div className="flex-shrink-0">
					{exportComponent?.map(({ label, tooltip, icon, data }) => (
						<>
							<CSVLink
								data={data || []}
								filename="downloaded_data.csv"
								className="btn btn-primary me-1 icon-button-padding"
								id={`id-${label}`}
							>
								{icon}
							</CSVLink>

							{tooltip && (
								<UncontrolledTooltip placement="top" target={`id-${label}`}>
									{tooltip}
								</UncontrolledTooltip>
							)}
						</>
					))}
				</div>
			</div>
		</CardBody>
	);
};

CrudSection.defaultProps = {
	exportComponent: [],
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
			tooltip: PropTypes.string,
			icon: PropTypes.element,
			isDownload: PropTypes.bool,
			data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
		})
	).isRequired,
	exportComponent: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			tooltip: PropTypes.string,
			icon: PropTypes.element,
			data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
		})
	),
};

export default CrudSection;
