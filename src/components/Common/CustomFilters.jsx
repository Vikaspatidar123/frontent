/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import {
	Card,
	Col,
	DropdownMenu,
	DropdownToggle,
	Row,
	UncontrolledDropdown,
} from 'reactstrap';
import PropTypes, { oneOfType } from 'prop-types';
import { getField } from '../../helpers/customForms';
import { debounceTime } from '../../constants/config';

let debounce;
const CustomFilters = ({
	filterFields,
	validation,
	customFieldCols,
	handleFilter,
}) => {
	const ref = useRef({
		isFirst: true,
		prevValues: null,
	});

	useEffect(() => {
		if (
			!ref.current.isFirst &&
			!isEqual(validation.values, ref.current.prevValues)
		) {
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			ref.current.prevValues = validation.values;
		}
		ref.current.isFirst = false;
		return () => clearTimeout(debounce);
	}, [validation.values]);

	return (
		<UncontrolledDropdown>
			<DropdownToggle
				type="button"
				className="btn btn-light btn-outline-primary"
			>
				<i className="mdi mdi-plus" /> Add Filters
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-md p-4" style={{ width: '40rem' }}>
				<h6>Filters</h6>
				<Row>
					<Col lg={12}>
						<Card className="filter-card">
							<Row>
								<Col xxl={12} xl={12} lg={12} md={12} sm={12}>
									<Row className="g-3">
										{filterFields?.map(
											(field) =>
												!field?.isHide && (
													<Col
														xxl={customFieldCols?.xxl}
														xl={customFieldCols?.xl}
														lg={customFieldCols?.lg}
														md={customFieldCols?.md}
														sm={customFieldCols?.sm}
														key={field?.name || field?.label}
													>
														<div className="position-relative">
															<input style={{ display: 'none' }} />
															{getField(field, validation)}
														</div>
													</Col>
												)
										)}
									</Row>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

CustomFilters.defaultProps = {
	// isAdvanceOpen: false,
	validation: {},
	customFieldCols: { xxl: 6, xl: 6, lg: 6, md: 6, sm: 6 },
};

CustomFilters.propTypes = {
	filterFields: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
	handleFilter: PropTypes.func.isRequired,
	validation: PropTypes.objectOf(
		oneOfType([
			PropTypes.object,
			PropTypes.func,
			PropTypes.bool,
			PropTypes.number,
			PropTypes.string,
		])
	),
	customFieldCols: PropTypes.objectOf({
		xxl: PropTypes.number,
	}),
};

export default CustomFilters;
