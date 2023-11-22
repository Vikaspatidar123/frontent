import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import General from '../FormSections/General';
import { modules } from '../../../constants/permissions';
import Languages from '../FormSections/Languages';
import { getSiteConfiguration } from '../../../network/getRequests';
import Currencies from '../FormSections/Currency';
import WageringContribution from '../FormSections/WageringContribution';
import Games from '../FormSections/Games';
import BonusCountry from '../FormSections/BonusCountry';
import { createBonus, resetCreateBonus } from '../../../store/actions';
import { formatDateYMD, safeStringify } from '../../../utils/helpers';

const useCreateBonus = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
	const { createBonusSuccess, createBonusLoading } = useSelector(
		(state) => state.CreateUpdateBonus
	);

	useEffect(() => {
		if (createBonusSuccess) {
			navigate('/bonus');
			dispatch(resetCreateBonus());
		}
	}, [createBonusSuccess]);

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
			dispatch(
				createBonus({
					...allFields,
					promotionTitle: safeStringify(langContent?.promoTitle),
					description: safeStringify(langContent?.desc),
					termCondition: safeStringify(langContent?.terms),
					validFrom: formatDateYMD(allFields.validFrom),
					validTo: formatDateYMD(allFields.validTo),
					wageringTemplateId: allFields.selectedTemplateId,
					wageringRequirementType: [true, 'true'].includes(
						allFields.wageringRequirementType
					)
						? 'bonus'
						: 'bonusdeposit',
					other: safeStringify({
						countries: selectedCountries,
						showBonusValidity: allFields.showBonusValidity,
					}),
				})
			);
		}
	}, [nextPressed]);

	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('/bonus/create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.Bonus,
			operation: 'C',
		},
	]);

	const tabData = [
		{
			id: 'general',
			title: 'General',
			component: (
				<General
					activeTab={activeTab}
					nextPressed={nextPressed}
					setActiveTab={setActiveTab}
					setNextPressed={setNextPressed}
					setAllFields={setAllFields}
					setSelectedBonus={setSelectedBonus}
					setLangContent={setLangContent}
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
				/>
			),
			isHidden: ['promotion'].includes(selectedBonus),
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
				/>
			),
			isHidden: ['promotion'].includes(selectedBonus),
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
				/>
			),
			isHidden: ['promotion', 'deposit'].includes(selectedBonus),
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
		buttonList,
		onNextClick,
		allFields,
		langContent,
		isNextDisabled,
		createBonusLoading,
	};
};

export default useCreateBonus;
