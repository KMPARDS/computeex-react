import React, { Component } from 'react';
import { InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

axios.defaults.withCredentials = true;

const { apiBaseUrl } = require('../../env');

const CURRENCIES = [
  {
    symbol: 'USD',
    rateES: 0.0571
  },
  {
    symbol: 'INR',
    rateES: 0.25
  },
  {
    symbol: 'BTC',
    rateES: 0.00000800
  }
];

export default class extends Component {
  state = {
    fromCurrency: CURRENCIES[0],
    currencyDropdownFilter: '',
    userLoggedIn: false
  };

  intervalId = null;

  componentDidMount = () => {
    this.intervalId = setInterval(() => {
      if(window.user && !this.state.userLoggedIn) {
        this.setState({ userLoggedIn: true });
      } else if(!window.user && this.state.userLoggedIn) {
        this.setState({ userLoggedIn: false });
      }
    });

    (async() => {
      try {
        const response = await axios.get(apiBaseUrl + '/uphold/user', {withCredentials: true});
        window.user = response.data.response;
      } catch (error) {}
    })();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <>
      <div className="welcome-area v2 wow fadeInUp" id="home">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 align-self-center">
              <div className="welcome-right">
                <div className="welcome-text">
                  <h1>Convert Fiat to ES</h1>
                  <h4>Now purchasing Era Swap is simplified by Credit Card.</h4>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 offset-1">
              <div className="v2 welcome-progress">
              <InputGroup>
                <FormControl
                  placeholder="Enter amount"
                  aria-describedby="basic-addon2"
                  className="form-input light large"
                />

                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.fromCurrency.symbol}
                  className="large"
                  alignRight
                >
                  <div style={{padding: '0 10px 5px'}}>
                    <input
                      onChange={event => this.setState({ currencyDropdownFilter: event.target.value })}
                      className="form-input dark"
                      type="text"
                      placeholder="Type to filter"
                    />
                  </div>
                  {CURRENCIES.filter(currencyObj => currencyObj.symbol.includes(this.state.currencyDropdownFilter)).map(currencyObj => (
                    <Dropdown.Item href="#">{currencyObj.symbol}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>

              <p style={{lineHeight:'2rem', margin: '1rem 0'}}>
                You'll get<br />
                <span className="es-amount-number">100</span><span className="es-amount-symbol">ES</span>
                (as on live Probit Exchange)
              </p>
              <hr color="#fff" />
              {!this.state.userLoggedIn ? <>
                <p>To proceed, connect your Uphold Account with ComputeEx.</p>
                <img onClick={async() => {
                  const response = await axios.get(apiBaseUrl+'/uphold/generate-state');
                  window.open("https://sandbox.uphold.com/authorize/3c0d16ce2706bc3c9923b9718c1432f2c7b25a12?scope=accounts:read%20cards:read%20cards:write%20transactions:deposit%20transactions:read%20transactions:transfer:application%20transactions:transfer:others%20transactions:transfer:self%20transactions:withdraw%20transactions:commit:otp%20user:read&state="+response.data.response,"_self");
                  }} src="/img/connect_with_uphold.svg" />
                </> : <p>Proceed to your account page</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
