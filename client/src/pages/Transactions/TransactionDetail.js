import React, {Component} from "react";

import moment from "moment-timezone";
import {
  Table
} from "reactstrap";

import {FormattedMessage} from 'react-intl';
import config from './config.json'


export class TransactionDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: false});
  }

  render() {

    const transactionview = [];
    for (let i = 0; i < config.transactiondetails.length; i++) {
      switch(config.transactiondetails[i]) {
        case "transactionid" : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.transactionid"
                defaultMessage="Transaction ID"
                description="Transaction ID"
              />
              :
            </th>
            <td>
              {this.props.transaction.txhash}
            </td>
          </tr>
        );break;
        case 'chainname' : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
              id='page.localeProvider.chainname'
              defaultMessage='Chain Name'
              description='Chain Name'
            />
              :
            </th>
            <td>
              {this.props.transaction.channelname}
            </td>
          </tr>
        );break;
        case 'contractname' : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.contractname"
                defaultMessage="Contract Name"
                description="Contract Name"
              />
              :
            </th>
            <td>
              {this.props.transaction.contractname}
            </td>
          </tr>
        );break;
        case 'block'  : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id='page.localeProvider.blockid'
                defaultMessage='blockid'
                description='blockid'
              />
              :
            </th>
            <td>
              {this.props.transaction.blockid}
            </td>
          </tr>
        );break;
        case 'from' : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id='page.localeProvider.from'
                defaultMessage='from'
                description='from'
              />
              :
            </th>
            <td>
              {this.props.transaction.from}
            </td>
          </tr>
        );break;
        case 'to'  : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id='page.localeProvider.to'
                defaultMessage='to'
                description='to'
              />
              :
            </th>
            <td>
              {this.props.transaction.to}
            </td>
          </tr>
        );break;
        case 'type' : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.type"
                defaultMessage="Type"
                description="Type"
              />
              :
            </th>
            <td>
              {this.props.transaction.type ==0 ? ("transaction") : ("contract")}
            </td>
          </tr>
        );break;
        case "time" : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.time"
                defaultMessage="Time"
                description="Time"
              />
              :
            </th>
            <td>
              {moment(this.props.transaction.createdt)
                .tz(moment.tz.guess())
                .format("M-D-YYYY h:mm A zz")}
            </td>
          </tr>
        );break;
        case "validationcode" : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.valcode"
                defaultMessage="Validation Code"
                description="Validation Code"
              />
              :
            </th>
            <td>{this.props.transaction.validation_code}</td>
          </tr>
        );break;
        case "payloadproposalhash" : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.payprohash"
                defaultMessage="Payload Proposal Hash"
                description="Payload Proposal Hash"
              />
              :
            </th>
            <td>{this.props.transaction.payload_proposal_hash}</td>
          </tr>
        );break;
        case "creatoemsp" : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.creatormsp"
                defaultMessage="Creator MSP"
                description="Creator MSP"
              />
              :
            </th>
            <td>{this.props.transaction.creator_msp_id}</td>
          </tr>
        );break;
        case "endoser" : transactionview.push(
          <tr key = {config.transactiondetails[i]}>
            <th>
              <FormattedMessage
                id="page.localeProvider.endoser"
                defaultMessage="Endoser"
                description="Endoser"
              />
              :
            </th>
            <td>{this.props.transaction.endorser_msp_id}</td>
          </tr>
        );break;
        default: transactionview.push(null); break;
      }
    }

      return (      
        <Table striped hover responsive className="table-striped">
          <tbody>
          
            {transactionview}

          </tbody>
        </Table>
      );

  }
}

export default TransactionDetail;
