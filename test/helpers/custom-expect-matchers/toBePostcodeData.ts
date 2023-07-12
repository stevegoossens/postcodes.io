// eslint-disable-next-line node/no-unpublished-import
import {expect} from '@jest/globals';
// eslint-disable-next-line node/no-unpublished-import, node/no-extraneous-import
import type {MatcherFunction} from 'expect';

import {Api} from '../../../src/openapi';

const toBePostcodeData: MatcherFunction = function (received) {
  let pass = false;

  if (
    typeof received === 'object' &&
    received !== null &&
    received !== undefined
  ) {
    pass =
      'admin_county' in received &&
      'admin_county' in received &&
      'admin_district' in received &&
      'admin_ward' in received &&
      'ccg' in received &&
      'ced' in received &&
      'codes' in received &&
      'admin_county' in (received.codes as Api.PostcodeData.Codes) &&
      'admin_district' in (received.codes as Api.PostcodeData.Codes) &&
      'admin_ward' in (received.codes as Api.PostcodeData.Codes) &&
      'ccg' in (received.codes as Api.PostcodeData.Codes) &&
      'ccg_id' in (received.codes as Api.PostcodeData.Codes) &&
      'ced' in (received.codes as Api.PostcodeData.Codes) &&
      'lau2' in (received.codes as Api.PostcodeData.Codes) &&
      'lsoa' in (received.codes as Api.PostcodeData.Codes) &&
      'msoa' in (received.codes as Api.PostcodeData.Codes) &&
      'nuts' in (received.codes as Api.PostcodeData.Codes) &&
      'parish' in (received.codes as Api.PostcodeData.Codes) &&
      'parliamentary_constituency' in
        (received.codes as Api.PostcodeData.Codes) &&
      'pfa' in (received.codes as Api.PostcodeData.Codes) &&
      'country' in received &&
      'date_of_introduction' in received &&
      'eastings' in received &&
      'european_electoral_region' in received &&
      'incode' in received &&
      'latitude' in received &&
      'longitude' in received &&
      'lsoa' in received &&
      'msoa' in received &&
      'nhs_ha' in received &&
      'northings' in received &&
      'nuts' in received &&
      'outcode' in received &&
      'parish' in received &&
      'parliamentary_constituency' in received &&
      'pfa' in received &&
      'postcode' in received &&
      'primary_care_trust' in received &&
      'quality' in received &&
      'region' in received;
  }

  if (pass) {
    return {
      message: () =>
        // `this` context will have correct typings
        `expected ${this.utils.printReceived(received)} to be PostcodeData`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${this.utils.printReceived(received)} to be PostcodeData`,
      pass: false,
    };
  }
};

expect.extend({
  toBePostcodeData,
});

declare module 'expect' {
  interface AsymmetricMatchers {
    toBePostcodeData(): void;
  }
  interface Matchers<R> {
    toBePostcodeData(): R;
  }
}
