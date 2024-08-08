/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { Card, Col, Row, UncontrolledTooltip } from 'reactstrap';
import PropTypes, { oneOfType } from 'prop-types';
import { getField } from '../../helpers/customForms';
import { debounceTime } from '../../constants/config';

let debounce;
const Filters = ({
	filterFields,
	validation,
	customFieldCols,
	filterValues,
	customActions,
	handleFilter,
}) => {
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const ref = useRef({
		isFirst: true,
		prevValues: null,
	});

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

	useEffect(() => {
		if (
			!ref.isFirst.current &&
			!isEqual(validation.values, ref.prevValues.current)
		) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			ref.prevValues.current = validation.values;
		}
		ref.isFirst.current = false;
		if (isEqual(filterValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	const actionButtons = useMemo(() => [
		{
			type: 'button',
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
		...customActions,
	]);

	return (
		<Row>
			<Col lg={12}>
				<Card className="filter-card">
					<Row>
						<Col xxl={11} xl={11} lg={11} md={11} sm={11}>
							<Row className="g-3">
								{filterFields?.map(
									(field) =>
										!field?.isHide && (
											<Col
												xxl={customFieldCols?.xxl || 2}
												xl={customFieldCols?.xl || 3}
												lg={customFieldCols?.lg || 4}
												md={customFieldCols?.md || 4}
												sm={customFieldCols?.sm || 6}
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
						<Col
							xxl={1}
							xl={1}
							lg={1}
							md={1}
							sm={1}
							className="align-symbol-end"
						>
							{isFilterChanged &&
								actionButtons?.map(
									({ icon, handleClick, isHide, tooltip, id }) =>
										!isHide && (
											<Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
												<div className="position-relative h-100 hstack gap-3">
													<i
														className={`${icon} align-middle filter-icons`}
														onClick={handleClick}
														onKeyDown={() => {}}
														id={id || icon || 'clear-filter'}
													/>
													<UncontrolledTooltip
														placement="top"
														target={id || icon || 'clear-filter'}
													>
														{tooltip}
													</UncontrolledTooltip>
												</div>
											</Col>
										)
								)}
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	);
};

Filters.defaultProps = {
	// isAdvanceOpen: false,
	validation: {},
	customFieldCols: {},
	customActions: [],
};

Filters.propTypes = {
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
	customActions: PropTypes.arrayOf(PropTypes.objectOf),
	customFieldCols: PropTypes.objectOf({
		xxl: PropTypes.number,
	}),
	filterValues: PropTypes.func.isRequired,
};

export default Filters;
