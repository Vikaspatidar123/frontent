/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Container, Form, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { uploadImageStart } from '../../store/sportsBook/actions';
import { showToastr } from '../../utils/helpers';

const ImageUploader = ({ sportId, countryId, code }) => {
	const dispatch = useDispatch();
	const [uploadedFile, setUploadedFile] = useState(null);
	const [error, setError] = useState('');

	const validateImageSize = (acceptedFiles) => {
		const file = acceptedFiles[0];
		const image = new Image();

		image.onload = function () {
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
			sportId && fd.append('sportId', sportId);
			countryId && fd.append('countryId', countryId);
			dispatch(uploadImageStart(fd));
		} else {
			showToastr({
				type: 'error',
				message: 'Please upload an image.',
			});
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Form onSubmit={handleSubmit}>
					<Dropzone
						onDrop={(acceptedFiles) => validateImageSize(acceptedFiles)}
						accept="image/*"
					>
						{({ getRootProps, getInputProps }) => (
							<div
								{...getRootProps()}
								className="dropzone"
								style={{
									border: '2px dashed #ccc',
									padding: '20px',
									textAlign: 'center',
								}}
							>
								<input {...getInputProps()} />
								<div className="mb-3">
									<i className="display-4 text-muted bx bxs-cloud-upload" />
								</div>
								<h4>Drag & drop an image here, or click to select one.</h4>
								{error && <p className="text-danger">{error}</p>}
								<Row className="justify-content-center mt-4">
									{uploadedFile && !error && (
										<div className="text-center">
											<img
												src={URL.createObjectURL(uploadedFile)}
												className="img-thumbnail"
												alt="thumbnail"
											/>
										</div>
									)}
								</Row>
							</div>
						)}
					</Dropzone>
					<div className="d-flex justify-content-end mt-4">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</Form>
			</Row>
		</Container>
	);
};

ImageUploader.defaultProps = {
	sportId: null,
	countryId: null,
	code: null,
};

ImageUploader.propTypes = {
	sportId: PropTypes.string,
	countryId: PropTypes.string,
	code: PropTypes.string,
};

export default ImageUploader;
