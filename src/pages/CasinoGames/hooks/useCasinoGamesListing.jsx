/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCasinoGamesStart,
	// getCasinoProvidersDataStart,
	updateCasinoIsFeaturedStart,
	updateSACasinoGamesStatusStart,
	deleteCasinoGamesStart,
	resetCasinoGamesData,
} from '../../../store/actions';
import {
	CasinoGameId,
	Name,
	Provider,
	Rtp,
	SubCategory,
	ThumbnailUrl,
	DeviceType,
	Status,
	IsFeatured,
} from '../CasinoGamesListCol';
import ActionButtons from '../ActionButtons';
import { selectedLanguage } from '../../../constants/config';
import { modules } from '../../../constants/permissions';

const useCasinoGamesListings = (filterValues = {}, onClickEdit = () => {}) => {
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const dispatch = useDispatch();

	const {
		casinoGames,
		isCasinoGamesLoading,
		casinoProvidersData,
		casinoSubCategoryDetails,
		isEditCasinoGamesSuccess,
		isDeleteCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const getCategoryName = (id) =>
		casinoSubCategoryDetails?.subCategories?.find(
			(val) => val.gameSubCategoryId === id
		)?.name?.EN;

	// const getProviderName = (id) =>
	// 	casinoProvidersData?.providers.find((val) => val.casinoProviderId === id)?.name;

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames?.games?.length) {
			return casinoGames?.games.map((item) => ({
				...item,
				providerName: item?.casinoProvider?.name?.[selectedLanguage],
				subCategoryType: getCategoryName(item?.gameSubCategoryId),
				thumbnail: item?.thumbnailUrl,
				devices: item?.devices?.join(', '),
			}));
		}
		return [];
	}, [casinoGames, casinoProvidersData, casinoSubCategoryDetails]);

	const fetchData = () => {
		dispatch(
			getCasinoGamesStart({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page]);

	// resetting casino games list redux state
	useEffect(() => () => dispatch(resetCasinoGamesData()), []);

	useEffect(() => {
		if (isEditCasinoGamesSuccess || isDeleteCasinoGamesSuccess) fetchData();
	}, [isEditCasinoGamesSuccess, isDeleteCasinoGamesSuccess]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, casinoGameId: id } = props;
		dispatch(
			updateSACasinoGamesStatusStart({
				code: 'CASINO_GAME',
				casinoGameId: id,
				status: !active,
			})
		);
	};

	const handleDeleteItem = (casinoGameId) => {
		dispatch(
			deleteCasinoGamesStart({
				casinoGameId,
				perPage: itemsPerPage,
				page,
				search: '',
			})
		);
	};

	const toggleIsFeaturedGames = (event, cell) => {
		event.preventDefault();
		const data = {
			isFeatured: event.target.checked.toString(),
			casinoProviderId: cell.row.original.casinoProviderId,
			casinoGameId: cell.row.original.casinoGameId.toString(),
		};
		dispatch(updateCasinoIsFeaturedStart(data));
	};

	const buttonList = useMemo(() => [
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.casinoManagement,
			operation: 'U',
		},
	]);

	const columns = useMemo(
		() => [
			{
				Header: 'IS FEATURED',
				accessor: 'isFeatured',
				Cell: (cellProps) => (
					<IsFeatured
						toggleIsFeaturedGames={toggleIsFeaturedGames}
						isFeaturedUpdateLoading={false}
						// featuredFabData={featuredFabData}
						cellProps={cellProps}
					/>
				),
			},
			{
				Header: 'GAME ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <CasinoGameId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'PROVIDER',
				accessor: 'casinoProvider',
				filterable: true,
				Cell: ({ cell }) => <Provider value={cell.value} />,
			},
			{
				Header: 'RTP',
				accessor: 'returnToPlayer',
				filterable: true,
				Cell: ({ cell }) => <Rtp value={cell.value} />,
			},
			{
				Header: 'SUB CATEGORY',
				accessor: 'subCategoryType',
				filterable: true,
				Cell: ({ cell }) => <SubCategory value={cell.value} />,
			},
			{
				Header: 'THUMBNAIL',
				accessor: 'iconUrl',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			{
				Header: 'DEVICE TYPE',
				accessor: 'devices',
				filterable: true,
				Cell: ({ cell }) => <DeviceType value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						onClickEdit={onClickEdit}
						handleDeleteItem={handleDeleteItem}
					/>
				),
			},
		],
		[casinoGames]
	);

	return {
		casinoGames,
		formattedCasinoGames,
		isCasinoGamesLoading,
		itemsPerPage,
		totalCasinoPages: casinoGames?.totalPages,
		onChangeRowsPerPage,
		page,
		setPage,
		handleStatus,
		toggleIsFeaturedGames,
		handleDeleteItem,
		buttonList,
		columns,
	};
};

export default useCasinoGamesListings;
