import React from 'react';
import { InputGroup, FormControl, Dropdown, DropdownButton ,Accordion,Container,Col,Row,Media,Button,Card,Tabs,Tab,Sonnet  } from 'react-bootstrap';

function Home() {
  return (
    <>
    <div className="welcome-area wow fadeInUp"  id="about">
      <div id="particles-js"></div>
      <div className="container">
          <div className="row">
              <div className="col-12 col-md-6 align-self-center">
                  <div className="welcome-right">
                      <div className="welcome-text">
                           <h1>One-stop solution for hassle free trading powered by Era Swap</h1>
                          <h4>Now trade on different exchanges at one place in a Peer to Peer mode, with ComputeEx P2P Lend and Borrow</h4>
                      </div>
                      <div className="welcome-btn">
                          <a onClick={() => window.open('https://eraswap.life/','','width=1001,height=650')} target="_blank" className="gradient-btn v2 mr-20">Connect to wallet </a>
                          <a href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank" className="gradient-btn v2">Download Whitepaper</a>
                      </div>
                  </div>
              </div>
              <div className="col-12 col-md-6">
                  <div className="welcome-img">
                      <img src="/assets/img/welcome-img.png" alt="" />
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
                        <h5>ComputeEx</h5>
                        <div className="space-10"></div>
                        <h1>Problems</h1>
                   </div>
              </div>
          </div>
         
      </div>
  </div>

  <div className="single-about-area wow fadeInUp">
      <div className="container">
          <div className="row">
              <div className="col-lg-6">
                  <a href="#" className="single-about">
                      <div className="single-about-img">
                          <img src="/assets/img/multipleexchanges.png" alt="" />
                      </div>
                      <div className="single-about-text">
                          <h4>Multiple Exchanges</h4>
                          <p>There are so many cryptocurrency exchanges in the world right now that it is getting cumbersome to keep a track of all the assets across these exchanges. </p>
                      </div>
                  </a>
              </div>
              <div className="col-lg-6">
                  <a href="#" className="single-about">
                      <div className="single-about-img">
                          <img src="/assets/img/credentials-Issue.png" alt="" />
                      </div>
                      <div className="single-about-text">
                          <h4>Numerous KYC & Credentials Issue</h4>
                          <p>It’s very challenging when your favourite token is getting on an exchange you aren’t registered on. You are forced to get registered on that exchange. .</p>
                      </div>
                  </a>
              </div>
             
            </div>
      </div>
      <div className="space-90"></div>
  </div>

  <div className="section-padding about-area wow fadeInUp" id="about">
      <div className="space-30"></div>
      <div className="container">
          <div className="row">
              <div className="col-12 text-center">
                  <div className="heading">
                        <h5>EraSwap has come up with the solution ComputeEx.</h5>
                        <div className="space-10"></div>
                        <h1>Solution</h1>
                   </div>
              </div>
          </div>
         
      </div>
  </div>

  <div className="single-about-area wow fadeInUp">
      <div className="container">
          <div className="row">
              <div className="col-lg-4">
                  <a href="#" className="single-about">
                      <div className="single-about-img">
                          <img src="/assets/img/singlepointofcontact.png" alt="" />
                      </div>
                      <div className="single-about-text">
                          <h4>Single Point of Contact</h4>
                          <p>ComputeEx brings all the crypto exchanges at a single point of contact. Users will be charged to execute trades on their behalf and there will be a 50% discount for Era Swap users paying the fees in form of EraSwap Tokens.</p>
                      </div>
                  </a>
              </div>
              <div className="col-lg-4">
                  <a href="#" className="single-about">
                      <div className="single-about-img">
                          <img src="/assets/img/hasslefree.png" alt="" />
                      </div>
                      <div className="single-about-text">
                          <h4>Hassle Free</h4>
                          <p>Thus Power Exchange ComputeEx will help the users on platforms of Era Swap Ecosystem to trade hassle-free with ease and comfort. Using EraSwap Tokens will further help users save additional 50% on charges to execute trades on their behalf. </p>
                      </div>
                  </a>
              </div>
              <div className="col-lg-4">
                  <a href="#" className="single-about">
                      <div className="single-about-img">
                          <img src="/assets/img/smartradingbots.png" alt="" />
                      </div>
                      <div className="single-about-text">
                          <h4>Smart Trading Bots</h4>
                          <p>Trading bots, deployed using AI, will fetch the best prices from across the exchanges and will allow users to buy or sell tokens on any exchange irrespective of whether they have an account on that exchange.</p>
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
                                    <Card.Body>There are numerous digital asset exchanges with different rates and complications which make trading on multiple exchanges complicated. ComputeEx comes with a one stop solution to make the trading hassle free by fetching the best rates from different exchanges at once place.

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
                                    <Card.Body>Users can trade top digital assets in major exchanges irrespective of whether the users have an account on that exchange or not.</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                         What is P2P Lend & Borrow?  
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                    <Card.Body>It allows users to lend their digital assets in a p2p mode without the worry of losing their worthy assets forever.</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                          What is P2P Trade? 
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                    <Card.Body>Users will be able to trade digital assets freely without the intervention of any third party. Users can place their buy or sell orders.</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                          Why ComputeEx?
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="4">
                                    <Card.Body>Multi-Solutions At One Place. Please watch this video 

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
                                  <p>There are numerous digital asset exchanges with different rates and complications which make trading on multiple exchanges complicated. ComputeEx comes with a one stop solution to make the trading hassle free by fetching the best rates from different exchanges at once place.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>What is Multi-Exchange Solution? </h4>
                                  <div className="space-20"></div>
                                  <p>Users can trade top digital assets in major exchanges irrespective of whether the users have an account on that exchange or not.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4> What is P2P Lend & Borrow?  </h4>
                                  <div className="space-20"></div>
                                  <p>It allows users to lend their digital assets in a p2p mode without the worry of losing their worthy assets forever.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4> What is P2P Trade? </h4>
                                  <div className="space-20"></div>
                                  <p>Users will be able to trade digital assets freely without the intervention of any third party. Users can place their buy or sell orders.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>Why ComputeEx?</h4>
                                  <div className="space-20"></div>
                                  <p>Multi-Solutions At One Place. Please watch this videio </p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
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
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>The Risks of Investing in ICO ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>How to Trade Cryptocurrencies ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>How to Trade Cryptocurrencies ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
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
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>The Risks of Investing in ICO ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>How to Trade Cryptocurrencies ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>How to Trade Cryptocurrencies ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
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
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>The Risks of Investing in ICO ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day.</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>How to Trade Cryptocurrencies ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                              <div className="single-faq">
                                  <h4>How to Trade Cryptocurrencies ?</h4>
                                  <div className="space-20"></div>
                                  <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day</p>
                                  <div className="space-20"></div>
                                  <a href="#" className="readmore-btn"><i className="fa fa-angle-right"></i>readmore</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
       
      </div>

         <div className="apps-area wow fadeInUp section-padding" id="apps">
          <div className="container">
              <div className="row">
                  <div className="col-12 col-lg-5 offset-1 align-self-center">
                      <div className="heading">
                          <h5>Decentralized App </h5>
                          <div className="space-10"></div>
                          <h1>Track & Trade From Anywhere</h1>
                          <div className="space-20"></div>
                          <p>Download 1DAAP from Play Store and get access to ComputeEx – And have the efficiency of trading and tracking digital assets from, anywhere. Using 1DAAP, you can access ComputeEx along with multiple decentralized platforms and marketplaces, where you can transact and exchange services in a P2P Mode, using Era Swap Utility. Get 1DAAP and get access to multiple dApps with a Single-sign-on.</p>
                        
                      </div>
                      <div className="space-30"></div>
                      <a href="https://play.google.com/store/apps/details?id=com.eraswaponeapp&hl=en" target="_blank" className="gradient-btn apps-btn"> <i className="zmdi zmdi-google-play"></i>Google Playstore</a>

                     
                  </div>
                  <div className="col-12 col-lg-5 offset-1">
                      <div className="apps-img">
                          <img src="/assets/img/Mobile.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
  <div className="community-area wow fadeInUp section-padding" id="contact">
      <div className="container">
          <div className="row">
              <div className="col-12 text-center">
                  <div className="heading">
                      <h5>GReat Community</h5>
                      <div className="space-10"></div>
                      <h1>Our Community </h1>
                  </div>
              <div className="space-60"></div>
              </div>
          </div>
          <div className="row">
              <div className="col-6 col-lg">
                  <div className="single-community big-social">
                      <a className="facebook" href="#"><i className="fa fa-facebook"></i></a>
                  </div>
              </div>
              <div className="col-6 col-lg">
                  <div className="single-community mid-social">
                      <a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a>
                  </div>
                  
              </div>
              
              <div className="col-6 col-lg">
                  <div className="single-community big-social">
                      <a className="youtube" href="#"><i className="fa fa-youtube"></i></a>
                  </div>
              </div>
              <div className="col-6 col-lg">
                  <div className="single-community mid-social">
                      <a className="twitter" href="#"><i className="fa fa-twitter"></i></a>
                  </div>
                  <div className="single-community">
                      <a className="instagram" href="#"><i className="fa fa-instagram"></i></a>
                  </div>
              </div>
          </div>
      </div>
  </div>
    </>
  );
}

export default Home;
