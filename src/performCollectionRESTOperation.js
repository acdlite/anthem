'use strict';

import * as isObject from '101/is-object';

function performCollectionRESTOperation(collection, method, ...args) {
  let response;

  if (typeof collection[method] !== 'function') {
    return Promise.resolve(null);
  }

  response = collection[method](...args);

  if (!(response instanceof Promise)) {
    throw new Error(`${method} method of ${collection.constructor.name} collection must return a Promise.`);
  }

  return response;

  // return response.then(function(result) {
  //   if (!isObject(result)) {
  //     return Promise.reject(new Error(`Non-object returned from ${method}()`));
  //   }
  //
  //   return result;
  // });
}

export default performCollectionRESTOperation;
