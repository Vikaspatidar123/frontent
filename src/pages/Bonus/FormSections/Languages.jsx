/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
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
				onChange={(value) =>
					setLangContent((prev) => ({
						...prev,
						promoTitle: { ...prev.promoTitle, [lang]: value },
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
}) => {
	const toggle = (id) => setActiveLangTab(id);

	const tabData = useMemo(() => {
		const langArray =
			Object.keys(langList).filter((lang) => lang !== 'EN') || [];
		if (langArray.length) {
			setActiveLangTab(langArray[0]);
		}
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
	}, [langList]);

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
				/>
			</Col>
		</Row>
	);
};

export default Languages;
