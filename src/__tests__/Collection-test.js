'use strict';

import { expect } from 'chai';

describe('Collection', () => {

  import Collection from '../Collection.js';

  let resources;

  beforeEach(() => {
    resources = new Collection();
  });

  it('returns false for REST operation methods', () => {
    expect(resources.getOne()).to.be.false;
    expect(resources.get()).to.be.false;
    expect(resources.post()).to.be.false;
    expect(resources.put()).to.be.false;
    expect(resources.delete()).to.be.false;
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
