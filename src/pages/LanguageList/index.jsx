/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { Id, LanguageCode, LanguageName } from './LanguageListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useLanguageListing from './hooks/useLanguageListing';
import { projectName } from '../../constants/config';

const LanguageList = ({ t }) => {
	document.title = `Languages | ${projectName}`;

	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalLanguagesCount,
		isLanguagesLoading,
		formattedLanguages,
		itemsPerPage,
	} = useLanguageListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'languageId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Language Code',
				accessor: 'code',
				filterable: true,
				Cell: (cellProps) => <LanguageCode {...cellProps} />,
			},
			{
				Header: 'Language Name',
				accessor: 'languageName',
				filterable: true,
				Cell: (cellProps) => <LanguageName {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Languages')} breadcrumbItem={t('Languages')} />
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Languages"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
				<TableContainer
					isLoading={isLanguagesLoading}
					columns={columns}
					data={formattedLanguages}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalLanguagesCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

LanguageList.propTypes = {
	t: PropTypes.func,
};

LanguageList.defaultProps = {
	t: (string) => string,
};

export default LanguageList;
