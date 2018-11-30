/**
 *    SPDX-License-Identifier: Apache-2.0
 */


const request = require('sync-request');
const url = require('url');

const helper = require('../../helper.js');

const logger = helper.getLogger('platformtender');
const config = require('./config.json');
const Platform = require('../Platform');

class PlatformTender {
  constructor() {
    this.host = config.host;
    this.port = config.port;
    this.plf = config.plf;
    this.baseurl = url.format({
      protocol: 'http:',
      host: `${this.host}:${this.port}`,
      port: this.port,
    });
  }

  getBlockByNumber(channelName, blockNumber) {
    const block = Platform.getBlockByNumber(this.baseurl, channelName, blockNumber);
    const result = {
      blockNum: block.block_meta.header.height,
      txCount: block.block_meta.header.num_txs,
      preHash: block.block.header.last_block_id.hash,
      dataHash: block.block_meta.header.data_hash,
      firstTxTimestamp: block.block_meta.header.time,
      blockhash: block.block_meta.block_id.hash,
      genesis_block_hash: block.block_meta.header.chain_id,
      txs: block.block.data.txs,
      total_txs: block.block_meta.header.total_txs,
    };
    return result;
  }

  getChannels(res) {
    const optionsget = {
      path: '/genesis',
    };
    const resultdata = Platform.getChannels(this.baseurl, optionsget.path);
    const channels = [];

    const result = JSON.parse(resultdata);
    channels.push({ channel_id: result.result.genesis.chain_id });
    const response = { status: 200 };
    response.channels = [...new Set(channels)];
    res.send(response);
  }

  getCurChannel(res) {
    const optionsget = {
      path: '/genesis',
    };
    const resultdata = JSON.parse(Platform.getCurChannel(this.baseurl, optionsget.path));
    res.send({ currentChannel: resultdata.result.genesis.chain_id });
  }

  getStatus() {
    const statusdata = JSON.parse(Platform.getStatus(this.baseurl));
    const res = {
      listenaddr: statusdata.result.node_info.listen_addr,
      network: statusdata.result.node_info.network,
      latestblockheight: statusdata.result.sync_info.latest_block_height,
    };
    return res;
  }

  getnetInfo() {
    try {
      const path = '/net_info';
      const netinfo = [];
      const result = JSON.parse(Platform.getnetInfo(this.baseurl, path));
      const netnodes = result.result.peers;
      if (netnodes) {
        for (let i = 0; i < netnodes.length; i++) {
          netinfo.push({
            listenaddr: netnodes[i].node_info.listen_addr,
            network: netnodes[i].node_info.network,
          });
        }
      }
      return netinfo;
      // return Platform.getnetInfo(this.baseurl,path);
    } catch (err) {
      console.log(err);
    }
  }

  getContract(channelName, cb) {
    Platform.getContract(channelName, cb);
  }

  getNodesStatus(channelName, cb) {
    try {
      const nodes = [];
      const statusdata = this.getStatus();
      const netinfo = this.getnetInfo();
      if (statusdata) {
        nodes.push({
          status: 'RUNNING',
          server_hostname: statusdata.listenaddr
        });
      }
      if (netinfo) {
        for (let i = 0; i < netinfo.length; i++) {
          nodes.push({
            status: 'RUNNING',
            server_hostname: netinfo[i].listenaddr
          });
        }
      }
      cb(nodes);
    } catch (err) {
      console.log(err);
      logger.error(err);
      cb([]);
    }
  }

  getJustNode(res) {
    try {
      const url = 'http://127.0.0.1:47768';

      const result = request('POST', url, {
        json: {
          jsonrpc: '2.0',
          method: 'net_channelInfo',
          params: [],
          id: 1,
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      res.send(data);
      // return Platform.getnetInfo(this.baseurl,path);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PlatformTender;
