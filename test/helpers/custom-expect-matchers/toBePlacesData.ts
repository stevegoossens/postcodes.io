import { expect } from '@jest/globals';
import type { MatcherFunction } from 'expect';

const toBePlacesData: MatcherFunction =
  function (received) {
    let pass = false

    if (typeof received === 'object' && received !== null && received !== undefined) {
      pass = 'code' in received &&
          'country' in received &&
          'county_unitary' in received &&
          'county_unitary_type' in received &&
          'district_borough' in received &&
          'district_borough_type' in received &&
          'eastings' in received &&
          'latitude' in received &&
          'local_type' in received &&
          'longitude' in received &&
          'max_eastings' in received &&
          'min_eastings' in received &&
          'max_northings' in received &&
          'name_1' in received &&
          'name_1_lang' in received &&
          'name_2' in received &&
          'name_2_lang' in received &&
          'northings' in received &&
          'outcode' in received &&
          'region' in received
    }

    if (pass) {
      return {
        message: () =>
          // `this` context will have correct typings
          `expected ${this.utils.printReceived(
            received,
          )} to be PlacesData`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received,
          )} to be PlacesData`,
        pass: false,
      };
    }
  };

expect.extend({
  toBePlacesData,
});

declare module 'expect' {
  interface AsymmetricMatchers {
    toBePlacesData(): void;
  }
  interface Matchers<R> {
    toBePlacesData(): R;
  }
}
