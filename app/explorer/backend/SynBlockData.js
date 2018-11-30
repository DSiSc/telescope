/*
 *SPDX-License-Identifier: Apache-2.0
 */

var helper = require('../../helper.js')
var logger = helper.getLogger('synBlockData')
var crypto = require('crypto')

class SynBlockData {
  constructor (platform, persistence) {
    this.platform = platform
    this.crudService = persistence.getCrudService()
  }

  async syncBlock () {
    try {
      console.log('this is  SynBlockData')
      var curBlockNum
      var genesisBlockHash = ''
      var channelName = ''
      var statusdata = this.platform.getStatus()
      if (statusdata) {
        genesisBlockHash = statusdata.network
        channelName = statusdata.network
      }
      var maxBlockNum = await this.getMaxBlockNum(channelName)
      curBlockNum = await this.crudService.getCurBlockNum(genesisBlockHash)
      if (curBlockNum === -1) {
        curBlockNum = 0
      }
      await this.getBlockByNumber(channelName, curBlockNum + 1, maxBlockNum + 1)
    } catch (err) {
      console.log(err)
    }
  }

  async getBlockTimeStamp (block) {
    var blockTimestamp = null
    try {
      if (block.firstTxTimestamp) {
        blockTimestamp = block.firstTxTimestamp
      }
    } catch (err) {
      logger.error(err)
    }
    return blockTimestamp
  };
  async saveBlockRange (block, channelName) {
    await this.saveTransactions(block, channelName)
    await this.crudService.saveBlock(block)
  };

  async saveTransactions (block, channelName) {
    let txLen = block.txCount
    if (parseInt(txLen) > 0) {
      for (let i = 0; i < txLen; i++) {
        var tx = block.txs[i]
        var txhash = this.calculateTxHash(tx)
        var transaction = {
          'blockid': block.blockNum,
          'txhash': txhash,
          'createdt': new Date(block.firstTxTimestamp),
          'contractname': '',
          'contract_id': '',
          'status': 0,
          'creator_msp_id': '',
          'endorser_msp_id': '',
          'type': '',
          'read_set': {},
          'write_set': {},
          'genesis_block_hash': block.genesis_block_hash,
          'validation_code': '',
          'envelope_signature': '',
          'payload_extension': '',
          'creator_nonce': '',
          'contract_proposal_input': '',
          'endorser_signature': '',
          'creator_id_bytes': '',
          'payload_proposal_hash': '',
          'endorser_id_bytes': ''
        }
        await this.crudService.saveTransaction(transaction)
      }
    }
  };

  /**
     *
     * @param {*} channelName
     * @param {*} maxBlockNum
     * @param {*} syncStartDate
     * Method provides the ability to sync based on configured property syncStartDate in config.json
     */
  async syncBlocksFromDate (channelName, maxBlockNum, syncStartDate) {}
  async getBlockByNumber (channelName, start, end) {
    while (start < end) {
      let block = this.platform.getBlockByNumber(channelName, start)
      try {
        await this.saveBlockRange(block, channelName)
      } catch (err) {
        console.log(err.stack)
        logger.error(err)
      }
      start++
    }
  }

  async syncBlockByNumber (height) {
    var channelName = ''
    var statusdata = this.platform.getStatus()
    if (statusdata) {
      channelName = statusdata.network
    }
    let block = this.platform.getBlockByNumber(channelName, height)

    try {
      var savedNewBlock = await this.saveBlockRange(block, channelName)
    } catch (err) {
      console.log(err.stack)
      logger.error(err)
    }
  }

  calculateBlockHash (header) {
    let headerAsn = asn.define('headerAsn', function () {
      this.seq().obj(this.key('Number').int(), this.key('PreviousHash').octstr(), this.key('DataHash').octstr())
    })

    let output = headerAsn.encode({
      Number: parseInt(header.number),
      PreviousHash: Buffer.from(header.previous_hash, 'hex'),
      DataHash: Buffer.from(header.data_hash, 'hex')
    }, 'der')
    let hash = sha.sha256(output)
    return hash
  };

  calculateTxHash (tx) {
    var content = new Buffer(tx, 'base64')
    var detail = content.toString()
    var txHash = crypto.createHash('sha256').update(detail).digest('hex')
    return txHash.slice(0, 40)
  }

  async getMaxBlockNum (channelName) {
    try {
      var statusdata = this.platform.getStatus()
      var height = ''
      if (statusdata) {
        height = statusdata.latestblockheight
      }
      return parseInt(height)
    } catch (err) {
      logger.error(err)
    }
  };

  // ====================contracts=====================================
  async saveContracts (channelName) {};
  // 没有多个，故按一个处理先
  async saveChannel () {
    // 从status内查询 名称及块数
    var statusdata = this.platform.getStatus()
    var nums = ''
    var chain_id = ''
    var total_txs = ''
    if (statusdata) {
      nums = statusdata.latestblockheight
      chain_id = statusdata.network
    }
    // 从最后一块内，获取交易总数
    var blockdata = this.platform.getBlockByNumber(chain_id, nums)
    if (blockdata) {
      total_txs = blockdata.total_txs
    }
    let date = new Date()
    var channel = {
      blocks: parseInt(nums),
      trans: parseInt(total_txs),
      name: chain_id,
      createdt: date,
      channel_hash: chain_id,
      genesis_block_hash: chain_id
    }
    this.crudService.saveChannel(channel)
  };

  async syncChannels () {
    try {
      await this.saveChannel()
    } catch (err) {
      logger.error(err)
    }
  };

  async saveNodelist () {
    var nodelists = []
    var statusdata = this.platform.getStatus()
    var netinfo = this.platform.getnetInfo()

    if (statusdata) {
      nodelists.push({ 'requests': statusdata.listenaddr,
        'genesis_block_hash': statusdata.network,
        'server_hostname': statusdata.listenaddr
      })
    }
    if (netinfo) {
      if (netinfo) {
        for (var i = 0; i < netinfo.length; i++) {
          nodelists.push({ 'requests': netinfo[i].listenaddr,
            'genesis_block_hash': netinfo[i].network,
            'server_hostname': netinfo[i].listenaddr
          })
        }
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

module.exports = SynBlockData

