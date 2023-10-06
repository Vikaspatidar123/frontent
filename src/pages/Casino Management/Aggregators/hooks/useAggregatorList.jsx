/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import { ID, Name, Status } from '../AggregatorListCol';

const useAggregatorList = () => {
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'gameAggregatorId',
				filterable: true,
				Cell: (cellProps) => <ID {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableFilters: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: () => (
					<ul className="list-unstyled hstack gap-1 mb-0">
						<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
							<Link to="/job-details" className="btn btn-sm btn-soft-primary">
								<i className="mdi mdi-eye-outline" id="viewtooltip" />
							</Link>
						</li>
						<UncontrolledTooltip placement="top" target="viewtooltip">
							View
						</UncontrolledTooltip>

						<li>
							<Link
								to="/#"
								className="btn btn-sm btn-soft-info"
								onClick={() => {
									// FIXME: Add logic
								}}
							>
								<i className="mdi mdi-pencil-outline" id="edittooltip" />
								<UncontrolledTooltip placement="top" target="edittooltip">
									Edit
								</UncontrolledTooltip>
							</Link>
						</li>

						<li>
							<Link
								to="/#"
								className="btn btn-sm btn-soft-danger"
								onClick={() => {
									// FIXME: Add logic
									//
								}}
							>
								<i className="mdi mdi-delete-outline" id="deletetooltip" />
								<UncontrolledTooltip placement="top" target="deletetooltip">
									Delete
								</UncontrolledTooltip>
							</Link>
						</li>
					</ul>
				),
			},
		],
		[]
	);
	return columns;
};

export default useAggregatorList;
