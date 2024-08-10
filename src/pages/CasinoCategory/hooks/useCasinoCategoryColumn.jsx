/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import {
	// GameCategoryId,
	Status,
	Name,
	ThumbnailUrl,
} from '../CasinoCategoryListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';

const useCasinoCategoryColumn = ({
	handleStatus,
	onClickEdit,
	handleAddGameClick,
	handleDeleteClick,
}) => {
	const { isGranted, permissions } = usePermission();

	const isDisabled = (row) => row?.isDefault;

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: onClickEdit,
			isHidden: !isGranted(modules.casinoManagement, 'U'),
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
		},
		{
			actionName: 'Toggle Status',
			actionHandler: handleStatus,
			isHidden: !isGranted(modules.casinoManagement, 'TS'),
			icon: ICON_CLASS.toggleStatus,
			iconColor: TEXT_COLORS.success,
			isDisabled,
		},
		{
			actionName: 'Delete',
			actionHandler: handleDeleteClick,
			isHidden: !isGranted(modules.casinoManagement, 'U'),
			icon: ICON_CLASS.delete,
			iconColor: TEXT_COLORS.danger,
			isDisabled,
		},
		{
			actionName: 'Add Games to category',
			actionHandler: handleAddGameClick,
			isHidden: !isGranted(modules.casinoManagement, 'TS'),
			icon: ICON_CLASS.addOne,
			iconColor: TEXT_COLORS.info,
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	filterable: true,
			// 	Cell: ({ cell }) => <GameCategoryId value={cell.value} />,
			// },
			{
				Header: 'NAME',
				accessor: 'nameEN',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'ICON',
				accessor: 'iconUrl',
				disableSortBy: true,
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			// {
			// 	Header: 'UPDATED AT',
			// 	accessor: 'updatedAt',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
			// },
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[permissions]
	);
	return columns;
};

export default useCasinoCategoryColumn;
