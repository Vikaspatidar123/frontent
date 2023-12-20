import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { isEmpty, isEqual } from 'lodash';
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
	fetchCountriesStart,
	getAllSAWageringTemplates,
	getUserBonusDetails,
	getUserBonusDetailsReset,
	resetCreateBonus,
	resetUpdateBonus,
	updateBonus,
} from '../../../store/actions';
import { formatDateYMD, safeStringify } from '../../../utils/helpers';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { initialData } from '../formDetails';

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
	const [existingFilledFields, setExistingFilledFields] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState('');
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
		dispatch(getAllSAWageringTemplates());
	}, []);

	useEffect(() => {
		dispatch(fetchCountriesStart());
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

	useEffect(() => {
		setExistingFilledFields((prev) => ({
			...prev,
			promotionTitle: langContent?.promoTitle,
			description: langContent?.desc,
			termCondition: langContent?.terms,
		}));
	}, [langContent]);

	useEffect(() => {
		setExistingFilledFields((prev) => ({
			...prev,
			selectedTemplateId: selectedTemplate,
		}));
	}, [selectedTemplate]);

	useEffect(() => {
		if (selectedGames?.length) {
			setExistingFilledFields((prev) => ({
				...prev,
				selectedGames,
			}));
		}
	}, [selectedGames]);

	useEffect(() => {
		if (selectedCountries?.length) {
			setExistingFilledFields((prev) => ({
				...prev,
				selectedCountries,
			}));
		}
	}, [selectedCountries]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.bonusManagement)) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.bonusManagement))
			);
			setSelectedBonus(storedValues?.bonusType);
			setLangContent({
				promoTitle: storedValues?.promotionTitle,
				desc: storedValues?.description,
				terms: storedValues?.termCondition,
			});
			setSelectedGames(storedValues?.selectedGames);
			setSelectedTemplate(storedValues?.selectedTemplateId);
			setSelectedCountries(storedValues?.selectedCountries || []);
		}
	}, []);

	const onBackClick = () => {
		if (!isEmpty(existingFilledFields)) {
			const existingFilledFieldsCopy = {
				...existingFilledFields,
				startDate: moment(existingFilledFields?.startDate).format('DD-MM-YYYY'),
				endDate: moment(existingFilledFields?.endDate).format('DD-MM-YYYY'),
			};
			const isDataEqual = isEqual(existingFilledFieldsCopy, initialData);
			if (!isDataEqual) {
				setShowModal(true);
			} else {
				navigate('/bonus');
			}
		}
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
					setSelectedCountries={setSelectedCountries}
					setSelectedGames={setSelectedGames}
					setBonusTypeChanged={setBonusTypeChanged}
					bonusDetails={bonusDetails}
					isEdit={isEdit}
					existingFilledFields={existingFilledFields}
					setExistingFilledFields={setExistingFilledFields}
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
					existingFilledFields={existingFilledFields}
					setExistingFilledFields={setExistingFilledFields}
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
					isEdit={isEdit}
					selectedTemplate={selectedTemplate}
					setSelectedTemplate={setSelectedTemplate}
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
					existingFilledFields={existingFilledFields}
					setExistingFilledFields={setExistingFilledFields}
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
		getBonusDetailsLoading,
		showModal,
		setShowModal,
		onBackClick,
		existingFilledFields,
		navigate,
	};
};

export default useCreateBonus;
