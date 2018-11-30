
import types from './types'

const getBlockList = (blockList) => ({
  type: types.BLOCK_LIST,
  payload: blockList
})

const getContractList = (contractList) => ({
  type: types.CONTRACT_LIST,
  payload: contractList
})

const getChannels = (channels) => ({
  type: types.CHANNELS,
  payload: channels
})

const getNodeList = (nodeList) => ({
  type: types.NODE_LIST,
  payload: nodeList
})

const getTransaction = (transaction) => ({
  type: types.TRANSACTION,
  payload: transaction
})

const getTransactionList = (transactionList) => ({
  type: types.TRANSACTION_LIST,
  payload: transactionList
})
const getBlockPerHour = (blockPerHour) => ({
  type: types.BLOCK_CHART_HOUR,
  payload: { blockPerHour }
})

const getBlockPerMin = (blockPerMin) => ({
  type: types.BLOCK_CHART_MIN,
  payload: { blockPerMin }
})

const getChannel = (channel) => ({
  type: types.CHANNEL,
  payload: { channel }
})

const getChannelList = (channelList) => ({
  type: types.CHANNEL_LIST,
  payload: channelList
})

const getDashStats = (dashStats) => ({
  type: types.DASHBOARD_STATS,
  payload: dashStats
})

const getNotification = (notification) => ({
  type: types.NOTIFICATION_LOAD,
  payload: { notification }
})

const getNodeStatus = (nodeStatus) => ({
  type: types.NODE_STATUS,
  payload: nodeStatus
})

const getTransactionByOrg = (transactionByOrg) => ({
  type: types.TRANSACTION_CHART_ORG,
  payload: transactionByOrg
})

const getTransactionPerHour = (transactionPerHour) => ({
  type: types.TRANSACTION_CHART_HOUR,
  payload: { transactionPerHour }
})

const getTransactionPerMin = (transactionPerMin) => ({
  type: types.TRANSACTION_CHART_MIN,
  payload: { transactionPerMin }
})

const updateChannel = (channel) => ({
  type: types.CHANGE_CHANNEL,
  payload: { channel }
})

const getWatchContract = (watchContract) => ({
  type: types.WATCH_CONTRACT,
  payload : { watchContract } 
})

const getUploadContract = (uploadContract) =>({
  type : types.UPLOAD_CONTRACT,
  payload : {uploadContract}
})

export default {
  getBlockList,
  getContractList,
  getChannels,
  getNodeList,
  getTransaction,
  getTransactionList,
  getBlockPerHour,
  getBlockPerMin,
  getChannel,
  getChannelList,
  getDashStats,
  getNotification,
  getNodeStatus,
  getTransactionByOrg,
  getTransactionPerHour,
  getTransactionPerMin,
  updateChannel,
  getWatchContract,
  getUploadContract
}
