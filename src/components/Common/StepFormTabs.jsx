import React from 'react';
import {
	Button,
	Card,
	CardBody,
	Col,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const StepFormTabs = ({
	tabsData,
	title,
	activeTab,
	toggleTab,
	passedSteps,
	onNextClick,
}) => (
	<Row>
		<Col lg="12">
			<Card>
				<CardBody>
					<h4 className="card-title mb-4">{title}</h4>
					<div className="wizard clearfix">
						<div className="steps clearfix">
							<ul>
								{tabsData?.map((tab, idx) => (
									<NavItem
										className={classnames({ current: activeTab === tab.id })}
									>
										<NavLink
											className={classnames({ current: activeTab === tab.id })}
											onClick={() => {
												toggleTab(tab.id);
											}}
											disabled={!(passedSteps || []).includes(tab.id)}
										>
											<span className="number">{idx + 1}.</span> {tab.title}
										</NavLink>
									</NavItem>
								))}
							</ul>
						</div>
						<div className="content clearfix">
							<TabContent activeTab={activeTab} className="body">
								{tabsData?.map((tab) => (
									<TabPane tabId={tab.id}>{tab.component}</TabPane>
								))}
							</TabContent>
						</div>
						<div className="actions clearfix">
							<ul>
								<li
									className={activeTab === 1 ? 'previous disabled' : 'previous'}
								>
									<Button
										disabled={activeTab === 1}
										onClick={() => {
											toggleTab(activeTab - 1);
										}}
									>
										Previous
									</Button>
								</li>
								<li
									className={
										activeTab === tabsData?.length ? 'next disabled' : 'next'
									}
								>
									<Button
										disabled={activeTab === tabsData?.length}
										onClick={() => {
											onNextClick(activeTab);
										}}
									>
										Next
									</Button>
								</li>
							</ul>
						</div>
					</div>
				</CardBody>
			</Card>
		</Col>
	</Row>
);

StepFormTabs.propTypes = {
	title: PropTypes.string.isRequired,
	activeTab: PropTypes.number.isRequired,
	toggleTab: PropTypes.func.isRequired,
	passedSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
	tabsData: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	).isRequired,
	onNextClick: PropTypes.func.isRequired,
};

export default StepFormTabs;
