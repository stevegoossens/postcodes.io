// eslint-disable-next-line node/no-unpublished-import
import {afterEach, beforeEach, describe, expect, it} from '@jest/globals';
// eslint-disable-next-line node/no-unpublished-import
import nock from 'nock';

import {ScotlandApi} from '../../../src/openapi';

describe('ScotlandApi', () => {
  let basePath: string;
  let scotlandApi: ScotlandApi;

  beforeEach(() => {
    basePath = 'https://api.postcodes.io';
    scotlandApi = new ScotlandApi();
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });

  it('should use different API hostname when specified', async () => {
    // given
    basePath = 'http://plop.plop';
    scotlandApi = new ScotlandApi({basePath});
    const postcode = 'EH22 3NX';
    const scope = nock(basePath)
      .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
      .reply(200, {
        status: 200,
        result: {
          postcode: 'EH22 3NX',
          scottish_parliamentary_constituency: 'Plop',
          codes: {
            scottish_parliamentary_constituency: 'Plop123',
          },
        },
      });

    // when
    const response = scotlandApi.scottishPostcodeLookup(postcode);

    // then
    await expect(response).resolves.toEqual({
      status: 200,
      contentType: 'application/json',
      body: {
        status: 200,
        result: {
          postcode: 'EH22 3NX',
          scottish_parliamentary_constituency: 'Plop',
          codes: {
            scottish_parliamentary_constituency: 'Plop123',
          },
        },
      },
    });
    expect(scope.isDone()).toBeTruthy();
  });

  describe('scottishPostcodeLookup', () => {
    it('should return ScottishPostcodeData for Scottish postcode', async () => {
      // given
      const postcode = 'EH22 3NX';
      const scope = nock(basePath)
        .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
        .reply(200, {
          status: 200,
          result: {
            postcode: 'EH22 3NX',
            scottish_parliamentary_constituency:
              'Midlothian North and Musselburgh',
            codes: {
              scottish_parliamentary_constituency: 'S16000130',
            },
          },
        });

      // when
      const response = scotlandApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: {
            postcode: 'EH22 3NX',
            scottish_parliamentary_constituency:
              'Midlothian North and Musselburgh',
            codes: {
              scottish_parliamentary_constituency: 'S16000130',
            },
          },
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for non-Scottish postcode', async () => {
      // given
      const postcode = 'W1A 1AA';
      const scope = nock(basePath)
        .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Postcode exists in ONSPD but not in SPD',
        });

      // when
      const response = scotlandApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Postcode exists in ONSPD but not in SPD',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop';
      const scope = nock(basePath)
        .get(`/scotland/postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Invalid postcode',
        });

      // when
      const response = scotlandApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Invalid postcode',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = '';
      const scope = nock(basePath).get('/scotland/postcodes/').reply(404, {
        status: 404,
        error: 'Resource not found',
      });

      // when
      const response = scotlandApi.scottishPostcodeLookup(postcode);

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Resource not found',
        },
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });
});
