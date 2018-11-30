/**
 *    SPDX-License-Identifier: Apache-2.0
 */

var WebSocketClient = require('websocket').client
var config = require('../../../platform/burrow/config.json')
var SynBlockData = require('../SynBlockData')
var dbBlock = require('../../../persistence/postgreSQL/MetricService')

var PlatformBurrow = require('../../../platform/burrow/PlatformBurrow')
var Client = require('../Client')

class BurrowClient {
  constructor (platform, persistence, broadcaster) {
    this.addr = 'ws://' + config['host'] + ':' + config['port'] + '/websocket'
    this.platform = platform
    this.persistence = persistence
    this.broadcaster = broadcaster
  }

  async connectserver () {
    var client = new WebSocketClient()
    var myInterval
    var addr = this.addr
    var blockScanner = new SynBlockData(this.platform, this.persistence, this.broadcaster)
    var reconnect = false

    client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString())
    })

    client.on('connect', function (connection) {
      var str = '{"jsonrpc":"2.0","id":"ws-client","method":"blocks","params":{"query":"tm.event=\'NewBlockHeader\'"}}'
      Client(myInterval, str, reconnect, connection, client, addr, blockScanner)
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          var blockHeader = JSON.parse(message.utf8Data)

          var blockheight = blockHeader.result.LastHeight
          myInterval = setInterval(function () {
            var platburrow = new PlatformBurrow()
            let lastheight = platburrow.getLastHeight()
            let db = new dbBlock()
            if (lastheight) {
              db.getLastBlockNum(lastheight.chainid, function (data) {
                if (parseInt(data.blocknum) === blockheight) {
                  if (lastheight.lastheight > blockheight) {
                    blockheight = lastheight.lastheight
                    blockScanner.getBlockByNumber(lastheight.chainid, parseInt(data.blocknum) + 1, blockheight + 1)
                  }
                }
              })
            }
          }, 20000)

          // console.log("Received: '" + message.utf8Data + "'");
        }
      })
    })
    client.connect(addr)
  }
}

module.exports = BurrowClient
