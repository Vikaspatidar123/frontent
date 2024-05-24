import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import General from '../FormSections/General';
import Languages from '../FormSections/Languages';
import Currencies from '../FormSections/Currency';
import { safeStringify } from '../../../utils/helpers';
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
import { BONUS_TYPES, daysLabels, LANGUAGES } from '../constants';
import { YMDdate } from '../../../constants/config';

const useCreateBonus = ({ isEdit }) => {
	const { bonusId, bonusType } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [gameIds, setGameIds] = useState([]);
	const [activeLangTab, setActiveLangTab] = useState('EN');
	const [activeTab, setActiveTab] = useState('general');
	const [allFields, setAllFields] = useState({
		bonusType: BONUS_TYPES.JOINING,
	});
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
					bonusType,
				})
			);
		}
		return () => dispatch(getUserBonusDetailsReset());
	}, [bonusId]);

	useEffect(() => {
		if (!isEmpty(bonusDetails)) {
			setGameIds(bonusDetails?.gameIds);
			setLangContent({
				promoTitle: bonusDetails?.promotionTitle,
				terms: bonusDetails?.termAndCondition,
				desc: bonusDetails?.description,
			});
			setAllFields((prev) => ({
				...prev,
				bonusType: bonusDetails.bonusType,
			}));
		}
	}, [bonusDetails]);

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
				let validOnDays = '';
				if (allFields?.validOnDays?.length) {
					daysLabels?.forEach((val) => {
						if (allFields.validOnDays.includes(val)) {
							validOnDays += '1';
						} else {
							validOnDays += '0';
						}
					});
				}

				const payload = {
					...allFields,
					bonusId,
					validOnDays,
					currencyDetails: safeStringify(allFields.currencyDetails),
					promotionTitle: langContent?.promoTitle,
					description: langContent?.desc,
					termAndCondition: langContent?.terms,
					validFrom: allFields.validFrom
						? moment(allFields.validFrom).format(YMDdate)
						: allFields.validFrom,
					validTo: allFields.validTo
						? moment(allFields.validTo).format(YMDdate)
						: allFields.validTo,
					wageringTemplateId: selectedTemplate || allFields.selectedTemplateId,
					gameIds: allFields.gameIds,
					file: allFields?.bonusImage,

					// removed the unused payload
					bonusImage: null,
					selectedTemplate: null,
				};

				dispatch(updateBonus(payload));
			} else {
				let validOnDays = '';
				if (allFields?.validOnDays?.length) {
					daysLabels?.forEach((val) => {
						if (allFields.validOnDays.includes(val)) {
							validOnDays += '1';
						} else {
							validOnDays += '0';
						}
					});
				}

				const payload = {
					...allFields,
					validOnDays,
					currencyDetails: safeStringify(allFields.currencyDetails),
					promotionTitle: langContent?.promoTitle,
					description: langContent?.desc,
					termAndCondition: langContent?.terms,
					validFrom: allFields.validFrom
						? moment(allFields.validFrom).format(YMDdate)
						: allFields.validFrom,
					validTo: allFields.validTo
						? moment(allFields.validTo).format(YMDdate)
						: allFields.validTo,
					wageringTemplateId: selectedTemplate || allFields.selectedTemplateId,
					gameIds: allFields.gameIds,
					file: allFields?.bonusImage,

					// removed the unused payload
					bonusImage: null,
					selectedTemplate: null,
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
					setLangContent={setLangContent}
					setGameIds={setGameIds}
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
					activeTab={activeTab}
					disableTabSwitching={isNextDisabled}
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					bonusDetails={bonusDetails}
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
					activeTab={activeTab}
					allFields={allFields}
					nextPressed={nextPressed}
					bonusDetails={bonusDetails}
					setNextDisabled={setNextDisabled}
					isNextDisabled={isNextDisabled}
				/>
			),
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
			isHidden: [BONUS_TYPES.JOINING].includes(allFields?.bonusType),
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
					setGameIds={setGameIds}
				/>
			),
			isHidden: [BONUS_TYPES.JOINING, BONUS_TYPES.DEPOSIT].includes(
				allFields?.bonusType
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
		getBonusDetailsLoading,
		onBackClick,
		navigate,
	};
};

export default useCreateBonus;
