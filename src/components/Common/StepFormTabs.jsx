import React from 'react';
import {
	Card,
	CardBody,
	Col,
	// Container,
	// Form,
	// FormGroup,
	// Input,
	// Label,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StepFormTabs = ({
	tabsData,
	title,
	activeTab,
	setActiveTab,
	toggleTab,
	passedSteps,
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
												setActiveTab(tab.id);
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
									<Link
										to="#!"
										onClick={() => {
											toggleTab(activeTab - 1);
										}}
									>
										Previous
									</Link>
								</li>
								<li
									className={
										activeTab === tabsData?.length ? 'next disabled' : 'next'
									}
								>
									<Link
										to="#!"
										onClick={() => {
											toggleTab(activeTab + 1);
										}}
									>
										Next
									</Link>
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
	setActiveTab: PropTypes.func.isRequired,
	toggleTab: PropTypes.func.isRequired,
	passedSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
	tabsData: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	).isRequired,
};

export default StepFormTabs;
