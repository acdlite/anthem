'use strict';

import { expect } from 'chai';

describe('Collection', () => {

  import Collection from '../Collection.js';

  let resources;

  beforeEach(() => {
    resources = new Collection();
  });

  it('REST operation methods are undefined on base class', () => {
    expect(resources.getById).to.be.undefined;
    expect(resources.get).to.be.undefined;
    expect(resources.post).to.be.undefined;
    expect(resources.put).to.be.undefined;
    expect(resources.delete).to.be.undefined;
  });

});
