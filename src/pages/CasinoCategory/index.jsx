/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Col,
	Row,
	Card,
	CardBody,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
} from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { projectName } from '../../constants/config';
import {
	CustomInputField,
	CustomSwitchButton,
	CustomSelectField,
} from '../../helpers/customForms';
import CasinoCategoryColumn from './CasinoCategoryColumn';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCasinoCategoryListing from './hooks/useCasinoCategoryListing';
import CrudSection from '../../components/Common/CrudSection';
import FormModal from '../../components/Common/FormModal';
import useCreateCategory from './hooks/useCreateCategory';

const GetCasinoCategoryDetails = () => {
	document.title = projectName;

	const {
		formattedCasinoCategoriesData,
		iscasinoCategoryDetailsLoading,
		languageData,
		page,
		setPage,
		itemsPerPage,
		totalCasinoCategriesCount,
		modal,
		setModal,
		isEdit,
		job,
	} = useCasinoCategoryListing();

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateCategoryLoading,
		buttonList,
	} = useCreateCategory();

	return (
		<div className="page-content">
			<div className="container-fluid">
				<Breadcrumbs
					title="Casino Management"
					breadcrumbItem="Casino Category"
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Category Listing" />
							<CardBody>
								<TableContainer
									columns={CasinoCategoryColumn}
									data={formattedCasinoCategoriesData}
									isLoading={!iscasinoCategoryDetailsLoading}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCasinoCategriesCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
								/>
								<FormModal
									isOpen={isOpen}
									toggle={() => setIsOpen((prev) => !prev)}
									header={header}
									validation={validation}
									formFields={formFields}
									submitLabel="Submit"
									customColClasses="col-md-12"
									isSubmitLoading={isCreateCategoryLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default GetCasinoCategoryDetails;
