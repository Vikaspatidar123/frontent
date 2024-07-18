/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
	Card,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import { useSelector } from "react-redux";

const DisputeList = ({
	disputes,
	loading,
	selectedDispute,
	setSelectedDispute,
	updateStatus,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const DISPUTE_STATUS = [
		{
			label: 'Pending',
			value: 'pending',
		},
		{
			label: 'Active',
			value: 'active',
		},
		{
			label: 'Resolved',
			value: 'resolved',
		},
		{
			label: 'ReOpened',
			value: 'reopened',
		},
	];

	return (
		<Card className="email-leftbar">
			<h6 className="mt-4 font-weight-bold">All Disputes</h6>

			<div className="mail-list mt-1">
				{disputes?.threadTickets?.map(({ subject, id, status }) => (
					<Link
						to="javascript:"
						onClick={() => setSelectedDispute(id)}
						className={`dispute ${
							id === selectedDispute ? 'active-dispute' : ''
						}`}
					>
						<span className="mdi mdi-arrow-right-drop-circle text-primary float-start me-2" />
						<span className="subject-ellipsis">{subject}</span>

						<i
							className="mdi mdi-dots-vertical font-size-18 float-end"
							onClick={() => setDropdownOpen(id)}
							style={{ cursor: 'pointer' }}
						/>
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
				))}
				{!disputes?.threadTickets?.length && !loading ? (
					<p className="mt-4">No disputes found!</p>
				) : null}
			</div>

			<div className="d-flex justify-content-end">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					onPageChange={() => {}}
					pageCount={99}
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
					pageRangeDisplayed={1} // Only display one page
					marginPagesDisplayed={0}
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
};

DisputeList.defaultProps = {
	disputes: [],
	loading: false,
	selectedDispute: '',
};
