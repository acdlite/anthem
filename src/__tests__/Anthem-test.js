'use strict';

import Anthem from '../Anthem.js';

describe('Anthem', () => {

  let anthem, foos, bars;

  beforeEach(() => {
    anthem = new Anthem();

    class Foos {
      get name() { return 'foos'; }
    }
    class Bars {
      get name() { return 'bars'; }
    }

    foos = new Foos();
    bars = new Bars();
  });

  describe('#addCollection', () => {
    it('requires collection to have name property of type String', () => {
      class NoNames {}
      class NumberNames {
        get name() { return 42; }
      }

      let noNames = new NoNames();
      let numberNames = new NumberNames();

      expect(anthem.addCollection.bind(anthem, noNames))
        .to.throw('Collection must have name property of type String.');
      expect(anthem.addCollection.bind(anthem, numberNames))
        .to.throw('Collection must have name property of type String.');
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

    it('rejects if response from collection is not an object', done => {
      class Bazzes {
        get name() { return 'bazzes'; }

        getById() {
          return Promise.resolve([]);
        }
      }

      anthem.addCollection(new Bazzes());

      expect(anthem.getById('bazzes'))
        .to.be.rejectedWith(`Non-object returned from getById method of Bazzes`)
        .notify(done);
    });

    it('formats response as object with single key', done => {
      class Bazzes {
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

      expect(anthem.getById('bazzes'))
        .to.eventually.deep.equal({
          bazzes: [
            {
              foo: 'bar',
            }
          ],
        })
        .notify(done);
    });
  });

  describe('#get', () => {
    testRESTOperation('get');

    it('rejects if response from collection is not an array', done => {
      class Bazzes {
        get name() { return 'bazzes'; }

        get() {
          return Promise.resolve({});
        }
      }

      anthem.addCollection(new Bazzes());

      expect(anthem.get('bazzes'))
        .to.be.rejectedWith('Non-array returned from get method of Bazzes')
        .notify(done);
    });

    it('formats response as object with single key', done => {
      class Bazzes {
        get name() {
          return 'bazzes';
        }

        get() {
          return Promise.resolve([1, 2, 3]);
        }
      }

      anthem.addCollection(new Bazzes());

      expect(anthem.get('bazzes')).to.eventually.deep.equal({
        bazzes: [1, 2, 3],
      }).notify(done);
    });
  });

  describe('#post', () => {
    testRESTOperation('post');

    it('throws if response from collection is not an object', done => {
      class Bazzes {
        get name() { return 'bazzes'; }

        post() {
          return Promise.resolve([]);
        }
      }

      anthem.addCollection(new Bazzes());

      expect(anthem.post('bazzes'))
        .to.be.rejectedWith('Non-object returned from post method of Bazzes')
        .notify(done);
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
      expect(anthem[operation].bind(anthem, 'foos'))
        .to.throw('No registered collection with name foos exists.');
    });

    it('resolves to null if operation is not supported', done => {
      class Bazzes {
        get name() { return 'bazzes'; }
      }

      anthem.addCollection(new Bazzes());
      expect(anthem[operation]('bazzes')).to.eventually.be.null.notify(done);
    });
  }
});
