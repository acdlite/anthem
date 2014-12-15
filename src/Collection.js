'use strict';

class Collection {

  /**
   * REST operation methods
   *
   * These return false by default to indicate to the consumer that the
   * collection does not support the operation.
   */
  getOne() {
    return false;
  }

  get() {
    return false;
  }

  post() {
    return false;
  }

  put() {
    return false;
  }

  delete() {
    return false;
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
