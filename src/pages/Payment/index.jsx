/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Col,
	Row,
	Card,
	CardBody,
	Button,
	Spinner,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Common/Breadcrumb';
// import TableContainer from '../../components/Common/Table';
import {
	projectName,
	selectedLanguage,
	// tableCustomClass,
	// tbodyClass,
} from '../../constants/config';
import useFilters from './hooks/useFilters';
import usePaymentListing from './hooks/usePaymentListing';
// import useAddNewProvider from './hooks/useAddNewProvider';
// import FormModal from '../../components/Common/FormModal';
import NoDataFound from '../../components/Common/NoDataFound';
import fallbackImage from '../../assets/images/PayMentProvider/credit-card.png';

const PaymentProviders = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		isLoading,
		// totalPages,
		page,
		// setPage,
		// itemsPerPage,
		// columns,
		paymentListing,
		actionList,
		navigate,
		fetchMoreData,
	} = usePaymentListing(false, filterValidation.values);

	// const {
	// 	validation,
	// 	formFields,
	// 	isOpen,
	// 	handleProviderClick,
	// 	setHeader,
	// 	paymentProviderData,
	// 	isLoadinpaymentProvider,
	// 	// onBackClick,
	// 	// buttonList,
	// 	fetchMoreData,
	// 	// page,
	// 	toggleFormModal,
	// 	header,
	// 	selectedProvider,
	// } = useAddNewProvider({
	// 	// type,
	// 	// setType,
	// });

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Payment" breadcrumbItem="Payment" />
				)}
				<div className="table-actions">
					<div id="search-input-portal" className="w-50" />
					<div className="d-flex justify-content-end w-100 custom-btn-group">
						{actionList}
						{filterComponent}
					</div>
				</div>
				<Row>
					<Col lg="12">
						<Card>
							<CardBody>
								<Container fluid>
									<Card className="">
										{selectedFiltersComponent}
										<Row className="pt-4">
											{isLoading ? (
												<div
													className="d-flex justify-content-center align-items-center"
													style={{ height: '200px' }}
												>
													<Spinner color="primary" />
												</div>
											) : !paymentListing?.paymentProviders?.length ? (
												<div className="d-flex justify-content-center align-items-center">
													<NoDataFound height="200px" width="300px" />
												</div>
											) : (
												paymentListing?.paymentProviders?.map((provider) => (
													<Col
														xs="6"
														sm="3"
														md="2"
														className="p-2 payment-card"
														key={provider.id}
													>
														<button
															type="button"
															onClick={(e) => {
																e.preventDefault();
																navigate(`details/${provider.id}`);
															}}
															className="provider-button"
														>
															<img
																src={provider.image || fallbackImage}
																alt={provider.name?.[selectedLanguage]}
																className="provider-image"
															/>
															<div className="provider-name">
																{provider.name?.[selectedLanguage]}
															</div>
															<div
																onClick={(e) => {
																	e.preventDefault();
																	e.stopPropagation();
																	navigate(`edit/${provider.id}`);
																}}
																className={`status-icon active-icon
																}`}
															>
																<i className="mdi mdi-pencil-outline" />
															</div>
														</button>
													</Col>
												))
											)}
										</Row>

										{paymentListing?.totalPages > page && (
											<div className="d-flex justify-content-center mb-3">
												<Button color="primary" outline onClick={fetchMoreData}>
													View More
												</Button>
											</div>
										)}
									</Card>
								</Container>
								{/* <TableContainer
									columns={columns || []}
									data={paymentListing?.paymentProviders || []}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									tbodyClass={tbodyClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPages}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={isLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/> */}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

PaymentProviders.propTypes = {
	// t: PropTypes.func,
};

PaymentProviders.defaultProps = {
	// t: (string) => string,
};

export default PaymentProviders;
