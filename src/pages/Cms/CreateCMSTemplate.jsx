/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import TabsPage from '../../components/Common/TabsPage';
import { CustomInputField } from '../../helpers/customForms';
import CodeEditor from './CodeEditor';
import { showToastr } from '../../utils/helpers';

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const CreateCMSTemplate = ({
	languageData,
	validation,
	cmsKeys,
	title,
	setTitle,
	content,
	setContent,
	cmsByPageId,
	isEdit = false,
	isView = false,
	setIsView,
}) => {
	const [activeTab, setactiveTab] = useState(5);
	const [template, setTemplate] = useState('');
	const [label, setLabel] = useState('');
	const [requiredKeyData, setRequiredKeyData] = useState({});

	useEffect(() => {
		if (cmsKeys?.dynamicKeys && Object.keys(cmsKeys?.dynamicKeys)?.length) {
			let tempDataAll = {};
			let tempData = {};
			const dynamicKeys = cmsKeys?.dynamicKeys;
			dynamicKeys.forEach((item) => {
				tempDataAll = { ...tempDataAll, [item.key]: item.description };
				if (item.required) {
					tempData = { ...tempData, [item.key]: item.description };
				}
			});
			setRequiredKeyData(tempData);
		}
	}, [cmsKeys?.dynamicKeys]);

	const tabData = languageData?.rows?.map((item) => ({
		id: item.languageId,
		title: item.code,
		component: (
			<Row>
				<div className="mb-3">
					<CustomInputField
						label="Title"
						name="title"
						onChange={(e) => {
							e.preventDefault();
							setLabel(e.target.value);
							validation.handleChange(e);
						}}
						value={validation?.values?.title}
						onBlur={validation.handleBlur}
						placeholder="Title"
						validate={{ required: { value: true } }}
						invalid={!!(validation.touched.title && validation.errors.title)}
						isError
						errorMsg={validation.touched.title && validation.errors.title}
						disabled={isView}
					/>
				</div>
				<Col sm="12">
					{' '}
					<CodeEditor
						cmsByPageId={cmsByPageId}
						dynamicData={safeStringify(requiredKeyData, null, 2)}
						HTML=""
						initial="HTML"
						mobileQuery={800}
						height="70vh"
						setTemplate={setTemplate}
						themeTransitionSpeed={150}
						setRequiredKeyData={setRequiredKeyData}
						selectedTab={activeTab}
						setTemp={setTemplate}
						validation={validation}
						disabled={isView}
					/>
				</Col>
			</Row>
		),
	}));

	useEffect(() => {
		if (activeTab) {
			const selectedTab = tabData?.find((item) => item.id === activeTab);
			validation?.setFieldValue('language', selectedTab?.title);
		}
	}, [activeTab]);

	useEffect(() => {
		if (activeTab) {
			const selectedTab = tabData?.find((item) => item.id === activeTab);
			setTitle({
				...title,
				[selectedTab?.title]: label,
			});
		}
	}, [label, activeTab, validation?.values?.title]);

	useEffect(() => {
		if (activeTab) {
			const selectedTab = tabData?.find((item) => item.id === activeTab);
			setContent({
				...content,
				[selectedTab?.title]: template,
			});
		}
	}, [template, activeTab, validation?.values?.content]);

	const toggle = (tab) => {
		if (!isView && ((title?.EN && content?.EN) || isEdit)) {
			setactiveTab(tab);
		} else if (!isView) {
			showToastr({
				message:
					'You must enter data for English language before switching to another language ',
				type: 'error',
			});
		}
	};

	return <TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />;
};

export default CreateCMSTemplate;
