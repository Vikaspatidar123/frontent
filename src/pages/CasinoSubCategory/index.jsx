import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../components/Common/TableContainer';
import {
	Email,
	GameSubCategoryId,
	CreatedAt,
	UpdatedAt,
	IsActive
} from './CasinoSubCategory';

import { Col, Row, UncontrolledTooltip, Card, CardBody } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getCasinoCategoryDetailStart, getCasinoSubCategoryDetailStart } from '../../store/actions';

function GetCasinoSubCategoryDetail() {
	//meta title
	document.title = 'Casino Category | Skote - Vite React Admin & Dashboard Template';

	const { getCasinoSubCategoryDetails, loading } = useSelector((state) => state.getCasinoCategory);
	console.log('getCasinoSubCategoryDetails: ', getCasinoSubCategoryDetails);
	const [isLoading, setLoading] = useState(loading);
	const [limit, setLimit] = useState(15);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				limit,
				pageNo: page,
				search,
			})
		);
	}, [dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'gameSubCategoryId',
				filterable: true,
				Cell: (cellProps) => {
					console.log('cellProps: ', cellProps);
					return <GameSubCategoryId {...cellProps} />;
				},
			},
			{
				Header: 'NAME',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => {
					console.log('cellProps: ', cellProps);
					return <Email {...cellProps} />;
				},
			},
			{
				Header: 'CREATED AT',
				accessor: 'createdAt',
				filterable: true,
				Cell: (cellProps) => {
					return (
						<>
							<CreatedAt {...cellProps} />
						</>
					);
				},
			},
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				filterable: true,
				Cell: (cellProps) => {
					return <UpdatedAt {...cellProps} />;
				},
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				Cell: (cellProps) => {
					return <IsActive {...cellProps} />;
				},
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: (cellProps) => {
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
								<Link to="#" className="btn btn-sm btn-soft-primary">
									<i className="mdi mdi-eye-outline" id="viewtooltip"></i>
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
										// const jobData = cellProps.row.original;
										// handleJobClick(jobData);
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
										// const jobData = cellProps.row.original;
										// onClickDelete(jobData);
									}}
								>
									<i className="mdi mdi-delete-outline" id="deletetooltip" />
									<UncontrolledTooltip placement="top" target="deletetooltip">
										Delete
									</UncontrolledTooltip>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Jobs" breadcrumbItem="Casino Category" />
					{isLoading ? (
						<Spinners setLoading={setLoading} />
					) : (
						<Row>
							<Col lg="12">
								<Card>
									<CardBody>
										<TableContainer
											columns={columns}
											data={getCasinoSubCategoryDetails?.rows}
											isGlobalFilter={true}
											isAddOptions={false}
											// handleJobClicks={handleJobClicks}
											// isJobListGlobalFilter={true}
											isPagination={true}
											iscustomPageSizeOptions={true}
											isShowingPageLength={true}
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
				</div>
			</div>
			{/* <ToastContainer /> */}
		</React.Fragment>
	);
}

export default GetCasinoSubCategoryDetail;
