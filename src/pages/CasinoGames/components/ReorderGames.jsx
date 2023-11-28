import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import CrudSection from '../../../components/Common/CrudSection';
import ReorderComponent from '../../ReorderCategories';
import { CustomSelectField } from '../../../helpers/customForms';
import useReorderGames from '../hooks/useReorderGames';
import TableContainer from '../../../components/Common/TableContainer';

const ReorderGames = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		state,
		page,
		setPage,
		columns,
		setState,
		games,
		setGames,
		buttonList,
		itemsPerPage,
		formattedState,
		selectedCategory,
		setSelectedCategory,
		onChangeRowsPerPage,
		selectedSubCategory,
		isCasinoGamesLoading,
		casinoCategoryDetails,
		setSelectedSubCategory,
		casinoSubCategoryDetails,
		totalCount,
	} = useReorderGames();

	return (
		<div className="page-content">
			<div className="container-fluid">
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Reorder Category"
					/>
				)}

				<Row>
					<Card>
						<CrudSection
							buttonList={state.count ? buttonList : []}
							title="Casino Sub Categories Reorder"
						/>
						<CardBody>
							<Row lg={12}>
								<Col lg={6}>
									<CustomSelectField
										label="Category"
										name="category"
										value={selectedCategory}
										isClearable
										type="select"
										onChange={(e) => {
											setGames({ rows: [], count: 0 });
											setState({ rows: [], count: 0 });
											setSelectedCategory(e.target.value);
										}}
										key="my_unique_select_key_Category"
										options={
											<>
												<option value="">Select Category</option>
												{casinoCategoryDetails &&
													casinoCategoryDetails?.rows?.map((c) => (
														<option
															key={c?.gameCategoryId}
															value={c?.gameCategoryId}
														>
															{c?.name?.EN}
														</option>
													))}
											</>
										}
									/>
								</Col>
								{selectedCategory && (
									<Col lg={6}>
										<CustomSelectField
											label="Sub Category"
											name="subCategory"
											value={selectedSubCategory}
											isClearable
											type="select"
											onChange={(e) => {
												setGames({ rows: [], count: 0 });
												setState({ rows: [], count: 0 });
												setSelectedSubCategory(e.target.value);
											}}
											key="my_unique_select_key_SubCategory"
											options={
												<>
													<option value="">All</option>
													{casinoSubCategoryDetails &&
														casinoSubCategoryDetails?.rows?.map((c) => (
															<option
																key={c?.gameSubCategoryId}
																value={c?.gameSubCategoryId}
															>
																{c?.name?.EN}
															</option>
														))}
												</>
											}
										/>
									</Col>
								)}
							</Row>
						</CardBody>
					</Card>
				</Row>
				<Row lg={12}>
					<Col lg={6}>
						<Card>
							<CardBody>
								<TableContainer
									columns={columns}
									data={games?.rows}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isCasinoGamesLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
					<Col lg={6}>
						<Card>
							<CardBody>
								<Row className="drag-table--header">
									{['ORDER ID', 'GAME NAME (ID)', 'ACTIONS'].map((key) => (
										<Col key={key} className="drag-table--heading">
											{key}
										</Col>
									))}
									{selectedCategory && selectedSubCategory ? (
										<ReorderComponent
											formattedState={formattedState}
											state={state}
											setState={setState}
										/>
									) : (
										<p className="text-center text-danger mt-3">
											{' '}
											Select Category & Sub Category First{' '}
										</p>
									)}
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ReorderGames;
