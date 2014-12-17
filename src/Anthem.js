'use strict';

import Collection from './Collection';
import performCollectionRESTOperation from './performCollectionRESTOperation';
import * as co from 'co';
import * as isObject from '101/is-object';
import * as isString from '101/is-string';

let { isArray } = Array;

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

  getOne(collectionName, id, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return co(function *() {
      let response = yield performCollectionRESTOperation(collection, 'getOne', id, ...args);

      if (response === null) {
        return null;
      }
      else if (!isObject(response)) {
        throw new Error(`Non-object returned from getOne method of ${collection.constructor.name}`);
      }

      return formatCollection(collectionName, [response]);
    });
  }

  get(collectionName, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return co(function *() {
      let response = yield performCollectionRESTOperation(collection, 'get', ...args);

      if (response === null) {
        return null;
      }
      else if (!isArray(response)) {
        throw new Error(`Non-array returned from get method of ${collection.constructor.name}`);
      }

      return formatCollection(collectionName, response);
    });
  }

  post(collectionName, resource, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return co(function *() {
      let response = yield performCollectionRESTOperation(collection, 'post', resource, ...args);

      if (response === null) {
        return null;
      }
      else if (!isObject(response)) {
        throw new Error(`Non-object returned from post method of ${collection.constructor.name}`);
      }

      return formatCollection(collectionName, [response]);
    });
  }
}

function formatCollection(collectionName, resources) {
  return {
    [collectionName]: resources,
  };
}

export default Anthem;
export { Collection };
