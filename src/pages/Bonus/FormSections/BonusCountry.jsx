/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { CustomInputField } from '../../../helpers/customForms';
import { fetchCountriesStart } from '../../../store/actions';
import Spinners from '../../../components/Common/Spinner';

const BonusCountry = ({ selectedCountries, setSelectedCountries }) => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const [myCountries, setMyCountries] = useState([]);

	const { countries, loading } = useSelector((state) => state.Countries);

	useEffect(() => {
		if (countries?.length !== myCountries?.length) {
			dispatch(fetchCountriesStart());
		}
	}, []);

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

	return (
		<Container fluid>
			<Row className="d-flex justify-content-end align-items-end">
				<CustomInputField
					type="text"
					placeholder="Search Country Name"
					size="sm"
					style={{ maxWidth: '230px' }}
					value={search}
					onChange={(event) => {
						setSearch(event.target.value.replace(/[^\w\s\n]/gi, ''));
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') e.preventDefault();
					}}
				/>
			</Row>
			<Row className="table-responsive react-table">
				{loading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<div style={{ overflowY: 'auto', maxHeight: '700px' }}>
						<table className="table-bordered align-middle nowrap mt-2 table">
							<thead className="table-light">
								<tr>
									<th> Country</th>
									<th>
										<CustomInputField
											type="checkbox"
											name="selectAll"
											checked={
												myCountries.length > 0 &&
												myCountries.every((v) =>
													selectedCountries?.includes(v.code)
												)
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
									</th>
								</tr>
							</thead>
							<tbody>
								{!loading &&
									myCountries?.map(({ name, code }) => (
										<tr key={code}>
											<td>
												{name} ({code})
											</td>
											<td>
												<CustomInputField
													type="checkbox"
													name={code}
													checked={selectedCountries?.includes(code)}
													onClick={(e) => {
														if (!e.target.checked) {
															if (selectedCountries?.length > 0) {
																setSelectedCountries([
																	...selectedCountries,
																	code,
																]);
															} else {
																setSelectedCountries([code]);
															}
														} else {
															setSelectedCountries(
																selectedCountries?.filter((c) => c !== code)
															);
														}
													}}
												/>
											</td>
										</tr>
									))}
								{!loading && myCountries?.length === 0 && (
									<tr>
										<td colSpan={2} className="text-danger text-center">
											No data found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</Row>
		</Container>
	);
};

export default BonusCountry;
