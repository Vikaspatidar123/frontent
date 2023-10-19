/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { Table, Spinner } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { CustomSelectField } from '../../helpers/customForms';

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
	// currentPage,
	isLoading = false,
	thCustomClass = '',
	changeRowsPerPageCallback,
}) => {
	const [rowsPerPage, setRowsPerPage] = useState(customPageSize || 10);
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

	const rowsPerPageOptions = [
		{
			id: 1,
			optionLabel: 10,
			value: 10,
		},
		{
			id: 2,
			optionLabel: 15,
			value: 15,
		},
		{
			id: 3,
			optionLabel: 20,
			value: 20,
		},
		{
			id: 4,
			optionLabel: 25,
			value: 25,
		},
		{
			id: 5,
			optionLabel: 30,
			value: 30,
		},
	];

	const onChangeRowsPerPage = (e) => {
		setRowsPerPage(e.target.value);
		changeRowsPerPageCallback(e.target.value);
	};

	return (
		<>
			<div className="table-responsive react-table">
				<Table {...getTableProps()} className={tableClass} id="generic-table">
					<thead className={theadClass} id="generic-table-head">
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
											{/* {generateSortingIndicator(column)} */}
										</div>
										{/* <Filter column={column} /> */}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody
						{...getTableBodyProps({
							height: `${isLoading || !page?.length ? '500px' : '0'}`,
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
						{!isLoading && !page.length && (
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
												<td key={cell.id} {...cell.getCellProps()}>
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
				<div className="d-flex justify-content-between align-items-center">
					{totalPageCount && (
						<div>
							<div className="text-muted">
								Showing <span className="fw-semibold">{page.length}</span> of{' '}
								<span className="fw-semibold">{totalPageCount}</span> entries
							</div>
						</div>
					)}
					<div className={paginationDiv}>
						<div className="d-flex justify-content-between">
							<div className="d-flex align-items-center">
								<div className="text-muted">Rows per Page</div>
								<div>
									<CustomSelectField
										// label='Rows per page'
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
					</div>
				</div>
			)}
		</>
	);
};

TableContainer.defaultProps = {
	preGlobalFilteredRows: [],
};

TableContainer.propTypes = {
	// eslint-disable-next-line react/require-default-props
	preGlobalFilteredRows: PropTypes.arrayOf,
	// columns: PropTypes.arrayOf,
	// data: PropTypes.arrayOf,
	// isGlobalFilter: PropTypes.bool,
	// isAddOptions: PropTypes.bool,
	// isAddUserList: PropTypes.bool,
	// handleOrderClicks: PropTypes.func,
};

export default TableContainer;
