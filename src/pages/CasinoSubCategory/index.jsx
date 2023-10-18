/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
	GameSubCategoryId,
	Name,
	GameCategory,
	ImageUrl,
	Status,
} from './CasinoSubCategory';
import { projectName } from '../../constants/config';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getCasinoSubCategoryDetailStart } from '../../store/actions';
import CrudSection from '../../components/Common/CrudSection';
import useCreateSubCategory from './hooks/useCreateSubCategory';
import FormModal from '../../components/Common/FormModal';

const columns = [
	{
		Header: 'ID',
		accessor: 'gameSubCategoryId',
		filterable: true,
		Cell: (cellProps) => <GameSubCategoryId {...cellProps} />,
	},
	{
		Header: 'NAME',
		accessor: 'name',
		filterable: true,
		Cell: (cellProps) => <Name {...cellProps} />,
	},
	{
		Header: 'GAME CATEGORY',
		accessor: 'gameCategory',
		filterable: true,
		Cell: (cellProps) => <GameCategory {...cellProps} />,
	},
	{
		Header: 'IMAGE URL',
		accessor: 'imageUrl',
		filterable: true,
		Cell: (cellProps) => <ImageUrl {...cellProps} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		filterable: true,
		Cell: (cellProps) => <Status {...cellProps} />,
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
];
const GetCasinoSubCategoryDetail = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		casinoSubCategoryDetails,
		iscasinoSubCategoryDetailsLoading,
		isCreateSubCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [limit] = useState(15);
	const [page, setPage] = useState(1);
	const [search] = useState('');
	const dispatch = useDispatch();
	const fetchData = () => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				limit,
				pageNo: page,
				search,
			})
		);
	};
	useEffect(() => {
		if (isCreateSubCategorySuccess) fetchData();
	}, [isCreateSubCategorySuccess]);
	const itemsPerPage = 10;

	useEffect(() => {
		fetchData();
	}, [limit, page, search]);

	// const getGameName = (id) => {
	// 	return (
	// 		getCasinoSubCategoryDetails &&
	// 		getCasinoSubCategoryDetails?.rows?.find(
	// 			(obj) => obj.gameCategoryId === id
	// 		)?.name?.EN
	// 	);
	// };

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateSubCategoryLoading,
		buttonList,
	} = useCreateSubCategory();

	const formattedgetCasinoSubCategoryDetails = useMemo(() => {
		if (casinoSubCategoryDetails) {
			return casinoSubCategoryDetails?.rows.map((category) => ({
				...category,
				name: category?.name?.EN,
				gameCategory: 'default',
			}));
		}
		return [];
	}, [casinoSubCategoryDetails]);

	return (
		<div className="page-content">
			<div className="container-fluid">
				<Breadcrumbs
					Breadcrumbs
					title={t('Casino Management')}
					breadcrumbItem={t('Casino Sub Categories')}
				/>

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title="Sub Categories Listing"
							/>
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedgetCasinoSubCategoryDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={casinoSubCategoryDetails?.count}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!iscasinoSubCategoryDetailsLoading}
								/>
							</CardBody>
							<FormModal
								isOpen={isOpen}
								toggle={() => setIsOpen((prev) => !prev)}
								header={header}
								validation={validation}
								formFields={formFields}
								submitLabel="Submit"
								customColClasses="col-md-12"
								isSubmitLoading={isCreateSubCategoryLoading}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

GetCasinoSubCategoryDetail.propTypes = {
	t: PropTypes.func,
};

GetCasinoSubCategoryDetail.defaultProps = {
	t: (string) => string,
};

export default GetCasinoSubCategoryDetail;
