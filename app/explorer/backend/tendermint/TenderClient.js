/**
 *    SPDX-License-Identifier: Apache-2.0
 */

var WebSocketClient = require('websocket').client
var config = require('../../../platform/tendermint/config.json')
var SynBlockData = require('../SynBlockData')
var Client = require('../Client')

class TenderClient {
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
      var str = '{"jsonrpc":"2.0","id":"ws-client","method":"subscribe","params":{"query":"tm.event=\'NewBlockHeader\'"}}'
      Client(myInterval, str, reconnect, connection, client, addr, blockScanner)
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          var blockHeader = JSON.parse(message.utf8Data)
          if (blockHeader.result.data) {
            if (blockHeader.result.data.value.header.height) {
              var height = blockHeader.result.data.value.header.height
              blockScanner.syncBlockByNumber(parseInt(height))
            }
          }
          console.log("Received: '" + message.utf8Data + "'")
        }
      })
    })
    console.log(reconnect)
    client.connect(addr)
  }
}

module.exports = TenderClient
