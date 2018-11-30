import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';
import {Table} from "reactstrap";

import config from './config.json'

class Block extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { blockHash } = this.props;
    const blockview = [];
    for (let i = 0; i < config.blockdetails.length; i++) {
      switch(config.blockdetails[i]) {
        case "chainname" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.chainname"
                defaultMessage="Chain name"
                description="Chain name"
              />
            </th>
            <td>{blockHash.channelname}</td>
          </tr>
        );break;
        case "id" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.id"
                defaultMessage="ID"
                description="ID"
              />
            </th>
            <td>{blockHash.id}</td>
          </tr>
          
        );break;
        case "blocknumber" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.blocknum"
                defaultMessage="Block Number"
                description="Block Number"
              />
            </th>
            <td>{blockHash.blocknum}</td>
          </tr>
        );break;
        case "createat" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.create"
                defaultMessage="Created at"
                description="Created at"
              />
            
            </th>
            <td>{blockHash.createdt}</td>
          </tr>
        );break;
        case "number_of_transactions" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.txnum"
                defaultMessage=" Number of Transactions"
                description=" Number of Transactions"
              />
           
            </th>
            <td>{blockHash.txcount}</td>
          </tr>
        );break;
        case "blockhash" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.blockhash"
                defaultMessage="Block Hash"
                description="Block Hash"
              />
            
            </th>
            <td>
              {blockHash.blockhash}
            </td>
          </tr>
        );break;
        case "datahash" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.datahash"
                defaultMessage="Data Hash"
                description="Data Hash"
              />
            
            </th>
            <td>
              {blockHash.datahash}
            </td>
          </tr>
        );break;
        case "prehash" : blockview.push(
          <tr key = {config.blockdetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.prehash"
                defaultMessage="Prehash"
                description="Prehash"
              />
            
            </th>
            <td>
              {blockHash.prehash}
            </td>
          </tr>
        );break;
        default: break;

      }
    }
    if (!blockHash) {
      return (
        <div >
          {" "}
        </div>
      );
    } else {
      return (
        <Table striped hover responsive className="table-striped">
          <tbody>
            {blockview}  
          </tbody>
        </Table>
      );
    }
  }
}

export default Block;