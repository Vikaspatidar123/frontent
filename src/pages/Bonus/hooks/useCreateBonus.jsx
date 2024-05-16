import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import General from '../FormSections/General';
import Languages from '../FormSections/Languages';
import { formatDateYMD } from '../../../utils/dateFormatter';
import Currencies from '../FormSections/Currency';
import WageringContribution from '../FormSections/WageringContribution';
import Games from '../FormSections/Games';
import {
	createBonus,
	getUserBonusDetails,
	getUserBonusDetailsReset,
	getWageringTemplateDetails,
	resetCreateBonus,
	resetUpdateBonus,
	updateBonus,
} from '../../../store/actions';
import { safeStringify } from '../../../utils/helpers';
import { BONUS_TYPES, LANGUAGES } from '../constants';

const useCreateBonus = ({ isEdit }) => {
	const { bonusId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [gameIds, setSelectedGames] = useState([]);
	const [bonusTypeChanged, setBonusTypeChanged] = useState(false);
	const [activeLangTab, setActiveLangTab] = useState('EN');
	const [selectedBonus, setSelectedBonus] = useState(BONUS_TYPES.DEPOSIT);
	const [activeTab, setActiveTab] = useState('general');
	const [allFields, setAllFields] = useState({});
	const [selectedTemplate, setSelectedTemplate] = useState(1);
	const [langList] = useState(LANGUAGES);
	const [nextPressed, setNextPressed] = useState({});
	const [isNextDisabled, setNextDisabled] = useState(false);

	const [langContent, setLangContent] = useState({
		promoTitle: { EN: '' },
		desc: { EN: '' },
		terms: { EN: '' },
	});

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
			setSelectedGames(bonusDetails?.gameIds);
			setLangContent({
				promoTitle: bonusDetails?.promotionTitle[activeLangTab],
				terms: bonusDetails?.termCondition[activeLangTab],
				desc: bonusDetails?.description[activeLangTab],
			});
		}
	}, [bonusDetails, nextPressed]);

	useEffect(() => {
		if (nextPressed.currentTab === 'languages' && bonusDetails) {
			setLangContent({
				promoTitle: bonusDetails?.promotionTitle,
				terms: bonusDetails?.termCondition,
				desc: bonusDetails?.description,
			});
		}
	}, [nextPressed.currentTab]);

	useEffect(() => {
		dispatch(getWageringTemplateDetails());
	}, []);

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

	const toggleTab = (tab) => {
		setNextDisabled(false);
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

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
						gameIds,
						currencyDetails: safeStringify(allFields?.currencyDetails),
					})
				);
			} else {
				const payload = {
					...allFields,
					currencyDetails: safeStringify(allFields.currencyDetails),
					promotionTitle: safeStringify(langContent?.promoTitle),
					description: safeStringify(langContent?.desc),
					termCondition: safeStringify(langContent?.terms),
					validFrom: formatDateYMD(allFields.validFrom),
					validTo: formatDateYMD(allFields.validTo),
					wageringTemplateId: allFields.selectedTemplateId,
					gameIds,
				};

				dispatch(createBonus(payload));
			}
		}
	}, [nextPressed]);

	const onBackClick = () => {
		navigate('/bonus');
	};

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
					setSelectedGames={setSelectedGames}
					setBonusTypeChanged={setBonusTypeChanged}
					bonusDetails={bonusDetails}
					isEdit={isEdit}
					setNextDisabled={setNextDisabled}
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
					bonusDetails={bonusDetails}
					selectedBonus={selectedBonus}
					setNextDisabled={setNextDisabled}
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
					setNextDisabled={setNextDisabled}
				/>
			),
			isHidden: bonusDetails?.claimedCount,
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
					isEdit={isEdit}
					selectedTemplate={selectedTemplate}
					setSelectedTemplate={setSelectedTemplate}
				/>
			),
			isHidden: [BONUS_TYPES.JOINING].includes(selectedBonus),
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
					gameIds={gameIds}
					setSelectedGames={setSelectedGames}
				/>
			),
			isHidden:
				[BONUS_TYPES.JOINING, BONUS_TYPES.DEPOSIT].includes(selectedBonus) ||
				bonusDetails?.claimedCount,
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
		getBonusDetailsLoading,
		onBackClick,
		navigate,
	};
};

export default useCreateBonus;
