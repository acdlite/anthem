'use strict';

describe('performCollectionRESTOperation', () => {
  import performCollectionRESTOperation from '../performCollectionRESTOperation.js';

  it('returns promise for result of operation',  done => {
    let c = {
      foo(a, b) {
        return Promise.resolve({ result: a + b });
      },
    };

    expect(performCollectionRESTOperation(c, 'foo', 'bar', 'baz'))
      .to.eventually.deep.equal({ result: 'barbaz' })
      .notify(done);
  });

  it('rejects if result is not a promise', done => {
    let c = {
      foo() {
        return 'foobar';
      },
    };

    expect(performCollectionRESTOperation(c, 'foo'))
      .to.be.rejectedWith('foo method of Object collection must return a Promise.')
      .notify(done);
  });

  it('resolves to null if operation is not supported', done => {
    expect(performCollectionRESTOperation({}, 'get'))
      .to.eventually.be.null
      .notify(done);
  });

  it('rejects if operation resolves to non-object', done => {
    let c = {
      foo() {
        return 'bar';
      }
    };

    expect(performCollectionRESTOperation(c, 'foo'))
      .to.be.rejectedWith('foo method of Object collection must return a Promise.')
      .notify(done);
  });
});
