/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import TabsPage from '../../../components/Common/TabsPage';
import {
	CustomInputField,
	CustomTextEditor,
} from '../../../helpers/customForms';
import { BONUS_TYPES } from '../constants';

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
	selectedBonus,
	// bonusDetails,
}) => {
	useEffect(() => {
		if (
			nextPressed.currentTab === 'languages' &&
			selectedBonus !== BONUS_TYPES.JOINING
		) {
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

	useEffect(() => {
		if (tabData.length) {
			setActiveLangTab(tabData[0]?.id);
		}
	}, [tabData]);

	return (
		<Row>
			<Row className="text-danger">
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
