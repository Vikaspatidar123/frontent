/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
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

const TableContainer = ({
	columns,
	data,
	customPageSize = defaultPageSize,
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
}) => {
	const [rowsPerPage, setRowsPerPage] = useState(customPageSize || 10);
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
				pageCount: Math.ceil(totalPageCount / customPageSize),
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

	const onChangeRowsPerPage = (e) => {
		setRowsPerPage(e.target.value);
		changeRowsPerPageCallback(e.target.value);
	};

	const noDataFound = !isLoading && !page.length;

	return (
		<>
			<div className="table-responsive react-table">
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
												{column.render('Header')}
												{column.subLabel && (
													<div style={{ fontSize: 12 }}>
														({column.subLabel})
													</div>
												)}
												{/* {generateSortingIndicator(column)} */}
											</div>
											{/* <Filter column={column} /> */}
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
								<td colSpan={columns.length}>No data found</td>
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
								Showing <span className="fw-semibold">{page.length}</span> of{' '}
								<span className="fw-semibold">{totalPageCount}</span> entries
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
										value={rowsPerPage}
										type="select"
										onChange={onChangeRowsPerPage}
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
								pageCount={Math.ceil(totalPageCount / customPageSize)}
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
							/>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
};

TableContainer.defaultProps = {
	preGlobalFilteredRows: [],
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
};

TableContainer.propTypes = {
	preGlobalFilteredRows: PropTypes.arrayOf,
	hideHeader: PropTypes.bool,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			Header: PropTypes.string,
			accessor: PropTypes.string,
			filterable: PropTypes.bool,
			Cell: PropTypes.func,
		})
	).isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	customPageSize: PropTypes.number.isRequired,
	tableClass: PropTypes.string,
	paginationDiv: PropTypes.string,
	isPagination: PropTypes.bool,
	theadClass: PropTypes.string,
	tbodyClass: PropTypes.string,
	totalPageCount: PropTypes.number.isRequired,
	isManualPagination: PropTypes.bool,
	onChangePagination: PropTypes.func,
	isLoading: PropTypes.bool.isRequired,
	thCustomClass: PropTypes.string,
	changeRowsPerPageCallback: PropTypes.func,
	tbodyHeight: PropTypes.string,
	cellPadding: PropTypes.string,
};

export default TableContainer;
