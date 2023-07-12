// eslint-disable-next-line node/no-unpublished-import
import {describe, expect, it} from '@jest/globals';
import {ApiError} from '../src/errors';

describe('ApiError', () => {
  it('should instantiate without parameters', () => {
    // given

    // when
    const apiError = new ApiError();

    // then
    expect(apiError).toHaveProperty('message', 'API Error');
  });

  it('should instantiate with specific message', () => {
    // given
    const message = 'specific';

    // when
    const apiError = new ApiError(message);

    // then
    expect(apiError).toHaveProperty('message', message);
  });

  it('should instantiate with optional cause', () => {
    // given
    const message = 'specific';
    const cause = new Error('plop');

    // when
    const apiError = new ApiError(message, {cause});

    // then
    expect(apiError).toHaveProperty('message', message);
    expect(apiError).toHaveProperty('cause', cause);
  });
});
