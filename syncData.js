var SynJustitia = require('./app/explorer/SynJustitia.js')


async function startSyncData () {
  var synJustitia = new SynJustitia()
  await synJustitia.initialize()
}

startSyncData()
