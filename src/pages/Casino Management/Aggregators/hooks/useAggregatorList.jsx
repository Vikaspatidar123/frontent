/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import { Name, Status } from '../AggregatorListCol';

const useAggregatorList = (handleStatus) => {
	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: 'gameAggregatorId',
			// 	filterable: true,
			// 	Cell: (cellProps) => <ID {...cellProps} />,
			// },
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
				Cell: ({ cell }) => {
					const active = cell?.row?.original?.isActive;
					const gameAggregatorId = cell?.row?.original?.gameAggregatorId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{active ? (
									<Link
										to="#"
										className="btn btn-sm btn-soft-danger"
										onClick={(e) =>
											handleStatus(e, {
												active,
												gameAggregatorId,
											})
										}
									>
										<i
											className="mdi mdi-close-thick"
											id={`inactive-aggregator-${gameAggregatorId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`inactive-aggregator-${gameAggregatorId}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Link>
								) : (
									<Link
										to="#"
										className="btn btn-sm btn-soft-success"
										onClick={(e) =>
											handleStatus(e, {
												active,
												gameAggregatorId,
											})
										}
									>
										<i
											className="mdi mdi-check-circle"
											id={`active-aggregator-${gameAggregatorId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-aggregator-${gameAggregatorId}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Link>
								)}
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);
	return columns;
};

export default useAggregatorList;
