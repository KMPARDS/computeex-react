import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class extends Component {

  render = () => (
    <Modal show={this.props.show} onHide={this.props.handleClose} centered={true} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Buy Era Swap</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
