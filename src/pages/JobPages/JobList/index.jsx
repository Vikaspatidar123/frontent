/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import {
	Col,
	Row,
	UncontrolledTooltip,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Input,
	FormFeedback,
	Label,
	Card,
	CardBody,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import TableContainer from '../../../components/Common/TableContainer';

// import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DeleteModal from '../../../components/Common/DeleteModal';

import {
	getJobList as onGetJobList,
	addNewJobList as onAddNewJobList,
	updateJobList as onUpdateJobList,
	deleteJobList as onDeleteJobList,
} from '../../../store/actions';

import {
	JobNo,
	JobTitle,
	CompanyName,
	Location,
	Experience,
	Position,
	Type,
	PostedDate,
	LastDate,
	Status,
} from './JobListCol';

// redux

import Spinners from '../../../components/Common/Spinner';
import { projectName } from '../../../constants/config';

const JobList = () => {
	// meta title
	document.title = projectName;

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [jobsList, setJobsList] = useState([]);
	const [job, setJob] = useState(null);
	const dispatch = useDispatch();

	// validation
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			jobId: (job && job.jobId) || '',
			jobTitle: (job && job.jobTitle) || '',
			companyName: (job && job.companyName) || '',
			location: (job && job.location) || '',
			experience: (job && job.experience) || '',
			position: (job && job.position) || '',
			type: (job && job.type) || 'Full Time',
			status: (job && job.status) || 'Active',
		},
		validationSchema: Yup.object({
			jobId: Yup.string()
				.required('Please Enter Valid Job Id')
				.required('Please Enter Your Job Id'),
			jobTitle: Yup.string().required('Please Enter Your Job Title'),
			companyName: Yup.string().required('Please Enter Your Company Name'),
			location: Yup.string().required('Please Enter Your Location'),
			experience: Yup.string().required('Please Enter Your Experience'),
			position: Yup.string().required('Please Enter Your Position'),
			type: Yup.string().required('Please Enter Your Type'),
			status: Yup.string().required('Please Enter Your Status'),
		}),
		onSubmit: (values) => {
			if (isEdit) {
				const updateJobList = {
					id: job ? job.id : 0,
					jobId: values.jobId,
					jobTitle: values.jobTitle,
					companyName: values.companyName,
					location: values.location,
					experience: values.experience,
					position: values.position,
					type: values.type,
					postedDate: '02 June 2021',
					lastDate: '25 June 2021',
					status: values.status,
				};
				// update Job
				dispatch(onUpdateJobList(updateJobList));
				validation.resetForm();
			} else {
				const newJobList = {
					id: Math.floor(Math.random() * (30 - 20)) + 20,
					jobId: values.jobId,
					jobTitle: values.jobTitle,
					companyName: values.companyName,
					location: values.location,
					experience: values.experience,
					position: values.position,
					type: values.type,
					postedDate: '02 June 2021',
					lastDate: '25 June 2021',
					status: values.status,
				};
				// save new Job
				dispatch(onAddNewJobList(newJobList));
				validation.resetForm();
			}
			toggle();
		},
	});

	const selectJobsState = (state) => state.JobReducer;
	const JobsJobsProperties = createSelector(selectJobsState, (jobReducer) => ({
		jobs: jobReducer.jobs,
		loading: jobReducer.loading,
	}));

	const { jobs, loading } = useSelector(JobsJobsProperties);
	const [isLoading, setLoading] = useState(loading);

	useEffect(() => {
		if (jobs && !jobs.length) {
			dispatch(onGetJobList());
		}
	}, [dispatch, jobs]);

	useEffect(() => {
		setJobsList(jobs);
	}, [jobs]);

	useEffect(() => {
		if (!isEmpty(jobs) && !!isEdit) {
			setJobsList(jobs);
			setIsEdit(false);
		}
	}, [jobs]);

	const toggle = () => {
		if (modal) {
			setModal(false);
			setJob(null);
		} else {
			setModal(true);
		}
	};

	const handleJobClick = (arg) => {
		const job = arg;
		setJob({
			id: job.id,
			jobId: job.jobId,
			jobTitle: job.jobTitle,
			companyName: job.companyName,
			location: job.location,
			experience: job.experience,
			position: job.position,
			type: job.type,
			status: job.status,
		});

		setIsEdit(true);

		toggle();
	};

	// delete Job
	const [deleteModal, setDeleteModal] = useState(false);

	const onClickDelete = (job) => {
		setJob(job);
		setDeleteModal(true);
	};

	const handleDeletejob = () => {
		if (job && job.id) {
			dispatch(onDeleteJobList(job.id));
			setDeleteModal(false);
			setJob('');
		}
	};
	const handleJobClicks = () => {
		setJobsList('');
		setIsEdit(false);
		toggle();
	};

	const columns = useMemo(
		() => [
			{
				Header: 'No',
				accessor: 'jobId',
				filterable: true,
				Cell: (cellProps) => <JobNo {...cellProps} />,
			},
			{
				Header: 'Job Title',
				accessor: 'jobTitle',
				filterable: true,
				Cell: (cellProps) => <JobTitle {...cellProps} />,
			},
			{
				Header: 'Company Name',
				accessor: 'companyName',
				filterable: true,
				Cell: (cellProps) => <CompanyName {...cellProps} />,
			},
			{
				Header: 'Location',
				accessor: 'location',
				filterable: true,
				Cell: (cellProps) => <Location {...cellProps} />,
			},
			{
				Header: 'Experience',
				accessor: 'experience',
				filterable: true,
				Cell: (cellProps) => <Experience {...cellProps} />,
			},
			{
				Header: 'Position',
				accessor: 'position',
				Cell: (cellProps) => <Position {...cellProps} />,
			},
			{
				Header: 'Type',
				accessor: 'type',
				Cell: (cellProps) => <Type {...cellProps} />,
			},
			{
				Header: 'Posted Date',
				accessor: 'postedDate',
				Cell: (cellProps) => <PostedDate {...cellProps} />,
			},
			{
				Header: 'Last Date',
				accessor: 'lastDate',
				Cell: (cellProps) => <LastDate {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				disableFilters: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: (cellProps) => (
					<ul className="list-unstyled hstack gap-1 mb-0">
						<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
							<Link to="/job-details" className="btn btn-sm btn-soft-primary">
								<i className="mdi mdi-eye-outline" id="viewtooltip" />
							</Link>
						</li>
						<UncontrolledTooltip placement="top" target="viewtooltip">
							View
						</UncontrolledTooltip>

						<li>
							<Link
								to="#"
								className="btn btn-sm btn-soft-info"
								onClick={() => {
									const jobData = cellProps.row.original;
									handleJobClick(jobData);
								}}
							>
								<i className="mdi mdi-pencil-outline" id="edittooltip" />
								<UncontrolledTooltip placement="top" target="edittooltip">
									Edit
								</UncontrolledTooltip>
							</Link>
						</li>

						<li>
							<Link
								to="#"
								className="btn btn-sm btn-soft-danger"
								onClick={() => {
									const jobData = cellProps.row.original;
									onClickDelete(jobData);
								}}
							>
								<i className="mdi mdi-delete-outline" id="deletetooltip" />
								<UncontrolledTooltip placement="top" target="deletetooltip">
									Delete
								</UncontrolledTooltip>
							</Link>
						</li>
					</ul>
				),
			},
		],
		[]
	);

	return (
		<>
			<DeleteModal
				show={deleteModal}
				onDeleteClick={handleDeletejob}
				onCloseClick={() => setDeleteModal(false)}
			/>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Jobs" breadcrumbItem="Jobs Lists" />
					{isLoading ? (
						<Spinners setLoading={setLoading} />
					) : (
						<Row>
							<Col lg="12">
								<Card>
									<CardBody className="border-bottom">
										<div className="d-flex align-items-center">
											<h5 className="mb-0 card-title flex-grow-1">
												Jobs Lists
											</h5>
											<div className="flex-shrink-0">
												<Link
													to="#!"
													onClick={() => setModal(true)}
													className="btn btn-primary me-1"
												>
													Add New Job 132
												</Link>
												<Link to="#!" className="btn btn-light me-1">
													<i className="mdi mdi-refresh" />
												</Link>
												<UncontrolledDropdown className="dropdown d-inline-block me-1">
													<DropdownToggle
														type="menu"
														className="btn btn-success"
														id="dropdownMenuButton1"
													>
														<i className="mdi mdi-dots-vertical" />
													</DropdownToggle>
													<DropdownMenu>
														<li>
															<DropdownItem href="#">Action</DropdownItem>
														</li>
														<li>
															<DropdownItem href="#">
																Another action
															</DropdownItem>
														</li>
														<li>
															<DropdownItem href="#">
																Something else here
															</DropdownItem>
														</li>
													</DropdownMenu>
												</UncontrolledDropdown>
											</div>
										</div>
									</CardBody>
									<CardBody>
										<TableContainer
											columns={columns}
											data={jobs}
											isGlobalFilter
											isAddOptions={false}
											handleJobClicks={handleJobClicks}
											isJobListGlobalFilter
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
											<Label className="form-label"> Job Id</Label>
											<Input
												name="jobId"
												type="text"
												placeholder="Insert Job Id"
												validate={{
													required: { value: true },
												}}
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.jobId || ''}
												invalid={
													!!(
														validation.touched.jobId && validation.errors.jobId
													)
												}
											/>
											{validation.touched.jobId && validation.errors.jobId ? (
												<FormFeedback type="invalid">
													{validation.errors.jobId}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Job Title</Label>
											<Input
												name="jobTitle"
												type="text"
												placeholder="Insert Job Title"
												validate={{
													required: { value: true },
												}}
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.jobTitle || ''}
												invalid={
													!!(
														validation.touched.jobTitle &&
														validation.errors.jobTitle
													)
												}
											/>
											{validation.touched.jobTitle &&
											validation.errors.jobTitle ? (
												<FormFeedback type="invalid">
													{validation.errors.jobTitle}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Company Name</Label>
											<Input
												name="companyName"
												type="text"
												placeholder="Insert Company Name"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.companyName || ''}
												invalid={
													!!(
														validation.touched.companyName &&
														validation.errors.companyName
													)
												}
											/>
											{validation.touched.companyName &&
											validation.errors.companyName ? (
												<FormFeedback type="invalid">
													{validation.errors.companyName}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Location</Label>
											<Input
												name="location"
												type="text"
												placeholder="Insert Location"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.location || ''}
												invalid={
													!!(
														validation.touched.location &&
														validation.errors.location
													)
												}
											/>
											{validation.touched.location &&
											validation.errors.location ? (
												<FormFeedback type="invalid">
													{validation.errors.location}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Experience</Label>
											<Input
												name="experience"
												type="text"
												placeholder="Insert Experience"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.experience || ''}
												invalid={
													!!(
														validation.touched.experience &&
														validation.errors.experience
													)
												}
											/>
											{validation.touched.experience &&
											validation.errors.experience ? (
												<FormFeedback type="invalid">
													{validation.errors.experience}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Position</Label>
											<Input
												name="position"
												type="text"
												placeholder="Insert Position"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.position || ''}
												invalid={
													!!(
														validation.touched.position &&
														validation.errors.position
													)
												}
											/>
											{validation.touched.position &&
											validation.errors.position ? (
												<FormFeedback type="invalid">
													{validation.errors.position}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Type</Label>
											<Input
												name="type"
												type="select"
												className="form-select"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.type || ''}
												invalid={
													!!(validation.touched.type && validation.errors.type)
												}
											>
												<option>Full Time</option>
												<option>Part Time</option>
												<option>Freelance</option>
												<option>Internship</option>
											</Input>
											{validation.touched.type && validation.errors.type ? (
												<FormFeedback type="invalid">
													{validation.errors.type}
												</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label">Status</Label>
											<Input
												name="status"
												type="select"
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.status || ''}
												invalid={
													!!(
														validation.touched.status &&
														validation.errors.status
													)
												}
											>
												<option>Active</option>
												<option>New</option>
												<option>Close</option>
											</Input>
											{validation.touched.status && validation.errors.status ? (
												<FormFeedback status="invalid">
													{validation.errors.status}
												</FormFeedback>
											) : null}
										</div>
									</Col>
								</Row>
								<Row>
									<Col>
										<div className="text-end">
											<button
												type="submit"
												className="btn btn-success save-user"
											>
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
			<ToastContainer />
		</>
	);
};

export default JobList;
