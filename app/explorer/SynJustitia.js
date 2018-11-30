/**
 *    SPDX-License-Identifier: Apache-2.0
 */
var explorerconfig = require('./explorerconfig.json')
var PersistenceFactory = require('../persistence/PersistenceFactory.js')
var PlatformBuilder = require('../platform/PlatformBuilder.js')
var SynData = require('./backend/justitia/SynData')

class SynJustitia {
  constructor () {
    this.persistence = {}
  }

  sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

  async initialize () {
    this.persistence = await PersistenceFactory.create(explorerconfig['persistence'])
    let platforms = explorerconfig['platforms']
    for (let pltfrm of platforms) {
       let platform = await PlatformBuilder.build(pltfrm)
       var blockScanner = new SynData(platform,this.persistence)
       //await blockScanner.syncBlock()
       while (true) {
       await blockScanner.syncBlock()
       await this.sleep(10000)
       }
    }
  }
}

module.exports = SynJustitia
