'use strict';

import { expect } from 'chai';
import { default as Anthem, Collection } from '../Anthem.js';
import { stub } from 'sinon';

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

  describe('#getOne', () => {
    testRESTOperation('getOne');

    it('calls collection\'s formatOne method', function *() {
      class Bazzes extends Collection {
        get name() {
          return 'bazzes';
        }

        getOne() {
          return Promise.resolve({});
        }
      }

      let formatOne = stub().returns({});
      Bazzes.prototype.formatOne = formatOne;

      anthem.addCollection(new Bazzes());
      yield anthem.getOne('bazzes');

      expect(formatOne.calledOnce).to.be.true;
    });

    it('throws if collection\'s formatOne method does not return an object', function *() {
      class Bazzes extends Collection {
        get name() {
          return 'bazzes';
        }

        getOne() {
          return Promise.resolve({});
        }

        formatOne() {
          return [];
        }
      }

      anthem.addCollection(new Bazzes());

      let error;
      try { yield anthem.getOne('bazzes') } catch (e) { error = e; }

      expect(error.message).to.equal('Non-object returned from formatOne()');
    })
  });

  // describe('#get', () => {
  //   testRESTOperation('get');
  // });

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
    it('throws if there is no matching collection', () =>{
      expect(anthem[operation].bind(anthem, 'foos')).to.throw(
        'No registered collection with name foos exists.'
      );
    });

    it('throws if response is not an object', function *() {
      class Bazzes extends Collection {
        get name() { return 'bazzes'; }
      }

      Bazzes.prototype[operation] = () => Promise.resolve([]);

      anthem.addCollection(new Bazzes());

      let error;
      try { yield anthem[operation]('bazzes'); } catch (e) { error = e; }

      expect(error.message).to.equal(`Non-object returned from ${operation} method of Bazzes`);
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
