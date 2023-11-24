/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { fetchCountriesStart } from '../../../store/actions';
import Spinners from '../../../components/Common/Spinner';
import TableContainer from '../../../components/Common/TableContainer';

const columns = [
	{
		Header: 'Blocked Countries',
		accessor: 'name',
		disableSortBy: true,
		Cell: (cellProps) => (
			<span>
				{cellProps?.value}&nbsp;({cellProps?.row?.original?.code})
			</span>
		),
	},
];

const BonusCountry = ({ bonusCountryData }) => {
	const dispatch = useDispatch();
	const [myCountries, setMyCountries] = useState([]);

	const { countries, loading } = useSelector((state) => state.Countries);

	useEffect(() => {
		if (!countries) {
			dispatch(fetchCountriesStart());
		}
	}, []);

	const setCountries = () => {
		if (countries?.length) {
			const country = [];
			countries.forEach(({ name, code }) => {
				if (bonusCountryData?.includes(code)) {
					country.push({ name, code });
				}
			});
			setMyCountries(country);
		}
	};

	useEffect(() => {
		setCountries();
	}, [countries, bonusCountryData]);

	return (
		<Container fluid>
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
