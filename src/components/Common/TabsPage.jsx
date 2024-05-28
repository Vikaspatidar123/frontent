/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import classNames from 'classnames';
import {
	Card,
	CardBody,
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
	UncontrolledDropdown,
	UncontrolledTooltip,
} from 'reactstrap';
import PropTypes from 'prop-types';

const Dropdown = ({ tab, selectedDropdown, setSelectedDropdown, toggle }) => (
	<UncontrolledDropdown nav inNavbar>
		<DropdownToggle nav caret className="d-flex gap-1">
			{tab?.title}
			<i className="mdi mdi-chevron-down" />
		</DropdownToggle>
		<DropdownMenu>
			{tab?.dropdownItems.map((item) =>
				item?.isHidden ? null : (
					<DropdownItem
						key={item?.id}
						active={selectedDropdown}
						className="py-3"
						onClick={() => {
							toggle(tab?.id);
							setSelectedDropdown(item?.id);
						}}
					>
						{item?.title}
					</DropdownItem>
				)
			)}
		</DropdownMenu>
	</UncontrolledDropdown>
);

const TabsPage = ({
	activeTab,
	tabsData,
	toggle,
	disableTabSwitching,
	navClass,
	tabType = 'pills',
	tabContentClass = '',
	tabCardClass = '',
}) => {
	const [selectedDropdown, setSelectedDropdown] = useState('');
	return (
		<div>
			<Row>
				<Col>
					<Card className={tabCardClass}>
						<CardBody className={`${navClass}`}>
							<Nav
								tabs={tabType !== 'pills'}
								pills={tabType === 'pills'}
								className={`${
									tabType === 'pills'
										? 'navtab-bg tab-max-width'
										: 'nav-tabs-custom nav-justified'
								}`}
							>
								{tabsData?.map((tab) =>
									tab?.isHidden ? null : tab?.isDropdown ? (
										<Dropdown
											id={`dropdown-${tab.id}`}
											tab={tab}
											selectedDropdown={selectedDropdown}
											setSelectedDropdown={setSelectedDropdown}
											toggle={toggle}
										/>
									) : (
										<NavItem key={tab.id}>
											<NavLink
												id={`tab-${tab.id}`}
												style={{ cursor: 'pointer' }}
												className={classNames({
													active: activeTab === tab.id,
												})}
												onClick={() => {
													toggle(tab.id);
												}}
												disabled={disableTabSwitching}
											>
												{tab.title}
											</NavLink>

											{tab.tooltipText && (
												<UncontrolledTooltip
													placement="bottom"
													target={`tab-${tab.id}`}
												>
													{tab.tooltipText}
												</UncontrolledTooltip>
											)}
										</NavItem>
									)
								)}
							</Nav>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<TabContent
				activeTab={activeTab}
				className={`text-muted ${tabContentClass}`}
			>
				{tabsData?.map((tab) => (
					<TabPane key={tab.id} tabId={tab.id}>
						{tab?.isDropdown ? (
							<Row>
								<Col sm="12">
									<Col sm="12">
										{
											tab.dropdownItems.find(
												(item) => item.id === selectedDropdown
											)?.component
										}
									</Col>
								</Col>
							</Row>
						) : (
							<Row>
								<Col sm="12">{tab.component}</Col>
							</Row>
						)}
					</TabPane>
				))}
			</TabContent>
		</div>
	);
};

TabsPage.defaultProps = {
	disableTabSwitching: false,
	navClass: '',
	tabType: 'pills',
	tabContentClass: '',
	tabCardClass: '',
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
	navClass: PropTypes.string,
	tabType: PropTypes.string,
	tabContentClass: PropTypes.string,
	tabCardClass: PropTypes.string,
};

Dropdown.defaultProps = {
	selectedDropdown: '',
	setSelectedDropdown: () => {},
	tab: {},
};

Dropdown.propTypes = {
	tab: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
	),
	selectedDropdown: PropTypes.string,
	setSelectedDropdown: PropTypes.func,
	toggle: PropTypes.func.isRequired,
};

export default TabsPage;
