import React from 'react';

import {
	Row,
	Col,
	Card,
	CardBody,
	Container,
	UncontrolledTooltip,
	Button,
} from 'reactstrap';

// Breadcrumb
import PropTypes from 'prop-types';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import { projectName } from '../../constants/config';

import useImageGallery from './hooks/useImageGallery';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';
import CrudSection from '../../components/Common/CrudSection';
import ModalView from '../../components/Common/Modal';
import ImageUploader from '../../components/Common/ImageUploader';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

const ImageGalleryGrid = ({ imageGalleryList, isGranted, deleteImage }) =>
	imageGalleryList.length ? (
		imageGalleryList.map((f) => (
			<div className="col-sm-4 col-md-3 col-lg-2 p-0 mb-4">
				<div
					key={`${f?.fileName}-file`}
					className="bg-transparent h-100 align-items-center dz-processing dz-image-preview dz-success dz-complete"
				>
					<div className="img-parent h-100 position-relative ">
						<img
							data-dz-thumbnail=""
							className="rounded bg-light h-100"
							alt={f.name}
							src={`${VITE_APP_AWS_GALLERY_URL}${f.fileName}`}
						/>
						<Col className="trash-btn position-absolute top-0 end-0">
							<Button
								hidden={!isGranted(modules.galley, 'D')}
								className="btn btn-sm btn-soft-danger"
								onClick={() => deleteImage(f)}
							>
								<i className="mdi mdi-delete-outline" id="deletetooltip" />
								<UncontrolledTooltip placement="top" target="deletetooltip">
									Delete
								</UncontrolledTooltip>
							</Button>
						</Col>
					</div>
				</div>
			</div>
		))
	) : (
		<div className="text-center mb-3">No Images Available</div>
	);

ImageGalleryGrid.defaultProps = {
	imageGalleryList: [],
	isGranted: true,
	deleteImage: () => null,
};

ImageGalleryGrid.propTypes = {
	imageGalleryList: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([
				PropTypes.object,
				PropTypes.func,
				PropTypes.bool,
				PropTypes.number,
				PropTypes.string,
			])
		)
	),
	isGranted: PropTypes.bool,
	deleteImage: PropTypes.func,
};

const ImageGallery = () => {
	// meta title
	document.title = projectName;
	const { isGranted } = usePermission();
	const {
		imageGallery,
		imageGalleryLoading,
		handleFileUpload,
		deleteImage,
		validation,
		buttonList,
		showUpload,
		setShowUpload,
		isUploading,
		handleClear,
	} = useImageGallery();

	return (
		<div className="page-content">
			{isGranted(modules.galley, 'R') && (
				<Container fluid>
					<Breadcrumbs title="Image Gallery" breadcrumbItem="Gallery" />
					<Row>
						<Col>
							<Card className="bg-white">
								<CrudSection buttonList={buttonList} title="Images" />
								<CardBody>
									<div
										className="d-flex justify-content-start flex-wrap gap-3 dropzone-previews mt-3"
										id="file-previews"
									>
										<Row className="justify-content-start w-100">
											{imageGalleryLoading ? (
												<Spinners
													color="primary"
													className="position-absolute top-0 start-50"
												/>
											) : (
												<ImageGalleryGrid
													imageGalleryList={imageGallery}
													isGranted={isGranted}
													deleteImage={deleteImage}
												/>
											)}
										</Row>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<ModalView
						openModal={showUpload}
						toggleModal={() => setShowUpload((prev) => !prev)}
						headerTitle="Upload an Image"
						secondBtnName="Upload"
						className="modal-dialog modal-lg"
						hideFooter
					>
						<ImageUploader
							validateImage={handleFileUpload}
							handleSubmit={validation.handleSubmit}
							error={
								validation.touched.initialstate &&
								validation.errors.initialstate
							}
							uploadedFile={validation.values.initialstate}
							isUploading={isUploading}
							handleClear={handleClear}
						/>
					</ModalView>
				</Container>
			)}
		</div>
	);
};

export default ImageGallery;
