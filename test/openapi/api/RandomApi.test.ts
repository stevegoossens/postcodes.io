import { describe, expect, it } from '@jest/globals'
import '../../helpers/custom-expect-matchers/toBePlacesData';
import '../../helpers/custom-expect-matchers/toBePostcodeData';

import { RandomApi } from '../../../src/openapi'

describe('RandomApi', () => {
  const randomApi = new RandomApi()

  describe('randomPostcode', () => {
    it('should return PostcodeData', async () => {
      // given

      // when
      const response = await randomApi.randomPostcode(undefined)

      // then
      expect(response).toEqual({
        status: 200,
        contentType: 'application/json',
        body: {          
          status: 200,
          result: expect.toBePostcodeData(),
        },
      })
    })

    it('should return PostcodeData for outcode', async () => {
      // given
      const outcode = 'W1A'

      // when
      const response = await randomApi.randomPostcode(outcode)

      // then
      expect(response).toEqual({
        status: 200,
        contentType: 'application/json',
        body: {          
          status: 200,
          result: expect.toBePostcodeData(),
        },
      })
    })
  })

  describe('randomPlace', () => {
    it('should return PlacesData', async () => {
      // given
  
      // when
      const response = await randomApi.randomPlace()
  
      // then
      expect(response).toEqual({
        status: 200,
        contentType: 'application/json',
        body: {          
          status: 200,
          result: expect.toBePlacesData()
        },
      })
    })
  })
})
