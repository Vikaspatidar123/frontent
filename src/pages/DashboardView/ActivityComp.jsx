/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { activityData } from '../../common/data';

const ActivityComp = () => (
	<Card>
		<CardBody>
			<CardTitle className="mb-5">Activity</CardTitle>
			<ul className="verti-timeline list-unstyled">
				{(activityData || []).map((item) => (
					<li
						className={`event-list ${item.active && 'active'}`}
						key={`${item.id}`}
					>
						<div className="event-timeline-dot">
							<i
								className={`bx bx-right-arrow-circle font-size-18 ${
									item.active && 'bx-fade-right'
								}`}
							/>
						</div>
						<div className="flex-shrink-0 d-flex">
							<div className="me-3">
								<h5 className="font-size-14">
									{item.date}
									<i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
								</h5>
							</div>
							<div className="flex-grow-1">
								<div>{item.activity}</div>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="text-center mt-4">
				<Link to="" className="btn btn-primary  btn-sm">
					View More <i className="mdi mdi-arrow-right ms-1" />
				</Link>
			</div>
		</CardBody>
	</Card>
);

export default ActivityComp;
