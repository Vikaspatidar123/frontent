/* eslint-disable */
import React, { useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container, Collapse, CardBody, Card } from 'reactstrap';
import classnames from 'classnames';

import { projectName } from '../../constants/config';
import TableContainer from '../../components/Common/TableContainer';
import ActionButtons from './ActionButtons';
import useEmailTemplate from './hooks/useEmailTemplate';
import Spinners from '../../components/Common/Spinner';
import CrudSection from '../../components/Common/CrudSection';
import Modal from '../../components/Common/Modal';

import { EmailTemplateId, Label, Primary } from './EmailTemplateListCol';
import useCreateEmailTemplate from './hooks/useCreateEmailTemplate';

const EmailTemplate = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		emailTemplateloading,
		emailTemplates,
		handleEditClick,
		handleViewClick,
		handleDeleteClick,
		toggleView,
		isView,
		emailTemplate,
		isEmailTemplateLoading,
		customComponent,
	} = useEmailTemplate();
	const keyList = Object.keys(emailTemplates);
	const { buttonList } = useCreateEmailTemplate();
	const [expanded, setExpanded] = useState(keyList[0] || '');

	const handleChange = (panel) => () => {
		if (expanded === panel) {
			setExpanded('');
		} else {
			setExpanded(panel);
		}
	};

	const columns = useMemo(
		() => [
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
				Cell: ({ cell }) => (
					<ActionButtons
						cell={cell}
						handleEditClick={handleEditClick}
						handleViewClick={handleViewClick}
						handleDeleteClick={handleDeleteClick}
					/>
				),
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				<Card>
					<CardBody>
						<CrudSection
							buttonList={buttonList}
							title="Email Template Listing  "
						/>

						{emailTemplateloading ? (
							<Spinners
								color="primary"
								className="position-absolute top-50 start-50"
							/>
						) : (
							keyList?.map((key) => (
								<div
									className="accordion mb-2 left-accordion-arrow"
									id="accordion"
									key={key}
								>
									<div className="accordion-item border-0 bg-transparent">
										<h2
											className="accordion-header accordion-border-radius accordion-item"
											id={`heading${key}`}
										>
											<button
												className={classnames(
													'accordion-button',
													'fw-medium',
													'accordion-border-radius',
													'min-height',
													{
														collapsed: expanded !== key,
													}
												)}
												type="button"
												onClick={handleChange(key)}
												style={{ cursor: 'pointer' }}
											>
												<h5 className="font-size-14 mb-0 fw-bolder margin-left">
													{key}
												</h5>
											</button>
										</h2>
										<Collapse
											isOpen={expanded === key}
											className="accordion-collapse"
										>
											<div className="accordion-body accordion-body-padding">
												<TableContainer
													columns={columns}
													data={emailTemplates[key]}
													customPageSize={emailTemplates[key].count}
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
					</CardBody>
				</Card>
				<Modal
					openModal={isView}
					toggleModal={toggleView}
					headerTitle={emailTemplate?.label}
					children={customComponent}
					className="modal-dialog modal-lg"
					isLoading={isEmailTemplateLoading}
					hideFooter
				/>
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
