/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import { formatDateYMD, safeStringify } from '../../../utils/helpers';
import General from '../components/General';
import Games from '../components/Games';
import PriceDistribution from '../components/PriceDistribution';
import {
	createTournamentStart,
	getTournamentDetailByIdStart,
	updateTournamentStart,
} from '../../../store/tournaments/actions';
import { tableCustomClass } from '../../../constants/config';

const useCreateTournaments = (isEdit = false) => {
	const { casinoTournamentId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [allFields, setAllFields] = useState({});
	const [activeTab, setActiveTab] = useState('general');
	const [selectedGames, setSelectedGames] = useState([]);

	const {
		isCreateTournamentLoading,
		tournamentDetail,
		isUpdateTournamentLoading,
	} = useSelector((state) => state.Tournament);

	useEffect(() => {
		if (tournamentDetail && casinoTournamentId) {
			setSelectedGames(tournamentDetail?.gameIds);
		}
	}, [tournamentDetail]);

	const toggleTab = (tab, updatedAllFields) => {
		if (tab === 'submit') {
			if (!isCreateTournamentLoading || !isUpdateTournamentLoading) {
				const data = {
					...updatedAllFields,
					entryFees: Number(updatedAllFields?.entryFees),
					rebuyFees: Number(updatedAllFields?.rebuyFees),
					rebuyLimit: Number(updatedAllFields?.rebuyLimit),
					poolPrize: Number(updatedAllFields?.poolPrize),
					prizes: updatedAllFields?.prizes,
					casinoGameIds: selectedGames,
				};

				if (typeof data?.image === 'string') {
					delete data.image;
				}
				if (!isEdit) {
					dispatch(
						createTournamentStart({
							data,
							navigate,
						})
					);
				} else {
					dispatch(
						updateTournamentStart({
							data: {
								...data,
								casinoTournamentId: Number(casinoTournamentId),
							},
							navigate,
						})
					);
				}
			}
		} else if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	useEffect(() => {
		if (casinoTournamentId) {
			dispatch(
				getTournamentDetailByIdStart({
					casinoTournamentId: Number(casinoTournamentId),
				})
			);
		}
	}, [casinoTournamentId]);

	const tabsToShow = [
		// add same condition like tabData
		{
			id: 'general',
		},
		{
			id: 'games',
		},
		{
			id: 'prizeDistribution',
		},
	];

	const tabData = [
		{
			id: 'general',
			title: 'Basic Info',
			component: (
				<General
					isLoading={false}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					allFields={allFields}
					setAllFields={setAllFields}
					tournamentDetail={tournamentDetail}
					isEdit={isEdit}
					submitButtonLoading={isCreateTournamentLoading}
					tabsToShow={tabsToShow}
					toggleTab={toggleTab}
				/>
			),
		},
		{
			id: 'games',
			title: 'Games',
			component: (
				<Games
					setActiveTab={setActiveTab}
					allFields={allFields}
					setAllFields={setAllFields}
					selectedGames={selectedGames}
					setSelectedGames={setSelectedGames}
					casinoTournamentId={casinoTournamentId}
					submitButtonLoading={isCreateTournamentLoading}
					tabsToShow={tabsToShow}
					activeTab={activeTab}
					toggleTab={toggleTab}
				/>
			),
		},
		{
			id: 'prizeDistribution',
			title: 'Prize Distribution',
			component: (
				<PriceDistribution
					setActiveTab={setActiveTab}
					allFields={allFields}
					setAllFields={setAllFields}
					tournamentDetail={tournamentDetail}
					activeTab={activeTab}
					isEdit={isEdit}
					submitButtonLoading={isCreateTournamentLoading}
					tabsToShow={tabsToShow}
					toggleTab={toggleTab}
				/>
			),
		},
	];

	return {
		tabData,
		activeTab,
	};
};

export default useCreateTournaments;
