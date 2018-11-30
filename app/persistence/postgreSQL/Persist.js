/**
 *    SPDX-License-Identifier: Apache-2.0
 */

const CRUDService = require('./CRUDService.js');
const MetricService = require('./MetricService.js');
const pgservice = require('./db/pgservice.js');

class Persist {
  async initialize() {
    await pgservice.handleDisconnect();
    this.metricservice = new MetricService();
    this.crudService = new CRUDService();
  }

  getMetricService() {
    return this.metricservice;
  }

  getCrudService() {
    return this.crudService;
  }
}

module.exports = Persist;
