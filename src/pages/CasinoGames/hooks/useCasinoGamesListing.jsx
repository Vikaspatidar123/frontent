/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCasinoGamesStart,
	// getCasinoProvidersDataStart,
	updateCasinoIsFeaturedStart,
	resetCasinoGamesData,
	updateCasinoStatusStart,
} from '../../../store/actions';
import {
	// CasinoGameId,
	Name,
	Provider,
	Rtp,
	Category,
	ThumbnailUrl,
	DeviceType,
	Status,
	IsFeatured,
} from '../CasinoGamesListCol';
import { selectedLanguage } from '../../../constants/config';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';
import ButtonList from '../../../components/Common/ButtonList';

const useCasinoGamesListings = (filterValues = {}, onClickEdit = () => {}) => {
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const dispatch = useDispatch();

	const {
		casinoGames,
		isCasinoGamesLoading,
		casinoProvidersData,
		isEditCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const { isGranted, permissions } = usePermission();
	const navigate = useNavigate();

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	// const getProviderName = (id) =>
	// 	casinoProvidersData?.providers.find((val) => val.casinoProviderId === id)?.name;

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames?.games?.length) {
			return casinoGames?.games.map((item) => ({
				...item,
				providerName: item?.casinoProvider?.name?.[selectedLanguage],
				category: item?.casinoCategory?.name?.[selectedLanguage],
				thumbnail: item?.thumbnailUrl,
				devices:
					typeof item?.devices === 'object'
						? item?.devices?.join(', ')
						: item?.devices,
			}));
		}
		return [];
	}, [casinoGames, casinoProvidersData]);

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
		if (isEditCasinoGamesSuccess) fetchData();
	}, [isEditCasinoGamesSuccess]);

	const handleStatus = (props) => {
		const { id } = props;
		dispatch(
			updateCasinoStatusStart({
				type: 'game',
				id,
			})
		);
	};

	const toggleIsFeaturedGames = (event, cell) => {
		event.preventDefault();
		const data = {
			gameId: cell.row.original.id,
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
	const actionList = <ButtonList buttonList={buttonList} />;

	const handleRestrictedCountries = (row) =>
		navigate(`/casino-games/restrict-countries/${row?.id}`, {
			state: {
				type: 'games',
				restrictedCountries: row?.restrictedCountries,
			},
		});

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
		},
		{
			actionName: 'View Restricted Countries',
			actionHandler: handleRestrictedCountries,
			isHidden: !isGranted(modules.casinoManagement, 'U'),
			icon: ICON_CLASS.restricted,
			iconColor: TEXT_COLORS.info,
		},
	];

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
			// {
			// 	Header: 'GAME ID',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	filterable: true,
			// 	Cell: ({ cell }) => <CasinoGameId value={cell.value} />,
			// },
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'PROVIDER',
				accessor: 'providerName',
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
				Header: 'CATEGORY',
				accessor: 'category',
				filterable: true,
				Cell: ({ cell }) => <Category value={cell.value} />,
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
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[casinoGames, permissions]
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
		columns,
		actionList,
	};
};

export default useCasinoGamesListings;
