import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Card from 'components/Card'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import {Table} from '@icedesign/base'
import config from './config.json'
import { FormattedMessage } from 'react-intl'
import 'bootstrap/dist/css/bootstrap.css'
import './main.css'

import Pagination from "react-js-pagination"
import"bootstrap/less/bootstrap.less"
import {tableOperations, tableSelectors} from "state/redux/tables/"

import compose from "recompose/compose"
import {connect} from "react-redux"

import cookie from 'react-cookies'

import Upload from './Upload';
import See from './See';
import Dialog from 'react-bootstrap-dialog';

const {
  contractList,
  dashStats,
  watchContract,
  uploadContract

} = tableOperations

const {
  channelsSelector, 
  contractListSelector, 
  dashStatsSelector,
  watchContractSelector,
  uploadContractSelector

} = tableSelectors


class TableList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      contractList : [],
      currentPage : 1,
      contractCount : 0
    }
  }


  async componentDidMount () {

    this.fetchData(this.state.currentPage)
    const currentChannel = cookie.load("changechain")
    await this.props.getcontractList(currentChannel,10,0)
    await this.props.getdashStats(currentChannel)

    this.setState({
      contractCount : this.props.dashStats.contractCount
    })
   setInterval(() => this.syncData(currentChannel), 5000)
  }

  async syncData(currentChannel) {
    await Promise.all([
      this.props.getcontractList(currentChannel,10,0),
      this.props.getdashStats(currentChannel)
    ])
    this.setState({
      currentPage : 1
    })
   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contractList !== undefined) {
      this.setState({
        contractList : nextProps.contractList, 
        contractCount : nextProps.dashStats.contractCount,
        currentChannel : nextProps.currentChannel
      })
    }
  }

  fetchData = async(currentPage) => {
    await this.props.getcontractList(cookie.load("changechain"),10, currentPage-1)
  }


  changePage = (currentPage) => {
    this.setState({currentPage : currentPage})
    this.fetchData(currentPage)
  }
  addContract = (record, index) => {
    let id =this.state.contractList[index].id
    this.dialog.show({
      title : <FormattedMessage
                id='page.localeProvider.upload'
                defaultMessage='Upload'
                description='Upload'
              />,
      body : <Upload  
        close = {() => this.dialog.onHide()} 
        uploadContract = {this.props.uploadContract}
        id = {id}
        getuploadContract = {this.props.getuploadContract}
      />,
      bsSize : 'large',
      onHide: (dialog) => {
        dialog.hide()
      }
    })
  }

  seeContract = async(record, index) => {
    let id =this.state.contractList[index].id
    await this.props.getwatchContract(cookie.load("changechain"), id)

    this.dialog.show({
      title : <FormattedMessage
                id='page.localeProvider.see'
                defaultMessage='See'
                description='See'
              />,
      body : <See  close = {() =>  
        this.dialog.onHide()
      } watchContract = {this.props.watchContract}/>,
      bsSize : 'large',
      onHide: (dialog) => {
        dialog.hide()
      }
    })
  }

  render() {
    const columnHeaders = []
    for (let i = 0; i < config.contract.length; i++) {
      switch(config.contract[i]) {
        case 'contractname' : columnHeaders.push(
            <Table.Column key = {config.contract[i]} title={<FormattedMessage
              id='page.localeProvider.contractname'
              defaultMessage='Contract Name'
              description='Contract Name'
            />}
              dataIndex="contractname"
              cell= {row => (
                <a className = "hash-hide" onClick={() => this.sourceDialogOpen(row.original)}  href="#/contracts" >
                {row}</a>
              )}
              width={200} />
          );break

        case "channelname" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.channelname"
            defaultMessage='Channel Name'
            description='Channel Name'
            />}
            dataIndex="channelName"
            width={200} />
        ); break

        case "path" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.path"
            defaultMessage='Path'
            description='Path'
            />}
            dataIndex="path"
            width={200} />
        ); break
        case "transactions_count" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.txcount"
            defaultMessage='Transaction Count'
            description='Transaction Count'
            />}
            dataIndex="txCount"
            width={100} />
        ); break

        case "version" : columnHeaders.push(
            <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.version"
            defaultMessage='Version'
            description='Version'
            />}
            dataIndex="version"
            width={100} />
              
        ); break

        case "name" : columnHeaders.push(
           <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.name"
            defaultMessage='name'
            description='name'
            />}
            dataIndex="name"
            cell= { row =>(
              <span className="partialHash">
                <div className="fullHash" id="showPresh">
                  {row}
                </div>{" "}
                {!row ? "" : (row.length>=18?(row.slice(0, 18) +"....") : (row))}
              </span>
            )}
            width={200} />
         
        ); break

        case "balance" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.balance"
            defaultMessage='balance'
            description='balance'
            />}
            dataIndex="balance"
            width={100} />
        ); break

        case "txcount" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.txcount"
            defaultMessage='txcount'
            description='txcount'
            />}
            dataIndex="txcount"
            width={100} />
        ); break

        case "creator" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.creator"
            defaultMessage='creator'
            description='creator'
            />}
            dataIndex="creator"
            cell= { row =>(
              <span className="partialHash">
                <div className="fullHash" id="showPresh">
                  {row}
                </div>{" "}
                {!row ? "" : (row.length>=18?(row.slice(0, 18) +"....") : (row))}
              </span>
            )}
            width={200} />
        ); break

        case "creator_hash" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.creator_hash"
            defaultMessage='Creator Hash'
            description='Creator Hash'
            />}
            dataIndex="creator_hash"
            cell= { row =>(
              <span className="partialHash">
                <div className="fullHash" id="showPresh">
                  {row}
                </div>{" "}
                {!row ? "" : (row.length>=18?(row.slice(0, 18) +"....") : (row))}
              </span>
            )}
            width={200} />
        ); break

        case "contract_code" : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={<FormattedMessage
            id="page.localeProvider.contract_code"
            defaultMessage='Contract Code'
            description='Contract Code'
            />}
            dataIndex="contract_code"
            width={200} />
        ); break

        case 'operation' : columnHeaders.push(
          <Table.Column key = {config.contract[i]} title={
              <FormattedMessage
              id='page.localeProvider.operation'
              defaultMessage='Operation'
              description='Operation'
            />}
            dataIndex = "srecode"
              cell= { (row, index) =>(
                <span>
                  {row == null || row == '' ? (
                  <a><span onClick ={this.addContract.bind(this,row, index)}>
                    <FormattedMessage
                      id='page.localeProvider.upload'
                      defaultMessage='Upload'
                      description='Upload'
                    />
                  </span></a>) : (
                  <a href = "#/contracts"><span onClick ={this.seeContract.bind(this,row, index)}>
                    <FormattedMessage
                      id='page.localeProvider.see'
                      defaultMessage='See'
                      description='See'
                    />
                  </span></a>)}
                </span>
            )}

              width={200} />
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
                      dataSource={this.state.contractList}
                      className="basic-table"
                      hasBorder={false}
                    >
                      {columnHeaders}
                    </Table>
                    <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.state.contractCount}
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
    )
  }
}

export default compose(
  connect(
    state => ({
      channels : channelsSelector(state),
      contractList : contractListSelector(state),
      dashStats : dashStatsSelector(state),
      watchContract : watchContractSelector(state),
      uploadContract : uploadContractSelector(state)
    }),
    {
      getcontractList: contractList,
      getdashStats : dashStats,
      getwatchContract : watchContract,
      getuploadContract : uploadContract
    }
  )
)(TableList)