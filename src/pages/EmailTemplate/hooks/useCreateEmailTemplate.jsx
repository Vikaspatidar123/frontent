import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Card, Col } from 'reactstrap';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	resetEmailTemplate,
	createEmailTemplate,
	getImageGallery,
} from '../../../store/actions';

import {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
} from '../formDetails';

import { showToastr } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';

const useCreateEmailTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showGallery, setShowGallery] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();

	const languageOptions = useMemo(() => {
		if (languageData) {
			return languageData?.languages?.map((item) => ({
				optionLabel: item?.code,
				value: item.code,
			}));
		}
		return [];
	}, [languageData]);

	const formSubmitHandler = (values) => {
		dispatch(
			createEmailTemplate({
				data: {
					label: values?.label,
					templateCode: values?.content,
					eventType: values?.type,
					isDefault: values?.isDefault,
				},
				navigate,
			})
		);
	};

	useEffect(() => {
		dispatch(getLanguagesStart());
		dispatch(getImageGallery());
	}, []);

	const { header, validation, formFields, setFormFields } = useForm({
		header: '',
		initialValues: getInitialValues(),
		validationSchema: emailTemplateSchema(),
		staticFormFields: staticFormFields(languageOptions),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		setFormFields(staticFormFields(languageOptions));
	}, [languageOptions]);

	useEffect(
		() => () => {
			dispatch(resetEmailTemplate());
		},
		[]
	);
	const handleGalleryClick = () => {
		setShowGallery(true);
	};

	const galleryList = useMemo(() => [
		{
			label: 'Image Gallery',
			handleClick: handleGalleryClick,
			link: '#!',
		},
	]);

	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.emailTemplate,
			operation: 'C',
		},
	]);

	useEffect(() => {
		if (imageGallery?.length) {
			setImageComponent(
				<div
					className="d-flex justify-content-center flex-wrap gap-3 dropzone-previews mt-3"
					id="file-previews"
				>
					{imageGallery.map((f) => (
						<Col>
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
											alt={f.name}
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

	return {
		validation,
		galleryList,
		formFields,
		setFormFields,
		showGallery,
		setShowGallery,
		handleGalleryClick,
		languageOptions,
		imageComponent,
		buttonList,
		header,
	};
};

export default useCreateEmailTemplate;
