import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import TabsPage from '../../components/Common/TabsPage';
import { CustomInputField } from '../../helpers/customForms';
import Modal from '../../components/Common/Modal';
import CodeEditor from '../../components/Common/CodeEditor';
import { showToastr } from '../../utils/helpers';

import { getImageGallery } from '../../store/actions';
import ImageGalleryGrid from '../../components/Common/ImageGalleryGrid';
import usePermission from '../../components/Common/Hooks/usePermission';

const CreateCMSTemplate = ({
	languageData,
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
	const dispatch = useDispatch();
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [activeTab, setActiveTab] = useState(1);
	const { isGranted } = usePermission();

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
