import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/Table';
import useBannerManagement from './hooks/useBannerManagement';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import FormModal from '../../components/Common/FormModal';
import useCreateBanner from './hooks/useCreateBanner';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';

const BannerManagement = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		isEditBannerLoading,
		onClickEdit,
		showModal,
		setShowModal,
	} = useCreateBanner();

	const { columns, formattedSABanners, SABannersloading } =
		useBannerManagement(onClickEdit);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Banner Management"
					/>
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Banners" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedSABanners}
									isLoading={SABannersloading}
									customPageSize={10}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					showConfirmationModal={showModal}
					setShowConfirmationModal={setShowModal}
					isEditOpen
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isEditBannerLoading}
					disableSubmit={typeof validation?.values?.thumbnail === 'string'}
				/>
				<ConfirmationModal
					openModal={showModal}
					setOpenModal={setShowModal}
					validation={validation}
					pageType={formPageTitle.bannerManagement}
				/>
			</Container>
		</div>
	);
};

BannerManagement.propTypes = {
	// t: PropTypes.func,
};

BannerManagement.defaultProps = {
	t: (string) => string,
};

export default BannerManagement;
