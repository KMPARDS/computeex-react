import React, { useState } from "react";

import {
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Accordion,
  Container,
  Col,
  Row,
  Media,
  Button,
  Card,
  Tabs,
  Tab,
  Table,
  Sonnet,
  Modal,
} from "react-bootstrap";

function Orders() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="section-padding about-area wow fadeInUp">
        <div className="space-30"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="heading">
                <h5>Order & Insta-Exchage </h5>
                <div className="space-10"></div>
                <h1>History</h1>
              </div>
            </div>
            <div className="col-12 text-center">
              <Tabs
                defaultActiveKey="order"
                className="maintab"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="order" title="ORDER HISTORY">
                  <Tabs
                    defaultActiveKey="all"
                    className="innertab"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="all" title="All">
                      <div className="tabcontent-box">
                        <div>
                          <Table responsive="sm">
                            <thead>
                              <tr>
                                <th>PAIR</th>
                                <th>TIME</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>ACTION</th>
                                <th>ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="filled" title="Filled Orders">
                      <div className="tabcontent-box">tab2.1</div>
                    </Tab>
                    <Tab eventKey="open" title="Open Orders">
                      <div className="tabcontent-box">tab3.1</div>
                    </Tab>
                    <Tab eventKey="cancelled" title="Cancelled  Orders">
                      <div className="tabcontent-box">tab4.1</div>
                    </Tab>
                  </Tabs>
                </Tab>
                <Tab eventKey="insta" title="INSTA-EXCHANGE HISTORY">
                  <div className="tabcontent-box">
                    <div>
                      <Table responsive="sm">
                        <thead>
                          <tr>
                            <th>TRANSACTION ID</th>
                            <th>WALLET ADDRES</th>
                            <th>SENT</th>
                            <th>REMAINING TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>8ajzvo8upvt9uq6u</td>
                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                            <td>250 ES</td>
                            <td>36:00:00</td>
                            <td>
                              <a onClick={handleShow} className="text-success">
                                VIEW TRANSACTIONS
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>8ajzvo8upvt9uq6u</td>
                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                            <td>250 ES</td>
                            <td>36:00:00</td>
                            <td>
                              <a onClick={handleShow} className="text-success">
                                VIEW TRANSACTIONS
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>8ajzvo8upvt9uq6u</td>
                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                            <td>250 ES</td>
                            <td>36:00:00</td>
                            <td>
                              <a href="" className="text-success">
                                VIEW TRANSACTIONS
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>8ajzvo8upvt9uq6u</td>
                            <td>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</td>
                            <td>250 ES</td>
                            <td>36:00:00</td>
                            <td>
                              <a href="" className="text-success">
                                VIEW TRANSACTIONS
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>View Transactions</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="col-12 step3 view-trans">
                            <small className="text-gray">
                              Please send the exact amount from your wallet or
                              exchange account to the following address
                            </small>
                            <div className="row mt20">
                              <div className="col-lg-6">
                                <span className="text-gray">
                                  Transaction ID :{" "}
                                </span>
                                8ajzvo8upvt9uq6u{" "}
                                <i
                                  class="fa fa-file text-yellow"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <div className="col-lg-6 text-right">
                                <span className="text-gray">
                                  Transaction ID :{" "}
                                </span>
                                8ajzvo8upvt9uq6u
                              </div>
                            </div>
                            <div className="mt20">
                              <span className="text-gray">To address :</span>{" "}
                              0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7{" "}
                              <i
                                class="fa fa-file text-yellow"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <div className="qrcode text-center">
                              <img src="/assets/img/qr.jpg" />
                              <h4 className="text-dark">36:00:00</h4>
                              <span className="text-gray mt10">
                                You have 36 hours to send funds otherwise the
                                transaction will be canceled automaticaly
                              </span>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <div className="community-area wow fadeInUp section-padding" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5 offset-1 align-self-center">
              <div className="heading">
                <h5>Decentralized App </h5>
                <div className="space-10"></div>
                <h1>Track & Trade From Anywhere</h1>
                <div className="space-20"></div>
                <p>
                  Download 1DAAP from Play Store and get access to ComputeEx –
                  And have the efficiency of trading and tracking digital assets
                  from, anywhere. Using 1DAAP, you can access ComputeEx along
                  with multiple decentralized platforms and marketplaces, where
                  you can transact and exchange services in a P2P Mode, using
                  Era Swap Utility. Get 1DAAP and get access to multiple dApps
                  with a Single-sign-on.
                </p>
              </div>
              <div className="space-30"></div>
              <a
                href="https://play.google.com/store/apps/details?id=com.eraswaponeapp&hl=en"
                target="_blank"
                className="gradient-btn apps-btn"
              >
                {" "}
                <i className="zmdi zmdi-google-play"></i>Google Playstore
              </a>
            </div>
            <div className="col-12 col-lg-5 offset-1">
              <div className="apps-img">
                <img src="/assets/img/Mobile.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
