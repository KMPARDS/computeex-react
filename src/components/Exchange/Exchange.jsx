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
  Form,
  CardBody,
  Sonnet,
  ListGroup,
  Modal,
} from "react-bootstrap";

function Exchange() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <>
      <div className="section-padding about-area wow fadeInUp Exchange">
        <div className="space-30"></div>
        <div className="container">
          <div className="row">
            
            <div className="col-12 text-center mt20 multiexchange-box">
              <Tabs
                defaultActiveKey="insta"
                className="maintab"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="insta" title="INSTA-EXCHANGE">
                  <div className="tabcontent-box">
                    <Card body className="ste1">
                      <h6 className="text-dark font-weight-bold">
                        Calculate Amount
                      </h6>
                      <Form>
                        <Form.Row className="align-items-center">
                          <Col md="4">
                            <small>1 ERASWAP = 0.000215 BTC</small>
                            <div className="input-group multiselinput">
                              <span class="inputsmall">You send</span>
                              <input
                                placeholder="Enter amount"
                                className="form-input light large form-control"
                                value="0.1"
                              />
                              <div className="large light dropdown input-group-append">
                                <span class="inputsmall">Era Swap</span>
                                <button
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  type="button"
                                  className="dropdown-toggle btn btn-outline-secondary"
                                >
                                  ES
                                </button>
                              </div>
                            </div>
                          </Col>
                          <Col md="4">
                            <small>0.000215 BTC = 1 ERASWAP </small>
                            <div className="input-group multiselinput">
                              <span class="inputsmall">You send</span>
                              <input
                                placeholder="Enter amount"
                                className="form-input light large form-control"
                                value="0.1"
                              />
                              <div className="large light dropdown input-group-append">
                                <span class="inputsmall">BitCoin</span>
                                <button
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  type="button"
                                  className="dropdown-toggle btn btn-outline-secondary"
                                >
                                  BTC
                                </button>
                              </div>
                            </div>
                          </Col>

                          <Col md="4">
                            <Button
                              type="submit"
                              className="mb-2 btn btn-lg multtab-btn btn-block text-dark yel-btn"
                            >
                              EXCHANGE NOW
                            </Button>
                          </Col>
                        </Form.Row>
                      </Form>
                    </Card>
                    <Card
                      body
                      className="Faq-accordian mt20 col-12 col-sm-10 col-md-8 col-lg-7 col-xl-8 mx-auto"
                    >
                      <Accordion defaultActiveKey="0">
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey="1"
                            >
                              Transactions Details
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body>
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <span className="text-gray">
                                    Exchange fee :
                                  </span>{" "}
                                  0.00747134 ETH{" "}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <span className="text-gray">
                                    Network fee :
                                  </span>{" "}
                                  0.003 ETH
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <span className="text-gray">
                                    Transaction Charge :
                                  </span>{" "}
                                  0.00747134 ETH
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <span className="text-gray">
                                    Conversion Charge :
                                  </span>{" "}
                                  0.00747134 ETH
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <span className="text-gray">
                                    Platform Fuel Charges :
                                  </span>{" "}
                                  0.003 ETH
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <span className="text-gray">
                                    Withdrawal Charges :
                                  </span>{" "}
                                  0.003 ETH
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </Card>
                    <Card
                      body
                      className="mt20 col-12 col-sm-10 col-md-8 col-lg-7 col-xl-8 mx-auto"
                    >
                      <h6 className="text-dark font-weight-bold">
                        Wallet address
                      </h6>

                      <Form>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Recipient address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your Era Swap recipient address"
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formBasicCheckbox"
                          className="checkbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label="I agree with Terms & Conditions, Privacy Policy"
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          className="mb-2 btn btn-lg multtab-btn btn-block  yel-btn btn btn-primary text-dark"
                          type="submit"
                        >
                          Next Step
                        </Button>
                      </Form>
                    </Card>
                    
                    <Card
                      body
                      className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-8 mx-auto mt40 mb40 step2 transctions"
                    >
                      <h6 className="text-dark font-weight-bold">
                        Step 2
                      </h6>
                      <div className="row mt20">
                        <div className="col-lg-6">
                          <span className="text-gray">You Spend </span> <br />
                          0.1 USD{" "}
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="text-gray">You Get </span> <br />
                          2123 Era Swap
                        </div>
                      </div>
                      <div className="row mt20">
                        <div className="col-lg-6">
                          <span className="text-gray">Exchange fee</span> <br />
                          0.00747134 ETH
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="text-gray">Network fee </span> <br />
                          0.003 ETH
                        </div>
                      </div>
                      <div className="row mt20">
                        <div className="col-lg-6">
                          <span className="text-gray">Transaction Charge </span>{" "}
                          <br />
                          0.00747134 ETH{" "}
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="text-gray">
                            Platform Fuel Charges{" "}
                          </span>{" "}
                          <br />
                          0.003 ETH
                        </div>
                      </div>
                      <div className="row mt20">
                        <div className="col-lg-6">
                          <span className="text-gray">Conversion Charge </span>{" "}
                          <br />
                          0.00747134 ETH{" "}
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="text-gray">Withdrawal Charges </span>{" "}
                          <br />
                          0.003 ETH
                        </div>
                      </div>
                      <div className="row mt20">
                        <div className="col-lg-12">
                          <span className="text-gray">Recipient address </span>{" "}
                          <br />
                          0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7{" "}
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        className="mb-2 btn btn-lg multtab-btn btn-block  yel-btn btn btn-primary text-dark"
                        type="submit"
                      >
                        Confirm and make payment
                      </Button>
                    </Card>
                   
                    <Card
                      body
                      className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-8 mx-auto mt40 mb40 step3 view-trans"
                    >
                       <h6 className="text-dark font-weight-bold">
                        Step 3
                      </h6>
                      <small className="text-gray">
                        Please send the exact amount from your wallet or
                        exchange account to the following address
                      </small>
                      <div className="row mt20">
                        <div className="col-lg-6">
                          <span className="text-gray">Transaction ID : </span>
                          8ajzvo8upvt9uq6u{" "}
                          <i
                            class="fa fa-file text-yellow"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="text-gray">Transaction ID : </span>
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
                    </Card>
                  </div>
                </Tab>
                <Tab eventKey="bid" title="BID & TRADE">
                  <div className="tabcontent-box">
                    <Row className="">
                      <Col md="3">
                        <Card body className="">
                          <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>You send</Form.Label>
                              <div className="input-group multiselinput">
                                <input
                                  placeholder="Enter amount"
                                  className="form-input light large form-control"
                                  value="0.1"
                                />
                                <div className="large light dropdown input-group-append">
                                  <button
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    type="button"
                                    className="dropdown-toggle btn btn-outline-secondary"
                                  >
                                    ES
                                  </button>
                                </div>
                              </div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>You get</Form.Label>
                              <div className="input-group multiselinput">
                                <input
                                  placeholder="Enter amount"
                                  className="form-input light large form-control"
                                  value="0.1"
                                />
                                <div className="large light dropdown input-group-append">
                                  <button
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    type="button"
                                    className="dropdown-toggle btn btn-outline-secondary"
                                  >
                                    ES
                                  </button>
                                </div>
                              </div>
                            </Form.Group>
                          </Form>
                        </Card>
                      </Col>
                      <Col md="9">
                        <Card body className="">
                          <div className="row">
                            <div className="col-lg-6">
                              <span className="text-gray">
                                Powered by Binance{" "}
                                <img
                                  className="thum-round"
                                  src="/assets/img/binance.png"
                                />
                              </span>{" "}
                            </div>
                            <div className="col-lg-6 text-right">
                              <span className="text-gray">
                                Last Traded Price : 0.00012 BTC{" "}
                              </span>{" "}
                              <br />
                              <span className="text-gray">
                                24 hours Volume : 156.40{" "}
                              </span>
                            </div>
                            <div className="col-md-12 mt10 text-left">
                              <h6 className="text-dark font-weight-bold">
                                500.00 ES
                              </h6>
                              <span className="text-gray">
                                500.00 ES=0.2310
                              </span>
                            </div>
                          </div>

                          <p className="mt20">Order Book</p>
                          <div className="table-responsive">
                            <Table size="sm">
                              <thead>
                                <tr>
                                  <th>Price (BTC)</th>
                                  <th>Qty(ETC)</th>
                                  <th>Total(BTC)</th>
                                  <th>Price (BTC)</th>
                                  <th>Qty(ETC)</th>
                                  <th>Total(BTC)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>

                          <div className="">
                            <Button
                              variant="danger"
                              className="mb-2 btn btn-lg multtab-btn mb10"
                              type=""
                              onClick={handleShow}
                            >
                              SELL ES
                            </Button>
                            <Button
                              variant="success"
                              className="mb-2 btn btn-lg multtab-btn ml10 mb10"
                              type=""
                              onClick={handleShow1}
                            >
                              BUY ES
                            </Button>

                            <Button
                              variant="dark"
                              className="mb-2 btn btn-lg multtab-btn ml10 mb10"
                              type=""
                              onClick={handleShow2}
                            >
                              Transactions Details
                            </Button>
                          </div>
                        </Card>
                        <Card body className="mt20">
                          <div className="row">
                            <div className="col-lg-6">
                              <span className="text-gray">
                                Powered by Binance{" "}
                                <img
                                  className="thum-round"
                                  src="/assets/img/binance.png"
                                />
                              </span>{" "}
                            </div>
                            <div className="col-lg-6 text-right">
                              <span className="text-gray">
                                Last Traded Price : 0.00012 BTC{" "}
                              </span>{" "}
                              <br />
                              <span className="text-gray">
                                24 hours Volume : 156.40{" "}
                              </span>
                            </div>
                            <div className="col-md-12 mt10 text-left">
                              <h6 className="text-dark font-weight-bold">
                                500.00 ES
                              </h6>
                              <span className="text-gray">
                                500.00 ES=0.2310
                              </span>
                            </div>
                          </div>

                          <p className="mt20">Order Book</p>
                          <div className="table-responsive">
                            <Table size="sm">
                              <thead>
                                <tr>
                                  <th>Price (BTC)</th>
                                  <th>Qty(ETC)</th>
                                  <th>Total(BTC)</th>
                                  <th>Price (BTC)</th>
                                  <th>Qty(ETC)</th>
                                  <th>Total(BTC)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                                <tr>
                                  <td className="text-warning">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                  <td className="text-success">0.005844</td>
                                  <td>1.45</td>
                                  <td>0.001</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>

                          <div className="">
                            <Button
                              variant="danger"
                              className="mb-2 btn btn-lg multtab-btn mb10"
                              type=""
                              onClick={handleShow}
                            >
                              SELL ES
                            </Button>
                            <Button
                              variant="success"
                              className="mb-2 btn btn-lg multtab-btn ml10 mb10"
                              type=""
                              onClick={handleShow1}
                            >
                              BUY ES
                            </Button>

                            <Button
                              variant="dark"
                              className="mb-2 btn btn-lg multtab-btn ml10 mb10"
                              type=""
                              onClick={handleShow2}
                            >
                              Transactions Details
                            </Button>
                          </div>
                        </Card>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>SELL ES</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="col-12 step3 ">
                            <Form>
                                <Form.Row >
                                   <Form.Group
                                    controlId="formBasicCheckbox"
                                    className="checkbox mr10 pdl10"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Limit"
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    controlId="formBasicCheckbox"
                                    className="checkbox mr10"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Market Price"
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    controlId="formBasicCheckbox"
                                    className="checkbox mr10"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Stop Limit"
                                    />
                                  </Form.Group>
                                </Form.Row>

                                <Form.Row className="align-items-center">
                                      <Col md="6">
                                        <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Price (BTC)</Form.Label>
                                          <Form.Control placeholder="" />
                                        </Form.Group>
                                      </Col>
                                      <Col md="6">
                                         <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Stop Price (BTC)</Form.Label>
                                          <Form.Control placeholder="1" />
                                        </Form.Group>
                                      </Col>
                                  </Form.Row>
                                  <Form.Row className="align-items-center">
                                      <Col md="8">
                                        <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Quantity (ETC)</Form.Label>
                                          <Form.Control placeholder="" />
                                        </Form.Group>
                                      </Col>
                                      <Col md="2">
                                         <Form.Group controlId="formGridAddress1">
                                          <Form.Label>&nbsp;</Form.Label>
                                          <Form.Control placeholder="1" />
                                        </Form.Group>
                                      </Col>
                                     <Col md="2">
                                         <Form.Group controlId="formGridAddress1">
                                          <Form.Label>&nbsp;</Form.Label>
                                          <Form.Control placeholder="1" />
                                        </Form.Group>
                                      </Col>
                                  </Form.Row>
                                  <Form.Row className="align-items-center">
                                      <Col md="8">
                                        <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Sell for (BTC</Form.Label>
                                          <Form.Control placeholder="" />
                                        </Form.Group>
                                      </Col>
                                      
                                     <Col md="4">
                                          <div className=" text-right">
                                            <span className="text-gray">
                                              You get: (+Fees 0.1)
                                            </span>{" "}
                                            <br />
                                            <span className="text-gray">
                                              0.0215431 ES
                                            </span>
                                          </div>
                                      </Col>
                                  </Form.Row>
                                  
 

                               
                                   <Button variant="outline-dark" size="lg" type="submit" className="mb10">
                                   CANCEL
                                </Button>
                                <Button  variant="danger" size="lg" type="submit" className=" ml10 mb10">
                                   SELL ES
                                </Button>

                               
                                 <div className="col-lg-12 text-right powerby">
                                    <span className="text-gray">
                                      Powered by Binance{" "}
                                      <img
                                        className="thum-round"
                                        src="/assets/img/binance.png"
                                      />
                                    </span>{" "}
                                  </div>
                              </Form>
                            </div>
                          </Modal.Body>
                        </Modal>



                        <Modal
                          show={show1}
                          onHide={handleClose1}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>SELL ES</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="col-12 step3 ">
                            <Form>
                                <Form.Row >
                                   <Form.Group
                                    controlId="formBasicCheckbox"
                                    className="checkbox mr10 pdl10"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Limit"
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    controlId="formBasicCheckbox"
                                    className="checkbox mr10"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Market Price"
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    controlId="formBasicCheckbox"
                                    className="checkbox mr10"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      label="Stop Limit"
                                    />
                                  </Form.Group>
                                </Form.Row>

                                <Form.Row className="align-items-center">
                                      <Col md="6">
                                        <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Price (BTC)</Form.Label>
                                          <Form.Control placeholder="" />
                                        </Form.Group>
                                      </Col>
                                      <Col md="6">
                                         <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Stop Price (BTC)</Form.Label>
                                          <Form.Control placeholder="1" />
                                        </Form.Group>
                                      </Col>
                                  </Form.Row>
                                  <Form.Row className="align-items-center">
                                      <Col md="8">
                                        <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Quantity (ETC)</Form.Label>
                                          <Form.Control placeholder="" />
                                        </Form.Group>
                                      </Col>
                                      <Col md="2">
                                         <Form.Group controlId="formGridAddress1">
                                          <Form.Label>&nbsp;</Form.Label>
                                          <Form.Control placeholder="1" />
                                        </Form.Group>
                                      </Col>
                                     <Col md="2">
                                         <Form.Group controlId="formGridAddress1">
                                          <Form.Label>&nbsp;</Form.Label>
                                          <Form.Control placeholder="1" />
                                        </Form.Group>
                                      </Col>
                                  </Form.Row>
                                  <Form.Row className="align-items-center">
                                      <Col md="8">
                                        <Form.Group controlId="formGridAddress1">
                                          <Form.Label>Sell for (BTC</Form.Label>
                                          <Form.Control placeholder="" />
                                        </Form.Group>
                                      </Col>
                                      
                                     <Col md="4">
                                          <div className=" text-right">
                                            <span className="text-gray">
                                              You get: (+Fees 0.1)
                                            </span>{" "}
                                            <br />
                                            <span className="text-gray">
                                              0.0215431 ES
                                            </span>
                                          </div>
                                      </Col>
                                  </Form.Row>
                                  
 

                               
                                   <Button variant="outline-dark" size="lg" type="submit" className="mb10">
                                   CANCEL
                                </Button>
                                <Button  variant="success" size="lg" type="submit" className=" ml10 mb10">
                                  BUY ES
                                </Button>

                               
                                 <div className="col-lg-12 text-right powerby">
                                    <span className="text-gray">
                                      Powered by Binance{" "}
                                      <img
                                        className="thum-round"
                                        src="/assets/img/binance.png"
                                      />
                                    </span>{" "}
                                  </div>
                              </Form>
                            </div>
                          </Modal.Body>
                        </Modal>


                        
                        <Modal
                          show={show2}
                          onHide={handleClose2}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Transactions Details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="col-12 step3 ">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                          <span className="text-gray">
                                            Exchange fee :
                                          </span>{" "}
                                          0.00747134 ETH{" "}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                          <span className="text-gray">
                                            Network fee :
                                          </span>{" "}
                                          0.003 ETH
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                          <span className="text-gray">
                                            Transaction Charge :
                                          </span>{" "}
                                          0.00747134 ETH
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                          <span className="text-gray">
                                            Conversion Charge :
                                          </span>{" "}
                                          0.00747134 ETH
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                          <span className="text-gray">
                                            Platform Fuel Charges :
                                          </span>{" "}
                                          0.003 ETH
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                          <span className="text-gray">
                                            Withdrawal Charges :
                                          </span>{" "}
                                          0.003 ETH
                                        </ListGroup.Item>
                                      </ListGroup>
                            </div>
                          </Modal.Body>
                        </Modal>


                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exchange;
