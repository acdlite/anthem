'use strict';

import { expect } from 'chai';
import { default as Anthem, Collection } from '../Anthem.js';

describe('Anthem', () => {

  let anthem, foos, bars;

  beforeEach(() => {
    anthem = new Anthem();

    class Foos extends Collection {
      get name() { return 'foos'; }
    }
    class Bars {
      get name() { return 'bars'; }
    }

    foos = new Foos();
    bars = new Bars();
  });

  describe('#addCollection', () => {
    it('requires collection to inherit from base Collection', () => {
      expect(anthem.addCollection.bind(anthem, bars)).to.throw(
        'Collection must inherit from base Collection class.'
      );
      expect(anthem.addCollection.bind(anthem, foos)).not.to.throw();
    });

    it('requires collection to have name property of type String', () => {
      class NoNames extends Collection {}
      class NumberNames extends Collection {
        get name() { return 42; }
      }

      let noNames = new NoNames();
      let numberNames = new NumberNames();

      expect(anthem.addCollection.bind(anthem, noNames)).to.throw(
        'Collection must have name property of type String.'
      );
      expect(anthem.addCollection.bind(anthem, numberNames)).to.throw(
        'Collection must have name property of type String.'
      );
    });
  });

  describe('#collection', () => {
    it('returns registered collection by name', () => {
      anthem.addCollection(foos);
      expect(anthem.collection('foos')).to.equal(foos);
    });

    it('returns undefined if collection does not exist', () => {
      expect(anthem.collection('bars')).to.be.undefined;
    });
  });

  describe('#getById', () => {
    testRESTOperation('getById');

    it('throws if response from collection is not an object', function *() {
      class Bazzes extends Collection {
        get name() { return 'bazzes'; }

        getById() {
          return Promise.resolve([]);
        }
      }

      anthem.addCollection(new Bazzes());

      let error;
      try { yield anthem.getById('bazzes'); } catch (e) { error = e; }

      expect(error.message).to.equal(`Non-object returned from getById method of Bazzes`);
    });

    it('formats response as object with single key', function *() {
      class Bazzes extends Collection {
        get name() {
          return 'bazzes';
        }

        getById() {
          return Promise.resolve({
            foo: 'bar',
          });
        }
      }

      anthem.addCollection(new Bazzes());

      expect(yield anthem.getById('bazzes')).to.deep.equal({
        bazzes: [
          {
            foo: 'bar',
          }
        ],
      });
    });
  });

  describe('#get', () => {
    testRESTOperation('get');

    it('throws if response from collection is not an array', function *() {
      class Bazzes extends Collection {
        get name() { return 'bazzes'; }

        get() {
          return Promise.resolve({});
        }
      }

      anthem.addCollection(new Bazzes());

      let error;
      try { yield anthem.get('bazzes'); } catch (e) { error = e; }

      expect(error.message).to.equal(
        'Non-array returned from get method of Bazzes'
      );
    });

    it('formats response as object with single key', function *() {
      class Bazzes extends Collection {
        get name() {
          return 'bazzes';
        }

        get() {
          return Promise.resolve([1, 2, 3]);
        }
      }

      anthem.addCollection(new Bazzes());

      expect(yield anthem.get('bazzes')).to.deep.equal({
        bazzes: [1, 2, 3],
      });
    });
  });

  describe('#post', () => {
    testRESTOperation('post');

    it('throws if response from collection is not an object', function *() {
      class Bazzes extends Collection {
        get name() { return 'bazzes'; }

        post() {
          return Promise.resolve([]);
        }
      }

      anthem.addCollection(new Bazzes());

      let error;
      try { yield anthem.post('bazzes'); } catch (e) { error = e; }

      expect(error.message).to.equal(`Non-object returned from post method of Bazzes`);
    });
  });
  //
  // describe('#put', () => {
  //   testRESTOperation('put');
  // });
  //
  // describe('#delete', () => {
  //   testRESTOperation('delete');
  // });

  function testRESTOperation(operation) {
    it('throws if there is no matching collection', () => {
      expect(anthem[operation].bind(anthem, 'foos')).to.throw(
        'No registered collection with name foos exists.'
      );
    });

    it('returns Promise for null if operation is not supported', function *() {
      class Bazzes extends Collection {
        get name() { return 'bazzes'; }
      }

      anthem.addCollection(new Bazzes());
      expect(yield anthem[operation]('bazzes')).to.be.null;
    });
  }
});
