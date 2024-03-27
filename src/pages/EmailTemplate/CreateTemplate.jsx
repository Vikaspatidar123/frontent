/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'reactstrap';

import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import TabsPage from '../../components/Common/TabsPage';
import CopyToClipboard from 'react-copy-to-clipboard';
import CodeEditor from './CodeEditor';
import { showToastr } from '../../utils/helpers';
import FormModal from '../../components/Common/FormModal';
import useForm from '../../components/Common/Hooks/useFormModal';
import Modal from '../../components/Common/Modal';

import {
	getTestEmailInitialValues,
	staticTestEmailFormFields,
} from './formDetails';
import { testEmailTemplate, getImageGallery } from '../../store/actions';
import { formPageTitle } from '../../components/Common/constants';
import { decryptCredentials } from '../../network/storageUtils';

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const CreateTemplate = ({
	languageData,
	emailTemplate,
	setTemp,
	setSelectedTab,
	showGallery,
	setShowGallery,
	content,
	isEdit = false,
	isView = false,
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [testEmail, setTestEmail] = useState('');
	const [isTestTemplateModalVisible, setIsTestTemplateModalVisible] =
		useState(false);
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState(1);
	const [template, setTemplate] = useState('');
	const [data, setData] = useState(emailTemplate?.templateCode?.EN);

	useEffect(() => {
		if (emailTemplate?.templateCode?.EN) {
			setData(emailTemplate?.templateCode?.EN);
		}
	}, [emailTemplate]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.crm)) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.crm))
			);
			setData(values?.template);
		}
	}, []);

	useEffect(() => {
		setTemp && setTemp(template);
	}, [template]);

	useEffect(() => {
		if (showGallery) {
			dispatch(getImageGallery());
		}
	}, [showGallery]);

	useEffect(() => {
		if (imageGallery?.length) {
			setImageComponent(
				<div
					className="d-flex justify-content-center flex-wrap gap-3 dropzone-previews mt-3"
					id="file-previews"
				>
					{imageGallery.map((f, i) => (
						<Col key={`${f}-file`}>
							<Card className="align-items-center mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
								<div className="p-2">
									<CopyToClipboard
										text={f}
										onCopy={() => {
											setShowGallery(false);
											showToastr({
												message: 'Copied To ClipBoard',
												type: 'success',
											});
										}}
									>
										<img
											data-dz-thumbnail=""
											height="200"
											width="250"
											className="rounded me-2 bg-light"
											alt={f}
											src={f}
										/>
									</CopyToClipboard>
								</div>
							</Card>
						</Col>
					))}
				</div>
			);
		} else {
			setImageComponent(
				<div className="text-center text-danger">No Images Found</div>
			);
		}
	}, [imageGallery]);

	const tabData = languageData?.languages?.map((item) => ({
		id: parseInt(item.id, 10),
		title: item.code,
		component: (
			<Row>
				<Card>
					<Col className="text-end">
						<Button
							color="primary"
							type="button"
							onClick={() => {
								setIsTestTemplateModalVisible(!isTestTemplateModalVisible);
							}}
						>
							Send Test Email
						</Button>
					</Col>
				</Card>

				<Col sm="12">
					{' '}
					<CodeEditor
						dynamicData={safeStringify({}, null, 2)}
						HTML={data || ''}
						initial="HTML"
						mobileQuery={800}
						height="60vh"
						setTemplate={setTemplate}
						themeTransitionSpeed={150}
						// setRequiredKeyData={setRequiredKeyData}
						selectedTab={activeTab}
						setTemp={setTemplate}
						disabled={isView}
					/>
				</Col>
			</Row>
		),
	}));

	const emailFormSubmitHandler = (e) => {
		if (template) {
			const templateCode = Buffer.from(template).toString('base64');
			templateCode &&
				dispatch(
					testEmailTemplate({
						data: { templateCode, testEmail, dynamicData: {} },
						setIsTestTemplateModalVisible,
						setTestEmail,
					})
				);
		} else {
			showToastr({
				message: 'Please Enter Template Code',
				type: 'error',
			});
		}
	};

	const setTestEmailCallBack = (e) => {
		setTestEmail(e.target.value);
	};

	const { validation: testEmailValidation, formFields } = useForm({
		initialValues: getTestEmailInitialValues(),
		staticFormFields: staticTestEmailFormFields(setTestEmailCallBack),
		onSubmitEntry: emailFormSubmitHandler,
	});

	useEffect(() => {
		if (activeTab) {
			const tab = tabData?.find((item) => item.id === activeTab);
			setSelectedTab(tab?.title || 'EN');
		}
	}, [activeTab]);

	const toggle = (tab) => {
		if (isEdit || content.EN) {
			setActiveTab(tab);
		} else {
			showToastr({
				message:
					'You must enter data for English language before switching to another language ',
				type: 'error',
			});
		}
	};

	return (
		<>
			<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			<FormModal
				isOpen={isTestTemplateModalVisible}
				toggle={() => setIsTestTemplateModalVisible(false)}
				header="Enter Test Email"
				formFields={formFields}
				submitLabel="Send"
				isLoading={false}
				validation={testEmailValidation}
			/>
			<Modal
				openModal={showGallery}
				toggleModal={() => setShowGallery(!showGallery)}
				headerTitle="Gallery"
				hideFooter={true}
				children={imageComponent}
				className="modal-dialog modal-lg"
			/>
		</>
	);
};

CreateTemplate.propTypes = {
	languageData: PropTypes.object,
	setTemp: PropTypes.func,
	setSelectedTab: PropTypes.func,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
	isEdit: PropTypes.bool,
	isView: PropTypes.bool,
	emailTemplate: PropTypes.objectOf,
};

export default CreateTemplate;
