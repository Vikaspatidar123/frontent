import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, BreadcrumbItem } from 'reactstrap';

const Breadcrumb = ({
	titleLink,
	itemLink,
	title,
	breadcrumbItem,
	leftTitle,
	showRightInfo = true,
}) => {
	const navigate = useNavigate();
	return (
		<Row>
			<Col xs="12">
				<div className="page-title-box d-flex align-items-center justify-content-between">
					<h4
						className="mb-0 ms-2 font-size-18"
						role="presentation"
						style={{ cursor: `${titleLink ? 'pointer' : ''}` }}
						onClick={titleLink ? () => navigate(titleLink) : null}
					>
						{leftTitle || breadcrumbItem}
					</h4>
					{showRightInfo && (
						<div className="page-title-right">
							<ol className="breadcrumb m-0">
								<BreadcrumbItem>
									<Link to={titleLink || '#'}>{title}</Link>
								</BreadcrumbItem>
								<BreadcrumbItem active>
									<Link to={itemLink || '#'}>{breadcrumbItem}</Link>
								</BreadcrumbItem>
							</ol>
						</div>
					)}
				</div>
			</Col>
		</Row>
	);
};

Breadcrumb.defaultProps = {
	titleLink: '',
	itemLink: '',
	leftTitle: '',
	showRightInfo: true,
};

Breadcrumb.propTypes = {
	breadcrumbItem: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	titleLink: PropTypes.string,
	itemLink: PropTypes.string,
	leftTitle: PropTypes.string,
	showRightInfo: PropTypes.bool,
};

export default Breadcrumb;
