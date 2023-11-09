/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {
	Row,
	Col,
	Card,
	Form,
	CardBody,
	Container,
	UncontrolledTooltip,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

// Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import { projectName } from '../../constants/config';

import { showToastr } from '../../utils/helpers';
import useImageGallery from './hooks/useImageGallery';

const ImageGallery = () => {
	// meta title
	document.title = projectName;
	const {
		imageGallery,
		imageGalleryLoading,
		handleFileUpload,
		deleteImage,
		validation,
	} = useImageGallery();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title="Image Gallery" breadcrumbItem="Gallery" />

				<Row>
					<Col>
						<Card>
							<CardBody>
								<Form onSubmit={validation.handleSubmit}>
									<Dropzone onDrop={handleFileUpload}>
										{({ getRootProps, getInputProps }) => (
											<div className="dropzone">
												<div
													className="dz-message needsclick mt-2"
													{...getRootProps()}
												>
													<input {...getInputProps()} />
													<div className="mb-3">
														<i className="display-4 text-muted bx bxs-cloud-upload" />
													</div>
													<h4>Drop files here or click to upload.</h4>
													<div className="text-center mt-4">
														<button type="button" className="btn btn-primary ">
															Upload Files
														</button>
													</div>
												</div>
											</div>
										)}
									</Dropzone>
									{validation.touched.initialstate &&
									validation.errors.initialstate
										? showToastr({
												message: validation.errors.initialstate,
												type: 'error',
										  })
										: ''}
									<div
										className="d-flex justify-content-start flex-wrap gap-3 dropzone-previews mt-3"
										id="file-previews"
									>
										<Row className="justify-content-start">
											{imageGalleryLoading ? (
												<Spinners
													color="primary"
													className="position-absolute top-0 start-50"
												/>
											) : (
												imageGallery.map((f, i) => (
													<Col>
														<Card
															key={`${i}-file`}
															className="align-items-center mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
														>
															<div className="p-2">
																<img
																	data-dz-thumbnail=""
																	height="200"
																	width="250"
																	className="rounded me-2 bg-light"
																	alt={f.name}
																	src={`https://gammastack-casino.s3.amazonaws.com/${f.fileName}`}
																/>
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
												))
											)}
										</Row>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ImageGallery;
