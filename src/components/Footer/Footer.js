import React from "react";

function Footer() {
  return (
    <div className="footera-area section-padding wow fadeInDown">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer">
              <div className="logo-area footer">
                <a href="#">
                  <img src="/img/compute-ex32.png" alt="" />
                </a>
              </div>
              <div className="space-20"></div>
              <p className="">Social Media links</p>
              <ul class="social-menu">
                <li>
                  <a href="https://www.facebook.com/eraswap" target="_blank">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/eraswap/"
                    target="_blank"
                  >
                    <i class="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/eraswap/?hl=en"
                    target="_blank"
                  >
                    <i class="fa fa-instagram"></i>
                  </a>{" "}
                </li>
                <li>
                  <a href="https://twitter.com/EraSwapTech" target="_blank">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/@eraswap" target="_blank">
                    <i class="fa fa-medium"></i>
                  </a>
                </li>
                <li>
                  <a href="https://eraswap.tumblr.com/" target="_blank">
                    <i class="fa fa-tumblr"></i>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/eraswap" target="_blank">
                    <i class="fa fa-telegram"></i>
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="https://github.com/KMPARDS" target="_blank">
                    <i class="fa fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/user/EraSwap" target="_blank">
                    <i class="fa fa-reddit"></i>
                  </a>{" "}
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber"
                    target="_blank"
                  >
                    <i class="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>

              <div className="space-10"></div>
              <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-2">
            <div className="single-footer">
              <ul>
                <li>
                  <a className="scroll" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a onClick={() => this.props.history.push("/multiexchange")}>
                    Multi Exchange
                  </a>
                </li>
                <li>
                  <a onClick={() => this.props.history.push("/lending")}>
                    Lending & Borrowing
                  </a>
                </li>
                <li>
                  <a onClick={() => this.props.history.push("/uphold")}>
                    BTC to Es
                  </a>
                </li>
                <li>
                  <a onClick={() => this.props.history.push("/uphold")}>
                    Uphold
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <div className="single-footer">
              <ul>
                <li>
                  <a className="scroll" href="#faq">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf"
                    target="_blank"
                  >
                    Howey Test
                  </a>
                </li>
                <li>
                  <a
                    href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf"
                    target="_blank"
                  >
                    Era Swap White Paper
                  </a>
                </li>
                <li>
                  <a
                    href=" http://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf"
                    target="_blank"
                  >
                    Era Swap Terms & Conditions
                  </a>
                </li>

                <li>
                  <a href="terms_conditions.pdf" target="_blank">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="privacy_policy.pdf" target="_blank">
                    Privacy Policy{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer">
              <p>Subscribe to our Newsletter</p>
              <div className="space-20"></div>
              <div className="footer-form ">
                <form action="#">
                  <input type="email" placeholder="Email Address" />
                  <a href="" className="gradient-btn subscribe">
                    GO
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
