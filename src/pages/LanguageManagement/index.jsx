/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useLanguageManagementListing from './hooks/useLanguageManagementListing';
import { English, Keys } from './LanguageManagementCol';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';

const LanguageManagementList = () => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

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
			// {
			// 	Header: 'Action',
			// 	// accessor: 'username',
			// 	filterable: true,
			// 	Cell: (cellProps) => <Action {...cellProps} />,
			// },
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Site Configurations"
						breadcrumbItem="Language Management"
					/>
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Languages Management" />
							<CardBody>
								<TableContainer
									isLoading={isLanguageManagementLoading}
									columns={columns}
									data={formattedLanguageManagement}
									isManualPagination
									isGlobalFilter
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

LanguageManagementList.propTypes = {
	// t: PropTypes.func,
};

LanguageManagementList.defaultProps = {
	t: (string) => string,
};

export default LanguageManagementList;
