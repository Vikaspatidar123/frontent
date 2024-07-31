/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'; // Ensure this import matches your library setup
import { Button, Card, Col, Row } from 'reactstrap';
import MultiSelect from './MultiSelect';
import { INITIAL_FILTERS } from '../constant';

const DashboardFilters = ({ handleDashFilters }) => {
	const [filters, setFilters] = useState(INITIAL_FILTERS);

	const [isPickerVisible, setPickerVisible] = useState(false);
	const pickerRef = useRef(null);

	const handleInputClick = () => {
		setPickerVisible((prev) => !prev);
	};

	const handleApplyFilter = () => {
		handleDashFilters(filters);
	};

	const handleChange = (item) => {
		const { startDate, endDate } = item.selection || {};
		setFilters((prev) => ({
			...prev,
			fromDate: startDate,
			toDate: endDate,
		}));
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (pickerRef.current && !pickerRef.current.contains(event.target)) {
				setPickerVisible(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [pickerRef]);

	return (
		<Card className="p-3">
			<Row className="align-items-center">
				<Col xl={4} xs={6}>
					<div ref={pickerRef}>
						<input
							type="text"
							className="form-control cursor-pointer"
							onClick={handleInputClick}
							value={`${filters?.fromDate?.toLocaleDateString() || ''} - ${
								filters?.toDate?.toLocaleDateString() || ''
							}`}
							readOnly
						/>
						{isPickerVisible && (
							<DateRangePicker
								className="dash-date-range"
								onChange={handleChange}
								showSelectionPreview
								moveRangeOnFirstSelection={false}
								months={2}
								ranges={[
									{
										startDate: filters.fromDate,
										endDate: filters.toDate,
										key: 'selection',
									},
								]}
								direction="horizontal"
								preventSnapRefocus
								calendarFocus="backwards"
								maxDate={new Date()}
							/>
						)}
					</div>
				</Col>
				<Col xl={4} xs={6}>
					<MultiSelect filters={filters} setFilters={setFilters} />
				</Col>
				<Col xl={4} xs={6} className="d-flex justify-content-end">
					<Button color="primary" onClick={handleApplyFilter}>
						Apply
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default DashboardFilters;
