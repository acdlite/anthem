'use strict';

import { expect } from 'chai';

describe('performCollectionRESTOperation', () => {
  import performCollectionRESTOperation from '../performCollectionRESTOperation.js';

  it('returns result of operation', function *() {
    let c = {
      foo(a, b) {
        return Promise.resolve(a + b);
      },
    };

    expect(yield performCollectionRESTOperation(c, 'foo', 'bar', 'baz')).to.equal('barbaz');
  });

  it('throws if result is neither a Promise nor null', () => {
    let c = {
      foo() {
        return 'foobar';
      },

      bar() {
        return true;
      }
    };

    expect(performCollectionRESTOperation.bind(null, c, 'foo')).to.throw(
      'foo method of Object collection must return a Promise (or null to indicate that the operation is not supported).'
    );
    expect(performCollectionRESTOperation.bind(null, c, 'bar')).to.throw(
      'bar method of Object collection must return a Promise (or null to indicate that the operation is not supported).'
    );
  });
});
