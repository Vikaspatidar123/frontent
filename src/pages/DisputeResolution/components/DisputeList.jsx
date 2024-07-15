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
// import { useSelector } from "react-redux";

const DisputeList = () => {
	// const { disputes } = useSelector((state) => state.Disputes);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen(!dropdownOpen);
	const handleDisputeClick = () => {};

	return (
		<Card className="email-leftbar">
			<h6 className="mt-4">All Disputes</h6>

			<div className="mail-list mt-1">
				<Link to="javascript:" onClick={() => handleDisputeClick()}>
					<span className="mdi mdi-arrow-right-drop-circle text-primary float-start me-2" />
					Ronik
					<i
						className="mdi mdi-dots-vertical font-size-18 float-end"
						onClick={toggle}
						style={{ cursor: 'pointer' }}
					/>
					<UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle
							href="#"
							className="card-drop"
							tag="a"
							style={{ display: 'none' }} // Hide the original toggle
						>
							{/* Hidden Toggle */}
						</DropdownToggle>
						<DropdownMenu className="dropdown-menu-end">
							<DropdownItem
								href="#"
								onClick={() => {
									// Handle Resolve action
									toggle();
								}}
							>
								<i className="mdi mdi-check-all font-size-16 text-success me-1" />{' '}
								Resolve
							</DropdownItem>
							<DropdownItem
								href="#"
								onClick={() => {
									// Handle Delete action
									toggle();
								}}
							>
								<i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{' '}
								Delete
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Link>
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
