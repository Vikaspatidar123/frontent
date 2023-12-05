import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImageStart } from '../../store/sportsBook/actions';
import { showToastr } from '../../utils/helpers';
import ImageUploader from '../../components/Common/ImageUploader';

const IconUploader = ({ sportId, countryId, code, isUploading }) => {
	const dispatch = useDispatch();
	const [uploadedFile, setUploadedFile] = useState(null);
	const [error, setError] = useState('');

	const validateImageSize = (acceptedFiles) => {
		const file = acceptedFiles[0];
		const image = new Image();

		image.onload = () => {
			if (image.width === 30 && image.height === 30) {
				setUploadedFile(file);
				setError('');
			} else {
				setError('File size must be 30x30 pixels.');
			}
		};

		image.src = URL.createObjectURL(file);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (uploadedFile) {
			const fd = new FormData();
			fd.append('image', uploadedFile);
			fd.append('code', code);
			if (sportId) fd.append('sportId', sportId);
			if (countryId) fd.append('countryId', countryId);
			dispatch(uploadImageStart(fd));
		} else {
			showToastr({
				type: 'error',
				message: 'Please upload an image.',
			});
		}
	};

	return (
		<ImageUploader
			validateImage={validateImageSize}
			handleSubmit={handleSubmit}
			error={error}
			uploadedFile={uploadedFile}
			isUploading={isUploading}
			handleClear={() => setUploadedFile(null)}
		/>
	);
};

IconUploader.defaultProps = {
	sportId: null,
	countryId: null,
	code: null,
	isUploading: false,
};

IconUploader.propTypes = {
	sportId: PropTypes.string,
	countryId: PropTypes.string,
	code: PropTypes.string,
	isUploading: PropTypes.bool,
};

export default IconUploader;
