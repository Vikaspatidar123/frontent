/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
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
	document.title = `Casino Sub Category | ${projectName}`;

	const { casinoSubCategoryDetails, iscasinoSubCategoryDetailsLoading } =
		useSelector((state) => state.CasinoManagementData);
	const [limit] = useState(15);
	const [page, setPage] = useState(1);
	const [search] = useState('');
	const dispatch = useDispatch();

	const itemsPerPage = 10;

	useEffect(() => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				limit,
				pageNo: page,
				search,
			})
		);
	}, [limit, page, search]);

	// const getGameName = (id) => {
	// 	return (
	// 		getCasinoSubCategoryDetails &&
	// 		getCasinoSubCategoryDetails?.rows?.find(
	// 			(obj) => obj.gameCategoryId === id
	// 		)?.name?.EN
	// 	);
	// };

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
