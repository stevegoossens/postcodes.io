import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import nock from 'nock'

import { TerminatedPostcodesApi } from '../../../src/openapi'

describe('TerminatedPostcodesApi', () => {
  let basePath: string
  let terminatedPostcodesApi: TerminatedPostcodesApi

  beforeEach(() => {
    basePath = 'https://api.postcodes.io'
    terminatedPostcodesApi = new TerminatedPostcodesApi()
  })

  afterEach(() => {
    nock.abortPendingRequests()
    nock.cleanAll()
  })

  it('should use different API hostname when specified', async () => {
    // given
    basePath = 'http://plop.plop'
    terminatedPostcodesApi = new TerminatedPostcodesApi({ basePath })
    const postcode = 'E1W 1UU'
    const scope = nock(basePath)
      .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
      .reply(200, {
        "status": 200,
        "result": {
          "postcode": "E1W 1UU Plop",
          "year_terminated": 2015,
          "month_terminated": 2,
          "longitude": -0.073732,
          "latitude": 51.508007
        }
      })

    // when
    const response = terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

    // then
    await expect(response).resolves.toEqual(
      {
        status: 200,
        contentType: 'application/json',
        body: {
          "status": 200,
          "result": {
            "postcode": "E1W 1UU Plop",
            "year_terminated": 2015,
            "month_terminated": 2,
            "longitude": -0.073732,
            "latitude": 51.508007
          }
        },
      }
    )
    expect(scope.isDone()).toBeTruthy()
  })

  describe('terminatedPostcodeLookup', () => {
    it('should return TerminatedPostcodeData for terminated postcode', async () => {
      // given
      const postcode = 'E1W 1UU'
      const scope = nock(basePath)
        .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
        .reply(200, {
          "status": 200,
          "result": {
            "postcode": "E1W 1UU",
            "year_terminated": 2015,
            "month_terminated": 2,
            "longitude": -0.073732,
            "latitude": 51.508007
          }
        })

      // when
      const response = terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

      // then
      await expect(response).resolves.toEqual(
        {
          status: 200,
          contentType: 'application/json',
          body: {
            "status": 200,
            "result": {
              "postcode": "E1W 1UU",
              "year_terminated": 2015,
              "month_terminated": 2,
              "longitude": -0.073732,
              "latitude": 51.508007
            }
          },
        }
      )
      expect(scope.isDone()).toBeTruthy()
    })

    it('should return 404 error for live postcode', async () => {
      // given
      const postcode = 'W1A 1AA'
      const scope = nock(basePath)
        .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Terminated postcode not found',
        })

      // when
      const response = terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Terminated postcode not found',
        },
      })
      expect(scope.isDone()).toBeTruthy()
    })

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop'
      const scope = nock(basePath)
        .get(`/terminated_postcodes/${encodeURIComponent(postcode)}`)
        .reply(404, {
          status: 404,
          error: 'Invalid postcode',
        })

      // when
      const response = terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

      // then
      await expect(response).resolves.toEqual({
        status: 404,
        contentType: 'application/json',
        body: {
          status: 404,
          error: 'Invalid postcode',
        },
      })
      expect(scope.isDone()).toBeTruthy()
    })
  })
})
