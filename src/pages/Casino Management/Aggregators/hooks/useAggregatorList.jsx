/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { ID, Name, Status } from '../AggregatorListCol';
import usePermission from '../../../../components/Common/Hooks/usePermission';
import { modules } from '../../../../constants/permissions';

const useAggregatorList = (handleStatus) => {
	const { isGranted, permissions } = usePermission();
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <ID value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => {
					const active = cell?.row?.original?.isActive;
					const gameAggregatorId = cell?.row?.original?.gameAggregatorId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{active ? (
									<Button
										hidden={!isGranted(modules.casinoManagement, 'TS')}
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
											id={`aggregator-${gameAggregatorId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`aggregator-${gameAggregatorId}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Button>
								) : (
									<Button
										hidden={!isGranted(modules.casinoManagement, 'TS')}
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
											id={`aggregator-${gameAggregatorId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`aggregator-${gameAggregatorId}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Button>
								)}
							</li>
						</ul>
					);
				},
			},
		],
		[permissions]
	);
	return columns;
};

export default useAggregatorList;
