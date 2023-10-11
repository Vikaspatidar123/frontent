/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useBannerManagement from './hooks/useBannerManagement';
import { Pages, BannerPreview } from './BannerManagementListCol';
import ActionButtons from './ActionButtons';

const columns = [
	{
		Header: 'PAGES',
		accessor: 'pages',
		filterable: true,
		Cell: ({ cell }) => <Pages cell={cell} />,
	},
	{
		Header: 'BANNER PREVIEW',
		accessor: 'bannerPreview',
		filterable: true,
		Cell: ({ cell }) => <BannerPreview cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const BannerManagement = ({ t }) => {
	// meta title
	document.title =
		'Banner Management | Skote - Vite React Admin & Dashboard Template';

	const { formattedSABanners, SABannersloading } = useBannerManagement();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Banner Management')}
					breadcrumbItem={t('Banner Management')}
				/>
				<TableContainer
					columns={columns}
					data={formattedSABanners}
					customPageSize={10}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					isLoading={SABannersloading}
				/>
			</Container>
		</div>
	);
};

BannerManagement.propTypes = {
	t: PropTypes.func,
};

BannerManagement.defaultProps = {
	t: (string) => string,
};

export default BannerManagement;
