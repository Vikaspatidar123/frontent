/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Table, Spinner, Col, Row, UncontrolledTooltip } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { CustomSelectField } from '../../../helpers/customForms';
import { defaultPageSize, rowsPerPageOptions } from '../constants';
import NoDataFound from '../NoDataFound';
import useTableCustom from './useTableCustom';
import FormModal from '../FormModal';

const TableContainer = ({
	columns = [],
	data = [],
	customPageSize,
	tableClass,
	paginationDiv,
	isPagination,
	theadClass,
	tbodyClass,
	totalPageCount,
	isManualPagination,
	onChangePagination,
	isLoading = false,
	thCustomClass = '',
	changeRowsPerPageCallback,
	hideHeader,
	tbodyHeight,
	isLongTable = false,
	currentPage,
	isShowColSettings,
	customTableInfo,
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		generateSortingIndicator,
		noDataFound,
		tableHeaderClass,
		handlePagination,
		handleColumnSettings,
		isOpen,
		setIsOpen,
		header,
		formFields,
		validation,
	} = useTableCustom(
		data,
		columns,
		isManualPagination,
		onChangePagination,
		customPageSize,
		totalPageCount,
		isLoading
	);

	return (
		<>
			{isShowColSettings || customTableInfo ? (
				<Row>
					<Col xl={11} xxl={11} md={11} sm={11}>
						{customTableInfo || null}
					</Col>
					{isShowColSettings ? (
						<Col xl={1} xxl={1} md={1} sm={1}>
							<div className="position-relative h-100 hstack justify-content-end px-3">
								<i
									className="mdi mdi-settings align-middle filter-icons bx-spin cursor-pointer"
									onClick={handleColumnSettings}
									onKeyDown={() => {}}
									id="clear"
								/>
								<UncontrolledTooltip placement="top" target="clear">
									Columns settings
								</UncontrolledTooltip>
							</div>
						</Col>
					) : null}
				</Row>
			) : null}
			<div
				className={`table-responsive react-table ${
					isLongTable && 'scrollable'
				}`}
			>
				<Table {...getTableProps()} className={tableClass} id="generic-table">
					{!hideHeader && (
						<thead
							className={`${tableHeaderClass} ${theadClass}`}
							id="generic-table-head"
						>
							{headerGroups?.map((headerGroup) => (
								<tr
									key={headerGroup.id}
									{...headerGroup.getHeaderGroupProps()}
									id="generic-table-tr"
								>
									{headerGroup?.headers?.map((column) => (
										<th
											key={column.id}
											className={column.isSort ? 'sorting' : thCustomClass}
										>
											<div
												{...column.getSortByToggleProps()}
												{...(column?.tableHeaderTooltipContent
													? { title: '' }
													: {})}
											>
												<span className="d-flex align-items-center gap-1">
													{column.render('Header')}
													{generateSortingIndicator(column)}
													{column?.tableHeaderTooltipContent ? (
														<span
															className="mdi mdi-information-outline"
															style={{ fontSize: '20px' }}
															id={`id-${column.id}`}
														/>
													) : null}
												</span>
												{column.subLabel && (
													<div style={{ fontSize: 12 }}>
														({column.subLabel})
													</div>
												)}
												{column?.tableHeaderTooltipContent ? (
													<UncontrolledTooltip
														placement="top"
														target={`id-${column.id}`}
													>
														{column.tableHeaderTooltipContent}
													</UncontrolledTooltip>
												) : null}
											</div>
										</th>
									))}
								</tr>
							))}
						</thead>
					)}

					<tbody
						{...getTableBodyProps({
							height: `${
								tbodyHeight || (isLoading || !page?.length ? '500px' : '0')
							}`,
						})}
						id="generic-table-body"
						className={tbodyClass}
					>
						{isLoading && (
							<Spinner
								color="primary"
								className="position-absolute top-50 start-50"
							/>
						)}
						{noDataFound && (
							<tr style={{ textAlign: 'center' }}>
								<td colSpan={columns.length}>
									<NoDataFound height="200px" width="300px" />
								</td>
							</tr>
						)}
						{!isLoading &&
							!!page.length &&
							page?.map((row) => {
								prepareRow(row);
								return (
									<Fragment key={row.getRowProps().key}>
										<tr>
											{row?.cells?.map((cell) => (
												<td
													style={cell?.column?.customColumnStyle || {}}
													key={cell.id}
													{...cell.getCellProps()}
												>
													{cell.render('Cell')}
												</td>
											))}
										</tr>
									</Fragment>
								);
							})}
					</tbody>
				</Table>
			</div>

			{isPagination && (
				<Row className="d-flex justify-content-between align-items-center">
					<Col lg={4}>
						{!!totalPageCount && (
							<div className="text-muted">
								Showing <span className="fw-semibold">{currentPage}</span> of{' '}
								<span className="fw-semibold">{totalPageCount}</span> pages.
							</div>
						)}
						{/* need to remove inline styles here */}
						{!noDataFound && (
							<div
								className="d-flex align-items-center mt-10"
								style={{ marginTop: 10 }}
							>
								<div className="text-muted" style={{ marginRight: 10 }}>
									Rows per Page
								</div>
								<div>
									<CustomSelectField
										value={customPageSize}
										type="select"
										onChange={(e) => changeRowsPerPageCallback(e.target.value)}
										options={
											<>
												<option value={null} selected disabled>
													Select
												</option>
												{rowsPerPageOptions?.map(({ optionLabel, value }) => (
													<option key={value} value={value}>
														{optionLabel}
													</option>
												))}
											</>
										}
									/>
								</div>
							</div>
						)}
					</Col>
					<Col lg={4} className={paginationDiv}>
						<div className="d-flex justify-content-end">
							<ReactPaginate
								breakLabel="..."
								nextLabel=">"
								onPageChange={handlePagination}
								pageCount={totalPageCount}
								previousLabel="<"
								renderOnZeroPageCount={null}
								pageClassName="page-item"
								pageLinkClassName="page-link"
								previousClassName="page-item"
								previousLinkClassName="page-link"
								nextClassName="page-item"
								nextLinkClassName="page-link"
								breakClassName="page-item"
								breakLinkClassName="page-link"
								containerClassName="pagination"
								activeClassName="active"
								pageRangeDisplayed={3}
								{...(currentPage ? { forcePage: currentPage - 1 } : {})}
							/>
						</div>
					</Col>
				</Row>
			)}
			<FormModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				header={header}
				validation={validation}
				responsiveFormFields={formFields}
				submitLabel="Save"
				customColClasses="col-md-12"
				isSubmitLoading={false}
				colOptions={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 }}
				isSubmit={false}
				modalSize="lg"
			/>
		</>
	);
};

