import React, { Component } from 'react';
import { InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from '../../axios';

const { apiBaseUrl } = require('../../env');

export default class extends Component {
  state = {
    currencies: [
      {
        id: 0,
        symbol: 'USD',
        rateBTC: 7030
      },
      {
        id: 1,
        symbol: 'INR',
        rateBTC: 500000
      },
      {
        id: 2,
        symbol: 'BTC',
        rateBTC: 1
      }
    ],
    probitOrderBook: [
      {
        side: 'sell',
        price: '0.00000557',
        quantity: '20000'
      }
    ],
    fromCurrency: 0,
    currencyDropdownFilter: '',
    inputAmount: '',
    errorInputAmount: false,
    esAmount: '',
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
    }, 100);

    (async() => {
      const response = await axios.get(apiBaseUrl + '/uphold/ticker');
      const currencies = response.data
        .filter(ticker => ticker.pair.slice(0,3) === 'BTC')
        .map((ticker, i) => ({
          id: i,
          symbol: ticker.currency,
          rateBTC: +ticker.ask
        }));

      const selectedCurrency = currencies.filter(ticker => {
        return ticker.symbol === this.state.currencies[this.state.fromCurrency].symbol
      });

      let fromCurrency = 0;

      if(selectedCurrency.length) {
        fromCurrency = selectedCurrency[0].id;
      }

      this.setState({
        fromCurrency,
        currencies
      })
    })();

    (async() => {
      const response = await axios.get(apiBaseUrl+'/probit/es-btc-sell-orders');
      this.setState({ probitOrderBook: response.data });
    })();

    (async() => {
      try {
        const response = await axios.get(apiBaseUrl + '/uphold/user');
        window.user = response.data.response;
      } catch (error) {}
    })();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  updateEsAmount = event => {
    const currencyAmount = (event && event.target && (+event.target.value || 0))
      || +this.state.inputAmount;

    if(isNaN(currencyAmount)) {
      return this.setState({ errorInputAmount: true });
    }

    const btcAmount = currencyAmount / this.state.currencies[this.state.fromCurrency].rateBTC;
    // console.log({currencyAmount, rateBTC: this.state.currencies[this.state.fromCurrency].rateBTC});

    // getEsAmountFromBTC
    const newState = { esAmount: window.lessDecimals(this.getEsAmountFromBTC(btcAmount)), errorInputAmount: false };
    if(event) {
      newState.inputAmount = event.target.value;
    }
    this.setState(newState);
  }

  getEsAmountFromBTC = btcAmount => {
    let btcRemaining = btcAmount;
    let esAmount = 0;
    for(const order of this.state.probitOrderBook) {
      const orderRequiredBtc = +order.price * +order.quantity;
      if(btcRemaining >= orderRequiredBtc) {
        btcRemaining -= orderRequiredBtc;
        esAmount += +order.quantity;
      } else {
        esAmount += btcRemaining / +order.price;
        break;
      }
    }
    return esAmount;
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
                  className="form-input light large"
                  onChange={this.updateEsAmount}
                />

                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.currencies[this.state.fromCurrency].symbol}
                  className="large"
                  alignRight
                >
                  <div style={{padding: '0 10px 5px'}}>
                    <input
                      value={this.state.currencyDropdownFilter}
                      onChange={event => this.setState({ currencyDropdownFilter: event.target.value.toUpperCase() })}
                      className="form-input dark"
                      type="text"
                      placeholder="Type to filter"
                    />
                  </div>
                  {this.state.currencies.filter(currencyObj => currencyObj.symbol.includes(this.state.currencyDropdownFilter)).slice(0,5).map((currencyObj, i) => (
                    <Dropdown.Item key={i} onClick={async() => {
                      await this.setState({ fromCurrency: currencyObj.id });
                      this.updateEsAmount();
                    }} href="#" >{currencyObj.symbol}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>

              <p style={{lineHeight:'2rem', margin: '1rem 0'}}>
                You'll get<br />
              <span className="es-amount-number">{this.state.esAmount || 0}</span><span className="es-amount-symbol">ES</span>
                (as on live Probit Exchange)
              </p>
              <hr color="#fff" />
              {!this.state.userLoggedIn ? <>
                <p>To proceed, connect your Uphold Account with ComputeEx.</p>
                <img onClick={async() => {
                  const response = await axios.get(apiBaseUrl+'/uphold/generate-state');
                  window.open("https://sandbox.uphold.com/authorize/3c0d16ce2706bc3c9923b9718c1432f2c7b25a12?scope=accounts:read%20cards:read%20cards:write%20transactions:deposit%20transactions:read%20transactions:transfer:application%20transactions:transfer:others%20transactions:transfer:self%20transactions:withdraw%20transactions:commit:otp%20user:read&state="+response.data.response,"_self");
                  }} src="/img/connect_with_uphold.svg" />
                </> : <a onClick={() => this.props.history.push('/uphold/account')} className="logibtn gradient-btn cursor-pointer">Proceed to your account page</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
