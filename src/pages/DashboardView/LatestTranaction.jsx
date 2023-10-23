/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from 'reactstrap';
import withRouter from '../../components/Common/withRouter';

import EcommerceOrdersModal from '../Ecommerce/EcommerceOrders/EcommerceOrdersModal';

import {
	OrderId,
	BillingName,
	Date,
	Total,
	PaymentStatus,
	PaymentMethod,
} from './LatestTranactionCol';

import TableContainer from '../../components/Common/TableContainer';
import { latestTransaction } from '../../common/data';

const LatestTranaction = (props) => {
	const [modal1, setModal1] = useState(false);
	const toggleViewModal = () => setModal1(!modal1);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				filterable: true,
				disableFilters: true,
				Cell: (cellProps) => (
					<input type="checkbox" className="form-check-input" />
				),
			},
			{
				Header: 'Order ID',
				accessor: 'orderId',
				filterable: true,
				disableFilters: true,
				Cell: (cellProps) => <OrderId {...cellProps} />,
			},
			{
				Header: 'Billing Name',
				accessor: 'billingName',
				disableFilters: true,
				filterable: true,
				Cell: (cellProps) => <BillingName {...cellProps} />,
			},
			{
				Header: 'Date',
				accessor: 'orderdate',
				disableFilters: true,
				filterable: true,
				Cell: (cellProps) => <Date {...cellProps} />,
			},
			{
				Header: 'Total',
				accessor: 'total',
				disableFilters: true,
				filterable: true,
				Cell: (cellProps) => <Total {...cellProps} />,
			},
			{
				Header: 'Payment Status',
				accessor: 'paymentStatus',
				disableFilters: true,
				filterable: true,
				Cell: (cellProps) => <PaymentStatus {...cellProps} />,
			},
			{
				Header: 'Payment Method',
				accessor: 'paymentMethod',
				disableFilters: true,
				Cell: (cellProps) => <PaymentMethod {...cellProps} />,
			},
			{
				Header: 'View Details',
				disableFilters: true,
				accessor: 'view',
				Cell: (cellProps) => (
					<Button
						type="button"
						color="primary"
						className="btn-sm btn-rounded"
						onClick={toggleViewModal}
					>
						View Details
					</Button>
				),
			},
		],
		[]
	);

	return (
		<>
			<EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
			<Card>
				<CardBody>
					<div className="mb-4 h4 card-title">Latest Transaction</div>
					<TableContainer
						columns={columns}
						data={latestTransaction}
						isGlobalFilter
						isAddOptions={false}
						customPageSize={6}
					/>
				</CardBody>
			</Card>
		</>
	);
};

LatestTranaction.propTypes = {
	latestTransaction: PropTypes.array,
};

export default withRouter(LatestTranaction);
