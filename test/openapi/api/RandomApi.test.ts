import { describe, expect, it } from '@jest/globals'
import '../../helpers/custom-expect-matchers/toBePlacesData';
import '../../helpers/custom-expect-matchers/toBePostcodeData';

import { RandomApi, Api } from '../../../src/openapi'

describe('RandomApi', () => {
  const randomApi = new RandomApi()

  describe('randomPostcode', () => {
    it('should return PostcodeData', async () => {
      // given
      const outcode = undefined

      // when
      const response = await randomApi.randomPostcode(outcode)

      // then
      expect(response).toEqual({
        status: 200,
        result: expect.toBePostcodeData(),
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
        result: expect.toBePlacesData()
      })
      // expect(response).toEqual({
      //   status: 200,
      //   result: {
      //     code: expect.any(String),
      //     country: expect.any(String),
      //     county_unitary: expect.any(String),
      //     county_unitary_type: expect.any(String) || expect.any(null),
      //     district_borough: expect.any(String) || expect.any(null),
      //     district_borough_type: expect.any(String) || expect.any(null),
      //     eastings: expect.any(Number),
      //     latitude: expect.any(Number),
      //     local_type: expect.any(String),
      //     longitude: expect.any(Number),
      //     max_eastings: expect.any(Number),
      //     min_eastings: expect.any(Number),
      //     max_northings: expect.any(Number),
      //     min_northings: expect.any(Number),
      //     name_1: expect.any(String),
      //     name_1_lang: expect.any(String || null),
      //     name_2: expect.any(String) || expect.any(null),
      //     name_2_lang: expect.any(String) || expect.any(null),
      //     northings: expect.any(Number),
      //     outings: expect.any(String),
      //     region: expect.any(String),
      //   },
      // })
    })
  })
})
