/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useLanguageManagementListing from './hooks/useLanguageManagementListing';
import { Action, English, Keys } from './LanguageManagementCol';
import { projectName } from '../../constants/config';

const LanguageManagementList = ({ t }) => {
	document.title = projectName;

	const { isLanguageManagementLoading, formattedLanguageManagement } =
		useLanguageManagementListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Keys',
				accessor: 'keys',
				filterable: true,
				Cell: (cellProps) => <Keys {...cellProps} />,
			},
			{
				Header: 'English',
				accessor: 'english',
				filterable: true,
				Cell: (cellProps) => <English {...cellProps} />,
			},
			{
				Header: 'Action',
				// accessor: 'username',
				filterable: true,
				Cell: (cellProps) => <Action {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Site Configurations')}
					breadcrumbItem={t('Language Management')}
				/>
				{/* <Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Language Management"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row> */}
				<TableContainer
					isLoading={isLanguageManagementLoading}
					columns={columns}
					data={formattedLanguageManagement}
					isManualPagination
					isGlobalFilter
				/>
			</Container>
		</div>
	);
};

LanguageManagementList.propTypes = {
	t: PropTypes.func,
};

LanguageManagementList.defaultProps = {
	t: (string) => string,
};

export default LanguageManagementList;
