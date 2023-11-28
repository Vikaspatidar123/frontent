import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import ReorderComponent from '../ReorderCategories';
import useBonusReorder from './hooks/useBonusReorder';
import TableContainer from '../../components/Common/TableContainer';

const ReorderBonus = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		buttonList,
		columns,
		state,
		setState,
		formattedBonus,
		isBonusDetailsLoading,
		formattedState,
	} = useBonusReorder();

	return (
		<div className="page-content">
			<div className="container-fluid">
				{showBreadcrumb && (
					<Breadcrumb
						title="Bonus Management"
						breadcrumbItem="Reorder Category"
					/>
				)}

				<Row>
					<Card>
						<CrudSection
							buttonList={state?.count ? buttonList : []}
							title="Bonus Reorder"
						/>
					</Card>
				</Row>

				<Row lg={12}>
					<Col lg={6}>
						<Card>
							<CardBody>
								<Row className="drag-table--header">
									<TableContainer
										columns={columns}
										data={formattedBonus}
										customPageSize={10}
										tableClass="table-bordered align-middle nowrap"
										theadClass="col-6"
										paginationDiv="justify-content-center"
										pagination="pagination justify-content-start pagination-rounded"
										isLoading={isBonusDetailsLoading}
									/>
								</Row>
							</CardBody>
						</Card>
					</Col>
					<Col lg={6}>
						<Card>
							<CardBody>
								<Row className="drag-table--header">
									{['ORDER ID', 'BONUS NAME', 'ACTION'].map((key) => (
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
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ReorderBonus;
