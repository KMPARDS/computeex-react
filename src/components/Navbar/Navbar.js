import React, { Component } from "react";
import axios from "../../axios";

const { apiBaseUrl } = require("../../env");

export default class extends Component {
  state = {
    userLoggedIn: false,
  };

  intervalId = null;

  componentDidMount = () => {
    this.intervalId = setInterval(() => {
      if (window.user && !this.state.userLoggedIn) {
        this.setState({ userLoggedIn: true });
      } else if (!window.user && this.state.userLoggedIn) {
        this.setState({ userLoggedIn: false });
      }
    }, 100);

    (async () => {
      try {
        const response = await axios.get(apiBaseUrl + "/uphold/user");
        window.user = response.data.response;
      } catch (error) {}
    })();

    (async () => {
      const code = window.getQueryParameter("code");
      const state = window.getQueryParameter("state");

      if (code && state) {
        try {
          const response = await axios.post(
            apiBaseUrl + "/uphold/login",
            window.qs({ code, state }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          window.user = response.data.response;
          this.props.history.push("/uphold");
        } catch (error) {
          alert(
            "Error: Your login token from Uphold is not valid. Please try again"
          );
        }
      }
    })();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render() {
    return (
      <div
        className="header-area wow fadeInDown header-absolate"
        id="nav"
        data-0="position:fixed;"
        data-top-top="position:fixed;top:0;"
        data-edge-strategy="set"
      >
        <div className="container">
          <div className="row">
            <div className="col-4 d-block d-lg-none">
              <div className="mobile-menu"></div>
            </div>
            <div className="col-3 col-lg-2">
              <div className="logo-area">
                <a onClick={() => this.props.history.push("/")}>
                  <img src="/img/compute-ex32.png" />
                </a>
              </div>
            </div>
            <div className="col-4 col-lg-8 d-none d-lg-block">
              <div className="main-menu text-center">
                <nav>
                  <ul id="slick-nav">
                    <li className="navlink-custom">
                      <a className="scroll" href="#about">
                        About
                      </a>
                    </li>
                    <li className="navlink-custom dropdown">
                      <a className="nav-link dropbtn" href="#">
                        Services <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </a>
                      <div className="dropdown-content">
                        <a
                          onClick={() =>
                            this.props.history.push("/multiexchange")
                          }
                        >
                          Multi Exchange
                        </a>
                        <a onClick={() => this.props.history.push("/lending")}>
                          Lending & Borrowing
                        </a>
                        <a
                          onClick={() => this.props.history.push("/btc-to-es")}
                        >
                          BTC To ES
                        </a>
                        <a onClick={() => this.props.history.push("/uphold")}>
                          Uphold
                        </a>
                      </div>
                    </li>
                    <li className="navlink-custom">
                      <a className="scroll" href="#faq">
                        FAQ
                      </a>
                    </li>
                    <li className="navlink-custom">
                      <a onClick={() => this.props.history.push("/Orders")}>
                      Orders
                      </a>
                    </li>
                    
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-5 col-lg-2 text-right">
                  {/* <a onClick={() => this.props.history.push("/Orders")} className="mr10">
                    <i class="fa fa-bell-o text-light" aria-hidden="true"></i> 

                  </a> */}
                   <div className="navlink-custom dropdown">
                      <a className="nav-link dropbtn" href="#">
                      <i class="fa fa-bell-o text-light" aria-hidden="true"></i> 
                      </a>
                      <div className="dropdown-content nofication-dropdown">
                        <div className="not-topbar">0 Notification</div>
                        <div className="scrollbar">
                                    <a
                                    onClick={() =>
                                      this.props.history.push("/multiexchange")
                                    }
                                  >
                                    <p >
                                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable
                                    </p>
                                    <small>4 days ago</small>
                                  </a>
                                  <a onClick={() => this.props.history.push("/lending")}>
                                    <p >
                                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable
                                    </p>
                                    <small>4 days ago</small>
                                  </a>
                                  <a
                                    onClick={() => this.props.history.push("/btc-to-es")}
                                  >
                                    <p >
                                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable
                                    </p>
                                    <small>4 days ago</small>
                                  </a>
                                  <a onClick={() => this.props.history.push("/uphold")}>
                                  <p >
                                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable
                                    </p>
                                    <small>4 days ago</small>
                                  </a>
                        </div>
                      </div>
                    </div> 
                  
              {!this.state.userLoggedIn ? (
                <a
                  onClick={() => this.props.history.push("/uphold")}
                  className="btn-custom-light com-btn"
                >
                  Login
                </a>
              ) : (
                <span
                  onClick={() => this.props.history.push("/uphold")}
                  className="cursor-pointer"
                >
                  Welcome {window.user.firstName}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
