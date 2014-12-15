'use strict';

function performCollectionRESTOperation(collection, method, ...args) {
  let response = collection[method](...args);

  if (response === null) {
    return null;
  }
  else if (response instanceof Promise) {
    return response;
  }
  else {
    throw new Error(`${method} method of ${collection.constructor.name} collection must return a Promise (or null to indicate that the operation is not supported).`);
  }
}

export default performCollectionRESTOperation;
