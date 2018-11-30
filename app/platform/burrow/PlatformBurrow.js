/**
 *    SPDX-License-Identifier: Apache-2.0
 */

const request = require('sync-request');
const url = require('url');

const helper = require('../../helper.js');

const logger = helper.getLogger('platformtender');
const config = require('./config.json');
const Platform = require('../Platform');

class PlatformBurrow {
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
      blockNum: block.BlockMeta.header.height,
      txCount: block.BlockMeta.header.num_txs,
      preHash: block.Block.header.last_block_id.hash,
      dataHash: block.BlockMeta.header.data_hash,
      firstTxTimestamp: block.BlockMeta.header.time,
      blockhash: block.BlockMeta.block_id.hash,
      genesis_block_hash: block.BlockMeta.header.chain_id,
      txs: block.Block.data.txs,
      total_txs: block.BlockMeta.header.total_txs,
    };

    return result;
  }

  getChannels(res) {
    const resultdata = Platform.getChannels(this.baseurl, '/chain_id');
    const channels = [];

    const result = JSON.parse(resultdata);
    channels.push({ channel_id: result.result.ChainId });
    const response = {
      status: 200,
    };
    response.channels = [...new Set(channels)];
    res.send(response);
  }

  getCurChannel(res) {
    const resultdata = JSON.parse(Platform.getCurChannel(this.baseurl, '/chain_id'));
    res.send({ currentChannel: resultdata.result.ChainId });
  }

  getStatus() {
    const statusdata = JSON.parse(Platform.getStatus(this.baseurl));
    const result = {
      listenaddr: statusdata.result.NodeInfo.ListenAddress,
      network: statusdata.result.NodeInfo.Network,
      latestblockheight: statusdata.result.SyncInfo.LatestBlockHeight,

    };
    return result;
  }

  getnetInfo() {
    const path = '/network';
    const netinfo = [];
    const result = JSON.parse(Platform.getnetInfo(this.baseurl, path));
    const netnodes = result.result.peers;
    if (netnodes) {
      for (let i = 0; i < netnodes.length; i++) {
        netinfo.push({
          listenaddr: netnodes[i].NodeInfo.ListenAddress,
          network: netnodes[i].NodeInfo.Network,
        });
      }
    }
    return netinfo;
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
          server_hostname: statusdata.listenaddr,
        });
      }
      if (netinfo) {
        for (let i = 0; i < netinfo.length; i++) {
          nodes.push({
            status: 'RUNNING',
            server_hostname: netinfo[i].listenaddr,
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

  getLastHeight() {
    try {
      const urlre = url.resolve(this.baseurl, '/blocks');
      const res = request('GET', urlre);
      const resultdata = JSON.parse(res.getBody()
        .toString());
      const result = {
        lastheight: resultdata.result.LastHeight,
        chainid: resultdata.result.BlockMetas[0].header.chain_id,
      };
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PlatformBurrow;
