'use strict';

import performCollectionRESTOperation from './performCollectionRESTOperation';
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

  getById(collectionName, id, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return performCollectionRESTOperation(collection, 'getById', id, ...args)
      .then(response => {
        if (response == null) {
          return null
        }

        if (!isObject(response)) {
          throw new Error(`Non-object returned from getById method of ${collection.constructor.name}`);
        }

        return formatCollection(collectionName, [response]);
      });
  }

  get(collectionName, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return performCollectionRESTOperation(collection, 'get', ...args)
      .then(response => {
        if (response === null) {
          return null;
        }

        if (!isArray(response)) {
          throw new Error(`Non-array returned from get method of ${collection.constructor.name}`);
        }

        return formatCollection(collectionName, response);
      });
  }

  post(collectionName, resource, ...args) {
    let collection = this.getCollectionOrThrow(collectionName);

    return performCollectionRESTOperation(collection, 'post', resource, ...args)
      .then(response => {
        if (response === null) {
          return null;
        }

        if (!isObject(response)) {
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
