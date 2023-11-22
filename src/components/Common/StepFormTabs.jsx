import React, { useMemo } from 'react';
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
	isNextDisabled,
	isPrevDisabled,
	submitButtonText,
	submitButtonLoading,
}) => {
	const tabsToShow = useMemo(
		() => tabsData.filter((tab) => !tab.isHidden) || [],
		[tabsData]
	);
	const currentTabIndex = useMemo(
		() => tabsToShow.findIndex((tab) => tab.id === activeTab),
		[tabsToShow, activeTab]
	);

	return (
		<Row>
			<Col lg="12">
				<Card>
					<CardBody>
						<h4 className="card-title mb-4">{title}</h4>
						<div className="wizard clearfix">
							<div className="steps clearfix">
								<ul>
									{tabsToShow?.map((tab, idx) => (
										<NavItem
											className={classnames({ current: activeTab === tab.id })}
										>
											<NavLink
												className={classnames({
													current: activeTab === tab.id,
												})}
												onClick={() => {
													// toggleTab(tab.id);
												}}
												disabled={!(passedSteps || []).includes(tab.id)}
											>
												<span className="number">{idx + 1}</span> {tab.title}
											</NavLink>
										</NavItem>
									))}
								</ul>
							</div>
							<div className="content clearfix">
								<TabContent activeTab={activeTab} className="body">
									{tabsToShow?.map((tab) => (
										<TabPane tabId={tab.id}>{tab.component}</TabPane>
									))}
								</TabContent>
							</div>
							<div className="actions clearfix">
								<ul>
									<li>
										<Button
											disabled={
												currentTabIndex === 0 ||
												isPrevDisabled ||
												submitButtonLoading
											}
											onClick={() =>
												toggleTab(
													currentTabIndex !== 0
														? tabsToShow[currentTabIndex - 1].id
														: ''
												)
											}
										>
											Previous
										</Button>
									</li>
									<li>
										<Button
											disabled={isNextDisabled || submitButtonLoading}
											onClick={() => {
												onNextClick(
													activeTab,
													currentTabIndex !== tabsToShow.length - 1
														? tabsToShow[currentTabIndex + 1].id
														: 'submit'
												);
											}}
										>
											{submitButtonLoading && (
												<i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
											)}
											{currentTabIndex === tabsToShow.length - 1
												? submitButtonText || 'Submit'
												: 'Next'}
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
};

StepFormTabs.defaultProps = {
	isNextDisabled: false,
	isPrevDisabled: false,
	submitButtonText: '',
	submitButtonLoading: false,
};

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
	isNextDisabled: PropTypes.bool,
	isPrevDisabled: PropTypes.bool,
	submitButtonText: PropTypes.string,
	submitButtonLoading: PropTypes.bool,
};

export default StepFormTabs;
