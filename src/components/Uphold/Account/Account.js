import React, { Component } from 'react';
import TransactionModal from '../TransactionModal/TransactionModal';
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
    editWalletAddress: EDIT_WALLET_ADDRESS_ENUM.IDLE,
    transactions: [],
    modalTransactionId: null
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

    (async() => {
      const response = await axios.get(apiBaseUrl + '/uphold/transactions');
      const transactions = response.data.response;

      this.setState({ transactions });
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
      {this.props.cards === null
        ? <p>Loading your cards...</p>
        : <div className="row">
        {this.props.cards.length === 0 ? <>Looks like you don't have any cards. Go to <a href="https://uphold.com" target="_blank">Uphold.com</a>, and add funds. Then you will be able to use your Uphold account on ComputeEx.</> : null}
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
      </div>}
      {(() => {
        if(this.props.cards) {
          const isAvailable = this.props.cards.filter(card => +card.available).length !== 0;
          const isBalance = this.props.cards.filter(card => +card.balance).length !== 0;

          if(!isAvailable && isBalance) {
            return <p>You have funds pending under Uphold verification, once it's done you'll be able to use them for purchase ES.</p>;
          }

          if(!isBalance) {
            return <p>You don't have balance in your Uphold wallet. Go to <a href="https://uphold.com" target="_blank">Uphold.com</a>, and add funds. Then you will be able to use your Uphold account on ComputeEx to purchase ES.</p>;
          }
        }
      })()}
      {this.state.transactions.length
        ? <>
            <p style={{marginTop: '50px'}}>Transactions:</p>
            <table width="100%" border="1">
            <tr>
              <th>Transaction</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {this.state.transactions.reverse().map((transaction, i) => (
              <tr key={i}>
                <td>
                  {transaction.transactionId}<br />
                  <u>{transaction.origin.amount} {transaction.origin.currency}</u> FOR <u>{transaction.esAmount} ES</u>
                </td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                <td>{(() => {
                  switch(transaction.status) {
                    case 'pending':
                      return <>Transfer of {transaction.origin.amount} {transaction.origin.currency} is pending.</>
                    case 'received':
                      return <>{transaction.origin.amount} {transaction.origin.currency} transfer is successful. ES on your wallet will be sent soon.</>
                    case 'processed':
                      return <>Transaction is processed</>
                  }
                })()}</td>
              <td>{transaction.txHash ? <span>{transaction.txHash.slice(0,6)}...{transaction.txHash.slice(60)}<br/><a href={`https://${process.env.REACT_APP_ENV==='development'?'kovan.':''}etherscan.io/tx/${transaction.txHash}`} target="_blank">View on EtherScan</a></span> : <>
                <button
                  style={{ marginTop: '5px' }}
                  className="btn-custom light"
                  onClick={() => this.setState({ modalTransactionId: transaction.transactionId })}
                >
                  View
                </button>
              </>}</td>
              </tr>
            ))}
            </table>
          </>
        : null}

      {!!this.state.modalTransactionId ? <TransactionModal
        transactionId={this.state.modalTransactionId}
        handleClose={() => this.setState({ modalTransactionId: null })}
      /> : null}
    </div>
  );
}
