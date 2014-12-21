'use strict';

import * as isObject from '101/is-object';

function performCollectionRESTOperation(collection, method, ...args) {
  let response;

  if (typeof collection[method] !== 'function') {
    return Promise.resolve(null);
  }

  response = collection[method](...args);

  if (!(response instanceof Promise)) {
    return Promise.reject(
      `${method} method of ${collection.constructor.name} collection must return a Promise.`
    );
  }

  return response;
}

export default performCollectionRESTOperation;
