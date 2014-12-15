'use strict';

import Collection from './Collection';
import performCollectionRESTOperation from './performCollectionRESTOperation';
import * as co from 'co';
import * as isObject from '101/is-object';
import * as isString from '101/is-string';

class Anthem {
  constructor() {
    this.collections = new Map();
  }

  /**
   * Registers a collection using its name property.
   * @param {Collection} collection
   */
  addCollection(collection) {
    if (!(collection instanceof Collection)) {
      throw new Error('Collection must inherit from base Collection class.');
    }

    let name = collection.name;

    if (!isString(name)) {
      throw new Error('Collection must have name property of type String.');
    }

    this.collections.set(name, collection);
  }

  /**
   * Get a previously registered collection by name
   * @param {string} name - name of collection
   * @returns {Collection} collection
   */
  collection(name) {
    return this.collections.get(name);
  }

  getCollectionOrThrow(name) {
    let collection = this.collection(name);

    if (!collection) throw new Error(
      `No registered collection with name ${name} exists.`
    );

    return collection;
  }

  getOne(collectionName, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return co(function *() {
      let response = yield performCollectionRESTOperation(collection, 'getOne', ...args);

      if (response === null) {
        return null;
      }
      else {
        if (!isObject(response)) {
          throw new Error(`Non-object returned from getOne method of ${collection.constructor.name}`);
        }
      }

      response = collection.formatOne(response);

      if (!isObject(response)) {
        throw new Error('Non-object returned from formatOne()');
      }

      return response;
    });
  }

  // get(collectionName, ...args) {
  //   let collection = this.getCollectionOrThrow(collectionName);
  //
  //   return co(function *() {
  //     let response = yield performCollectionRESTOperation(collection, 'getOne', ...args);
  //
  //     if (response === null) {
  //       return null;
  //     }
  //
  //     response = collection.formatOne(response);
  //
  //     if (!isObject(response)) {
  //       throw new Error('Non-object returned from format()');
  //     }
  //
  //     return response;
  //   });
  // }

  // get(collectionName, ...args) {
  //   let collection = this.getCollectionOrThrow(collectionName);
  //
  //   return co(function *() {
  //     let response = yield performCollectionRESTOperation(collection, 'get', ...args);
  //
  //     if (response === null) {
  //       return null;
  //     }
  //
  //     return response;
  //   })
  // }
}

export default Anthem;
export { Collection };
