/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Box from '@mui/material/Box';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '../../components/Common/Accordion';

import TableContainer from '../../components/Common/TableContainer';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';

import useKYCLables from './hooks/useKYCLabels';
import { Language, LabelName } from './KYCLabelListCol';
import EditButton from './EditButton';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import FormModal from '../../components/Common/FormModal';
import useCreateKYCLabels from './hooks/useCreateKYCLabels';

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
	document.title = projectName;

	const { formattedDocumentLabels, documentLabelsLoading } = useKYCLables();
	const [expanded, setExpanded] = React.useState('');

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateKYCLabelsLoading,
		buttonList,
	} = useCreateKYCLabels();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Player')} breadcrumbItem={t('KYC Labels')} />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="KYC Labels Listing" />
							<CardBody>
								{documentLabelsLoading ? (
									<Spinners
										color="primary"
										className="position-absolute top-50 start-50"
									/>
								) : (
									formattedDocumentLabels?.map((label) => {
										const labelId = label[0].documentLabelId;
										const { isRequired } = label[0];
										return (
											<Accordion
												key={labelId}
												expanded={expanded === labelId}
												onChange={handleChange(labelId)}
											>
												<AccordionSummary
													aria-controls="panel1a-content"
													id="panel1a-header"
												>
													<Typography>
														<Box
															display="inline-flex"
															alignItems="center "
															gap={1.5}
														>
															Label {labelId}
															{isRequired ? (
																<span className="text-success">(Required)</span>
															) : (
																<span className="text-danger">
																	(Not Required)
																</span>
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
								<FormModal
									isOpen={isOpen}
									toggle={() => setIsOpen((prev) => !prev)}
									header={header}
									validation={validation}
									formFields={formFields}
									submitLabel="Submit"
									customColClasses="col-md-12"
									isSubmitLoading={isCreateKYCLabelsLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
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
