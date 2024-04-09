import React, { useEffect, useState } from 'react';
import {
	useTable,
	useGlobalFilter,
	useSortBy,
	useFilters,
	useExpanded,
	usePagination,
} from 'react-table';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import useForm from '../Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from './formFields';

const useTableCustom = (
	data,
	columns,
	isManualPagination,
	onChangePagination,
	customPageSize,
	totalPageCount,
	isLoading
) => {
	const [filteredColumns, setFilteredColumns] = useState(columns);

	const tableHeaderClass = useSelector(
		(state) => state.Layout.tableHeaderClass
	);

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		setHeader,
	} = useForm({
		header: 'Column settings',
		initialValues: getInitialValues(columns),
		validationSchema: validationSchema(),
		staticFormFields: staticFormFields(columns),
		onSubmitEntry: () => {},
	});

	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
		useTable(
			{
				columns: filteredColumns,
				data,
				initialState: {
					pageIndex: 0,
					pageSize: customPageSize,
				},
				manualPagination: isManualPagination,
				pageCount: totalPageCount,
			},
			useGlobalFilter,
			useFilters,
			useSortBy,
			useExpanded,
			usePagination
		);

	useEffect(() => {
		if (!isEmpty(validation.values)) {
			setFilteredColumns(
				columns.filter((col) => validation.values[col.accessor])
			);
		} else {
			setFilteredColumns(columns);
		}
	}, [validation.values, columns]);

	const handlePagination = (newPage) => {
		if (isManualPagination) {
			onChangePagination((newPage?.selected || 0) + 1);
		}
	};

	const handleColumnSettings = () => {
		setIsOpen(true);
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

	return {
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
		validation,
		formFields,
		setFormFields,
		setHeader,
	};
};

export default useTableCustom;
