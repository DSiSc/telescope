
function Client (myInterval, str, reconnect, connection, client, addr, blockScanner) {
  clearInterval(myInterval)

  if (reconnect) {
    blockScanner.syncBlock()
  }

  connection.send(str)

  console.log('WebSocket client connected')
  connection.on('error', function (error) {
    console.log('Connection Error: ' + error.toString())
  })
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed')
    reconnect = true
    myInterval = setInterval(function () {
      console.log('reconnect...................')
      client.connect(addr)
    }, 10000)
  })
}

module.exports = Client
