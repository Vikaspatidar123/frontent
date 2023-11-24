/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { CustomInputField } from '../../../helpers/customForms';
import Spinners from '../../../components/Common/Spinner';
import TableContainer from '../../../components/Common/TableContainer';

const tableColumns = ({
	selectedCountries,
	myCountries,
	setSelectedCountries,
}) => [
	{
		Header: 'Countries',
		accessor: 'name',
		disableSortBy: true,
		Cell: (cellProps) => (
			<span>
				{cellProps?.value}&nbsp;({cellProps?.row?.original?.code})
			</span>
		),
	},
	{
		Header: () => (
			<>
				{' '}
				<CustomInputField
					type="checkbox"
					name="selectAll"
					checked={
						myCountries.length > 0 &&
						myCountries.every((v) => selectedCountries?.includes(v.code))
					}
					onClick={(e) => {
						const newData = [];
						if (!e.target.checked) {
							myCountries.forEach((v) => newData.push(v.code));
							setSelectedCountries(newData);
						} else {
							setSelectedCountries([]);
						}
					}}
				/>
				&nbsp; Block
			</>
		),
		accessor: 'code',
		disableSortBy: true,
		Cell: (cellProps) => (
			<CustomInputField
				type="checkbox"
				name={cellProps?.value}
				checked={selectedCountries?.includes(cellProps?.value)}
				onClick={(e) => {
					if (!e.target.checked) {
						if (selectedCountries?.length > 0) {
							setSelectedCountries([...selectedCountries, cellProps?.value]);
						} else {
							setSelectedCountries([cellProps?.value]);
						}
					} else {
						setSelectedCountries(
							selectedCountries?.filter((c) => c !== cellProps?.value)
						);
					}
				}}
			/>
		),
	},
];

const BonusCountry = ({ selectedCountries, setSelectedCountries }) => {
	const [search, setSearch] = useState('');
	const [myCountries, setMyCountries] = useState([]);
	const { countries, loading } = useSelector((state) => state.Countries);

	const setCountries = () => {
		if (countries?.length) {
			const countryData = countries;
			const country = [];
			countryData.forEach(({ name, code }) => {
				if (name.toLowerCase().includes(search.toLowerCase())) {
					country.push({ name, code });
				}
				setMyCountries(country);
			});
		}
	};

	useEffect(() => {
		setCountries();
	}, [countries, search]);

	const columns = useMemo(
		() =>
			tableColumns({ setSelectedCountries, myCountries, selectedCountries }),
		[selectedCountries]
	);

	return (
		<Container fluid>
			<Row className="d-flex justify-content-end align-items-end">
				<Col sm="6" className="mb-3">
					<CustomInputField
						label="Search Country"
						type="text"
						placeholder="Search Country Name"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value.replace(/[^\w\s\n]/gi, ''));
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') e.preventDefault();
						}}
					/>
				</Col>
			</Row>
			<Row>
				{loading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<Col lg="12" className="mb-3">
						<TableContainer
							isLoading={loading}
							columns={columns}
							data={myCountries}
							tableClass="table-bordered align-middle nowrap mt-2"
							isManualPagination
							isLongTable
						/>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default BonusCountry;
