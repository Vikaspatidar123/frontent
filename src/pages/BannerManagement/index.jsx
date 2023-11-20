/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useBannerManagement from './hooks/useBannerManagement';
import { Pages, BannerPreview } from './BannerManagementListCol';
import { projectName } from '../../constants/config';
import ActionButtons from './ActionButtons';
import CrudSection from '../../components/Common/CrudSection';
import FormModal from '../../components/Common/FormModal';
import useCreateBanner from './hooks/useCreateBanner';

const computeColumns = ({ onClickEdit, onClickDelete }) => [
	{
		Header: 'PAGES',
		accessor: 'pages',
		filterable: true,
		Cell: ({ cell }) => <Pages value={cell.value} />,
	},
	{
		Header: 'BANNER PREVIEW',
		accessor: 'bannerPreview',
		filterable: true,
		disableSortBy: true,
		Cell: ({ cell }) => <BannerPreview value={cell.value} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		disableSortBy: true,
		Cell: ({ cell }) => (
			<ActionButtons
				row={cell.row}
				onClickEdit={onClickEdit}
				onClickDelete={onClickDelete}
			/>
		),
	},
];

const BannerManagement = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { formattedSABanners, SABannersloading, onClickDelete } =
		useBannerManagement();

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		isCreateBannerLoading,
		buttonList,
		isEditBannerLoading,
		onClickEdit,
	} = useCreateBanner();

	const columns = useMemo(
		() => computeColumns({ onClickEdit, onClickDelete }),
		[]
	);

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
							<CrudSection buttonList={buttonList} title="Banners" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedSABanners}
									customPageSize={10}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									isLoading={SABannersloading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateBannerLoading || isEditBannerLoading}
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
