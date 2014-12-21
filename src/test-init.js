'use strict';

if (typeof Promise === 'undefined') {
  import { Promise } from 'es6-promise'
  global.Promise = Promise;
}

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

global.chai = chai;
global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
