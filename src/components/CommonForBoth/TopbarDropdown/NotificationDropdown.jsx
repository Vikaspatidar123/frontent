import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg"
// import avatar4 from "../../../assets/images/users/avatar-4.jpg"
import shortImage from '../../../assets/images/short-image-2.png'
//i18n
import { withTranslation } from "react-i18next"

const data=[{name:'Your order is placed',img:<i className="bx bx-cart" />,dec:'If several languages coalesce the grammar',time:'3 min'},
  {name:'James Lemire',img: <i className="bx bx-cart" />,dec:'If several languages coalesce the grammar',time:'1 hours'},
  {name:'Your item is shipped',img:<i className="bx bx-cart" />,dec:'If several languages coalesce the grammar',time:'3 min'},
  {name:'Salena Layfield',img:<i className="bx bx-badge-check" />,dec:'If several languages coalesce the grammar',time:'1 hours'}
]
const NotificationDropdown = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  return (
    <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3" style={{ backgroundImage: `url(${shortImage})` }}>
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 text-base font-semibold text-white flex-1"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="text-xs font-medium  text-white flex-0 cursor-pointer hover:underline hover:decoration-default-100 dark:decoration-default-900">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "300px" }}>
            {data.map((item)=><Link to="" className="text-reset notification-item" key={item.name}>
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    {item.img}
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {/* {props.t({item?.name})} */}
                    {item?.name}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-0 text-truncate" style={{ maxWidth: "160px" }}>
                      {/* {props.t({item?.dec})} */}
                      {item?.dec}
                    </p>
                    
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <p className="mb-0">
                      {item?.time}
                    </p>
                </div>
              </div>
            </Link>)}
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className="bx bx-cart" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">James Lemire</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("It will seem like simplified English") + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Your item is shipped")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("If several languages coalesce the grammar")}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}

            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
              <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className="bx bx-cart" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t(
                        "As a skeptical Cambridge friend of mine occidental"
                      ) + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-dark font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}