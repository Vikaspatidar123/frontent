import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import TabsPage from '../../components/Common/TabsPage';
import { CustomInputField } from '../../helpers/customForms';
import Modal from '../../components/Common/Modal';
import CodeEditor from './CodeEditor';
import { showToastr } from '../../utils/helpers';

import { getImageGallery } from '../../store/actions';
import { decryptCredentials } from '../../network/storageUtils';
import { formPageTitle } from '../../components/Common/constants';

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const CreateCMSTemplate = ({
	languageData,
	validation,
	title,
	setTitle,
	content,
	setContent,
	cmsByPageId,
	isEdit = false,
	isView = false,
	showGallery,
	setShowGallery,
	selectedTab,
	setSelectedTab,
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [activeTab, setActiveTab] = useState(1);
	const [template, setTemplate] = useState('');
	const [label, setLabel] = useState('');
	const [data, setData] = useState(cmsByPageId?.content?.EN || '');
	const dispatch = useDispatch();

	const tabData = languageData?.languages?.map((item) => ({
		id: parseInt(item.id, 10),
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
						value={label}
						onBlur={validation.handleBlur}
						placeholder="Title"
						validate={{ required: { value: true } }}
						invalid={
							!!(validation?.touched?.title && validation?.errors?.title)
						}
						isError
						errorMsg={validation?.touched?.title && validation?.errors?.title}
						disabled={isView}
					/>
				</div>
				<Col sm="12">
					{' '}
					<Label className="form-label">Content</Label>
					<span className="text-danger"> *</span>
					<CodeEditor
						cmsByPageId={cmsByPageId}
						dynamicData={safeStringify({}, null, 2)}
						HTML={data || ''}
						initial="HTML"
						mobileQuery={800}
						height="70vh"
						setTemplate={setTemplate}
						themeTransitionSpeed={150}
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
			const tab = tabData?.find((item) => item.id === activeTab);
			setSelectedTab(tab?.title);
		}
	}, [activeTab]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.cms)) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.cms))
			);
			setData(values?.content?.EN);
			setLabel(values?.title?.EN);
		}
	}, []);

	useEffect(() => {
		if (
			cmsByPageId?.content?.[selectedTab] ||
			cmsByPageId?.title?.[selectedTab]
		) {
			setData(cmsByPageId?.content?.[selectedTab]);
			setTemplate(cmsByPageId?.content?.[selectedTab]);
			setLabel(cmsByPageId?.title?.[selectedTab]);
		}
	}, [cmsByPageId?.content, cmsByPageId?.title]);

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
					{imageGallery.map((f) => (
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

	useEffect(() => {
		if (activeTab) {
			const foundTab = tabData?.find((item) => item.id === activeTab);
			if (foundTab) {
				validation?.setFieldValue('language', foundTab?.title);
			}
		}
	}, [activeTab]);

	useEffect(() => {
		if (activeTab && label) {
			const foundTab = tabData?.find((item) => item.id === activeTab);
			if (foundTab) {
				setTitle({
					...title,
					[foundTab?.title]: label,
				});
			}
		}
	}, [label, activeTab, validation?.values?.title]);

	useEffect(() => {
		if (activeTab) {
			const foundTab = tabData?.find((item) => item.id === activeTab);
			if (foundTab && template) {
				setContent({
					...content,
					[foundTab?.title]: template,
				});
				setTemplate('');
			}
		}
	}, [template, activeTab, validation?.values?.content]);

	const toggle = (tab) => {
		if (!isView && ((title?.EN && content?.EN) || isEdit)) {
			setActiveTab(tab);
			setData(content?.[tab]);
			validation.setFieldValue('title', title?.[tab] || '');
			setLabel(title?.[tab] || '');
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
				hideFooter
				className="modal-dialog modal-lg"
			>
				{imageComponent}
			</Modal>
		</>
	);
};

CreateCMSTemplate.defaultProps = {
	languageData: {},
	validation: {},
	title: {},
	setTitle: () => {},
	content: {},
	setContent: () => {},
	cmsByPageId: null,
	isEdit: false,
	isView: false,
	showGallery: false,
	setShowGallery: () => {},
	selectedTab: 'EN',
	setSelectedTab: () => {},
};

CreateCMSTemplate.propTypes = {
	languageData: PropTypes.objectOf(),
	validation: PropTypes.objectOf(),
	title: PropTypes.objectOf(),
	setTitle: PropTypes.func,
	content: PropTypes.objectOf(),
	setContent: PropTypes.func,
	cmsByPageId: PropTypes.objectOf(),
	isEdit: PropTypes.bool,
	isView: PropTypes.bool,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
	selectedTab: PropTypes.string,
	setSelectedTab: PropTypes.func,
};

export default CreateCMSTemplate;
