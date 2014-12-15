'use strict';

class Collection {

  /**
   * REST operation methods
   *
   * These return null by default to indicate to the consumer that the
   * collection does not support the operation.
   */
  getOne() {
    return null;
  }

  get() {
    return null;
  }

  post() {
    return null;
  }

  put() {
    return null;
  }

  delete() {
    return null;
  }

  /**
   * Formats a resource for the consumer. Defaults returning the resource as-is.
   * @param {Object} resource
   * @returns {Object} Formatted resource
   */
  formatOne(resource) {
    return resource;
  }

  /**
   * Formats an array of resources for the consumer. Defaults to performing `.formatOne`
   * on each resource in the collection.
   * @param {Array<Object>} Array of resources
   * @returns {Array<Object>} Formatted array
   */
  format(collection) {
    return collection.map(this.formatOne);
  }

}

export default Collection;
