// import React from 'react'
// import { CustomInputField, CustomSwitchButton, CustomSelectField } from '../../helpers/custom_forms';
// import {
// 	Col,
// 	Row,
// 	Modal,
// 	ModalHeader,
// 	ModalBody,
// 	Form,
// } from 'reactstrap';

// const CreateCasinoCategory = ({

// }) => {

//   return (
//     <div>
//       <Modal isOpen={modal} toggle={toggle}>
// 						<ModalHeader toggle={toggle} tag="h4">
// 							{isEdit ? "Edit Job" : "Add Job"}
// 						</ModalHeader>
// 						<ModalBody>
// 							<Form
// 								onSubmit={(e) => {
// 									e.preventDefault();
// 									validation.handleSubmit();
// 									return false;
// 								}}
// 							>
// 								<Row>
// 									<Col className="col-12">
// 										<div className="mb-3">
// 											<CustomSelectField
// 												label='Select Language'
// 												name="language"
// 												type="select"
// 												onChange={validation.handleChange}
// 												onBlur={validation.handleBlur}
// 												placeholder="Select Language"
// 												validate={{ required: { value: true } }}
// 												value={validation.values.language || ""}
// 												invalid={!!(validation.touched.language && validation.errors.language)}
// 												isError
// 												errorMsg={validation.touched.language && validation.errors.language}
// 												options={
// 													<>
// 														<option value={null}>Select Language</option>
// 														{getLanguageData?.count && getLanguageData?.rows?.map(({ languageName, code, languageId }) => {
// 															console.log('languageName: ', languageName, code);
// 															return (
// 																<option key={code} value={languageId}>{languageName}</option>
// 															)
// 														})}
// 													</>
// 												}
// 											/>
// 										</div>
// 										<div className="mb-3">
// 											<CustomInputField
// 												label='Category Name'
// 												name="categoryName"
// 												type="text"
// 												onChange={validation.handleChange}
// 												onBlur={validation.handleBlur}
// 												placeholder="Enter Category Name"
// 												validate={{ required: { value: true } }}
// 												value={validation.values.categoryName || ""}
// 												invalid={!!(validation.touched.categoryName && validation.errors.categoryName)}
// 												isError
// 												errorMsg={validation.touched.categoryName && validation.errors.categoryName}
// 											/>
// 										</div>
// 										<div className="mb-3">
// 											<CustomSwitchButton
// 												labelClassName="form-check-label"
// 												label='Status'
// 												htmlFor="customRadioInline1"
// 												type="switch"
// 												id="customRadioInline1"
// 												name="status"
// 												checked={validation.values.status}
// 												inputClassName="form-check-input"
// 												onChange={validation.handleChange}
// 												onBlur={validation.handleBlur}
// 											/>
// 										</div>
// 									</Col>
// 								</Row>
// 								<Row>
// 									<Col>
// 										<div className="text-end">
// 											<button
// 												type="submit"
// 												className="btn btn-success save-user"
// 											>
// 												Save
// 											</button>
// 										</div>
// 									</Col>
// 								</Row>
// 							</Form>
// 						</ModalBody>
// 					</Modal>
//     </div>
//   )
// }

// export default CreateCasinoCategory
