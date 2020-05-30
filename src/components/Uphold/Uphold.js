import React, { Component } from 'react';
import {
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import Account from './Account/Account';
import TransactionModal from './TransactionModal/TransactionModal';

import axios from '../../axios';

const { apiBaseUrl, upholdClientId } = require('../../env');

export default class extends Component {
  state = {
    currencies: [
      {
        id: 0,
        symbol: 'USD',
        rateBTC: 7030,
      },
      {
        id: 1,
        symbol: 'INR',
        rateBTC: 500000,
      },
      {
        id: 2,
        symbol: 'BTC',
        rateBTC: 1,
      },
    ],
    probitOrderBook: window.probitOrderBook,
    fromCurrency: 0,
    currencyDropdownFilter: '',
    inputAmount: '100',
    errorInputAmount: false,
    esAmount: '',
    userLoggedIn: false,
    cards: null,
    creatingTransaction: false,
    modalTransactionId: null,
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
      const response = await axios.get(apiBaseUrl + '/uphold/ticker');
      const currencies = [
        ...response.data,
        { currency: 'BTC', ask: 1, pair: 'BTCBTC' },
      ]
        .sort((a, b) => {
          return a.currency > b.currency;
        })
        .filter((ticker) => ticker.pair.slice(0, 3) === 'BTC')
        .filter((ticker) => {
          return ticker.currency.slice(0, 2) !== 'UP';
        })
        .map((ticker, i) => ({
          id: i,
          symbol: ticker.currency,
          rateBTC: +ticker.ask,
        }));

      const selectedCurrency = currencies.filter((ticker) => {
        return (
          ticker.symbol ===
          this.state.currencies[this.state.fromCurrency].symbol
        );
      });

      let fromCurrency = 0;

      if (selectedCurrency.length) {
        fromCurrency = selectedCurrency[0].id;
      }

      this.setState({
        fromCurrency,
        currencies,
      });
    })();

    (async () => {
      const response = await axios.get(
        apiBaseUrl + '/probit/es-btc-sell-orders'
      );
      window.probitOrderBook = response.data;
      this.setState({ probitOrderBook: response.data });
      this.updateEsAmount();
    })();

    (async () => {
      while (1) {
        await window.wait(1000);
        console.log('cards trying');
        if (window.user) {
          try {
            const response = await axios.get(apiBaseUrl + '/uphold/cards');
            this.setState({ cards: response.data.response });
            console.log('cards updated');
            break;
          } catch {}
        }
      }
    })();

    this.updateEsAmount();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  updateEsAmount = (event) => {
    const currencyAmount =
      event && event.target ? event.target.value || 0 : +this.state.inputAmount;

    if (isNaN(currencyAmount)) {
      return this.setState({ errorInputAmount: true });
    }

    const btcAmount =
      currencyAmount / this.state.currencies[this.state.fromCurrency].rateBTC;
    // console.log({currencyAmount, rateBTC: this.state.currencies[this.state.fromCurrency].rateBTC});

    // getEsAmountFromBTC
    const newState = {
      esAmount: window.lessDecimals(this.getEsAmountFromBTC(btcAmount)),
      errorInputAmount: false,
    };
    if (event) {
      newState.inputAmount = event.target.value;
    }
    this.setState(newState);
  };

  getEsAmountFromBTC = (btcAmount) => {
    let btcRemaining = btcAmount;
    let esAmount = 0;
    for (const order of this.state.probitOrderBook) {
      const orderRequiredBtc = +order.price * +order.quantity;
      if (btcRemaining >= orderRequiredBtc) {
        btcRemaining -= orderRequiredBtc;
        esAmount += +order.quantity;
      } else {
        esAmount += btcRemaining / +order.price;
        break;
      }
    }
    return esAmount;
  };

  selectEsFromBalance = async (cardIndex) => {
    const symbol = this.state.cards[cardIndex].currency;
    const amount = this.state.cards[cardIndex].available;
    const filtered = this.state.currencies.filter((currency) => {
      return currency.symbol === symbol;
    });

    if (filtered.length > 1)
      alert('Found multiple currencies: ' + JSON.stringify(filtered));

    if (filtered.length === 0)
      alert(
        `Couldn't find the currency ${symbol} exchange rate. Please convert it into supported currencies like USD or BTC.`
      );

    await this.setState({
      fromCurrency: filtered[0].id,
      inputAmount: amount,
      cardIndex,
    });

    this.updateEsAmount();
  };

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
                    <h4>
                      Now purchasing Era Swap is simplified by Credit Card.
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 offset-1">
                <div className="v2 welcome-progress">
                  <InputGroup>
                    <FormControl
                      placeholder="Enter amount"
                      value={this.state.inputAmount}
                      className="form-input light large"
                      onChange={this.updateEsAmount}
                    />

                    <DropdownButton
                      as={InputGroup.Append}
                      variant="outline-secondary"
                      title={
                        this.state.currencies[this.state.fromCurrency].symbol
                      }
                      className="large light"
                      alignRight
                    >
                      <div style={{ padding: '0 10px 5px' }}>
                        <input
                          value={this.state.currencyDropdownFilter}
                          onChange={(event) =>
                            this.setState({
                              currencyDropdownFilter: event.target.value.toUpperCase(),
                            })
                          }
                          className="form-input dark"
                          type="text"
                          placeholder="Type to filter"
                        />
                      </div>
                      <div style={{ overflow: 'scroll', maxHeight: '150px' }}>
                        {this.state.currencies
                          .filter((currencyObj) =>
                            currencyObj.symbol.includes(
                              this.state.currencyDropdownFilter
                            )
                          )
                          .map((currencyObj, i) => (
                            <Dropdown.Item
                              key={i}
                              onClick={async () => {
                                await this.setState({
                                  fromCurrency: currencyObj.id,
                                });
                                this.updateEsAmount();
                              }}
                              href="#"
                            >
                              {currencyObj.symbol}
                            </Dropdown.Item>
                          ))}
                      </div>
                    </DropdownButton>
                  </InputGroup>

                  <p style={{ lineHeight: '2rem', margin: '1rem 0' }}>
                    You'll get approximately
                    <br />
                    <span className="es-amount-number">
                      {this.state.esAmount || 0}
                    </span>
                    <span className="es-amount-symbol">ES</span>
                    {this.state.probitOrderBook.length > 1 ? (
                      <>(live from Probit)</>
                    ) : null}
                  </p>
                  <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                    {!this.state.userLoggedIn ? (
                      <>
                        <hr color="#fff" />
                        <p>
                          To proceed, connect your Uphold Account with
                          ComputeEx.
                        </p>
                        <img
                          onClick={async () => {
                            const response = await axios.get(
                              apiBaseUrl + '/uphold/generate-state'
                            );
                            window.open(
                              `${
                                process.env.REACT_APP_ENV === 'development'
                                  ? `https://sandbox.uphold.com/authorize/${upholdClientId}?scope=accounts:read%20cards:read%20cards:write%20transactions:deposit%20transactions:read%20transactions:transfer:application%20transactions:transfer:others%20transactions:transfer:self%20transactions:withdraw%20transactions:commit:otp%20user:read`
                                  : 'https://uphold.com/authorize/73013f068206b13aa8dba28a297cc3817f17edac?scope=accounts:read%20cards:read%20cards:write%20transactions:deposit%20transactions:read%20transactions:transfer:application%20transactions:transfer:others%20transactions:commit:otp%20user:read'
                              }&state=${response.data.response}`,
                              '_self'
                            );
                          }}
                          src="/img/connect_with_uphold.svg"
                        />
                      </>
                    ) : (
                      <a
                        onClick={async () => {
                          this.setState({ creatingTransaction: true });

                          const card = this.state.cards.filter((card) => {
                            return (
                              card.currency ===
                              this.state.currencies[this.state.fromCurrency]
                                .symbol
                            );
                          })[0];

                          const newState = { creatingTransaction: false };

                          if (+card.available < this.state.inputAmount) {
                            this.setState(newState);
                            alert(
                              `Your available funds on ${card.label} are ${card.available} ${card.currency}. You can topup this card using a credit/debit card by going to uphold.com.`
                            );
                            return;
                          }

                          try {
                            const response = await axios.post(
                              apiBaseUrl + '/uphold/create-transaction',
                              window.qs({
                                cardId: card.id,
                                amount: this.state.inputAmount,
                                currency: card.currency,
                              }),
                              {
                                headers: {
                                  'Content-Type':
                                    'application/x-www-form-urlencoded',
                                },
                              }
                            );
                            const transactionId = response.data.response;
                            newState.modalTransactionId = transactionId;
                          } catch (error) {
                            alert(
                              'There was error creating transaction: ' +
                                error.message
                            );
                          }
                          this.setState(newState);
                        }}
                        className="btn-custom light large"
                        style={{ marginTop: '10px', display: 'block' }}
                        disabled={this.state.creatingTransaction}
                      >
                        {!this.state.creatingTransaction ? (
                          <>Buy ES</>
                        ) : (
                          <>Creating transaction...</>
                        )}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {this.state.userLoggedIn ? (
              <Account
                selectEsFromBalance={this.selectEsFromBalance}
                cards={this.state.cards}
              />
            ) : null}
          </div>
          {!!this.state.modalTransactionId ? (
            <TransactionModal
              transactionId={this.state.modalTransactionId}
              handleClose={() => this.setState({ modalTransactionId: null })}
            />
          ) : null}
        </div>
      </>
    );
  }
}
