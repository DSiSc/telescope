/*
 *SPDX-License-Identifier: Apache-2.0
 */

var helper = require('../../../helper.js')
var logger = helper.getLogger('synData')
var crypto = require('crypto')

class SynData {
  constructor (platform, persistence) {
    this.platform = platform
    this.crudService = persistence.getCrudService()
  }

  async syncBlock () {
    try {
      console.log('this is  SynBlockData')
      var myDate = new Date();
      var timetest = myDate.toLocaleString()
      console.log(timetest)
      var curBlockNum
      var genesisBlockHash = ''
      var channelName = ''
      let channeldata = await this.getCurChannelName()
      if (channeldata) {
        genesisBlockHash = channeldata
        channelName = channeldata
      }
      var maxBlockNum = await this.getMaxBlockNum(channelName)
      curBlockNum = await this.crudService.getCurBlockNum(genesisBlockHash)
      if (curBlockNum === -1) {
        curBlockNum = 0
      }
      await this.getBlockByNumber(channelName, curBlockNum + 1, maxBlockNum + 1)
      await this.syncJustChannels()
      var myDate = new Date();
      var timetest = myDate.toLocaleString()
      console.log('jieshu')
      console.log(timetest)
      return true
    } catch (err) {
      console.log(err)
    }
  }

  async saveBlockRange (block, channelName) {
    await this.saveTransactions(block, channelName)
    await this.crudService.saveBlock(block)
  };

  async saveTransactions (block, channelName) {
    var timestamp = new Date(block.firstTxTimestamp)
    let txLen = block.txCount
    if (parseInt(txLen) > 0) {
      for (let i = 0; i < txLen; i++) {
        var tx = block.txs[i]
        var type = 0
        var contractname = ''
        var to = tx.to
        if (!to) {
          to = ''
          type = 1
          //查Receipt
          var contractaddr = this.platform.getJustReceiptByHash (channelName, tx.hash)
          contractname = contractaddr
        }
        var transaction = {
          'blockid': block.blockNum,
          'txhash': tx.hash,
          'transaction_from': tx.from,
          'transaction_to' : to,
          'createdt': timestamp,
          'contractname': contractname,
          'contract_id': contractname,
          'status': 1,
          'type': type,
          'read_set': {},
          'write_set': {},
          'genesis_block_hash': block.genesis_block_hash
        }
       if(contractname) {
        //查余额     
        var balance = this.platform.getJustBalance (channelName, tx.hash)
        var contract = {
          'name': contractname,
          'creator_hash': tx.hash,
          'creator': tx.from,
          'createdt': timestamp,
          'balance': balance,
          'genesis_block_hash': block.genesis_block_hash
        }
         await this.crudService.saveContract(contract)  
       }

        await this.crudService.saveTransaction(transaction)
      }
    }
  };

  async getBlockByNumber (channelName, start, end) {
    while (start < end) {
      let block = this.platform.getJustBlockByNumber(channelName, start)
      try {
        await this.saveBlockRange(block, channelName)
      } catch (err) {
        console.log(err.stack)
        logger.error(err)
      }
      start++
    }
  }


  async getMaxBlockNum (channelName) {
    try {
      var blockNumber = this.platform.getJustBlockNumber()
      var height = ''
      if (blockNumber) {
        height = blockNumber
      }
      return parseInt(height,16);
    } catch (err) {
      logger.error(err)
    }
  };

  // ====================contracts=====================================
  async saveContracts (channelName) {};
  // 没有多个，故按一个处理先
  async saveChannel (data) {
    // 从库里内查询 名称及块数
    var chain_id = data.channelId
    var nums = await this.crudService.getCurBlockNum(chain_id)   
    var total_txs = await this.crudService.getCurTxNum(chain_id)

    var myDate = new Date();
    var timestamp = myDate.toLocaleString()
    var channel = {
      blocks: parseInt(nums),
      trans: parseInt(total_txs),
      name: chain_id,
      createdt: timestamp,
      channel_hash: chain_id,
      genesis_block_hash: chain_id
    }
    this.crudService.saveChannel(channel)
  };

  async syncJustChannels () {
    try {
      var channels = this.platform.getJustchannels()
      if (channels) {
        for (var i = 0; i < channels.length; i++) {
          await this.saveChannel(channels[i])
        }
      }   
    } catch (err) {
      logger.error(err)
    }
  };

  async getCurChannelName () {
    try {
      var channels = this.platform.getJustchannels()
      if (channels) {
         return channels[0].name
      } else {
         return ''
      }
    } catch (err) {
      logger.error(err)
    }
  };

  async syncChannels () {
    var chain_id = await this.getCurChannelName()
    var nums = 0   
    var total_txs = 0

    var myDate = new Date();
    //var timestamp = myDate.toLocaleString()
    var channel = {
      blocks: parseInt(nums),
      trans: parseInt(total_txs),
      name: chain_id,
      createdt: myDate,
      channel_hash: chain_id,
      genesis_block_hash: chain_id
    }
    this.crudService.saveChannel(channel)
  };

  async saveNodelist () {
    var nodelists = []
    var nodeinfos = this.platform.getJustNode()
      if (nodeinfos) {
        for (var i = 0; i < nodeinfos.length; i++) {
          nodelists.push({ 'requests': nodeinfos[i].url,
            'genesis_block_hash': nodeinfos[i].genesis,
            'server_hostname': nodeinfos[i].hostName
          })
        }
      }
    let nodelen = nodelists.length
    for (let i = 0; i < nodelen; i++) {
      var nodes = nodelists[i]
      this.crudService.saveNode(nodes)
    }
  };
  // ====================Orderer BE-303=====================================
  async saveOrdererlist (channelName) {};
  // ====================Orderer BE-303=====================================
  async syncContracts () {};
  // 暂时没有多个channel，故直接调用。
  syncNodelist () {
    try {
      this.saveNodelist()
    } catch (err) {
      logger.error(err)
    }
  };
  // ====================Orderer BE-303=====================================
  syncOrdererlist () {};
  // ====================Orderer BE-303=====================================
  syncChannelEventHubBlock () {};
}

module.exports = SynData

