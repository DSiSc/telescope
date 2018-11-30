import actions from './actions'
import moment from 'moment-timezone'
import { get, post } from 'services/request.js'

// import axios from 'axios'
// var MockAdapter = require('axios-mock-adapter');
// var mock = new MockAdapter(axios);

// mock.onGet('/api/channels').reply(200,{
//   "channels": [
//     "justitia-chan3"
//   ]
// })

// mock.onGet('/api/curChannel').reply(200,{
//   "currentChannel": "justitia-chan1"
// })

// const channel = () => dispatch => {
//   return axios.get('/api/curChannel')
//     .then(resp => {
//       dispatch(actions.getChannel(resp.data))
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

// const channelList = () => (dispatch) => {
//   return axios.get('/api/channels')
//     .then(resp => {
//       dispatch(actions.getChannelList(resp.data))
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }



const blockPerHour = channel => dispatch => {
  return get(`/api/blocksByHour/${channel}/1`)
    .then(resp => {
      dispatch(actions.getBlockPerHour(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const blockPerMin = channel => dispatch => {
  return get(`/api/blocksByMinute/${channel}/1`)
    .then(resp => {
      dispatch(actions.getBlockPerMin(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const changeChannel = channel => dispatch => {
  return get(`/api/changeChannel/${channel}`)
    .then(resp => {
      dispatch(actions.updateChannel(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const channel = () => dispatch => {
  return get('/api/curChannel')
    .then(resp => {
      dispatch(actions.getChannel(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const channelList = () => dispatch => {
  return get('/api/channels')
    .then(resp => {
      dispatch(actions.getChannelList(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const dashStats = channel => dispatch => {
  return get(`/api/status/${channel}`)
    .then(resp => {
      dispatch(actions.getDashStats(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const notification = notification => dispatch => {
  var notify = JSON.parse(notification)
  dispatch(actions.getNotification(notify))
}

const nodeStatus = channel => dispatch => {
  return get(`/api/nodesStatus/${channel}`)
    .then(resp => {
      dispatch(actions.getNodeStatus(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const transactionByOrg = channel => dispatch => {
  return get(`/api/txByOrg/${channel}`)
    .then(resp => {
      dispatch(actions.getTransactionByOrg(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const transactionPerHour = channel => dispatch => {
  return get(`/api/txByHour/${channel}/1`)
    .then(resp => {
      dispatch(actions.getTransactionPerHour(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const transactionPerMin = channel => dispatch => {
  return get(`/api/txByMinute/${channel}/1`)
    .then(resp => {
      dispatch(actions.getTransactionPerMin(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const contractList = (channel, limit, num) => (dispatch) => {
  return get(`/api/contract/${channel}/${limit}/${num}`)
    .then(resp => {
      dispatch(actions.getContractList(resp))
    }).catch(error => {
      console.error(error)
    })
}

// table channel
const channels = () => (dispatch) => {
  return get('/api/channels/info')
    .then(resp => {
      if (resp['channels']) {
        resp['channels'].forEach(element => {
          element.createdat = moment(element.createdat)
            .tz(moment.tz.guess())
            .format('M-D-YYYY h:mm A zz')
        })
      }

      dispatch(actions.getChannels(resp))
    }).catch(error => {
      console.error(error)
    })
}

const nodeList = (channel) => (dispatch) => {
  return get(`/api/nodes/${channel}`)
    .then(resp => {
      dispatch(actions.getNodeList(resp))
    }).catch(error => {
      console.error(error)
    })
}

const transaction = (channel, transactionId) => (dispatch) => {
  return get(`/api/transaction/${channel}/${transactionId}`)
    .then(resp => {
      dispatch(actions.getTransaction(resp))
    }).catch(error => {
      console.error(error)
    })
}

const transactionList = (channel , limit, num) => (dispatch) => {
  return get(`/api/txList/${channel}/${limit}/${num}`)
    .then(resp => {
      resp.rows.forEach(element => {
        element.createdt = moment(element.createdt)
          .tz(moment.tz.guess())
          .format('M-D-YYYY h:mm A zz')
      })

      dispatch(actions.getTransactionList(resp))
    }).catch(error => {
      console.error(error)
    })
}

const blockList = (channel, limit, num) => (dispatch) => {
  return get(`/api/blockAndTxList/${channel}/${limit}/${num}`)
    .then(resp => {
      dispatch(actions.getBlockList(resp))
    }).catch(error => {
      console.error(error)
    })
}

const watchContract = (channel, id) => dispatch => {
    return get(`/api/watchcontract/${channel}/${id}`)
    .then(resp => {
        dispatch(actions.getWatchContract(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

const uploadContract = (channel, id, value) => dispatch => {
    let contractvalue = {
      value : value
    }

    return post(`/api/uploadContract/${channel}/${id}`,{
      data : value
    })
    .then(resp => {
      dispatch(actions.getUploadContract(resp))
    })
    .catch(error => {
      console.error(error)
    })
}

export default {
  blockList,
  contractList,
  channels,
  nodeList,
  transaction,
  transactionList,
  blockPerHour,
  blockPerMin,
  transactionPerHour,
  transactionPerMin,
  transactionByOrg,
  notification,
  dashStats,
  channel,
  channelList,
  changeChannel,
  nodeStatus,
  watchContract,
  uploadContract
}