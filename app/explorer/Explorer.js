/**
 *    SPDX-License-Identifier: Apache-2.0
 */
var express = require('express')
var bodyParser = require('body-parser')
var dbroutes = require('./rest/dbroutes.js')
var explorerconfig = require('./explorerconfig.json')
var PersistenceFactory = require('../persistence/PersistenceFactory.js')
var timer = require('./backend/timer.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json')
var compression = require('compression')
var routes = require('./rest/routes')
var TenderClient = require('./backend/tendermint/TenderClient.js')
var BurrowClient = require('./backend/burrow/BurrowClient.js')
var platform = require('platform')
var PlatformBuilder = require('../platform/PlatformBuilder.js')

class Explorer {
  constructor () {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    this.app.use(compression())
    this.persistence = {}
  }

  getApp () {
    return this.app
  }

  async initialize (broadcaster) {
    this.persistence = await PersistenceFactory.create(explorerconfig['persistence'])

    dbroutes(this.app, this.persistence)
    let platforms = explorerconfig['platforms']
    for (let pltfrm of platforms) {
      let platform = await PlatformBuilder.build(pltfrm)
      await routes(this.app, pltfrm, platform)
      await timer.start(platform, this.persistence)
      if (pltfrm === 'justitia') {
        //todo
        console.log('this is justitia part')
      } else {
      if (pltfrm === 'tendermint') {
        console.log('this is tendermint part')
        var client = new TenderClient(platform, this.persistence, broadcaster)
      } else if (pltfrm === 'burrow') {
        console.log('this is burrow part')
        client = new BurrowClient(platform, this.persistence, broadcaster)
      }

      client.connectserver()
      }
    }
  }
  close () {
    if (this.persistence) {
      this.persistence.closeconnection()
    }
  }
}

module.exports = Explorer

