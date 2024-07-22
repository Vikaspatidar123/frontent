/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
	Badge,
	Card,
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row,
	UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { DISPUTE_STATUS, DISPUTE_STATUS_COLOR } from '../constants';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';

const DisputeList = ({
	disputes,
	loading,
	selectedDispute,
	setSelectedDispute,
	updateStatus,
	filters,
	setFilters,
	setPage,
	page,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const getUnreadContent = (unread) => {
		const num = Number(unread || 0);
		if (num > 9) return '9+';
		return num;
	};

	return (
		<Card className="email-leftbar">
			<h6 className="mt-2 font-weight-bold d-flex align-items-center">
				<span className="mdi mdi-forum fs-2 me-3" />
				All Disputes
			</h6>

			<Row>
				<Col xl={6} xs={6}>
					<CustomInputField
						label="Username"
						onChange={(e) => {
							setFilters((prev) => ({ ...prev, username: e.target.value }));
							if (page > 1) setPage(1);
						}}
						placeholder="Search"
						value={filters?.username}
					/>
				</Col>
				<Col xl={6} xs={6}>
					<CustomSelectField
						value={filters?.status}
						label="Status"
						type="select"
						onChange={(e) => {
							setFilters((prev) => ({ ...prev, status: e.target.value }));
							if (page > 1) setPage(1);
						}}
						options={
							<>
								<option value={null} selected disabled>
									Select
								</option>
								{DISPUTE_STATUS?.map(({ value, label }) => (
									<option value={value} key={value}>
										{label}
									</option>
								))}
							</>
						}
					/>
				</Col>
			</Row>
			<hr />
			<div className="mail-list mt-1">
				{disputes?.threadTickets?.map(
					({ subject, id, status, unread_message_count }) => (
						<Link
							to="javascript:"
							onClick={() => setSelectedDispute(id)}
							className={`dispute d-flex align-items-center justify-content-between ${
								id === selectedDispute ? 'active-dispute' : ''
							}`}
						>
							<div className="d-flex align-items-center w-150">
								<span className="subject-ellipsis">{subject}</span>
							</div>
							{status ? (
								<div className="d-flex align-items-center">
									{unread_message_count !== '0' ? (
										<Badge color="danger">
											{getUnreadContent(unread_message_count)}
										</Badge>
									) : null}
									<Badge
										color={DISPUTE_STATUS_COLOR?.[status]?.color}
										className="ms-3"
									>
										{`${status?.[0]?.toUpperCase()}${status.slice(1)}`}
									</Badge>
								</div>
							) : null}
							<div className="d-flex align-items-center">
								<i
									className="mdi mdi-dots-vertical font-size-18"
									onClick={() => setDropdownOpen(id)}
									style={{ cursor: 'pointer' }}
								/>
							</div>
							{dropdownOpen === id ? (
								<UncontrolledDropdown isOpen toggle={() => setDropdownOpen('')}>
									<DropdownToggle
										href="#"
										className="card-drop"
										tag="a"
										style={{ display: 'none' }}
									/>
									<DropdownMenu className="dropdown-menu-end">
										{DISPUTE_STATUS?.map(({ label, value }) => (
											<DropdownItem
												onClick={() => {
													updateStatus({ threadId: id, status: value });
													setDropdownOpen('');
												}}
											>
												{label}{' '}
												{status === value ? (
													<i className="mdi mdi-check font-size-16 text-success me-1" />
												) : (
													''
												)}
											</DropdownItem>
										))}
									</DropdownMenu>
								</UncontrolledDropdown>
							) : null}
						</Link>
					)
				)}
				{!disputes?.threadTickets?.length && !loading ? (
					<p className="mt-4">No disputes found!</p>
				) : null}
			</div>

			<div className="d-flex justify-content-end">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					onPageChange={(newPage) => setPage((newPage?.selected || 0) + 1)}
					pageCount={disputes?.totalPages}
					previousLabel="<"
					renderOnZeroPageCount={null}
					pageClassName="page-item"
					pageLinkClassName="page-link"
					previousClassName="page-item"
					previousLinkClassName="page-link"
					nextClassName="page-item"
					nextLinkClassName="page-link"
					breakClassName="page-item"
					breakLinkClassName="page-link"
					containerClassName="pagination"
					activeClassName="active"
					pageRangeDisplayed={4}
					marginPagesDisplayed={4}
					currentPage={page - 1}
				/>
			</div>
		</Card>
	);
};

export default DisputeList;

DisputeList.propTypes = {
	disputes: PropTypes.arrayOf({
		id: PropTypes.string,
	}),
	loading: PropTypes.bool,
	selectedDispute: PropTypes.string,
	setSelectedDispute: PropTypes.func.isRequired,
	updateStatus: PropTypes.func.isRequired,
	setPage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	filters: PropTypes.objectOf({
		status: PropTypes.string,
		searchString: PropTypes.string,
	}).isRequired,
	setFilters: PropTypes.func.isRequired,
};

DisputeList.defaultProps = {
	disputes: [],
	loading: false,
	selectedDispute: '',
};
