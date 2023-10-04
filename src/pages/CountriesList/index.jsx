import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { fetchCountriesStart } from '../../store/actions';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CustomTable from '../../components/Common/Table';

const tableHeaders = [
	{ id: 1, label: 'Id' },
	{ id: 2, label: 'Country Code' },
	{ id: 3, label: 'Country Name' },
	{ id: 4, label: 'Language' },
	{ id: 5, label: 'Status' },
	{ id: 6, label: 'Actions' },
];

const dummyData = [1, 'AF', 'Afghanistan', 'Finnish', 'Active', 'none'];

const CountriesList = ({ t }) => {
	// meta title
	document.title = 'Login | Skote - Vite React Admin & Dashboard Template';
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	useEffect(() => {
		dispatch(fetchCountriesStart());
	}, []);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Countries')} breadcrumbItem={t('Countries')} />
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Countries"
							onChange={({ target }) =>
								setName(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={name}
						/>
					</Col>
				</Row>
				<CustomTable tableHeader={tableHeaders} data={dummyData} />
			</Container>
		</div>
	);
};

CountriesList.propTypes = {
	t: PropTypes.func,
};

CountriesList.defaultProps = {
	t: (string) => string,
};

export default CountriesList;
