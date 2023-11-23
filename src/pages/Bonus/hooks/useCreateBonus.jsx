import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import General from '../FormSections/General';
import Languages from '../FormSections/Languages';
import { getSiteConfiguration } from '../../../network/getRequests';
import Currencies from '../FormSections/Currency';
import WageringContribution from '../FormSections/WageringContribution';
import Games from '../FormSections/Games';
import BonusCountry from '../FormSections/BonusCountry';
import {
	createBonus,
	getUserBonusDetails,
	getUserBonusDetailsReset,
	resetCreateBonus,
	resetUpdateBonus,
	updateBonus,
} from '../../../store/actions';
import { formatDateYMD, safeStringify } from '../../../utils/helpers';

const useCreateBonus = ({ isEdit }) => {
	const { bonusId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedGames, setSelectedGames] = useState([]);
	const [bonusTypeChanged, setBonusTypeChanged] = useState(false);
	const [activeLangTab, setActiveLangTab] = useState('');
	const [selectedBonus, setSelectedBonus] = useState('deposit');
	const [activeTab, setActiveTab] = useState('general');
	const [allFields, setAllFields] = useState({});
	const [langList, setLangList] = useState({});
	const [nextPressed, setNextPressed] = useState({});
	const [langContent, setLangContent] = useState({
		promoTitle: {},
		desc: {},
		terms: {},
	});
	const [selectedCountries, setSelectedCountries] = useState([]);
	const {
		createBonusSuccess,
		createBonusLoading,
		updateBonusSuccess,
		updateBonusLoading,
	} = useSelector((state) => state.CreateUpdateBonus);
	const { bonusDetails, getBonusDetailsLoading } = useSelector(
		(state) => state.UserDetails
	);

	useEffect(() => {
		if (bonusId) {
			dispatch(
				getUserBonusDetails({
					bonusId,
				})
			);
		}
		return () => dispatch(getUserBonusDetailsReset());
	}, [bonusId]);

	useEffect(() => {
		if (bonusDetails) {
			setSelectedCountries(bonusDetails?.other?.countries);
			setSelectedGames(bonusDetails?.gameIds);
			setLangContent({
				promoTitle: bonusDetails?.promotionTitle,
				terms: bonusDetails?.termCondition,
				desc: bonusDetails?.description,
			});
		}
	}, [bonusDetails]);

	useEffect(() => {
		if (createBonusSuccess) {
			navigate('/bonus');
			dispatch(resetCreateBonus());
		}
	}, [createBonusSuccess]);

	useEffect(() => {
		if (updateBonusSuccess) {
			navigate('/bonus');
			dispatch(resetUpdateBonus());
		}
	}, [updateBonusSuccess]);

	const checkAllEmptyCondition = () =>
		(langContent?.promoTitle?.[activeLangTab] === '' ||
			langContent?.promoTitle?.[activeLangTab] === undefined) &&
		(langContent?.desc?.[activeLangTab] === '' ||
			langContent?.desc?.[activeLangTab] === undefined ||
			(langContent?.desc?.[activeLangTab] &&
				!langContent?.desc?.[activeLangTab]?.replace(/<[^>]+>/g, '')
					?.length)) &&
		(langContent?.terms?.[activeLangTab] === '' ||
			langContent?.terms?.[activeLangTab] === undefined ||
			(langContent?.terms?.[activeLangTab] &&
				!langContent?.terms?.[activeLangTab]?.replace(/<[^>]+>/g, '')?.length));

	const checkAllFilled = () =>
		langContent?.promoTitle?.[activeLangTab] &&
		langContent?.desc?.[activeLangTab] &&
		langContent?.desc?.[activeLangTab]?.replace(/<[^>]+>/g, '')?.length &&
		langContent?.terms?.[activeLangTab] &&
		langContent?.terms?.[activeLangTab]?.replace(/<[^>]+>/g, '')?.length;

	const isNextDisabled = useMemo(
		() => !(checkAllEmptyCondition() || checkAllFilled()),
		[langContent, activeLangTab]
	);

	const toggleTab = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	useEffect(() => {
		async function fetchData() {
			await getSiteConfiguration().then((res) => {
				setLangList(res?.data?.data?.siteInformation?.[1]?.value?.languages);
			});
		}
		if (!langList.length) {
			fetchData();
		}
	}, []);

	const onNextClick = (current, next) => {
		setNextPressed({ currentTab: current, nextTab: next });
	};

	// final create api call
	useEffect(() => {
		if (nextPressed.nextTab === 'submit') {
			if (isEdit) {
				dispatch(
					updateBonus({
						...allFields,
						bonusId,
						promotionTitle: safeStringify(langContent?.promoTitle),
						description: safeStringify(langContent?.desc),
						termCondition: safeStringify(langContent?.terms),
						validFrom: formatDateYMD(allFields.validFrom),
						validTo: formatDateYMD(allFields.validTo),
						wageringTemplateId: allFields.selectedTemplateId,
						gameIds: selectedGames,
						other: safeStringify({
							countries: selectedCountries,
							showBonusValidity: allFields.showBonusValidity,
						}),
					})
				);
			} else {
				dispatch(
					createBonus({
						...allFields,
						promotionTitle: safeStringify(langContent?.promoTitle),
						description: safeStringify(langContent?.desc),
						termCondition: safeStringify(langContent?.terms),
						validFrom: formatDateYMD(allFields.validFrom),
						validTo: formatDateYMD(allFields.validTo),
						wageringTemplateId: allFields.selectedTemplateId,
						gameIds: selectedGames,
						other: safeStringify({
							countries: selectedCountries,
							showBonusValidity: allFields.showBonusValidity,
						}),
					})
				);
			}
		}
	}, [nextPressed]);

	const tabData = [
		{
			id: 'general',
			title: 'General',
			component: (
				<General
					isLoading={getBonusDetailsLoading}
					activeTab={activeTab}
					nextPressed={nextPressed}
					setActiveTab={setActiveTab}
					setNextPressed={setNextPressed}
					setAllFields={setAllFields}
					setSelectedBonus={setSelectedBonus}
					setLangContent={setLangContent}
					setSelectedCountries={setSelectedCountries}
					setSelectedGames={setSelectedGames}
					setBonusTypeChanged={setBonusTypeChanged}
					bonusDetails={bonusDetails}
				/>
			),
		},
		{
			id: 'languages',
			title: 'Languages',
			component: (
				<Languages
					langList={langList}
					setLangContent={setLangContent}
					langContent={langContent}
					activeLangTab={activeLangTab}
					setActiveLangTab={setActiveLangTab}
					disableTabSwitching={isNextDisabled}
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
				/>
			),
		},
		{
			id: 'currency',
			title: 'Currency',
			component: (
				<Currencies
					setActiveTab={setActiveTab}
					setNextPressed={setNextPressed}
					setAllFields={setAllFields}
					allFields={allFields}
					selectedBonus={selectedBonus}
					nextPressed={nextPressed}
					bonusTypeChanged={bonusTypeChanged}
					setBonusTypeChanged={setBonusTypeChanged}
					bonusDetails={bonusDetails}
				/>
			),
			isHidden:
				['promotion'].includes(selectedBonus) || bonusDetails?.claimedCount,
		},
		{
			id: 'wageringContribution',
			title: 'Wagering Contribution',
			component: (
				<WageringContribution
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					bonusDetails={bonusDetails}
				/>
			),
			isHidden:
				['promotion'].includes(selectedBonus) || bonusDetails?.claimedCount,
		},
		{
			id: 'games',
			title: 'Games',
			component: (
				<Games
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					selectedGames={selectedGames}
					setSelectedGames={setSelectedGames}
				/>
			),
			isHidden:
				['promotion', 'deposit'].includes(selectedBonus) ||
				bonusDetails?.claimedCount,
		},
		{
			id: 'countries',
			title: 'Countries',
			component: (
				<BonusCountry
					selectedCountries={selectedCountries}
					setSelectedCountries={setSelectedCountries}
				/>
			),
		},
	];

	return {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		allFields,
		langContent,
		isNextDisabled,
		createBonusLoading,
		updateBonusLoading,
	};
};

export default useCreateBonus;
