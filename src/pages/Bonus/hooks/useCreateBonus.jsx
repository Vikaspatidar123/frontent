import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import General from '../FormSections/General';
import { modules } from '../../../constants/permissions';
import Languages from '../FormSections/Languages';
import { getSiteConfiguration } from '../../../network/getRequests';

const useCreateBonus = () => {
	const navigate = useNavigate();
	const [activeLangTab, setActiveLangTab] = useState('');
	const [selectedBonus, setSelectedBonus] = useState('deposit');
	const [activeTab, setActiveTab] = useState(1);
	const [allFields, setAllFields] = useState({});
	const [langList, setLangList] = useState({});
	const [nextPressed, setNextPressed] = useState('');
	const [langContent, setLangContent] = useState({
		promoTitle: {},
		desc: {},
		terms: {},
	});

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

	const onNextClick = (tabId) => {
		setNextPressed(tabId);
	};

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
			id: 1,
			title: 'General',
			component: (
				<General
					activeTab={activeTab}
					isNext={nextPressed === 1}
					setActiveTab={setActiveTab}
					setNextPressed={setNextPressed}
					setAllFields={setAllFields}
					setSelectedBonus={setSelectedBonus}
					setLangContent={setLangContent}
				/>
			),
		},
		{
			id: 2,
			title: 'Languages',
			component: (
				<Languages
					langList={langList}
					setLangContent={setLangContent}
					langContent={langContent}
					activeLangTab={activeLangTab}
					setActiveLangTab={setActiveLangTab}
					disableTabSwitching={isNextDisabled}
					isNext={nextPressed === 2}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
				/>
			),
		},
		{
			id: 3,
			title: 'Currency',
			component: <div />,
			isHidden: ['promotion'].includes(selectedBonus),
		},
		{
			id: 4,
			title: 'Wagering Contribution',
			component: <div />,
			isHidden: ['promotion'].includes(selectedBonus),
		},
		{
			id: 5,
			title: 'Games',
			component: <div />,
			isHidden: ['promotion', 'deposit'].includes(selectedBonus),
		},
		{
			id: 6,
			title: 'Countries',
			component: <div />,
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
	};
};

export default useCreateBonus;
