/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Card,
	Button,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	ButtonDropdown,
	UncontrolledTooltip,
} from 'reactstrap';

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
import {
	testEmailTemplate,
	getImageGallery,
	deleteImageGallery,
} from '../../store/actions';
import { formPageTitle } from '../../components/Common/constants';
import { decryptCredentials } from '../../network/storageUtils';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const CreateTemplate = ({
	languageData,
	validation,
	emailTemplate,
	dynamicKeys,
	setTemp,
	selectedTab,
	setSelectedTab,
	showGallery,
	setShowGallery,
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
	const [requiredKeyData, setRequiredKeyData] = useState({});
	const [drpPrimaryStates, setDrpPrimaryStates] = useState({});
	const [data, setData] = useState(emailTemplate?.[0]?.templateCode?.EN);

	useEffect(() => {
		if (emailTemplate?.[0]?.templateCode?.EN) {
			setData(emailTemplate?.[0]?.templateCode?.EN);
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

	const deleteImage = (f) => {
		const data = {
			imageUrl: f.fileName,
		};
		dispatch(deleteImageGallery(data));
	};

	useEffect(() => {
		if (Object.keys(dynamicKeys)?.length) {
			let tempDataAll = {};
			let tempData = {};
			dynamicKeys.forEach((item) => {
				tempDataAll = { ...tempDataAll, [item.key]: item.description };
				if (item.required) {
					tempData = { ...tempData, [item.key]: item.description };
				}
			});
			setRequiredKeyData(tempData);
		}
	}, [dynamicKeys]);

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
						<Col key={`${i}-file`}>
							<Card className="align-items-center mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
								<div className="p-2">
									<CopyToClipboard
										text={`${VITE_APP_AWS_GALLERY_URL}${f.fileName}`}
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
											alt={f.name}
											src={`${VITE_APP_AWS_GALLERY_URL}${f.fileName}`}
										/>
									</CopyToClipboard>
									<Col className="position-absolute top-0 end-0">
										<Link
											to="#"
											className="btn btn-sm btn-soft-danger"
											onClick={() => deleteImage(f)}
										>
											<i
												className="mdi mdi-delete-outline"
												id="deletetooltip"
											/>
											<UncontrolledTooltip
												placement="top"
												target="deletetooltip"
											>
												Delete
											</UncontrolledTooltip>
										</Link>
									</Col>
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

	const toggleDropdown = (tabId) => {
		setDrpPrimaryStates((prevState) => ({
			...prevState,
			[tabId]: !prevState[tabId],
		}));
	};

	const tabData = languageData?.rows?.map((item) => ({
		id: parseInt(item.id, 10),
		title: item.code,
		component: (
			<Row>
				<Card>
					<Row className="d-flex flex-row justify-content-between">
						<Col>
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
						<Col className="text-end">
							<div className="btn-group">
								<ButtonDropdown
									isOpen={drpPrimaryStates[item.id] || false}
									toggle={() => toggleDropdown(item.id)}
								>
									<Button id="caret" type="button" color="primary">
										Dynamic Keys
									</Button>
									<DropdownToggle caret color="primary">
										<i className="mdi mdi-chevron-down" />
									</DropdownToggle>
									<DropdownMenu>
										{dynamicKeys?.map?.((item, index) => (
											<DropdownItem
												key={index}
												onClick={() => {
													setRequiredKeyData({
														...requiredKeyData,
														[item.key]: item.description,
													});
												}}
											>
												{`${item.key} `}
												{item.required ? '(Required)' : '(Optional)'}
											</DropdownItem>
										))}
									</DropdownMenu>
								</ButtonDropdown>
							</div>
						</Col>
					</Row>
				</Card>

				<Col sm="12">
					{' '}
					<CodeEditor
						dynamicData={safeStringify(requiredKeyData, null, 2)}
						HTML={data || ''}
						initial="HTML"
						mobileQuery={800}
						height="60vh"
						setTemplate={setTemplate}
						themeTransitionSpeed={150}
						setRequiredKeyData={setRequiredKeyData}
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
						data: { templateCode, testEmail, dynamicData: requiredKeyData },
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
			setSelectedTab(tab?.title);
		}
	}, [activeTab]);

	const toggle = (tab) => {
		if (isEdit) {
			setActiveTab(tab);
		} else {
			showToastr({
				message:
					'You must enter data for English language and Submit before switching to another language ',
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
	validation: PropTypes.object,
	dynamicKeys: PropTypes.array,
	setTemp: PropTypes.func,
	selectedTab: PropTypes.string,
	setSelectedTab: PropTypes.func,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
	isEdit: PropTypes.bool,
	isView: PropTypes.bool,
	emailTemplate: PropTypes.objectOf,
};

export default CreateTemplate;
