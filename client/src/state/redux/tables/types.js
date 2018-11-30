/**
 *    SPDX-License-Identifier: Apache-2.0
 */

const namespaces = 'tables'

const BLOCK_LIST = `${namespaces}/BLOCK_LIST`
const CONTRACT_LIST = `${namespaces}/CONTRACT_LIST`
const CHANNELS = `${namespaces}/CHANNELS`
const NODE_LIST = `${namespaces}/NODE_LIST`
const TRANSACTION = `${namespaces}/TRANSACTION`
const TRANSACTION_LIST = `${namespaces}/TRANSACTION_LIST`

const BLOCK_CHART_MIN = `${namespaces}/BLOCK_CHART_MIN`
const BLOCK_CHART_HOUR = `${namespaces}/BLOCK_CHART_HOUR`
const TRANSACTION_CHART_MIN = `${namespaces}/TRANSACTION_CHART_MIN`
const TRANSACTION_CHART_HOUR = `${namespaces}/TRANSACTION_CHART_HOUR`

/* Pie Graph */
const TRANSACTION_CHART_ORG = `${namespaces}/TRANSACTION_CHART_ORG`

/* Notification */
const NOTIFICATION_LOAD = `${namespaces}/NOTIFICATION_LOAD`

/* Dash Stats */
const DASHBOARD_STATS = `${namespaces}/DASHBOARD_STATS`

/* Channel  */
const CHANNEL = `${namespaces}/CHANNEL`
const CHANGE_CHANNEL = `${namespaces}/CHANGE_CHANNEL`
const CHANNEL_LIST = `${namespaces}/CHANNEL_LIST`

const NODE_STATUS = `${namespaces}/NODE_STATUS`
const WATCH_CONTRACT = `${namespaces}/WATCH_CONTRACT`
const UPLOAD_CONTRACT = `${namespaces}/UPLOAD_CONTRACT`

export default {
  BLOCK_LIST,
  CONTRACT_LIST,
  CHANNELS,
  NODE_LIST,
  TRANSACTION,
  TRANSACTION_LIST,
  BLOCK_CHART_HOUR,
  BLOCK_CHART_MIN,
  CHANGE_CHANNEL,
  CHANNEL,
  CHANNEL_LIST,
  DASHBOARD_STATS,
  NOTIFICATION_LOAD,
  NODE_STATUS,
  TRANSACTION_CHART_HOUR,
  TRANSACTION_CHART_MIN,
  TRANSACTION_CHART_ORG,
  WATCH_CONTRACT,
  UPLOAD_CONTRACT
}
