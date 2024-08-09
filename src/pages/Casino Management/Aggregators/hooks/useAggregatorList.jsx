/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { ID, Name, Status } from '../AggregatorListCol';
import usePermission from '../../../../components/Common/Hooks/usePermission';
import { modules } from '../../../../constants/permissions';
import { iconClass } from '../../../../utils/constant';
import Actions from '../../../../components/Common/Actions';

const useAggregatorList = (handleStatus) => {
	const { isGranted, permissions } = usePermission();

	const actionsList = [
		{
			actionName: 'Toggle Status',
			actionHandler: handleStatus,
			isHidden: !isGranted(modules.casinoManagement, 'TS'),
			icon: iconClass.toggleStatus,
			iconColor: 'text-success',
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
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
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[permissions]
	);
	return columns;
};

export default useAggregatorList;
