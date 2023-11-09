/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Card,
	CardBody,
	Col,
	Row,
	UncontrolledTooltip,
	Button,
} from 'reactstrap';
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

// import Breadcrumbs from '../../components/Common/Breadcrumb';
import {
	deleteCasinoSubCategoryStart,
	getCasinoSubCategoryDetailStart,
} from '../../store/actions';
import CrudSection from '../../components/Common/CrudSection';
import useCreateSubCategory from './hooks/useCreateSubCategory';
import FormModal from '../../components/Common/FormModal';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const GetCasinoSubCategoryDetail = () => {
	// meta title
	document.title = projectName;

	const {
		casinoSubCategoryDetails,
		iscasinoSubCategoryDetailsLoading,
		isCreateSubCategorySuccess,
		isEditSubCategorySuccess,
		isDeleteCasinoSubCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const dispatch = useDispatch();

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const fetchData = () => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValidation.values,
			})
		);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const onClickDelete = (gameSubCategoryId) => {
		dispatch(
			deleteCasinoSubCategoryStart({
				gameSubCategoryId,
				limit: itemsPerPage,
				pageNo: page,
				search: '',
			})
		);
	};

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateSubCategoryLoading,
		buttonList,
		handleStatus,
		active,
		onClickEdit,
		isEditSubCategoryLoading,
		handleAddGameClick,
	} = useCreateSubCategory();

	useEffect(() => {
		if (
			isCreateSubCategorySuccess ||
			isEditSubCategorySuccess ||
			isDeleteCasinoSubCategorySuccess
		)
			fetchData();
	}, [
		isCreateSubCategorySuccess,
		isEditSubCategorySuccess,
		isDeleteCasinoSubCategorySuccess,
	]);

	const formattedgetCasinoSubCategoryDetails = useMemo(() => {
		if (casinoSubCategoryDetails) {
			return casinoSubCategoryDetails?.rows.map((category) => ({
				...category,
				nameEN: category?.name?.EN,
				gameCategory: 'default',
				subcategoryImage: category?.imageUrl,
			}));
		}
		return [];
	}, [casinoSubCategoryDetails]);

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, active, isFilterChanged]);

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
				accessor: 'nameEN',
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
				Header: 'IMAGE',
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
				Cell: ({ cell }) => {
					const status = cell?.row?.original?.isActive;
					const gameSubCategoryId = cell?.row?.original?.gameSubCategoryId;
					const isGlobal = cell?.row?.original?.isGlobal;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{status ? (
									<Button
										className="btn btn-sm btn-soft-danger"
										onClick={(e) =>
											handleStatus(e, {
												status,
												gameSubCategoryId,
											})
										}
									>
										<i
											className="mdi mdi-close-thick"
											id={`active-${gameSubCategoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${gameSubCategoryId}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Button>
								) : (
									<Button
										className="btn btn-sm btn-soft-success"
										onClick={(e) =>
											handleStatus(e, {
												status,
												gameSubCategoryId,
											})
										}
									>
										<i
											className="mdi mdi-check-circle"
											id={`active-${gameSubCategoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${gameSubCategoryId}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Button>
								)}
							</li>

							<li>
								<Button
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										e.preventDefault();
										onClickEdit(cell?.row?.original);
									}}
								>
									<i
										className="mdi mdi-pencil-outline"
										id={`edit-${gameSubCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`edit-${gameSubCategoryId}`}
									>
										Edit
									</UncontrolledTooltip>
								</Button>
							</li>

							<li>
								<Button
									type="button"
									disabled={isGlobal}
									className="btn btn-sm btn-soft-danger"
									onClick={(e) => {
										e.preventDefault();
										onClickDelete(gameSubCategoryId);
									}}
								>
									<i
										className="mdi mdi-delete-outline"
										id={`delete-${gameSubCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`delete-${gameSubCategoryId}`}
									>
										Delete
									</UncontrolledTooltip>
								</Button>
							</li>

							<li>
								<Button
									type="button"
									disabled={isGlobal}
									className="btn btn-sm btn-soft-primary"
									onClick={(e) => handleAddGameClick(e, gameSubCategoryId)}
								>
									<i
										className="mdi mdi-plus-one"
										id={`plus-one-${gameSubCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`plus-one-${gameSubCategoryId}`}
									>
										Add Game
									</UncontrolledTooltip>
								</Button>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<div className="container-fluid">
				{/* <Breadcrumbs
					Breadcrumbs
					title={t('Casino Management')}
					breadcrumbItem={t('Casino Sub Categories')}
				/> */}

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title="Casino Sub Categories"
							/>
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
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
									changeRowsPerPageCallback={onChangeRowsPerPage}
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
								isSubmitLoading={
									isCreateSubCategoryLoading || isEditSubCategoryLoading
								}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

GetCasinoSubCategoryDetail.propTypes = {
	// t: PropTypes.func,
};

GetCasinoSubCategoryDetail.defaultProps = {
	t: (string) => string,
};

export default GetCasinoSubCategoryDetail;
