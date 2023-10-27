/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Container, Row } from 'reactstrap';
// import TableContainer from '../../components/Common/TableContainer';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import useCreateWageringTemplate from './hooks/useCreateWagringTemplate';
import FormPage from '../../components/Common/FormPage';

const CreateWageringTemplate = ({ t }) => {
	// Set meta title
	document.title = projectName;
	// Fetch CMS page data and manage pagination state

	const { validation, leftFormFields, rightFormFields, customComponent } =
		useCreateWageringTemplate();

	// const {
	// 	toggleAdvance,
	// 	isAdvanceOpen,
	// 	filterFields,
	// 	actionButtons,
	// 	filterValidation,
	// } = useFilters();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Wagering Template List')}
					breadcrumbItem={t('wagering Template')}
				/>
				<Row>
					<Col lg="12">
						{/* <Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
								/>

								<TableContainer
									columns={columns}
									data={wageringTemplateDetail?.rows || []}
									isAddOptions={false}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalwageringTemplateDetailCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={wageringTemplateDetailLoading}
									isGlobalFilter
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/> */}

						<FormPage
							formTitle="Create Wagering Template"
							validation={validation}
							leftFormFields={leftFormFields}
							rightFormFields={rightFormFields}
							customComponent={customComponent}
							submitLabel="Submit"
							customColClasses=""
							isSubmitLoading={false}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

CreateWageringTemplate.propTypes = {
	t: PropTypes.func,
};

CreateWageringTemplate.defaultProps = {
	t: (string) => string,
};

export default CreateWageringTemplate;
