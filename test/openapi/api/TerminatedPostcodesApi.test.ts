import { describe, expect, it } from '@jest/globals'
import { TerminatedPostcodesApi } from '../../../src/openapi'

describe('TerminatedPostcodesApi', () => {
  const terminatedPostcodesApi = new TerminatedPostcodesApi()

  describe('terminatedPostcodeLookup', () => {
    it('should return TerminatedPostcodeData for terminated postcode', async () => {
      // given
      const postcode = 'E1W 1UU'

      // when
      const response = await terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

      // then
      expect(response).toEqual(
        {
          "status": 200,
          "result": {
            "postcode": "E1W 1UU",
            "year_terminated": 2015,
            "month_terminated": 2,
            "longitude": -0.073732,
            "latitude": 51.508007
          }
        }
      )
    })

    it('should return 404 error for live postcode', async () => {
      // given
      const postcode = 'W1A 1AA'

      // when
      const response = await terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

      // then
      expect(response).toEqual({
        status: 404,
        error: 'Terminated postcode not found',
      })
    })

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop'

      // when
      const response = await terminatedPostcodesApi.terminatedPostcodeLookup(postcode)

      // then
      expect(response).toEqual({
        status: 404,
        error: 'Invalid postcode',
      })
    })
  })
})
