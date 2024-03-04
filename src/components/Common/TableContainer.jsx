/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import {
	useTable,
	useGlobalFilter,
	useSortBy,
	useFilters,
	useExpanded,
	usePagination,
} from 'react-table';
import { Table, Spinner, Col, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { CustomSelectField } from '../../helpers/customForms';
import { defaultPageSize, rowsPerPageOptions } from './constants';
import NoDataFound from './NoDataFound';

const TableContainer = ({
	columns,
	data,
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
	cellPadding,
	isLongTable = false,
	currentPage,
}) => {
	const tableHeaderClass = useSelector(
		(state) => state.Layout.tableHeaderClass
	);
	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
		useTable(
			{
				columns,
				data,
				// defaultColumn: { Filter: DefaultColumnFilter },
				initialState: {
					pageIndex: 0,
					pageSize: customPageSize,
				},
				manualPagination: isManualPagination,
				// pageCount: Math.ceil(totalPageCount / customPageSize),
				pageCount: totalPageCount,
			},
			useGlobalFilter,
			useFilters,
			useSortBy,
			useExpanded,
			usePagination
		);

	const handlePagination = (newPage) => {
		if (isManualPagination) {
			onChangePagination((newPage?.selected || 0) + 1);
		}
	};

	const noDataFound = !isLoading && !page.length;

	const generateSortingIndicator = (column) => {
		if (column.isSorted) {
			return (
				<i
					className={`bx bx-${
						column.isSortedDesc ? 'down' : 'up'
					}-arrow-alt text-primary font-size-16`}
				/>
			);
		}
		if (!column.disableSortBy) {
			return <i className="bx bx-sort text-primary" />;
		}
		return null;
	};

	return (
		<>
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
							{headerGroups.map((headerGroup) => (
								<tr
									key={headerGroup.id}
									{...headerGroup.getHeaderGroupProps()}
									id="generic-table-tr"
								>
									{headerGroup.headers.map((column) => (
										<th
											key={column.id}
											className={column.isSort ? 'sorting' : thCustomClass}
										>
											<div {...column.getSortByToggleProps()}>
												<span className="d-flex align-items-center gap-1">
													{column.render('Header')}
													{generateSortingIndicator(column)}
												</span>
												{column.subLabel && (
													<div style={{ fontSize: 12 }}>
														({column.subLabel})
													</div>
												)}
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
							page.map((row) => {
								prepareRow(row);
								return (
									<Fragment key={row.getRowProps().key}>
										<tr>
											{row.cells.map((cell) => (
												<td
													style={cellPadding ? { padding: cellPadding } : {}}
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
};

export default TableContainer;
