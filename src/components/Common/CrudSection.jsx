import React from 'react';
import { Link } from 'react-router-dom';
import { CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const CrudSection = ({ title, buttonList }) => (
	<CardBody className="border-bottom">
		<div className="d-flex align-items-center">
			<h5 className="mb-0 card-title flex-grow-1">{title}</h5>
			<div className="flex-shrink-0">
				{buttonList.map(({ link, handleClick, label }) => (
					<Link
						to={link}
						onClick={handleClick}
						className="btn btn-primary me-1"
					>
						{label}
					</Link>
				))}
			</div>
		</div>
	</CardBody>
);

CrudSection.propTypes = {
	title: PropTypes.string.isRequired,
	buttonList: PropTypes.arrayOf.isRequired,
};

export default CrudSection;
