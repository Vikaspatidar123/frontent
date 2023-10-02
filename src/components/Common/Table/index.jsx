/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const CustomTable = (props) => {
	const {
		data,
		tableHeader,
		emptyTableMessage,
		buttons,
		getRows,
		className,
		emptyClassName,
		isLoading,
		loadingClassName,
	} = props;
	return (
		<Table className={`${className}`}>
			<thead>
				<tr>
					{tableHeader &&
						Object.keys(tableHeader).map((key) => (
							<td
								key={key + Math.random()}
								style={tableHeader[key].style}
								className={tableHeader[key].class}
							>
								{tableHeader[key].label}
							</td>
						))}
				</tr>
			</thead>
			<tbody>
				{isLoading ? (
					<tr className={loadingClassName}>
						<td colSpan="20">
							<div />
						</td>
					</tr>
				) : Object.keys(data).length > 0 ? (
					getRows({ data, buttons })
				) : (
					<tr className={emptyClassName}>
						<td colSpan="20">{emptyTableMessage}</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
};

CustomTable.defaultProps = {
	data: {},
	tableHeader: {},
	emptyTableMessage: '',
	buttons: false,
	getRows: () => {},
	className: '',
	emptyClassName: '',
	isLoading: false,
	loadingClassName: '',
};

CustomTable.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	tableHeader: PropTypes.objectOf,
	emptyTableMessage: PropTypes.string,
	buttons: PropTypes.bool,
	getRows: PropTypes.func,
	className: PropTypes.string,
	emptyClassName: PropTypes.string,
	isLoading: PropTypes.bool,
	loadingClassName: PropTypes.string,
};

export default CustomTable;
