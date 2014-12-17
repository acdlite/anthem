'use strict';

import { expect } from 'chai';

describe('performCollectionRESTOperation', () => {
  import performCollectionRESTOperation from '../performCollectionRESTOperation.js';

  it('returns promise for result of operation', function *() {
    let c = {
      foo(a, b) {
        return Promise.resolve({ result: a + b });
      },
    };

    expect(yield performCollectionRESTOperation(c, 'foo', 'bar', 'baz')).to.deep.equal({ result: 'barbaz' });
  });

  it('throws if result is not a promise', () => {
    let c = {
      foo() {
        return 'foobar';
      },
    };

    expect(performCollectionRESTOperation.bind(null, c, 'foo')).to.throw(
      'foo method of Object collection must return a Promise.'
    );
  });

  it('returns promise for null if operation is not supported', function *() {
    expect(yield performCollectionRESTOperation({}, 'get')).to.be.null;
  });

  it('throws if promise from operation resolves to non-object', function *() {
    let c = {
      foo() {
        return 'bar';
      }
    };

    let error;
    try { yield performCollectionRESTOperation(c, 'foo'); } catch (e) { error = e; }

    expect(error.message).to.equal('foo method of Object collection must return a Promise.');
  });
});
