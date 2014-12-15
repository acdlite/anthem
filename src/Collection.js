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
   * @param {resource} Resource object
   * @returns Formatted resource
   */
  formatOne(resource) {
    return resource;
  }

  /**
   * Formats a collection for the consumer. Defaults to performing `.formatOne`
   * on each resource in the collection.
   * @param {collection} Collection of resource objects
   * @returns Formatted collection
   */
  format(collection) {
    return collection.map(this.formatOne);
  }

}

export default Collection;
