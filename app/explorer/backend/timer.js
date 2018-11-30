/*
 Copyright ONECHAIN 2017 All Rights Reserved.

 */
var Metrics = require('./metrics')
var BlockListener = require('./BlockListener')
var SyncBlockData = require('./SynBlockData')
var SynData = require('./justitia/SynData')

var blockPerMinMeter = Metrics.blockMetrics
var txnPerSecMeter = Metrics.txnPerSecMeter
var txnPerMinMeter = Metrics.txMetrics

async function start (platform, persistence) {
  var blockScanner, blockListener
  blockScanner = new SyncBlockData(platform, persistence)

if (platform.plf === 'justitia') {
  blockScanner = new SynData(platform, persistence)
}

  blockListener = new BlockListener(blockScanner)

// if (platform.plf === 'justitia') {
//   var isdone = await blockScanner.syncBlock()
//   if (isdone) {
//       console.log('justitia timer')
//       console.log(isdone)
//     setInterval(function () {
//       console.log('justitia timer111')
//       blockScanner.syncBlock()
//     }, 10000)
//   }
//   } else {
//     blockListener.emit('syncBlock')
//   }

  if (platform.plf === 'tendermint') {
    blockListener.emit('syncBlock')
  }
  setInterval(function () {
    blockPerMinMeter.push(0)
    txnPerSecMeter.push(0)
    txnPerMinMeter.push(0)
  }, 500)

  // Sync Block
  blockListener.emit('syncChannels')
  blockListener.emit('syncContracts')
  blockListener.emit('syncNodelist')
  // ====================Orderer BE-303=====================================
  blockListener.emit('syncOrdererlist')
  // ====================Orderer BE-303=====================================  
  blockListener.emit('syncChannelEventHubBlock')
}

exports.start = start
