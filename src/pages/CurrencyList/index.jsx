/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
// import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useCurrencyListing from './hooks/useCurrencyListing';
import { projectName } from '../../constants/config';
import FormModal from '../../components/Common/FormModal';
import useCreateCurrency from './hooks/useCreateCurrency';
import CrudSection from '../../components/Common/CrudSection';

const CurrencyList = () => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		currentPage,
		setCurrentPage,
		totalCurrenciesCount,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useCurrencyListing();

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		isCreateCurrencyLoading,
		buttonList,
		columns,
		isEditCurrencyLoading,
	} = useCreateCurrency();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Site Configurations" breadcrumbItem="Currencies" />
				)}
				{/* <Breadcrumb
					title={t('Site Configurations')}
					breadcrumbItem={t('Currencies')}
				/> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Currency" />
							<CardBody>
								<TableContainer
									isLoading={isCurrenciesLoading}
									columns={columns}
									data={formattedCurrencies}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCurrenciesCount}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateCurrencyLoading || isEditCurrencyLoading}
				/>
			</Container>
		</div>
	);
};

CurrencyList.propTypes = {
	// t: PropTypes.func,
};

CurrencyList.defaultProps = {
	t: (string) => string,
};

export default CurrencyList;
