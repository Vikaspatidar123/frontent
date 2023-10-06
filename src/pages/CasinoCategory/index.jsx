/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TableContainer from '../../components/Common/TableContainer';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import {
	getCasinoCategoryDetailStart,
	getLanguagesStart,
} from '../../store/actions';
import {
	CustomInputField,
	CustomSwitchButton,
	CustomSelectField,
} from '../../helpers/custom_forms';
import CasinoCategoryColumn from './CasinoCategoryColumn';

const GetCasinoCategoryDetails = () => {
	document.title =
		'Casino Category | Skote - Vite React Admin & Dashboard Template';

	const { getCasinoCategoryDetails, loading, getLanguageData } = useSelector(
		(state) => state.getCasinoCategory
	);
	const [isLoading, setLoading] = useState(loading);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const dispatch = useDispatch();

	const toggle = () => {
		if (modal) {
			setModal(false);
		} else {
			setModal(true);
		}
	};

	useEffect(() => {
		dispatch(
			getCasinoCategoryDetailStart({
				limit,
				pageNo: page,
				search,
			})
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	}, []);

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
		onSubmit: (values) => {
			console.log('values1213: ', values);
			if (isEdit) {
				const updateJobList = {
					language: values.language,
					categoryName: values.categoryName,
					status: values.status,
				};
				console.log('updateJobList: ', updateJobList);
				// update Job
				// dispatch(onUpdateJobList(updateJobList));
				validation.resetForm();
			} else {
				const newJobList = {
					language: values.language,
					categoryName: values.categoryName,
					status: values.status,
				};
				console.log('newJobList: ', newJobList);
				// save new Job
				// dispatch(onAddNewJobList(newJobList));
				validation.resetForm();
			}
			toggle();
		},
	});

	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			Header: 'ID',
	// 			accessor: 'gameCategoryId',
	// 			filterable: true,
	// 			Cell: (cellProps) => {
	// 				console.log('cellProps: ', cellProps);
	// 				return <GameCategoryId {...cellProps} />;
	// 			},
	// 		},
	// 		{
	// 			Header: 'NAME',
	// 			accessor: 'email',
	// 			filterable: true,
	// 			Cell: (cellProps) => {
	// 				console.log('cellProps: ', cellProps);
	// 				return <Email {...cellProps} />;
	// 			},
	// 		},
	// 		{
	// 			Header: 'CREATED AT',
	// 			accessor: 'createdAt',
	// 			filterable: true,
	// 			Cell: (cellProps) => (
	// 				<CreatedAt {...cellProps} />
	// 			),
	// 		},
	// 		{
	// 			Header: 'UPDATED AT',
	// 			accessor: 'updatedAt',
	// 			filterable: true,
	// 			Cell: (cellProps) => <UpdatedAt {...cellProps} />,
	// 		},
	// 		{
	// 			Header: 'STATUS',
	// 			accessor: 'isActive',
	// 			filterable: true,
	// 			Cell: (cellProps) => <IsActive {...cellProps} />,
	// 		},
	// 		{
	// 			Header: 'Action',
	// 			accessor: 'action',
	// 			disableFilters: true,
	// 			Cell: (cellProps) => (
	// 				<ul className="list-unstyled hstack gap-1 mb-0">
	// 					<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
	// 						<Link to="#" className="btn btn-sm btn-soft-primary">
	// 							<i className="mdi mdi-eye-outline" id="viewtooltip" />
	// 						</Link>
	// 					</li>
	// 					<UncontrolledTooltip placement="top" target="viewtooltip">
	// 						View
	// 					</UncontrolledTooltip>

	// 					<li>
	// 						<Link
	// 							to="#"
	// 							className="btn btn-sm btn-soft-info"
	// 							onClick={() => {
	// 								// const jobData = cellProps.row.original;
	// 								// handleJobClick(jobData);
	// 							}}
	// 						>
	// 							<i className="mdi mdi-pencil-outline" id="edittooltip" />
	// 							<UncontrolledTooltip placement="top" target="edittooltip">
	// 								Edit
	// 							</UncontrolledTooltip>
	// 						</Link>
	// 					</li>

	// 					<li>
	// 						<Link
	// 							to="#"
	// 							className="btn btn-sm btn-soft-danger"
	// 							onClick={() => {
	// 								// const jobData = cellProps.row.original;
	// 								// onClickDelete(jobData);
	// 							}}
	// 						>
	// 							<i className="mdi mdi-delete-outline" id="deletetooltip" />
	// 							<UncontrolledTooltip placement="top" target="deletetooltip">
	// 								Delete
	// 							</UncontrolledTooltip>
	// 						</Link>
	// 					</li>
	// 				</ul>
	// 			),
	// 		},
	// 	],
	// 	[]
	// );

	return (
		<div className="page-content">
			<div className="container-fluid">
				<Breadcrumbs title="Jobs" breadcrumbItem="Casino Category" />
				{isLoading ? (
					<Spinners setLoading={setLoading} />
				) : (
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
										data={getCasinoCategoryDetails?.rows}
										isGlobalFilter
										isAddOptions={false}
										isPagination
										iscustomPageSizeOptions
										isShowingPageLength
										customPageSize={5}
										tableClass="table-bordered align-middle nowrap mt-2"
										paginationDiv="col-sm-12 col-md-7"
										pagination="pagination justify-content-end pagination-rounded"
									/>
								</CardBody>
							</Card>
						</Col>
					</Row>
				)}
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
													{getLanguageData?.count &&
														getLanguageData?.rows?.map(
															({ languageName, code, languageId }) => {
																console.log(
																	'languageName: ',
																	languageName,
																	code
																);
																return (
																	<option key={code} value={languageId}>
																		{languageName}
																	</option>
																);
															}
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
