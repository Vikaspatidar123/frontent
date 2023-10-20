/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container, Collapse } from 'reactstrap';
import classnames from 'classnames';

import { projectName } from '../../constants/config';
import TableContainer from '../../components/Common/TableContainer';
import ActionButtons from './ActionButtons';
import useEmailTemplate from './hooks/useEmailTemplate';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';

import { EmailTemplateId, Label, Primary } from './EmailTemplateListCol';

const columns = [
	{
		Header: 'ID',
		accessor: 'emailTemplateId',
		filterable: true,
		Cell: ({ cell }) => <EmailTemplateId cell={cell} />,
	},
	{
		Header: 'LABEL',
		accessor: 'label',
		filterable: true,
		Cell: ({ cell }) => <Label cell={cell} />,
	},
	{
		Header: 'PRIMARY',
		accessor: 'isPrimary',
		filterable: true,
		Cell: ({ cell }) => <Primary cell={cell} />,
	},
	{
		Header: 'ACTION',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const EmailTemplate = ({ t }) => {
	// meta title
	document.title = projectName;

	const { emailTemplateloading, emailTemplates } = useEmailTemplate();
	const [expanded, setExpanded] = useState('');

	const handleChange = (panel) => () => {
		if (expanded === panel) {
			setExpanded('');
		} else {
			setExpanded(panel);
		}
	};

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Content Management')}
					breadcrumbItem={t('Email Template')}
				/>
				{emailTemplateloading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					Object.keys(emailTemplates).map((key) => (
						<div className="accordion" id="accordion" key={key}>
							<div className="accordion-item">
								<h2 className="accordion-header" id={`heading${key}`}>
									<button
										className={classnames('accordion-button', 'fw-medium', {
											collapsed: expanded !== key,
										})}
										type="button"
										onClick={handleChange(key)}
										style={{ cursor: 'pointer' }}
									>
										<h5 className="font-size-14">{key}</h5>
									</button>
								</h2>

								<Collapse
									isOpen={expanded === key}
									className="accordion-collapse"
								>
									<div className="accordion-body">
										<TableContainer
											columns={columns}
											data={emailTemplates[key]}
											customPageSize={1}
											tableClass="table-bordered align-middle nowrap mt-2"
											paginationDiv="justify-content-center"
											pagination="pagination justify-content-start pagination-rounded"
											isLoading={emailTemplateloading}
											thCustomClass="col-3"
										/>
									</div>
								</Collapse>
							</div>
						</div>
					))
				)}
			</Container>
		</div>
	);
};

EmailTemplate.propTypes = {
	t: PropTypes.func,
};

EmailTemplate.defaultProps = {
	t: (string) => string,
};

export default EmailTemplate;
