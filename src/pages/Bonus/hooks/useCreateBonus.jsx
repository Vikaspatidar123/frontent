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
import {
	BONUS_KEY_RELATION,
	BONUS_TYPES,
	daysLabels,
	LANGUAGES,
} from '../constants';
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
			setGameIds(
				bonusDetails?.[BONUS_KEY_RELATION[bonusDetails.bonusType]]?.gameIds ||
					[]
			);
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

	const submitBonus = () => {
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
				gameIds,
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
				gameIds,
				file: allFields?.bonusImage,

				// removed the unused payload
				bonusImage: null,
				selectedTemplate: null,
			};

			dispatch(createBonus(payload));
		}
	};

	const toggleTab = (tab) => {
		if (tab === 'submit') {
			if (!updateBonusLoading || !createBonusLoading) {
				submitBonus();
			}
		} else if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const onBackClick = () => {
		navigate('/bonus');
	};

	const tabsToShow = [
		// add same condition like tabsData
		{
			id: 'general',
		},
		{
			id: 'languages',
		},
		{
			id: 'currency',
		},
		...([BONUS_TYPES.JOINING].includes(allFields?.bonusType)
			? []
			: [{ id: 'wageringContribution' }]),
		...([BONUS_TYPES.JOINING, BONUS_TYPES.DEPOSIT].includes(
			allFields?.bonusType
		)
			? []
			: [{ id: 'games' }]),
	];

	const tabData = [
		{
			id: 'general',
			title: 'General',
			component: (
				<General
					isLoading={getBonusDetailsLoading}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					setLangContent={setLangContent}
					bonusDetails={bonusDetails}
					submitButtonLoading={createBonusLoading || updateBonusLoading}
					toggleTab={toggleTab}
					activeTab={activeTab}
					tabsToShow={tabsToShow}
					isEdit={isEdit}
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
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					bonusDetails={bonusDetails}
					tabsToShow={tabsToShow}
					toggleTab={toggleTab}
					submitButtonLoading={createBonusLoading || updateBonusLoading}
				/>
			),
		},
		{
			id: 'currency',
			title: 'Currency',
			component: (
				<Currencies
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					activeTab={activeTab}
					allFields={allFields}
					submitButtonLoading={createBonusLoading || updateBonusLoading}
					bonusDetails={bonusDetails}
					tabsToShow={tabsToShow}
					toggleTab={toggleTab}
				/>
			),
		},
		{
			id: 'wageringContribution',
			title: 'Wagering Contribution',
			component: (
				<WageringContribution
					activeTab={activeTab}
					setAllFields={setAllFields}
					bonusDetails={bonusDetails}
					isEdit={isEdit}
					selectedTemplate={selectedTemplate}
					setSelectedTemplate={setSelectedTemplate}
					submitButtonLoading={createBonusLoading || updateBonusLoading}
					tabsToShow={tabsToShow}
					toggleTab={toggleTab}
				/>
			),
			isHidden: [BONUS_TYPES.JOINING].includes(allFields?.bonusType),
		},
		{
			id: 'games',
			title: 'Games',
			component: (
				<Games
					submitButtonLoading={createBonusLoading || updateBonusLoading}
					activeTab={activeTab}
					toggleTab={toggleTab}
					gameIds={gameIds}
					setGameIds={setGameIds}
					tabsToShow={tabsToShow}
				/>
			),
			isHidden: [BONUS_TYPES.JOINING, BONUS_TYPES.DEPOSIT].includes(
				allFields?.bonusType
			),
		},
	];

	return {
		tabData,
		activeTab,
		onBackClick,
	};
};

export default useCreateBonus;
