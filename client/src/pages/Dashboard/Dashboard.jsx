
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from 'components/Card';
import StatsCard from 'components/StatsCard';

import compose from "recompose/compose";
import {connect} from "react-redux";
import { FormattedMessage } from 'react-intl';
import cookie from 'react-cookies';

import {tableOperations, tableSelectors} from "state/redux/tables/";

const {
  channelsSelector, 
  dashStatsSelector, 
  transactionPerMinSelector, 
  blockPerMinSelector,
  transactionPerHourSelector,
  blockPerHourSelector
} = tableSelectors

const {
  transactionPerMin, 
  blockPerMin, 
  dashStats, 
  transactionPerHour,
  blockPerHour
} = tableOperations

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channels : [],
      dashStats : {},
      transactionPerMin : [],
      blockPerMin : [],
      transactionPerHour : [],
      blockPerHour : []
    };
  }

  async componentWillMount () {

    const currentChannel = cookie.load("changechain")
    await this.props.getdashStats(currentChannel)
    await this.props.gettransactionPerMin(currentChannel)
    await this.props.getblockPerMin(currentChannel)
    await this.props.gettransactionPerHour(currentChannel)
    await this.props.getblockPerHour(currentChannel)

    setInterval(() => this.syncData(currentChannel), 5000);
  }

  async syncData(currentChannel) {
    await Promise.all([
      this.props.getdashStats(currentChannel),
      this.props.gettransactionPerMin(currentChannel),
      this.props.getblockPerMin(currentChannel),
      this.props.gettransactionPerHour(currentChannel),
      this.props.getblockPerHour(currentChannel)
    ])
   
  }

  componentWillReceiveProps(nextProps) {
    let blockPermin = [], transactionPermin = [], blockPerhour = [], transactionPerhour = []

    if(nextProps.blockPerMin.rows){
      for(let i = nextProps.blockPerMin.rows.length-6; i < nextProps.blockPerMin.rows.length; i++ ){
        blockPermin.push(nextProps.blockPerMin.rows[i])
      }
    }
    if(nextProps.transactionPerMin.rows){
      for(let i = nextProps.transactionPerMin.rows.length-6; i < nextProps.transactionPerMin.rows.length; i++ ){
        transactionPermin.push(nextProps.transactionPerMin.rows[i])
      }
    }
    if(nextProps.transactionPerHour.rows){
      for(let i = nextProps.transactionPerHour.rows.length-6; i < nextProps.transactionPerHour.rows.length; i++ ){
        transactionPerhour.push(nextProps.transactionPerHour.rows[i])
      }
    }
    if(nextProps.blockPerHour.rows){
      for(let i = nextProps.blockPerHour.rows.length-6; i < nextProps.blockPerHour.rows.length; i++ ){
        blockPerhour.push(nextProps.blockPerHour.rows[i])
      }
    }

    this.setState({
      dashStats : nextProps.dashStats,
      transactionPerMin : transactionPermin,
      blockPerMin : blockPermin,
     transactionPerHour : transactionPerhour,
      blockPerHour : blockPerhour
    })
  }


  myTimeToLocal = inputTime => {
    if(!inputTime && typeof inputTime !== 'number'){
      return '';
    }
    var localTime = '';
    inputTime = new Date(inputTime).getTime();
    const offset = (new Date()).getTimezoneOffset();
    localTime = (new Date(inputTime - offset * 60000)).toISOString();
    localTime = localTime.substr(0, localTime.lastIndexOf('.'));
    localTime = localTime.replace('T', ' ');
    return localTime;
  }

  createLegend = json => {
    const legend = [];
    for (let i = 0; i < json.names.length; i++) {
      const type = 'fa fa-circle text-' + json.types[i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json.names[i]);
    }
    return legend;
  }

  blockdataSales = () =>{
    const labels = [], series = [], blockPerMin = [];
    if(this.state.blockPerMin){
      this.state.blockPerMin.forEach(data => {
        labels.push(this.myTimeToLocal(data.datetime))
        blockPerMin.push(data.count);
      })
    }

    series.push(blockPerMin)
    const dataStat = {
      labels : labels,
      series : series
    }
    return dataStat;
  }

  blocklegendSales = () => {
    let names = [],types = [];
    names.push("block")
    types.push("info")
    const legendSale = {
      names : names,
      types : types
    }
    return legendSale
  }

  txdataSales = () =>{
    const labels = [], series = [], transactionPerMin = [];
    if(this.state.transactionPerMin){
      this.state.transactionPerMin.forEach(data => {
        labels.push(this.myTimeToLocal(data.datetime))
        transactionPerMin.push(data.count);
      })
    }
    series.push([])
    series.push(transactionPerMin)
    const dataStat = {
      labels : labels,
      series : series
    }
    return dataStat;
  }

  txlegendSales = () => {
    let names = [],types = [];
    names.push("transaction")
    types.push("danger")
    const legendSale = {
      names : names,
      types : types
    }
    return legendSale
  }

  txPerHourdataSales = () =>{
    const labels = [], series = [], transactionPerHour = [];
    if(this.state.transactionPerHour){
      this.state.transactionPerHour.forEach(data => {
        labels.push(this.myTimeToLocal(data.datetime))
        transactionPerHour.push(data.count);
      })
    }
    series.push([])
    series.push(transactionPerHour)
    const dataStat = {
      labels : labels,
      series : series
    }
    return dataStat;
  }
  blockPerHourdataSales = () =>{
    const labels = [], series = [], blockPerHour = [];
    if(this.state.blockPerHour){
      this.state.blockPerHour.forEach(data => {
        labels.push(this.myTimeToLocal(data.datetime))
        blockPerHour.push(data.count);
      })
    }

    series.push(blockPerHour)
    const dataStat = {
      labels : labels,
      series : series
    }
    return dataStat;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText={
                  <FormattedMessage
                    id="page.localeProvider.blocks"
                    defaultMessage="BLOCKS"
                    description="BLOCKS"
                  />
                }
                statsValue= {this.state.dashStats.latestBlock ? (this.state.dashStats.latestBlock) : ('')}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText= {
                  <a href = "#/blocks" >
                    <FormattedMessage
                      id="page.localeProvider.details"
                      defaultMessage="Details"
                      description="Details"
                    />
                  </a>
                }
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText={
                  <FormattedMessage
                    id="page.localeProvider.contracts"
                    defaultMessage="CONTRACTS"
                    description="CONTRACTS"
                  />
                }
                statsValue={this.state.dashStats.contractCount ? (this.state.dashStats.contractCount) : ('')}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText={
                  <a href = "#/contracts" >
                    <FormattedMessage
                      id="page.localeProvider.details"
                      defaultMessage="Details"
                      description="Details"
                    />
                  </a>
                }
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText={
                  <FormattedMessage
                    id="page.localeProvider.chains"
                    defaultMessage="chain"
                    description="chain"
                  />
                }
                statsValue= {this.state.dashStats.channelCount ? (this.state.dashStats.channelCount) : ('')}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText= {
                  <a href = "#/chains" >
                    <FormattedMessage
                      id="page.localeProvider.details"
                      defaultMessage="Details"
                      description="Details"
                    />
                  </a>
                }
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-list-alt text-info" />}
                statsText= {
                  <FormattedMessage
                    id="page.localeProvider.transactions"
                    defaultMessage="TRANSACTIONS"
                    description="TRANSACTIONS"
                  />
                }
                statsValue={this.state.dashStats.txCount ? (this.state.dashStats.txCount) : ('')}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={
                  <a href = "#/transactions" >
                    <FormattedMessage
                      id="page.localeProvider.details"
                      defaultMessage="Details"
                      description="Details"
                    />
                  </a>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                id="BlockMin"
                title={
                  <FormattedMessage
                    id="page.localeProvider.blocksm"
                    defaultMessage="BLOCKS / MIN"
                    description="BLOCKS / MIN"
                  />
                }
                category={
                  <FormattedMessage
                    id="page.localeProvider.blockMin"
                    defaultMessage="Number of Blocks Peer Min"
                    description="Number of Blocks Peer Min"
                  />
                }
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.blockdataSales()}
                      type="Line"
                    />
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                id="TxMin"
                title={
                  <FormattedMessage
                    id="page.localeProvider.txm"
                    defaultMessage="TX / MIN"
                    description="TX / MIN"
                  />
                }
                category={
                  <FormattedMessage
                    id="page.localeProvider.txMin"
                    defaultMessage="Number of Transactions Peer Min"
                    description="Number of Transactions Peer Min"
                  />
                }
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.txdataSales()}
                      type="Line"
                    />
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title= {
                  <FormattedMessage
                    id="page.localeProvider.blocksh"
                    defaultMessage="BLOCKS / HOUR"
                    description="BLOCKS / HOUR"
                  />
                }
                category={
                  <FormattedMessage
                    id="page.localeProvider.blockhour"
                    defaultMessage="Number of Blocks Peer Hour"
                    description="Number of Blocks Peer Hour"
                  />
                }
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.blockPerHourdataSales()}
                      type="Bar"
                    />
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                id="chartActivity"
                title={
                  <FormattedMessage
                    id="page.localeProvider.txh"
                    defaultMessage="TX / HOUR"
                    description="TX / HOUR"
                  />
                }
                category={
                  <FormattedMessage
                    id="page.localeProvider.txhour"
                    defaultMessage="Number of Transactions Peer Hour"
                    description="Number of Transactions Peer Hour"
                  />
                }
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.txPerHourdataSales()}
                      type="Bar"
                    />
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
      channels : channelsSelector(state),
      dashStats : dashStatsSelector(state),
      transactionPerMin : transactionPerMinSelector(state),
      blockPerMin : blockPerMinSelector(state),
      transactionPerHour : transactionPerHourSelector(state),
      blockPerHour : blockPerHourSelector(state)
    }),
    {
      getdashStats : dashStats,
      gettransactionPerMin : transactionPerMin,
      getblockPerMin : blockPerMin,
      gettransactionPerHour : transactionPerHour,
      getblockPerHour : blockPerHour
    }
  )
)(Dashboard);