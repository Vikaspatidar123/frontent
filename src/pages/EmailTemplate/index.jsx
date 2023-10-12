/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
	document.title = `Email Template | ${projectName}`;

	const { emailTemplateloading, emailTemplates } = useEmailTemplate();

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
						<Accordion key={key}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
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
