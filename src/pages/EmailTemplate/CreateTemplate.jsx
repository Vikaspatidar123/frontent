/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-children-prop */
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

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const CreateTemplate = ({
	languageData,
	validation,
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
	const [activeTab, setactiveTab] = useState(5);
	const [template, setTemplate] = useState('');
	const [requiredKeyData, setRequiredKeyData] = useState({});
	const [drp_primaryStates, setDrp_primaryStates] = useState({});
	// const [data] = useState(validation?.values?.content);

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
										text={`https://gammastack-casino.s3.amazonaws.com/${f.fileName}`}
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
											src={`https://gammastack-casino.s3.amazonaws.com/${f.fileName}`}
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
		}
	}, [imageGallery]);

	const toggleDropdown = (tabId) => {
		setDrp_primaryStates((prevState) => ({
			...prevState,
			[tabId]: !prevState[tabId],
		}));
	};

	const tabData = languageData?.rows?.map((item) => ({
		id: item.languageId,
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
									isOpen={drp_primaryStates[item.languageId] || false}
									toggle={() => toggleDropdown(item.languageId)}
								>
									<Button id="caret" color="primary">
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
						// cmsByPageId={cmsByPageId}
						dynamicData={safeStringify(requiredKeyData, null, 2)}
						HTML=""
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

	const emailFormSubmitHandler = () => {
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
			setactiveTab(tab);
		}
		// else if (!isView) {
		// 	showToastr({
		// 		message:
		// 			'You must enter data for English language before switching to another language ',
		// 		type: 'error',
		// 	});
		// }
	};

	return (
		<>
			<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />;
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

export default CreateTemplate;
