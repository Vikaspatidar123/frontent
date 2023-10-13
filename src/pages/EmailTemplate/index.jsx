/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '../../components/Common/Accordion';

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
	const [expanded, setExpanded] = React.useState('');

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
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
						<Accordion
							key={key}
							expanded={expanded === key}
							onChange={handleChange(key)}
						>
							<AccordionSummary
								aria-controls="panel1d-content"
								id="panel1d-header"
							>
								<Typography>{key}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
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
								</Typography>
							</AccordionDetails>
						</Accordion>
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
