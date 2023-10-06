/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, UncontrolledTooltip, Card, CardBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
	Email,
	GameSubCategoryId,
	CreatedAt,
	UpdatedAt,
	IsActive,
} from './CasinoSubCategory';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import { getCasinoSubCategoryDetailStart } from '../../store/actions';

const GetCasinoSubCategoryDetail = () => {
	// meta title
	document.title =
		'Casino Category | Skote - Vite React Admin & Dashboard Template';

	const { getCasinoSubCategoryDetails, loading } = useSelector(
		(state) => state.getCasinoCategory
	);
	const [isLoading, setLoading] = useState(loading);
	const [limit] = useState(15);
	const [page] = useState(1);
	const [search] = useState('');
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
				Cell: (cellProps) => <GameSubCategoryId {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => <Email {...cellProps} />,
			},
			{
				Header: 'CREATED AT',
				accessor: 'createdAt',
				filterable: true,
				Cell: (cellProps) => <CreatedAt {...cellProps} />,
			},
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				filterable: true,
				Cell: (cellProps) => <UpdatedAt {...cellProps} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				Cell: (cellProps) => <IsActive {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: () => (
					<ul className="list-unstyled hstack gap-1 mb-0">
						<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
							<Link to="/#" className="btn btn-sm btn-soft-primary">
								<i className="mdi mdi-eye-outline" id="viewtooltip" />
							</Link>
						</li>
						<UncontrolledTooltip placement="top" target="viewtooltip">
							View
						</UncontrolledTooltip>

						<li>
							<Link
								to="/#"
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
								to="/#"
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
				),
			},
		],
		[]
	);

	return (
		<>
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
											data={getCasinoSubCategoryDetails?.rows || []}
											isGlobalFilter
											isAddOptions={false}
											// handleJobClicks={handleJobClicks}
											// isJobListGlobalFilter={true}
											isPagination
											iscustomPageSizeOptions
											isShowingPageLength
											customPageSize={5}
											tableClass="table-bordered align-middle nowrap mt-2"
											paginationDiv="col-sm-12 col-md-7"
											pagination="pagination justify-content-end pagination-rounded"
											isLoading={loading}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
					)}
				</div>
			</div>
			{/* <ToastContainer /> */}
		</>
	);
};

export default GetCasinoSubCategoryDetail;
