import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from '../../../axios';

const { apiBaseUrl } = require('../../../env');

export default class extends Component {
  state = {
    show: true,
    transaction: null,
    confirming: false,
    displaySuccessMessage: false,
    displayErrorMessage: false
  };

  componentDidMount = async() => {
    const response = await axios.get(apiBaseUrl + '/uphold/transaction?transactionId='+this.props.transactionId);

    const transaction = response.data.response;

    console.log({transaction});
    this.setState({ transaction });
  }

  confirm = async() => {
    try {
      this.setState({ confirming: true });
      const response = await axios.post(apiBaseUrl+'/uphold/commit-transaction', window.qs({transactionId: this.props.transactionId}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
      this.setState({ confirming: false, displaySuccessMessage: true });
    } catch (error) {
      this.setState({ confirming: false, displayErrorMessage: true });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
    setTimeout(this.props.handleClose, 200);
  }

  render = () => (
    <Modal show={!!this.props.transactionId} onHide={this.handleClose} centered={true} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {this.state.transaction ? <>
        <div style={{display:'block'}}>
          User
          to ComputeEx [{this.state.transaction.origin.amount} {this.state.transaction.origin.currency}]
        </div>
        <div style={{display:'block'}}>
          ComputeEx to User [{this.state.transaction.esAmount} ES]
        </div>
        </> : <>Loading...</>}

        {this.state.displaySuccessMessage ? <Alert variant="success">Your transaction is successful!</Alert> : null}
        {this.state.displayErrorMessage ? <Alert variant="danger">Your transaction has failed.</Alert> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={this.confirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
