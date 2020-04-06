import React, { Component } from 'react';
import axios from '../../../axios';

const { apiBaseUrl } = require('../../../env');

const EDIT_WALLET_ADDRESS_ENUM = {
  IDLE: 0,
  EDITING: 1,
  SUBMITTING: 2,
  DONE: 3
}

export default class extends Component {
  state = {
    walletAddress: window.walletAddress || null,
    editWalletAddress: EDIT_WALLET_ADDRESS_ENUM.IDLE
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
      const response = await axios.get(apiBaseUrl + '/uphold/wallet-address');
      const walletAddress = response.data.response;
      if(walletAddress) {
        window.walletAddress = walletAddress;
        this.setState({ walletAddress });
      }
    })();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  render = () => (
    <div className="dashboard-container container">
      <h2>Account</h2>
      <p>
        Registered Wallet Address:
        {
          this.state.editWalletAddress === EDIT_WALLET_ADDRESS_ENUM.IDLE
          ? <>
          {this.state.walletAddress || <>No Wallet Address saved</>}
          <button onClick={() => this.setState({ editWalletAddress: EDIT_WALLET_ADDRESS_ENUM.EDITING })}>Edit</button>
          </>
        : <><input
              type="text"
              value={this.state.walletAddress}
              onChange={event => this.setState({ walletAddress: event.target.value.replace(/[ \t\n]/g, '') })}
            />
          {this.state.editWalletAddress !== EDIT_WALLET_ADDRESS_ENUM.DONE
            ? <button disabled={this.state.editWalletAddress ===  EDIT_WALLET_ADDRESS_ENUM.SUBMITTING} onClick={async() => {
              this.setState({ editWalletAddress: EDIT_WALLET_ADDRESS_ENUM.SUBMITTING });
              try {
                const response = await axios.post(apiBaseUrl + '/uphold/record-wallet-address', window.qs({walletAddress: this.state.walletAddress}), {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                });
              } catch (err) {
                alert(err.message);
              }
              this.setState({ editWalletAddress: EDIT_WALLET_ADDRESS_ENUM.DONE });
              setTimeout(() => this.setState({ editWalletAddress: EDIT_WALLET_ADDRESS_ENUM.IDLE }), 2000);
            }}>{this.state.editWalletAddress ===  EDIT_WALLET_ADDRESS_ENUM.SUBMITTING ? <>Saving</> : <>Save</>}</button>
          : <>Saved!</>
          }
          </>
        }
      </p>
      <p>Uphold Cards:</p>
      <div className="row">
        {this.props.cards.map((card, cardIndex) => (
          <div key={cardIndex} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div className="uphold-card">
              <span className="uphold-label">{card.label}</span>
              <span className="uphold-currency">Currency: {card.currency}</span>
              <span className="uphold-available">Available: {card.available}</span>
              <span className="uphold-balance">Balance: {card.balance}</span>
              <button
                style={{ marginTop: '5px' }}
                className="btn-custom light"
                onClick={() => {
                  this.props.selectEsFromBalance(cardIndex);
                  window.scrollTo(0, 0);
                }}
              >Click to use <u>Available</u></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
