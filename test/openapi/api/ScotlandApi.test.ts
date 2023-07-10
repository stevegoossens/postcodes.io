import { describe, expect, it } from '@jest/globals'
import { ScotlandApi } from '../../../src/openapi'

describe('ScotlandApi', () => {
  const scotlandApi = new ScotlandApi()

  describe('scottishPostcodeLookup', () => {
    it('should return ScottishPostcodeData for Scottish postcode', async () => {
      // given
      const postcode = 'EH22 3NX'

      // when
      const response = await scotlandApi.scottishPostcodeLookup(postcode)

      // then
      expect(response).toEqual(
        {
          status: 200,
          contentType: 'application/json',
          body: {            
            "status": 200,
            "result": {
              "postcode": "EH22 3NX",
              "scottish_parliamentary_constituency": "Midlothian North and Musselburgh",
              "codes": {
                "scottish_parliamentary_constituency": "S16000130"
              }
            }
          },
        }
      )
    })

    it('should return 404 error for non-Scottish postcode', async () => {
      // given
      const postcode = 'W1A 1AA'

      // when
      const response = await scotlandApi.scottishPostcodeLookup(postcode)

      // then
      expect(response).toEqual({
        status: 404,
        contentType: 'application/json',
        body: {          
          status: 404,
          error: 'Postcode exists in ONSPD but not in SPD',
        },
      })
    })

    it('should return 404 error for invalid postcode', async () => {
      // given
      const postcode = 'Plop'

      // when
      const response = await scotlandApi.scottishPostcodeLookup(postcode)

      // then
      expect(response).toEqual({
        status: 404,
        contentType: 'application/json',
        body: {          
          status: 404,
          error: 'Invalid postcode',
        },
      })
    })
  })
})