TableContainer.defaultProps = {
	hideHeader: false,
	tableClass: '',
	paginationDiv: '',
	isPagination: false,
	theadClass: '',
	tbodyClass: '',
	isManualPagination: false,
	onChangePagination: () => {},
	thCustomClass: '',
	changeRowsPerPageCallback: () => {},
	tbodyHeight: '',
	cellPadding: '',
	isLongTable: false,
	totalPageCount: 1,
	currentPage: 1,
	customPageSize: defaultPageSize,
	isShowColSettings: true,
	customTableInfo: null,
};

TableContainer.propTypes = {
	hideHeader: PropTypes.bool,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			Header: PropTypes.string,
			accessor: oneOfType([
				PropTypes.string,
				PropTypes.element,
				PropTypes.func,
			]),
			filterable: PropTypes.bool,
			Cell: PropTypes.func,
		})
	).isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	customPageSize: PropTypes.number,
	tableClass: PropTypes.string,
	paginationDiv: PropTypes.string,
	isPagination: PropTypes.bool,
	theadClass: PropTypes.string,
	tbodyClass: PropTypes.string,
	totalPageCount: PropTypes.number,
	isManualPagination: PropTypes.bool,
	onChangePagination: PropTypes.func,
	isLoading: PropTypes.bool.isRequired,
	thCustomClass: PropTypes.string,
	changeRowsPerPageCallback: PropTypes.func,
	tbodyHeight: PropTypes.string,
	cellPadding: PropTypes.string,
	isLongTable: PropTypes.bool,
	currentPage: PropTypes.number,
	isShowColSettings: PropTypes.bool,
	customTableInfo: PropTypes.element,
};

export default TableContainer;
