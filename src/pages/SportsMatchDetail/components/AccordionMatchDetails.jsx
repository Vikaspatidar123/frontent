import React from 'react';
import PropTypes from 'prop-types';
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Button,
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Spinner,
	// Table,
	UncontrolledDropdown,
} from 'reactstrap';
import { useSelector } from 'react-redux';

import VerticalIcon from '../../../assets/images/VerticalDots.svg';
import PencilIcon from '../../../assets/images/pencilIcon.svg';
import AttatchIcon from '../../../assets/images/attatchIcon.svg';
import DeatachIcon from '../../../assets/images/deatechIcon.svg';
import TableContainer from '../../../components/Common/Table';
// import { marketColumns } from './SportsMatchDetailsListCol';
// import TableContainer from '../../../components/Common/Table';

const AccordionMatchDetails = ({
	toggleModal,
	toggleDetachMarketModal,
	handleChange,
	setIsAllEvents,
	matchOdsDetails,
	showDetachMarketModal,
	marketDetail,
	handleDetachMarket,
	handleVarySubmit,
	varyType,
	setVaryType,
	varyPercentage,
	setVaryPercentage,
	showOddsModal,
	toggleAccordion,
	openAccordion,
	marketColumns,
}) => {
	const { isdeatechOdsVariationLoading, isUpdateOdsVariationLoading } =
		useSelector((state) => state?.SportsList);

	return (
		<div>
			<Accordion open={openAccordion} toggle={toggleAccordion}>
				{matchOdsDetails &&
					matchOdsDetails?.rows &&
					matchOdsDetails?.rows?.map((item, idx) => (
						<AccordionItem
							className="position-relative"
							key={`MatchDetailsPage ${idx + 1}`}
						>
							<div className="btn-group match-details-more">
								<UncontrolledDropdown group>
									<DropdownToggle color="">
										<img src={VerticalIcon} alt="" />
									</DropdownToggle>
									<DropdownMenu className="market-status-change-dropdown">
										<DropdownItem
											onClick={() => {
												toggleModal();
												handleChange(item);
												setIsAllEvents(false);
											}}
										>
											<img src={PencilIcon} alt="" /> Odds Variation
										</DropdownItem>
										<DropdownItem
											onClick={() => {
												toggleDetachMarketModal();
												handleChange(item);
												setIsAllEvents(false);
											}}
										>
											{item?.detach ? (
												<>
													{' '}
													<img src={DeatachIcon} alt="" /> Deteach
												</>
											) : (
												<>
													<img src={AttatchIcon} alt="" /> Attach
												</>
											)}{' '}
											Market
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</div>
							<AccordionHeader targetId={idx + 1}>
								<Row className="w-100">
									<Col className="text-align-center" xs="1">
										<b> #{idx + 1}.</b>
									</Col>
									<Col className="text-align-center" xs="3">
										<b> {item?.market?.name || '-'}</b>
									</Col>
									<Col className="text-align-center" xs="2">
										<b> Modification Type</b> <br />
										{item?.modificationType || '-'}
									</Col>
									<Col className="text-align-center" xs="2">
										<b> Modification Value</b> <br />
										{item?.modificationValue || '0'}
									</Col>
									<Col className="text-align-center" xs="2">
										<b> Detached</b> <br />
										<b>
											<span
												className={
													item?.detach ? 'text-success' : 'text-danger'
												}
											>
												{item?.detach ? 'YES' : 'NO'}
											</span>
										</b>
									</Col>
									<Col className="" xs="1" />
								</Row>
							</AccordionHeader>
							<AccordionBody accordionId={idx + 1}>
								{/* <Table
									striped
									responsive
									hover
									size="sm"
									className="table-bordered align-middle nowrap mt-2 match-details-table"
								>
									<thead className="thead-light">
										<tr className="text-center">
											<th>#</th>
											<th>Name</th>
											<th>Feed Odd</th>
											<th>Company Odd</th>
											<th>Actions</th>
										</tr>
									</thead>

									<tbody>
										{item.outcomes &&
											item.outcomes.map((value, index) => (
												<tr
													className="w-100 text-center"
													key={`MatchOds ${index + 1}`}
												>
													<td style={{ width: '5%' }}>{index + 1}</td>
													<td style={{ width: '25%' }}>
														{value?.name}
														{item?.market?.id === '209' &&
															value?.specialBetValue
															? ` (${value?.specialBetValue})`
															: ''}
													</td>
													<td style={{ width: '20%' }}>{value?.price}</td>
													<td style={{ width: '20%' }}>{value?.customOdd}</td>

													<td style={{ width: '30%' }}>
														<div className="d-flex justify-content-start align-items-start ">
															<Input
																type="number"
																disabled={!item?.detach}
																value={varyPercentageMap[index] || ''}
																maxLength={3}
																onChange={(e) => {
																	const newVaryPercentage = e.target.value;
																	setVaryPercentageMap((prevState) => ({
																		...prevState,
																		[index]: newVaryPercentage,
																	}));
																}}
																placeholder="Enter odd"
															/>
															<Button
																disabled={!item?.detach}
																onClick={() =>
																	handleSetClick(value, item, index)
																}
																color="info"
															>
																Set
															</Button>
														</div>
													</td>
												</tr>
											))}
									</tbody>
								</Table> */}
								<TableContainer
									columns={marketColumns || []}
									data={item.outcomes || []}
									// isPagination
									// customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									// totalPageCount={totalGamesCount}
									// isManualPagination
									// onChangePagination={setCurrentPage}
									// currentPage={currentPage}
									// isLoading={isCategoryAddedGamesLoading}
									// changeRowsPerPageCallback={onChangeRowsPerPage}
									tbodyHeight="200px"
								/>
							</AccordionBody>
						</AccordionItem>
					))}
			</Accordion>

			<Modal isOpen={showDetachMarketModal} toggle={toggleDetachMarketModal}>
				<ModalHeader>Confirm</ModalHeader>
				<ModalBody>
					{!marketDetail?.isDetached
						? `Are you sure, you want to detach Market ${marketDetail?.name}`
						: `Are you sure, you want to attach Market ${marketDetail?.name} With More Including Overtime (No Draw)`}{' '}
					?
				</ModalBody>
				<ModalFooter className="d-flex justify-content-between align-items-center">
					<Button
						className="btn-danger"
						onClick={() => toggleDetachMarketModal()}
					>
						Cancel
					</Button>
					<Button className="btn-primary" onClick={handleDetachMarket}>
						Yes
						{isdeatechOdsVariationLoading && (
							<Spinner
								className="ms-3"
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						)}
					</Button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={showOddsModal} toggle={toggleModal}>
				<ModalHeader>Odds Variation</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label for="exampleSelect">Select</Label>
						<Input
							id="exampleSelect"
							name="select"
							type="select"
							onChange={(e) => {
								setVaryType(e.target.value);
							}}
							value={varyType}
						>
							<option disabled>Select</option>
							<option value="increase">Increase</option>
							<option value="decrease">Decrease</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Input
							type="number"
							onChange={(e) => setVaryPercentage(e.target.value)}
							value={varyPercentage}
							placeholder="Enter odd Percentage Value"
							aria-label=""
							aria-describedby="percentage"
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter className="d-flex justify-content-between align-items-center">
					<Button className="btn-danger" onClick={() => toggleModal()}>
						Cancel
					</Button>
					<Button
						className="btn-primary"
						onClick={() => {
							handleVarySubmit();
						}}
					>
						Ok
						{isUpdateOdsVariationLoading && (
							<Spinner
								className="ms-3"
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						)}
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};
AccordionMatchDetails.propTypes = PropTypes.any;

export default AccordionMatchDetails;
