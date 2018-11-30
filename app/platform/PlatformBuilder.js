/*
*SPDX-License-Identifier: Apache-2.0
*/

const PlatformTender = require('./tendermint/PlatformTender.js');
const PlatformBurrow = require('./burrow/PlatformBurrow.js');
const PlatformJustitia = require('./justitia/PlatformJustitia.js');

class PlatformBuilder {
  static async build(pltfrm) {
    let platform;
    if (pltfrm === 'tendermint') {
      platform = new PlatformTender();
      return platform;
    } if (pltfrm === 'burrow') {
      platform = new PlatformBurrow();
      return platform;
    } if (pltfrm === 'justitia') {
      platform = new PlatformJustitia();
      return platform;
    }
    throw ('Invalid Platform');
  }
}

module.exports = PlatformBuilder;
