'use strict';

if (typeof Promise === 'undefined') {
  global.Promise = require('es6-promise');
}

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

global.chai = chai;
global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
