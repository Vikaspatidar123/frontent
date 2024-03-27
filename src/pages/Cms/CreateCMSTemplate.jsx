import React, { useState, useEffect, useMemo } from 'react';
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
// import { decryptCredentials } from '../../network/storageUtils';
import { formPageTitle } from '../../components/Common/constants';

const CreateCMSTemplate = ({
	languageData,
	cmsByPageId,
	// isEdit = false,
	isView = false,
	showGallery,
	setShowGallery,
	langTitle,
	setLangTitle,
	setTemplate,
	title,
	content,
	selectedTab,
	setSelectedTab,
	setContent,
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [activeTab, setActiveTab] = useState(1);
	// const [data, setData] = useState();
	const dispatch = useDispatch();
	const tabData = useMemo(
		() =>
			languageData?.languages?.map((item) => ({
				id: parseInt(item.id, 10),
				title: item.code,
				component: (
					<Row>
						<Col lg={4} className="mb-3">
							<CustomInputField
								label="Title"
								name="title"
								onChange={(e) => {
									setLangTitle(e.target.value);
								}}
								value={title[selectedTab] ? title[selectedTab] : ''}
								placeholder="Title"
							/>
						</Col>
						<Col sm="12">
							{' '}
							<Label className="form-label">Content</Label>
							<span className="text-danger"> *</span>
							<CodeEditor
								cmsByPageId={cmsByPageId}
								HTML={content[selectedTab] ? content[selectedTab] : ''}
								initial="HTML"
								mobileQuery={800}
								height="70vh"
								setTemplate={setTemplate}
								themeTransitionSpeed={150}
								selectedTab={selectedTab}
								disabled={isView}
								setContent={setContent}
								resettable={!isView}
							/>
						</Col>
					</Row>
				),
			})),
		[languageData, title, content, langTitle, activeTab, selectedTab]
	);

	useEffect(() => {
		if (activeTab && tabData) {
			const tab = tabData?.find((item) => item.id === activeTab);
			setSelectedTab(tab?.title);
		}
	}, [activeTab, tabData]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.cms)) {
			// const values = JSON.parse(
			// 	decryptCredentials(localStorage.getItem(formPageTitle.cms))
			// );
			// setData(values?.content?.EN);
		}
	}, []);

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

	const toggle = (tab) => {
		if (isView || (title?.EN && content?.EN)) {
			setActiveTab(tab);
		} else {
			showToastr({
				message:
					'Please enter Title and Content for English tab before switching to another tab!',
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
	title: {},
	content: {},
	cmsByPageId: null,
	// isEdit: false,
	isView: false,
	showGallery: false,
	setShowGallery: () => {},
	selectedTab: 'EN',
	setSelectedTab: () => {},
	setTemplate: () => {},
	langTitle: '',
	setLangTitle: () => {},
	setContent: () => {},
};

CreateCMSTemplate.propTypes = {
	languageData: PropTypes.objectOf(),
	title: PropTypes.objectOf(),
	content: PropTypes.objectOf(),
	cmsByPageId: PropTypes.objectOf(),
	// isEdit: PropTypes.bool,
	isView: PropTypes.bool,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
	selectedTab: PropTypes.string,
	setSelectedTab: PropTypes.func,
	setTemplate: PropTypes.func,
	setContent: PropTypes.func,
	langTitle: PropTypes.string,
	setLangTitle: PropTypes.func,
};

export default CreateCMSTemplate;
