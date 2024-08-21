/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { createPortal } from 'react-dom';
import {
	Card,
	Col,
	DropdownMenu,
	DropdownToggle,
	Row,
	UncontrolledDropdown,
	Button,
} from 'reactstrap';
import PropTypes, { oneOfType } from 'prop-types';
import { getField } from '../../helpers/customForms';
import { debounceTime } from '../../constants/config';
import TableSearchInput from './TableSearchInput';

let debounce;
const CustomFilters = ({
	filterFields,
	validation,
	customFieldCols,
	handleFilter,
	showSearchInput,
	searchInputPlaceHolder,
	hideCustomFilter,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown open/close
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

	// const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

	const handleClose = () => {
		setDropdownOpen(false);
	};

	const tableElement =
		showSearchInput && document.getElementById('search-input-portal');

	return (
		<>
			{tableElement
				? createPortal(
						<TableSearchInput
							validation={validation}
							placeholder={searchInputPlaceHolder}
						/>,
						tableElement
				  )
				: null}
			<UncontrolledDropdown isOpen={dropdownOpen}>
				<DropdownToggle
					type="button"
					style={{ display: hideCustomFilter ? 'none' : 'block' }}
					className="btn btn-light btn-outline-primary"
					onClick={() => setDropdownOpen((prev) => !prev)} // Only open the dropdown on click
				>
					<i className="mdi mdi-plus" /> Add Filters
				</DropdownToggle>
				<DropdownMenu
					className="dropdown-menu-md p-4"
					style={{ width: '65vw', maxWidth: '40rem' }}
				>
					<h5>
						<b>Filters</b>
					</h5>
					<hr />
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
										<Row className="mt-3">
											<Col className="d-flex justify-content-end">
												<Button
													color="link"
													className="btn btn-link waves-effect"
													onClick={handleClose}
												>
													Close
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</DropdownMenu>
			</UncontrolledDropdown>
		</>
	);
};

CustomFilters.defaultProps = {
	validation: {},
	customFieldCols: { xxl: 6, xl: 6, lg: 6, md: 6, sm: 6 },
	showSearchInput: true,
	searchInputPlaceHolder: 'Search...',
	hideCustomFilter: false,
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
	showSearchInput: PropTypes.bool,
	searchInputPlaceHolder: PropTypes.string,
	hideCustomFilter: PropTypes.bool,
};

export default CustomFilters;
