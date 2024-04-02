import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'reactstrap';

import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import TabsPage from '../../components/Common/TabsPage';
import { showToastr } from '../../utils/helpers';
import FormModal from '../../components/Common/FormModal';
import useForm from '../../components/Common/Hooks/useFormModal';
import Modal from '../../components/Common/Modal';

import {
	getTestEmailInitialValues,
	staticTestEmailFormFields,
} from './formDetails';
import { testEmailTemplate, getImageGallery } from '../../store/actions';
import CodeEditor from '../../components/Common/CodeEditor';
import ImageGalleryGrid from '../../components/Common/ImageGalleryGrid';
import usePermission from '../../components/Common/Hooks/usePermission';

const CreateTemplate = ({
	languageData,
	setTemplate,
	setSelectedTab,
	showGallery,
	setShowGallery,
	content,
	setContent,
	selectedTab,
	isView = false,
	template,
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [testEmail, setTestEmail] = useState('');
	const [isTestTemplateModalVisible, setIsTestTemplateModalVisible] =
		useState(false);
	const dispatch = useDispatch();
	const { isGranted } = usePermission();
	const [activeTab, setActiveTab] = useState(1);

	useEffect(() => {
		if (showGallery) {
			dispatch(getImageGallery());
		}
	}, [showGallery]);

	useEffect(() => {
		setImageComponent(
			<Row>
				<ImageGalleryGrid
					imageGalleryList={imageGallery}
					isGranted={isGranted}
					deleteImage={false}
					imageColClass="col-sm-4 col-md-4 col-lg-4 px-2 mb-4"
					onCopyClipboard={() => {
						setShowGallery(false);
						showToastr({
							message: 'Copied To ClipBoard',
							type: 'success',
						});
					}}
				/>
			</Row>
		);
	}, [imageGallery]);

	const tabData = languageData?.languages?.map((item) => ({
		id: parseInt(item.id, 10),
		title: item.code,
		component: (
			<Row>
				<Card>
					<Col className="text-end mb-2">
						<Button
							color="primary"
							type="button"
							disabled // send test email functionality needs to be implemented
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
						HTML={content[selectedTab] ? content[selectedTab] : ''}
						initial="HTML"
						mobileQuery={800}
						height="70vh"
						setTemplate={setTemplate}
						themeTransitionSpeed={150}
						selectedTab={selectedTab}
						setContent={setContent}
						disabled={isView}
					/>
				</Col>
			</Row>
		),
	}));

	const emailFormSubmitHandler = () => {
		if (template) {
			const templateCode = Buffer.from(template).toString('base64');
			if (templateCode) {
				dispatch(
					testEmailTemplate({
						data: { templateCode, testEmail, dynamicData: {} },
						setIsTestTemplateModalVisible,
						setTestEmail,
					})
				);
			}
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
		if (content.EN) {
			setActiveTab(tab);
		} else {
			showToastr({
				message:
					'You must enter Content for English language before switching to another language ',
				type: 'warning',
			});
		}
	};

	return (
		<>
			<TabsPage
				activeTab={activeTab}
				tabsData={tabData}
				toggle={toggle}
				navClass="py-3"
				tabType="tab"
				tabContentClass="px-3"
				tabCardClass="mb-0 shadow-none"
			/>
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
				hideFooter
				className="modal-dialog modal-lg"
			>
				{imageComponent}
			</Modal>
		</>
	);
};

CreateTemplate.defaultProps = {
	languageData: {},
	content: {},
	isView: false,
	showGallery: false,
	setShowGallery: () => {},
	selectedTab: 'EN',
	setSelectedTab: () => {},
	setTemplate: () => {},
	setContent: () => {},
	template: '',
};

CreateTemplate.propTypes = {
	languageData: PropTypes.objectOf(),
	setSelectedTab: PropTypes.func,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
	isView: PropTypes.bool,
	content: PropTypes.objectOf(),
	selectedTab: PropTypes.string,
	setTemplate: PropTypes.func,
	setContent: PropTypes.func,
	template: PropTypes.string,
};

export default CreateTemplate;
