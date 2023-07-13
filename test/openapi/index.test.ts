// eslint-disable-next-line node/no-unpublished-import
import {describe, expect, it} from '@jest/globals';

import {RequiredError} from '../../src/openapi';

describe('openapi index', () => {
  it('should export RequiredError', () => {
    // given
    const message = 'Plop';

    // when
    const error = new RequiredError(message);

    // then
    expect(error).toBeInstanceOf(RequiredError);
  });
});
