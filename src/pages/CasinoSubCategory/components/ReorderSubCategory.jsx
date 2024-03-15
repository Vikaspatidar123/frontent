import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import CrudSection from '../../../components/Common/CrudSection';
import ReorderComponent from '../../ReorderCategories';
import useReorderSubCategory from '../hooks/useReorderSubCategory';
import { CustomSelectField } from '../../../helpers/customForms';
import { selectedLanguage } from '../../../constants/config';

const ReorderSubCategory = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		state,
		setState,
		formattedState,
		selectedCategory,
		setSelectedCategory,
		casinoCategoryDetails,
		buttonList,
	} = useReorderSubCategory();

	return (
		<div className="page-content">
			<div className="container-fluid">
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Reorder Category"
						showBackButton
					/>
				)}

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={state.count ? buttonList : []}
								title="Casino Sub Categories Reorder"
							/>
							<CardBody>
								<Col lg={6}>
									<CustomSelectField
										label="Category"
										name="category"
										value={selectedCategory}
										isClearable
										type="select"
										onChange={(e) => setSelectedCategory(e.target.value)}
										key="my_unique_select_key_Category"
										options={
											<>
												<option value="">Select Category</option>
												{casinoCategoryDetails &&
													casinoCategoryDetails?.categories?.map((c) => (
														<option key={c?.id} value={c?.id}>
															{c?.name[selectedLanguage]}
														</option>
													))}
											</>
										}
									/>
								</Col>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								{selectedCategory ? (
									<Row className="drag-table--header">
										{['ID', 'NAME', 'STATUS'].map((key) => (
											<Col key={key} className="drag-table--heading">
												{key}
											</Col>
										))}
										<ReorderComponent
											formattedState={formattedState}
											state={state}
											setState={setState}
										/>
									</Row>
								) : (
									<p className="text-center text-danger">
										{' '}
										Select Category First{' '}
									</p>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ReorderSubCategory;
