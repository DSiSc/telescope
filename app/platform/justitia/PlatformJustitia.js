/**
 *    SPDX-License-Identifier: Apache-2.0
 */

const request = require('sync-request');
const url = require('url');
const config = require('./config.json');

class PlatformJustitia {
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


  getChannels(res) {
    const channels = this.getJustchannels();
    channels.push({ channel_id: channels[0].name });
    const response = {
      status: 200,
    };
    response.channels = [...new Set(channels)];
    res.send(response);
  }

  getCurChannel(res) {
    const channels = this.getJustchannels();
    res.send({ currentChannel: channels[0].name });
  }


  getJustBalance(channelName, hash) {
    try {
      const result = request('POST', this.baseurl, {
        json: {
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          id: 1,
          params: [hash, 'latest'],
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      const res = parseInt(data.result, 16);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  getJustReceiptByHash(channelName, hash) {
    try {
      const result = request('POST', this.baseurl, {
        json: {
          jsonrpc: '2.0',
          method: 'eth_getTransactionReceipt',
          id: 1,
          params: [hash],
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      const res = data.result.contractAddress;
      return res;
    } catch (err) {
      console.log(err);
    }
  }


  getJustBlockByNumber(channelName, number) {
    try {
      const num = parseInt(number);
      const oxNum = num.toString(16);
      const blockNumber = `0x${oxNum}`;
      const result = request('POST', this.baseurl, {
        json: {
          jsonrpc: '2.0',
          method: 'eth_getBlockByNumber',
          id: 1,
          params: [blockNumber, true],
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      let txCount = 0;
      if (data.result.transactions) {
        txCount = data.result.transactions.length;
      }
      const blockNum = parseInt(data.result.number, 16);
      const timetemp = parseInt(data.result.timestamp, 16);
      const timestamp = new Date(timetemp * 1000);
      const res = {
        blockNum,
        txCount,
        preHash: data.result.parentHash,
        dataHash: data.result.transactionsRoot,
        firstTxTimestamp: timestamp,
        blockhash: data.result.hash,
        genesis_block_hash: channelName,
        txs: data.result.transactions,
      };
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  getJustBlockNumber() {
    try {
      const result = request('POST', this.baseurl, {
        json: {
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      return data.result;
    } catch (err) {
      console.log(err);
    }
  }

  getJustNode() {
    try {
      const result = request('POST', this.baseurl, {
        json: {
          jsonrpc: '2.0',
          method: 'net_nodeInfo',
          params: [],
          id: 1,
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      return data.result;
    } catch (err) {
      console.log(err);
    }
  }

  getJustchannels() {
    try {
      const result = request('POST', this.baseurl, {
        json: {
          jsonrpc: '2.0',
          method: 'net_channelInfo',
          params: [],
          id: 1,
        },
      });

      const data = JSON.parse(result.getBody()
        .toString());
      return data.result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PlatformJustitia;
