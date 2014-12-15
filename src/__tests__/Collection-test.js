'use strict';

import { expect } from 'chai';
import { stub } from 'sinon';

describe('Collection', () => {

  import Collection from '../Collection.js';

  let resources;

  beforeEach(() => {
    resources = new Collection();
  });

  it('REST operation methods are undefined on base class', () => {
    expect(resources.getOne).to.be.undefined;
    expect(resources.get).to.be.undefined;
    expect(resources.post).to.be.undefined;
    expect(resources.put).to.be.undefined;
    expect(resources.delete).to.be.undefined;
  });

  describe('#formatOne', () => {
    it('returns object as-is', () => {
      let resource = { foo: 'bar' };
      expect(resources.formatOne(resource)).to.deep.equal({ foo: 'bar' });
    });
  });

  describe('#format', () => {
    it('applys #formatOne to each object in array', () => {
      class Foos extends Collection {}

      let formatOne = stub().returns({});
      Foos.prototype.formatOne = formatOne;

      let foos = new Foos();
      foos.format([{}, {}, {}]);

      expect(formatOne.callCount).to.equal(3);
    });
  });
});
