'use strict';

import { expect } from 'chai';

describe('Collection', () => {

  import Collection from '../Collection.js';

  let resources;

  beforeEach(() => {
    resources = new Collection();
  });

  it('returns null for REST operation methods', () => {
    expect(resources.getOne()).to.be.null;
    expect(resources.get()).to.be.null;
    expect(resources.post()).to.be.null;
    expect(resources.put()).to.be.null;
    expect(resources.delete()).to.be.null;
  });

  describe('#formatOne', () => {
    it('returns object as-is', () => {
      let resource = { foo: 'bar' };
      expect(resources.formatOne(resource)).to.deep.equal({ foo: 'bar' });
    });
  });

  describe('#format', () => {
    class Foo extends Collection {
      formatOne(resource) {
        return { bar: 'baz' };
      }
    }

    let foos = new Foo();
    let collection = [{ foo: 'bar' }];

    it('applys .formatOne to each object in array', () => {
      expect(foos.format(collection)).to.deep.equal([{ bar: 'baz' }]);
    });
  });
});
