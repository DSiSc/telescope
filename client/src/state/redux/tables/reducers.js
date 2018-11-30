/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import { combineReducers } from 'redux'
import types from './types'

const initialState = {}

const blockListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BLOCK_LIST: {
      return ({
        rows: action.payload.rows,
        loaded: true,
        errors: action.error
      })
    }
    default: {
      return state
    }
  }
}

const contractListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTRACT_LIST: {
      return ({
        rows: action.payload.contract,
        loaded: true,
        errors: action.error
      })
    }
    default: {
      return state
    }
  }
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANNELS: {
      return ({
        rows: action.payload.channels,
        loaded: true,
        errors: action.error
      })
    }
    default: {
      return state
    }
  }
}

const nodeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NODE_LIST: {
      return ({
        rows: action.payload.nodes,
        loaded: true,
        errors: action.error
      })
    }
    default: {
      return state
    }
  }
}

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION: {
      return ({
        transaction: action.payload.row,
        loaded: true,
        errors: action.error
      })
    }
    default: {
      return state
    }
  }
}

const transactionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_LIST: {
      return ({
        rows: action.payload,
        loaded: true,
        errors: action.error
      })
    }
    default: {
      return state
    }
  }
}

const blockPerHourReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BLOCK_CHART_HOUR: {
      return {
        rows: action.payload.blockPerHour.rows,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const blockPerMinReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BLOCK_CHART_MIN: {
      return {
        rows: action.payload.blockPerMin.rows,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const channelListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANNEL_LIST: {
      return {
        list: action.payload.channels,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANNEL: {
      return action.payload.channel
    }
    case types.CHANGE_CHANNEL: {
      return action.payload.channel
    }
    default: {
      return state
    }
  }
}

const dashStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_STATS: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATION_LOAD: {
      return action.payload.notification
    }
    default: {
      return state
    }
  }
}

const nodeStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NODE_STATUS: {
      return {
        list: action.payload.nodes,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const transactionByOrgReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_CHART_ORG: {
      return {
        rows: action.payload.rows,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const transactionPerHourReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_CHART_HOUR: {
      return {
        rows: action.payload.transactionPerHour.rows,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const transactionPerMinReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_CHART_MIN: {
      return {
        rows: action.payload.transactionPerMin.rows,
        loaded: true,
        errors: action.errors
      }
    }
    default: {
      return state
    }
  }
}

const watchContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WATCH_CONTRACT: {
      return ({
        row : action.payload.watchContract.row,
        loaded: true,
        errors: action.errors
      })
    }
    default: {
      return state
    }
  }
}

const uploadContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_CONTRACT: {
      return ({
        row : action.payload.uploadContract,
        loaded: true,
        errors: action.errors
      })
    }
    default: {
      return state
    }
  }
}

const reducer = combineReducers({
  blockList: blockListReducer,
  contractList: contractListReducer,
  channels: channelsReducer,
  nodeList: nodeListReducer,
  transaction: transactionReducer,
  transactionList: transactionListReducer,
  blockPerHour: blockPerHourReducer,
  blockPerMin: blockPerMinReducer,
  channel: channelReducer,
  channelList: channelListReducer,
  dashStats: dashStatsReducer,
  notification: notificationReducer,
  nodeStatus: nodeStatusReducer,
  transactionByOrg: transactionByOrgReducer,
  transactionPerHour: transactionPerHourReducer,
  transactionPerMin: transactionPerMinReducer,
  watchContract : watchContractReducer,
  uploadContract : uploadContractReducer
})

export default reducer
