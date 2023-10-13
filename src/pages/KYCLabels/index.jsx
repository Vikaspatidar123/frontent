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
import Box from '@mui/material/Box';

import TableContainer from '../../components/Common/TableContainer';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';

import useKYCLables from './hooks/useKYCLabels';
import { Language, LabelName } from './KYCLabelListCol';
import EditButton from './EditButton';
import { projectName } from '../../constants/config';

const columns = [
	{
		Header: 'LANGUAGE',
		accessor: 'language',
		filterable: true,
		Cell: ({ cell }) => <Language cell={cell} />,
	},
	{
		Header: 'LABEL NAME',
		accessor: 'labelName',
		filterable: true,
		Cell: ({ cell }) => <LabelName cell={cell} />,
	},
];

const KYCLabels = ({ t }) => {
	// meta title
	document.title = `KYC Labels | ${projectName}`;

	const { formattedDocumentLabels, documentLabelsLoading } = useKYCLables();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Player')} breadcrumbItem={t('KYC Labels')} />
				{documentLabelsLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					formattedDocumentLabels?.map((label) => {
						console.log('label: ', label[0].documentLabelId);
						return (
							<Accordion key={label[0].documentLabelId}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>
										<Box
											display="inline-flex"
											alignItems="center "
											gap={1.5}
										>
											Label {label[0].documentLabelId}
											{label[0].isRequired ? (
												<span className="text-success">(Required)</span>
											) : (
												<span className="text-danger">(Not Required)</span>
											)}{' '}
											<EditButton />
										</Box>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										<TableContainer
											columns={columns}
											data={label}
											customPageSize={1}
											tableClass="table-bordered align-middle nowrap mt-2"
											theadClass="col-6"
											paginationDiv="justify-content-center"
											pagination="pagination justify-content-start pagination-rounded"
											isLoading={documentLabelsLoading}
											thCustomClass="col-6"
										/>
									</Typography>
								</AccordionDetails>
							</Accordion>
						);
					})
				)}
			</Container>
		</div>
	);
};

KYCLabels.propTypes = {
	t: PropTypes.func,
};

KYCLabels.defaultProps = {
	t: (string) => string,
};

export default KYCLabels;
