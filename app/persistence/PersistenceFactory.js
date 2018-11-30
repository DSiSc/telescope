/*
*SPDX-License-Identifier: Apache-2.0
*/

const Persist = require('./postgreSQL/Persist.js');

class PersistenceFactory {
  static async create(db) {
    if (db === 'postgreSQL') {
      const persist = new Persist();
      await persist.initialize();
      return persist;
    }

    throw ('Invalid Platform123');
  }
}

module.exports = PersistenceFactory;
