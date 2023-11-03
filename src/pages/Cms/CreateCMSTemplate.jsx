/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TabsPage from '../../components/Common/TabsPage';
import { CustomInputField } from '../../helpers/customForms';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from '../../components/Common/Modal';
import CodeEditor from './CodeEditor';
import { showToastr } from '../../utils/helpers';

import { useSelector, useDispatch } from 'react-redux';
import { getImageGallery, deleteImageGallery } from '../../store/actions';

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
	showGallery,
	setShowGallery,
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [activeTab, setActiveTab] = useState(5);
	const [template, setTemplate] = useState('');
	const [label, setLabel] = useState('');
	const [requiredKeyData, setRequiredKeyData] = useState({});
	const [data] = useState(validation?.values?.content);
	const dispatch = useDispatch();

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

	useEffect(() => {
		if (showGallery) {
			dispatch(getImageGallery());
		}
	}, [showGallery]);

	const deleteImage = (f) => {
		const data = {
			imageUrl: f.fileName,
		};
		dispatch(deleteImageGallery(data));
	};

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
		} else {
			setImageComponent(
				<div className="text-center text-danger">No Images Found</div>
			);
		}
	}, [imageGallery]);

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
						HTML={data || ''}
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
			setActiveTab(tab);
		} else if (!isView) {
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

export default CreateCMSTemplate;
