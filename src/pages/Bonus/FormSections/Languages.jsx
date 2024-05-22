/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import TabsPage from '../../../components/Common/TabsPage';
import {
	CustomInputField,
	CustomTextEditor,
} from '../../../helpers/customForms';

const SingleLangComponent = ({ lang, setLangContent, langContent }) => (
	<>
		<Col className="mb-3" sm={6}>
			<CustomInputField
				placeholder="Enter Promotion Title"
				label="Promotion Title"
				value={langContent.promoTitle[lang]}
				onChange={(e) =>
					setLangContent((prev) => ({
						...prev,
						promoTitle: { ...prev.promoTitle, [lang]: e.target.value },
					}))
				}
			/>
		</Col>
		<Col className="mb-3">
			<CustomTextEditor
				placeholder="Enter Description"
				value={langContent.desc[lang]}
				label="Description"
				onValueChange={(value) =>
					setLangContent((prev) => ({
						...prev,
						desc: { ...prev.desc, [lang]: value },
					}))
				}
			/>
		</Col>
		<Col className="mb-3">
			<CustomTextEditor
				placeholder="Enter Terms & Conditions"
				value={langContent.terms[lang]}
				label="Terms & Conditions"
				onValueChange={(value) =>
					setLangContent((prev) => ({
						...prev,
						terms: { ...prev.terms, [lang]: value },
					}))
				}
			/>
		</Col>
	</>
);

const Languages = ({
	activeLangTab,
	setActiveLangTab,
	langList,
	langContent,
	setLangContent,
	disableTabSwitching,
	nextPressed,
	setNextPressed,
	setActiveTab,
	activeTab,
	setNextDisabled,
}) => {
	useEffect(() => {
		if (nextPressed.currentTab === 'languages') {
			setActiveTab(nextPressed.nextTab);
			window.scrollTo(0, 0);
			setNextPressed({});
		}
	}, [nextPressed]);

	const toggle = (id) => !disableTabSwitching && setActiveLangTab(id);

	const tabData = useMemo(() => {
		const langArray =
			Object.keys(langList).filter((lang) => lang !== 'EN') || [];

		return langArray.map((lang) => ({
			id: lang,
			title: lang,
			component: (
				<SingleLangComponent
					lang={lang}
					setLangContent={setLangContent}
					langContent={langContent}
				/>
			),
			tooltipText: langList[lang],
		}));
	}, [langList, langContent]);

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

	useEffect(() => {
		if (nextPressed.currentTab === 'languages') {
			setNextDisabled(!(checkAllEmptyCondition() || checkAllFilled()));
		}
	}, [activeLangTab, langContent]);

	useEffect(() => {
		if (activeTab === 'languages') {
			setActiveLangTab(tabData[0]?.id);
		}
	}, [activeTab]);

	return (
		<Row>
			<Row className="text-info">
				<strong>
					All fields are required or cleared before switching to another
					language or moving Previous or Next/Submit.
				</strong>
			</Row>
			<Col lg="12">
				<TabsPage
					activeTab={activeLangTab}
					tabsData={tabData}
					toggle={toggle}
					disableTabSwitching={disableTabSwitching}
				/>
			</Col>
		</Row>
	);
};

export default Languages;
