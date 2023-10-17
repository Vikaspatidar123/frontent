/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
// import { Buffer } from 'buffer';
// import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
// import useAdminListing from './hooks/useAdminListing';

import { projectName } from '../../constants/config';
import FormModal from '../../components/Common/FormModal';
// import {
// 	staticFormFields,
// 	getInitialValues,
// 	validationSchema,
// 	permissionLabel,
// } from './formDetails';
// import { getRolesStart } from '../../store/auth/roles/actions';
// import PermissionForm from './permissionForm';
// import { getAllGroupsStart } from '../../store/adminUser/actions';
// import { showToastr } from '../../store/toastr/actions';
// import {
// 	addSuperAdminUserStart,
// 	updateSuperAdminUserStart,
// } from '../../store/actions';
// import { getPermissionsStart } from '../../store/auth/permissionDetails/actions';
// import useForm from '../../components/Common/Hooks/useFormModal';
// import {
// 	resetLinearProgress,
// 	showLinearProgress,
// } from '../../store/progressLoading/actions';
import CrudSection from '../../components/Common/CrudSection';
import useActions from './hooks/useActions';
// import { showToastr } from '../../store/toastr/actions';

// const columns =

const Admins = ({ t }) => {
	// meta title
	document.title = projectName;

	const { isAddSuperUserLoading } = useSelector((state) => state.AllAdmins);

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		customComponent,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		formattedAdminDetails,
		buttonList,
	} = useActions();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboard')} breadcrumbItem={t('Staff')} />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Staff Listing" />
							<CardBody>
								<TableContainer
									columns={columns || []}
									data={formattedAdminDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalAdminsCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
									// isAddOptions
									// addOptionLabel="Create"
									// handleAddClick={handleAddClick}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<FormModal
				isOpen={isOpen}
				toggle={() => setIsOpen((prev) => !prev)}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Save"
				customColClasses="col-md-12"
				customComponent={customComponent}
				isSubmitLoading={isAddSuperUserLoading}
			/>
		</div>
	);
};

Admins.propTypes = {
	t: PropTypes.func,
};

Admins.defaultProps = {
	t: (string) => string,
};

export default Admins;
