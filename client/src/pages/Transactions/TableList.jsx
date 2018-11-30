import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from 'components/Card';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import {Table} from '@icedesign/base';
import config from './config.json';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

import Pagination from "react-js-pagination";
import"bootstrap/less/bootstrap.less";
import {tableOperations, tableSelectors} from "state/redux/tables/";
import cookie from 'react-cookies';

import compose from "recompose/compose";
import {connect} from "react-redux";
import Dialog from 'react-bootstrap-dialog';
import TransactionDetail from './TransactionDetail';

const {
  transactionList, 
  transaction,
  dashStats

} = tableOperations;

const {
  channelsSelector, 
  transactionListSelector, 
  transactionSelector,
  dashStatsSelector

} = tableSelectors


class TableList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      transactionList : [],
      channels : [],
      currentPage : 1,
      txCount : 0
    };
  }


  async componentDidMount () {

    this.fetchData(this.state.currentPage);

    const currentChannel = cookie.load("changechain")
    await this.props.getTransactionList(currentChannel,10,0)
    await this.props.getdashStats(currentChannel)
   
    this.setState({
      txCount : this.props.dashStats.txCount
    });
   setInterval(() => this.syncData(currentChannel), 5000);
  }

  async syncData(currentChannel) {
    await Promise.all([
      this.props.getTransactionList(currentChannel,10,0),
      this.props.getdashStats(currentChannel)
    ])
    this.setState({
      currentPage : 1
    })
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.transactionList != undefined) {
      this.setState({transactionList : nextProps.transactionList.rows, isLoading : false, txCount : nextProps.dashStats.txCount})
    }
    
  }

  fetchData = async(currentPage) => {
    await this.props.getTransactionList(cookie.load("changechain"),10, currentPage-1)
  };


  changePage = (currentPage) => {
    this.setState({currentPage : currentPage})
    this.fetchData(currentPage);
  };

  handleDialogOpenTransactions = async(row) => {
    await this.props.getTransaction(cookie.load("changechain"), row);

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
 
  render() {
    const columnHeaders = []
    for (let i = 0; i < config.transactions.length; i++) {
      switch (config.transactions[i]) {
        case 'creator' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={
            <FormattedMessage
              id='page.localeProvider.creator'
              defaultMessage='Creator'
              description='Creator'
            />
            }
            dataIndex="creator_msp_id" width={100} />
        ); break
        case 'chainname' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={
            <FormattedMessage
              id='page.localeProvider.chainname'
              defaultMessage='Chain Name'
              description='Chain Name'
            />
            }
            dataIndex="channelname" width={110} />
        );break
        case 'txid' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={
              <FormattedMessage
              id='page.localeProvider.txid'
              defaultMessage='Tx Id'
              description='Tx Id'
            />}
              dataIndex="txhash"
              cell= { row =>(
                  <span>
                    <a
                      className="partialHash"
                      onClick={() => this.handleDialogOpenTransactions(row)}
                      href="#/transactions"
                    >
                      <div className="fullHash" id="showblockhashId">
                        {row}
                      </div>{" "}
                      
                      {!row ? "" : (row.length>=8?(row.slice(0, 8) +"....") : (row))}
                    </a>
                  </span>
                )}
              width={100} />
        );break
        case 'type' : columnHeaders.push(
            <Table.Column key = {config.transactions[i]} title={<FormattedMessage
              id='page.localeProvider.type'
              defaultMessage='Type'
              description='Type'
            />}
              dataIndex="type"
              cell= { row =>(        
                <span>          
                  {!row ==0 ? ("transaction") : ("contract")}
                </span>
                )}
              width={60} />
        );break

        case 'contract' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.contract'
            defaultMessage='Contract'
            description='Contract'
          />}
            dataIndex="contractname"
            cell= { row =>(
                  <span className="partialHash">
                    <div className="fullHash" id="showblockhashId">
                        {row}
                      </div>{" "}
                  
                  {!row ? "" : (row.length>=8?(row.slice(0, 8) +"....") : (row))}
              </span>
                )}
            width={100} />
        );break
          
        case 'timestamp' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.timestamp'
            defaultMessage='Timestamp'
            description='Timestamp'
          />}
            dataIndex="createdt"
            width={200} />
        );break

        case 'txhash' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.txhash'
            defaultMessage='Txhash'
            description='Txhash'
          />}
            dataIndex="txhash"
            cell= { row =>(
                  <span className="partialHash">
                    <div className="fullHash" id="showblockhashId">
                        {row}
                    </div>{" "}
                  
                  {!row ? "" : (row.length>=8?(row.slice(0, 8) +"....") : (row))}
              </span>
                )}
            width={100} />
        );break

        case 'from' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.from'
            defaultMessage='from'
            description='from'
          />}
            dataIndex="from"
            cell= { row =>(
              <span className="partialHash">
                <div className="fullHash" id="showblockhashId">
                  {row}
                </div>{" "}
                
                {!row ? "" : (row.length>=8?(row.slice(0, 8) +"....") : (row))}
              </span>
                )}
            width={100} />
        );break

        case 'block' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.blockid'
            defaultMessage='blockid'
            description='blockid'
          />}
            dataIndex="blockid"
            width={70} />
        );break 

        case 'blocktime' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.blocktime'
            defaultMessage='blocktime'
            description='blocktime'
          />}
            dataIndex="blocktime"
            width={100} />
        );break

        case 'to' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.to'
            defaultMessage='to'
            description='to'
          />}
            dataIndex="to"
            cell= { row =>(
              <span className="partialHash">
                <div className="fullHash" id="showblockhashId">
                  {row}
                </div>{" "}
                
                {!row ? "" : (row.length>=8?(row.slice(0, 8) +"....") : (row))}
               
              </span>
                )}
            width={100} />
        );break

        case 'status' : columnHeaders.push(
          <Table.Column key = {config.transactions[i]} title={<FormattedMessage
            id='page.localeProvider.status'
            defaultMessage='status'
            description='status'
          />}
            dataIndex="status"
            width={100} />
        );break
        default : break
      }
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div >
                    <Table
                      dataSource={this.state.transactionList}
                      isLoading={this.state.isLoading}
                      className="basic-table"
                      hasBorder={false}
                    >
                      {columnHeaders}
                    </Table>
                    <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.state.txCount}
                      pageRangeDisplayed={4}
                      onChange={this.changePage}
                    />
                  </div>
                }
              />
            </Col>

          </Row>
        </Grid>
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      channels : channelsSelector(state),
      transactionList : transactionListSelector(state),
      dashStats : dashStatsSelector(state),
      transaction: transactionSelector(state)
    }),
    {
      getTransactionList: transactionList,
      getdashStats : dashStats,
      getTransaction : transaction
    }
  )
)(TableList);