import React, {Component} from "react";
import {FormattedMessage} from 'react-intl';
import Dialog from 'react-bootstrap-dialog'
import {Table} from '@icedesign/base';
import './main.css';
import TransactionDetail from './TransactionDetail';
import cookie from 'react-cookies';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {tableOperations, tableSelectors} from "state/redux/tables/";

const {transaction} = tableOperations;
const {transactionSelector} = tableSelectors

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      loading: false,
      dialogOpenBlockHash: false,
      blockHash: {},
      transactions :{}
    };
  }
  componentDidMount() {
    const selection = {};
    if (this.props.transactionsdata.length >0) {
      this.props.transactionsdata.forEach(element => {
        selection[element.blocknum] = false;
      });      
    }

    this.setState({selection: selection});
  }
  handleDialogOpen  = async(tid) => {
    await this.props.getTransaction(cookie.load("changechain"), tid);
    this.dialog.show({
      title : <FormattedMessage
                id="page.localeProvider.txdetails"
                defaultMessage="Transaction Details"
                description="Transaction Details"
              />,
      body: <TransactionDetail
            transaction={this.props.transaction}
          />,
      bsSize: 'large',
      onHide: (dialog) => {
        dialog.hide()
      }
    })
  }
  reactTableSetup = () => {
    return [
      <Table.Column key = 'txhash' title={<FormattedMessage
        id="page.localeProvider.transactions"
        defaultMessage="Transactions"
        description="Transactions"
        />
        }
        dataIndex="txhash"
        cell= { row =>(
          <span>
            <a
              className="partialHash"
              href="#/blocks"
              onClick={() => this.handleDialogOpen(row)}
              style = {{textAlign : 'left'}}
            >
              {!row ? "" : (row.length>=18?(row.slice(0, 18) +"....") : (row))}
            </a>{" "}
          </span>
        )}
        width={100}
      />

    ];
  };

  render() {
    return (
      <div>
        <Table
          dataSource={this.props.transactionsdata}
          isLoading={false}
          className="basic-table"
          hasBorder={false}
        >
          {this.reactTableSetup()}
        </Table>
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      transaction: transactionSelector(state)
    }),
    {
      getTransaction : transaction
    }
  )
)(Transaction);