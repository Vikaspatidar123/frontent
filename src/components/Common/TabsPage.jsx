import React from 'react';
import classNames from 'classnames';
import {
	Card,
	CardBody,
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
	UncontrolledTooltip,
} from 'reactstrap';
import PropTypes from 'prop-types';

const TabsPage = ({ activeTab, tabsData, toggle, disableTabSwitching }) => (
	<div>
		<Row>
			<Col>
				<Card>
					<CardBody>
						<Nav pills className="navtab-bg tab-max-width">
							{tabsData?.map((tab) => (
								<NavItem key={tab.id}>
									{tab?.isHidden ? null : (
										<NavLink
											id={`tab-${tab.id}`}
											style={{ cursor: 'pointer' }}
											className={classNames({ active: activeTab === tab.id })}
											onClick={() => {
												toggle(tab.id);
											}}
											disabled={disableTabSwitching}
										>
											{tab.title}
										</NavLink>
									)}
									{tab.tooltipText && (
										<UncontrolledTooltip
											placement="bottom"
											target={`tab-${tab.id}`}
										>
											{tab.tooltipText}
										</UncontrolledTooltip>
									)}
								</NavItem>
							))}
						</Nav>
					</CardBody>
				</Card>
			</Col>
		</Row>
		<TabContent activeTab={activeTab} className="text-muted">
			{tabsData?.map((tab) => (
				<TabPane key={tab.id} tabId={tab.id}>
					<Row>
						<Col sm="12">{tab.component}</Col>
					</Row>
				</TabPane>
			))}
		</TabContent>
	</div>
);

TabsPage.defaultProps = {
	disableTabSwitching: false,
};

TabsPage.propTypes = {
	tabsData: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	).isRequired,
	activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	toggle: PropTypes.func.isRequired,
	disableTabSwitching: PropTypes.bool,
};

export default TabsPage;
