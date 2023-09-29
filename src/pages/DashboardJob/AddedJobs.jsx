import React from 'react';

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//import images
import wechat from "../../assets/images/companies/wechat.svg";
import sass from "../../assets/images/companies/sass.svg";
import adobe from "../../assets/images/companies/adobe.svg";
import airbnb from "../../assets/images/companies/airbnb.svg";
import flutter from "../../assets/images/companies/flutter.svg";
import mailchimp from "../../assets/images/companies/mailchimp.svg";
import spotify from "../../assets/images/companies/spotify.svg";
import reddit from "../../assets/images/companies/reddit.svg";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { recentAddedJobsData } from '../../common/data';

const AddedJobs = () => {
  return (
    <React.Fragment>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Recent Added Jobs</h4>
            <SimpleBar style={{ maxHeight: "376px" }}>
              <div className="vstack gap-4">
                {(recentAddedJobsData || []).map((job, index) => (
                  <div className="d-flex" key={index}>
                    <img src={job.logo} alt="" height="40" className="rounded" />
                    <div className="ms-2 flex-grow-1">
                      <h6 className="mb-1 font-size-15">
                        <Link to="/job-details" className="text-body">{job.jobTitle}</Link>
                      </h6>
                      <p className="text-muted mb-0">{job.company} - <b>{job.postedTime}</b></p>
                    </div>
                    <UncontrolledDropdown>
                      <DropdownToggle className="btn btn-light" type="button" id={`dropdownMenuButton${index}`}>
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                        <DropdownItem tag="a" href="/job-details">View Details</DropdownItem>
                        <DropdownItem href="#!">Apply Now</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                ))}
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddedJobs;