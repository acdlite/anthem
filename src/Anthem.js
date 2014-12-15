'use strict';

import Collection from './Collection';
import performCollectionRESTOperation from './performCollectionRESTOperation';
import * as isObject from '101/is-object';

class Anthem {
  constructor() {
    this.collections = new Map();
  }

  /**
   * Registers a collection
   * @param {string} name - name of collection
   * @param {Collection} collection
   */
  addCollection(name, collection) {
    if (!(collection instanceof Collection)) {
      throw new Error('Collection must inherit from base Collection class.');
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

  getOne(collectionName, ...args) {
    let collection = this.collection(collectionName);
    let response = performCollectionRESTOperation(collection, 'getOne', ...args);

    if (!response) return null;

    return new Promise((resolve, reject) => {
      response.then(result => {
        if (!isObject(result)) {
          reject(new Error('Non-object returned from getOne()'));
        }
        else {
          resolve(result);
        }
      });
    });
  }

  get(collectionName, ...args) {
    let collection = this.collection(collectionName);
    let response = performCollectionRESTOperation(collection, 'getOne', ...args);

    if (!response) return null;

    return new Promise((resolve, reject) => {
      response.then(result => {
        if (!Array.isArray(result)) {
          reject(new Error('Non-array returned from get()'));
        }
        else {
          resolve(result);
        }
      });
    });
  }
}

export default Anthem;
export { Collection };
