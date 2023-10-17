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

	const toggle = () => {
		if (modal) {
			setModal(false);
		} else {
			setModal(true);
		}
	};

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			language: (job && job.language) || '',
			categoryName: (job && job.categoryName) || '',
			status: (job && job.status) || false,
		},
		validationSchema: Yup.object({
			language: Yup.string().required('Please Select Valid Language'),
			categoryName: Yup.string().required('Please Enter Category Name'),
		}),
	});

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
							<CardBody className="border-bottom">
								<div className="d-flex align-items-center">
									<h5 className="mb-0 card-title flex-grow-1">
										Casino Category List
									</h5>
									<div className="flex-shrink-0">
										<Link
											to="#!"
											onClick={() => setModal(true)}
											className="btn btn-primary me-1"
										>
											Create
										</Link>
									</div>
								</div>
							</CardBody>
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
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle} tag="h4">
						{isEdit ? 'Edit Job' : 'Add Job'}
					</ModalHeader>
					<ModalBody>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								validation.handleSubmit();
								return false;
							}}
						>
							<Row>
								<Col className="col-12">
									<div className="mb-3">
										<CustomSelectField
											label="Select Language"
											name="language"
											type="select"
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											placeholder="Select Language"
											validate={{ required: { value: true } }}
											value={validation.values.language || ''}
											invalid={
												!!(
													validation.touched.language &&
													validation.errors.language
												)
											}
											isError
											errorMsg={
												validation.touched.language &&
												validation.errors.language
											}
											options={
												<>
													<option value={null}>Select Language</option>
													{languageData?.count &&
														languageData?.rows?.map(
															({ languageName, code, languageId }) => (
																<option key={code} value={languageId}>
																	{languageName}
																</option>
															)
														)}
												</>
											}
										/>
									</div>
									<div className="mb-3">
										<CustomInputField
											label="Category Name"
											name="categoryName"
											type="text"
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											placeholder="Enter Category Name"
											validate={{ required: { value: true } }}
											value={validation.values.categoryName || ''}
											invalid={
												!!(
													validation.touched.categoryName &&
													validation.errors.categoryName
												)
											}
											isError
											errorMsg={
												validation.touched.categoryName &&
												validation.errors.categoryName
											}
										/>
									</div>
									<div className="mb-3">
										<CustomSwitchButton
											labelClassName="form-check-label"
											label="Status"
											htmlFor="customRadioInline1"
											type="switch"
											id="customRadioInline1"
											name="status"
											checked={validation.values.status}
											inputClassName="form-check-input"
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
										/>
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="text-end">
										<button type="submit" className="btn btn-success save-user">
											Save
										</button>
									</div>
								</Col>
							</Row>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		</div>
	);
};

export default GetCasinoCategoryDetails;
