import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getImageGallery,
	uploadImageGallery,
	deleteImageGallery,
} from '../../../store/actions';
import {
	validationSchema,
	getInitialValues,
	formatBytes,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
import { showToastr } from '../../../utils/helpers';

const useImageGallery = () => {
	const dispatch = useDispatch();
	const { isGranted } = usePermission();

	const { imageGallery, imageGalleryLoading } = useSelector(
		(state) => state.EmailTemplate
	);

	useEffect(() => {
		dispatch(getImageGallery());
	}, []);

	function handleAcceptedFiles(values) {
		const { initialstate } = values;
		dispatch(
			uploadImageGallery({
				name: initialstate.name,
				image: initialstate,
			})
		);
	}

	const deleteImage = (f) => {
		const data = {
			imageUrl: f.fileName,
		};
		dispatch(deleteImageGallery(data));
	};

	const { validation } = useForm({
		initialValues: getInitialValues(),
		validationSchema,
		onSubmitEntry: handleAcceptedFiles,
	});

	const handleFileUpload = (files) => {
		if (isGranted(modules.ImageGallery, 'U')) {
			const formattedFiles = files.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
					formattedSize: formatBytes(file.size),
				})
			);

			validation.setFieldValue('initialstate', formattedFiles[0]);
		} else {
			showToastr({
				type: 'error',
				message: 'You do not have permission to upload image',
			});
		}
	};

	useEffect(() => {
		if (validation.values.initialstate) {
			validation.submitForm();
		}
	}, [validation.values.initialstate]);

	return {
		imageGallery,
		imageGalleryLoading,
		handleFileUpload,
		deleteImage,
		validation,
	};
};

export default useImageGallery;
