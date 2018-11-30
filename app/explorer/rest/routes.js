

var requtil = require('./requestutils')

const Routes = async function (app, pltfrm, platform) {
  app.get('/api/block/:channel/:number', function (req, res) {
    let number = parseInt(req.params.number)
    let channelName = req.params.channel
    if (!isNaN(number) && channelName) {
      var result = platform.getBlockByNumber(channelName, number)
      res.send({
        status: 200,
        number: result.number,
        previous_hash: result.hash,
        data_hash: result.data_hash,
        transactions: result.txs
      })
    } else {
      return requtil.invalidRequest(req, res)
    }
  })

  app.get('/api/channels', function (req, res) {
    res.setHeader('Content-Type', 'application/json')

    platform.getChannels(res)
  })

  app.get('/api/curChannel', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    platform.getCurChannel(res)
  })

  app.get('/api/changeChannel/:channelName', async function (req, res) {
    let channelName = req.params.channelName
    res.send({ 'currentChannel': channelName })
  })

  // app.get('/api/contract/:channel', function (req, res) {
  //   let channelName = req.params.channel
  //   if (channelName) {
  //     platform.getContract(channelName, async function (data) {
  //       res.send({
  //         status: 200,
  //         contract: data
  //       })
  //     })
  //   } else {
  //     return requtil.invalidRequest(req, res)
  //   }
  // })

  // app.get("/api/nodesStatus/:channel", function (req, res) {
  //   let channelName = req.params.channel;
  //   if (channelName) {
  // platform.getNodesStatus(channelName,function (data) {
  //  res.send({ status: 200, nodes: data });
  //     });
  //   } else {
  //     return requtil.invalidRequest(req, res);
  //   }
  // });
}

module.exports = Routes
