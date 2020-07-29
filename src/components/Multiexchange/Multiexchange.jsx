import React from "react";
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
  Sonnet,
} from "react-bootstrap";

function Multiexchange() {
  return (
    <>
      <div className="welcome-area wow fadeInUp" id="about">
        <div id="particles-js"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 align-self-center">
              <div className="welcome-right">
                <div className="welcome-text">
                  <h5>Multi Exchange</h5>
                  <h1>Smart Contract</h1>
                  <h4>
                    ComputeEx will use smart contract on the platform so that
                    neither buyers nor sellers have to trust or know each other
                    to conduct transaction freely.{" "}
                  </h4>
                </div>
                <div className="welcome-btn">
                  <a
                    href="https://eraswap.life/"
                    target="_blank"
                    className="gradient-btn v2 mr-20"
                  >
                    Connect to wallet{" "}
                  </a>
                  <a
                    href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf"
                    target="_blank"
                    className="gradient-btn v2"
                  >
                    Download Whitepaper
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="welcome-img">
                <img
                  src="/assets/img/smartcontract1.png"
                  alt=""
                  classname="mar-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding about-area wow fadeInUp">
        <div className="space-30"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="heading">
                <h5>Multi Exchange</h5>
                <div className="space-10"></div>
                <h1>How it works</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" wow fadeInUp multi-works">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <a href="#" className="single-about">
                <div className="single-about-img">
                  <img src="/assets/img/choosecryto.png" alt="" />
                </div>
                <div className="single-about-text">
                  <h4>Choose the crypto pair</h4>
                </div>
              </a>
            </div>
            <div className="col-lg-3">
              <a href="#" className="single-about">
                <div className="single-about-img">
                  <img src="/assets/img/confirmthetransaction.png" alt="" />
                </div>
                <div className="single-about-text">
                  <h4>Confirm the transaction and sign in/sign </h4>
                </div>
              </a>
            </div>
            <div className="col-lg-3">
              <a href="#" className="single-about">
                <div className="single-about-img">
                  <img src="/assets/img/sendtheexactamount.png" alt="" />
                </div>
                <div className="single-about-text">
                  <h4>Send the amount to the Address </h4>
                </div>
              </a>
            </div>
            <div className="col-lg-3">
              <a href="#" className="single-about">
                <div className="single-about-img">
                  <img src="/assets/img/recieveinwallet.png" alt="" />
                </div>
                <div className="single-about-text">
                  <h4>Receive the crypto in your wallet</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="space-90"></div>
      </div>

      <div className="team-bg">
        <div className="faq-area wow fadeInUp" id="faq">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="heading">
                  <h5>faq</h5>
                  <div className="space-10"></div>
                  <h1>Frequently Asked Questions </h1>
                </div>

                <div className="space-60"></div>
              </div>
            </div>

            <div className="welcome-progress Faq-accordian">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      What is computeEx ?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      There are numerous digital asset exchanges with different
                      rates and complications which make trading on multiple
                      exchanges complicated. ComputeEx comes with a one stop
                      solution to make the trading hassle free by fetching the
                      best rates from different exchanges at once place.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      What is Multi-Exchange Solution?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      Users can trade top digital assets in major exchanges
                      irrespective of whether the users have an account on that
                      exchange or not.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      What is P2P Lend & Borrow?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      It allows users to lend their digital assets in a p2p mode
                      without the worry of losing their worthy assets forever.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                      What is P2P Trade?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      Users will be able to trade digital assets freely without
                      the intervention of any third party. Users can place their
                      buy or sell orders.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                      Why ComputeEx?
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>
                      Multi-Solutions At One Place. Please watch this video
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            <div className="space-60"></div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="one">
              <div className="container-fluid">
                <div className="faq-carousel owl-carousel">
                  <div className="single-faq">
                    <h4> What is computeEx ?</h4>
                    <div className="space-20"></div>
                    <p>
                      There are numerous digital asset exchanges with different
                      rates and complications which make trading on multiple
                      exchanges complicated. ComputeEx comes with a one stop
                      solution to make the trading hassle free by fetching the
                      best rates from different exchanges at once place.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>What is Multi-Exchange Solution? </h4>
                    <div className="space-20"></div>
                    <p>
                      Users can trade top digital assets in major exchanges
                      irrespective of whether the users have an account on that
                      exchange or not.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4> What is P2P Lend & Borrow? </h4>
                    <div className="space-20"></div>
                    <p>
                      It allows users to lend their digital assets in a p2p mode
                      without the worry of losing their worthy assets forever.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4> What is P2P Trade? </h4>
                    <div className="space-20"></div>
                    <p>
                      Users will be able to trade digital assets freely without
                      the intervention of any third party. Users can place their
                      buy or sell orders.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>Why ComputeEx?</h4>
                    <div className="space-20"></div>
                    <p>
                      Multi-Solutions At One Place. Please watch this videio{" "}
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="two">
              <div className="container-fluid">
                <div className="faq-carousel owl-carousel">
                  <div className="single-faq">
                    <h4>Why I should invest in ICO ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>The Risks of Investing in ICO ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>How to Trade Cryptocurrencies ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>How to Trade Cryptocurrencies ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="three">
              <div className="container-fluid">
                <div className="faq-carousel owl-carousel">
                  <div className="single-faq">
                    <h4>Why I should invest in ICO ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>The Risks of Investing in ICO ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>How to Trade Cryptocurrencies ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>How to Trade Cryptocurrencies ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="four">
              <div className="container-fluid">
                <div className="faq-carousel owl-carousel">
                  <div className="single-faq">
                    <h4>Why I should invest in ICO ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>The Risks of Investing in ICO ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day.
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>How to Trade Cryptocurrencies ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                  <div className="single-faq">
                    <h4>How to Trade Cryptocurrencies ?</h4>
                    <div className="space-20"></div>
                    <p>
                      Swimming hundreds of feet beneath the ocean’s surface in
                      many parts of the world are prolific architects called
                      giant larvaceans. These zooplankton are not particularly
                      giant themselves (they resemble tadpoles and are about the
                      size of a pinkie finger), but every day
                    </p>
                    <div className="space-20"></div>
                    <a href="#" className="readmore-btn">
                      <i className="fa fa-angle-right"></i>readmore
                    </a>
                  </div>
                </div>
              </div>
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

export default Multiexchange;
