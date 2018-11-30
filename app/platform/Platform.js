/**
 *    SPDX-License-Identifier: Apache-2.0
 */


const url = require('url');
const request = require('sync-request');
const helper = require('../helper.js');

const logger = helper.getLogger('platformtender');

function getBlockByNumber(baseurl, channelName, blockNumber) {
  try {
    const urlre = url.resolve(baseurl, `/block?height=${blockNumber}`);
    const res = request('GET', urlre);
    const resultdata = JSON.parse(res.getBody()
      .toString());
    return resultdata.result;
  } catch (err) {
    throw (err);
  }
}

function getStatus(baseurl) {
  try {
    const urlre = url.resolve(baseurl, '/status');
    const res = request('GET', urlre);
    const resultdata = res.getBody()
      .toString();
    return resultdata;
  } catch (err) {
    throw (err);
  }
}

function getnetInfo(baseurl, path) {
  try {
    const urlre = url.resolve(baseurl, path);
    const res = request('GET', urlre);
    const resultdata = res.getBody()
      .toString();
    return resultdata;
  } catch (err) {
    throw (err);
  }
}

function getContract(channelName, cb) {
  try {
    const ContractArray = [];
    cb(ContractArray);
  } catch (err) {
    logger.error(err);
    cb([]);
    throw (err);
  }
}

function getChannels(baseurl, path) {
  const urlre = url.resolve(baseurl, path);
  const res = request('GET', urlre);
  const resultdata = res.getBody()
    .toString();

  return resultdata;
}

function getCurChannel(baseurl, path) {
  const urlre = url.resolve(baseurl, path);
  const res = request('GET', urlre);
  const resultdata = res.getBody()
    .toString();
  return resultdata;
}

module.exports = {
  getBlockByNumber,
  getStatus,
  getnetInfo,
  getContract,
  getChannels,
  getCurChannel,
};
