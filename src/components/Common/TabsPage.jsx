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
} from 'reactstrap';
import PropTypes from 'prop-types';

const TabsPage = ({ activeTab, tabsData, toggle }) => (
	<div>
		<Row>
			<Col>
				<Card>
					<CardBody>
						<Nav pills className="navtab-bg nav-justified">
							{tabsData?.map((tab) => (
								<NavItem key={tab.id}>
									<NavLink
										style={{ cursor: 'pointer' }}
										className={classNames({ active: activeTab === tab.id })}
										onClick={() => {
											toggle(tab.id);
										}}
									>
										{tab.title}
									</NavLink>
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

TabsPage.propTypes = {
	tabsData: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	).isRequired,
	activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	toggle: PropTypes.func.isRequired,
};

export default TabsPage;
