/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { Badge, Card, Col, Row } from 'reactstrap';
import Parser from 'html-react-parser';

const { VITE_APP_OBS_GALLERY_URL } = import.meta.env;

const GeneralDetails = ({ chatRainDetails }) => (
  <Row>
    <Col sm={4}>
      <Card className="p-3">
        <Row>
          <Col>
            <h3 className="h6 text-nowrap">Chat Rain Title:</h3>
          </Col>
          <Col>
            <p>{chatRainDetails?.name}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="h6 text-nowrap">Chat Rain Prizemoney:</h3>
          </Col>
          <Col>
            <p>{chatRainDetails?.prizeMoney} {chatRainDetails?.currency}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="h6 text-nowrap">Chat Rain Status:</h3>
          </Col>
          <Col>
            <p>{chatRainDetails?.isClosed ? (
              <Badge className='bg-success'>Open</Badge>
              ) : (
              <Badge className='bg-danger'>Closed</Badge>
              )            
            }</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="h6 text-nowrap">Chat Rain Channel Id:</h3>
          </Col>
          <Col>
            <p>{chatRainDetails?.chatGroupId}</p>
          </Col>
        </Row>

      </Card>
    </Col>



  </Row>
);

export default GeneralDetails;
