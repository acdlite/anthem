'use strict';

import { expect } from 'chai';
import { default as Anthem, Collection } from '../Anthem.js';

describe('Anthem', () => {

  let anthem, foos, bars;

  beforeEach(() => {
    anthem = new Anthem();

    class Foo extends Collection {}
    class Bar {}

    foos = new Foo();
    bars = new Bar();
  });

  describe('#addCollection', () => {
    it('requires collection to inherit from base Collection', () => {
      expect(anthem.addCollection.bind(anthem, 'bars', bars)).to.throw(
        'Collection must inherit from base Collection class.'
      );
      expect(anthem.addCollection.bind(anthem, 'foos', foos)).not.to.throw();
    });
  });

  describe('#collection', () => {
    it('returns registered collection by name', () => {
      anthem.addCollection('foos', foos);
      expect(anthem.collection('foos')).to.equal(foos);
    });
  });

  describe('#getOne', () => {
    testRESTOperation('getOne');

    it('throws if response is not an object', function *() {
      class Baz extends Collection {
        getOne() {
          return Promise.resolve([]);
        }
      }

      anthem.addCollection('bazzes', new Baz());

      let error;
      try { yield anthem.getOne('bazzes'); } catch (e) { error = e; }

      expect(error.message).to.equal('Non-object returned from getOne()');
    });
  });

  describe('#get', () => {
    testRESTOperation('get');
  });

  //
  // describe('#post', () => {
  //   testRESTOperation('post');
  // });
  //
  // describe('#put', () => {
  //   testRESTOperation('put');
  // });
  //
  // describe('#delete', () => {
  //   testRESTOperation('delete');
  // });


  function testRESTOperation(operation) {
    it('returns null if collection returns null', () => {
      anthem.addCollection('foos', foos);
      expect(anthem[operation]('foos')).to.equal(null);
    });
  }
});
