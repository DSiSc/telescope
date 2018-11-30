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

import compose from "recompose/compose";
import {connect} from "react-redux";


const {channels} = tableOperations;
const {channelsSelector, currentChannelSelector} = tableSelectors



class TableList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage : 1,
      channels : []
    };
  }


  async componentDidMount () {

    this.fetchData(this.state.currentPage);

    await this.props.getChannels()
   
    if (this.props.channels) {
      this.setState({
        channels : this.props.channels
      })
    }
    
   setInterval(() => this.syncData(), 5000);
  }

  async syncData() {
    await Promise.all([
      this.props.getChannels(),
    ])

    this.setState({
      currentPage : 1
    })
   
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.channels != undefined) {
      this.setState({channels : nextProps.channels})
    }
    
  }

  fetchData = async(currentPage) => {
    await this.props.getChannels()
  };


  changePage = (currentPage) => {
    this.setState({currentPage : currentPage})
    this.fetchData(currentPage);
  };

  render() {
    const columnHeaders = []
    for (let i = 0; i < config.chains.length; i++) {
      switch(config.chains[i]) {
        case "id" : columnHeaders.push(
          <Table.Column key = {config.chains[i]} title={
            <FormattedMessage
              id="page.localeProvider.id"
              defaultMessage='ID'
              description='ID'
            />
            }
            dataIndex="id" width={100} />
        ); break;
        case "chainname" : columnHeaders.push(
          <Table.Column key = {config.chains[i]} title={
            <FormattedMessage
              id="page.localeProvider.chainname"
              defaultMessage='Chain Name'
              description='Chain Name'
            />
            }
            dataIndex="channelname"  />
        ); break;
          
        case "channelhash" : columnHeaders.push(
          <Table.Column key = {config.chains[i]} title={
            <FormattedMessage
              id="page.localeProvider.channelhash"
              defaultMessage='Channel Hash'
              description='Channel Hash'
              />
            }
            dataIndex="channel_hash"  />
        ); break;
        case "blocks" : columnHeaders.push(
          <Table.Column key = {config.chains[i]} title={
            <FormattedMessage
              id="page.localeProvider.blocks_l"
              defaultMessage='Blocks'
              description='Blocks'
              />
            }
            dataIndex="blocks" width = {125} />
        ); break;
        case "transactions" : columnHeaders.push(
          <Table.Column key = {config.chains[i]} title={
            <FormattedMessage
              id="page.localeProvider.transactionsl"
              defaultMessage='Transactions'
              description='Transactions'
              />
            }
            dataIndex="transactions" width = {125} />
        ); break;
        case "timestamp" : columnHeaders.push(
          <Table.Column key = {config.chains[i]} title={
            <FormattedMessage
              id="page.localeProvider.timestamp"
              defaultMessage='Timestamp'
              description='Timestamp'
              />
            }
            dataIndex="createdat"  />
        ); break;
        default : break;

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
                      dataSource={this.state.channels}
                      isLoading={this.state.isLoading}
                      className="basic-table"
                      hasBorder={false}
                    >
                      {columnHeaders}
                    </Table>
                    {
                      this.state.channels.length >'10' ? (
                         <Pagination
                            activePage={this.state.currentPage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.latestBlock}
                            pageRangeDisplayed={4}
                            onChange={this.changePage}
                          />
                      ) : ('')
                    }
                   
                  </div>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      currentChannel: currentChannelSelector(state),
      channels : channelsSelector(state),
    }),
    {
      getChannels : channels
    }
  )
)(TableList);