/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';

import { Card, CardBody, Col, Container, Row, Collapse } from 'reactstrap';

import classnames from 'classnames';
import TableContainer from '../../components/Common/TableContainer';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
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

const KYCLabels = () => {
	// meta title
	document.title = projectName;

	const { formattedDocumentLabels, documentLabelsLoading } = useKYCLables();
	const [expanded, setExpanded] = useState('');

	const handleChange = (panel) => () => {
		if (expanded === panel) {
			setExpanded('');
		} else {
			setExpanded(panel);
		}
	};

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateKYCLabelsLoading,
		buttonList,
		onClickEditButton,
		isEditKYCLabelsLoading,
	} = useCreateKYCLabels();

	return (
		<div className="page-content">
			<Container fluid>
				{/* <Breadcrumbs title={t('Player')} breadcrumbItem={t('KYC Labels')} /> */}
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
										const { isRequired, languageData } = label[0];
										return (
											<div
												className="accordion mb-2 left-accordion-arrow"
												id="accordion"
												key={labelId}
											>
												<div className="accordion-item border-0 bg-transparent">
													<h2
														className="accordion-header accordion-border-radius accordion-item"
														id={`heading${labelId}`}
													>
														<button
															className={classnames(
																'accordion-button',
																'fw-medium',
																'accordion-border-radius',
																{ collapsed: expanded !== labelId }
															)}
															type="button"
															onClick={handleChange(labelId)}
															style={{ cursor: 'pointer' }}
														>
															<h5 className="font-size-14 d-inline-flex align-items-center gap-2 mb-0 fw-bolder margin-left">
																Label {labelId}
																{isRequired ? (
																	<span className="text-success">
																		(Required)
																	</span>
																) : (
																	<span className="text-danger">
																		(Not Required)
																	</span>
																)}{' '}
																<EditButton
																	handleClick={onClickEditButton}
																	label={label?.[0]}
																/>
															</h5>
														</button>
													</h2>

													<Collapse
														isOpen={expanded === labelId}
														className="accordion-collapse"
													>
														<div className="accordion-body accordion-body-padding">
															<TableContainer
																columns={columns}
																data={languageData}
																customPageSize={10}
																tableClass="table-bordered align-middle nowrap mt-2"
																theadClass="col-6"
																paginationDiv="justify-content-center"
																pagination="pagination justify-content-start pagination-rounded"
																isLoading={documentLabelsLoading}
																thCustomClass="col-6"
															/>
														</div>
													</Collapse>
												</div>
											</div>
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
									isSubmitLoading={
										isCreateKYCLabelsLoading || isEditKYCLabelsLoading
									}
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
	// t: PropTypes.func,
};

KYCLabels.defaultProps = {
	t: (string) => string,
};

export default KYCLabels;
