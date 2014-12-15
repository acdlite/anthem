'use strict';

class Collection {

  /**
   * Formats a resource for the consumer. Defaults to returning the
   * resource as-is.
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
