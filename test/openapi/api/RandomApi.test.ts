import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import '../../helpers/custom-expect-matchers/toBePlacesData';
import '../../helpers/custom-expect-matchers/toBePostcodeData';
import nock from 'nock'

import { RandomApi } from '../../../src/openapi'
import { fail } from 'assert';

describe('RandomApi', () => {
  let basePath: string
  let randomApi: RandomApi

  beforeEach(() => {
    basePath = 'https://api.postcodes.io'
    randomApi = new RandomApi()
  })

  afterEach(() => {
    nock.abortPendingRequests()
    nock.cleanAll()
  })

  it('should use different API hostname when specified', async () => {
    // given
    basePath = 'http://plop.plop'
    randomApi = new RandomApi({ basePath })
    const scope = nock(basePath)
      .get('/random/postcodes')
      .reply(200, {
        status: 200,
        result: {
          "postcode": "BD6 1DB Plop",
          "quality": 1,
          "eastings": 415881,
          "northings": 429882,
          "country": "England",
          "nhs_ha": "Yorkshire and the Humber",
          "longitude": -1.760567,
          "latitude": 53.765049,
          "european_electoral_region": "Yorkshire and The Humber",
          "primary_care_trust": "Bradford and Airedale Teaching",
          "region": "Yorkshire and The Humber",
          "lsoa": "Bradford 060A",
          "msoa": "Bradford 060",
          "incode": "1DB",
          "outcode": "BD6",
          "parliamentary_constituency": "Bradford South",
          "admin_district": "Bradford",
          "parish": "Bradford, unparished area",
          "admin_county": null,
          "date_of_introduction": "198001",
          "admin_ward": "Wibsey",
          "ced": null,
          "ccg": "NHS West Yorkshire",
          "nuts": "Bradford",
          "pfa": "West Yorkshire",
          "codes": {
              "admin_district": "E08000032",
              "admin_county": "E99999999",
              "admin_ward": "E05001367",
              "parish": "E43000274",
              "parliamentary_constituency": "E14000588",
              "ccg": "E38000232",
              "ccg_id": "36J",
              "ced": "E99999999",
              "nuts": "TLE41",
              "lsoa": "E01010746",
              "msoa": "E02002242",
              "lau2": "E08000032",
              "pfa": "E23000010"
          }
        }
      })

    // when
    const response = randomApi.randomPostcode(undefined)

    // then
    try {
      const resolved = await response
      expect(scope.isDone()).toBeTruthy()
      expect(resolved).toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePostcodeData(),
        },
      })
      expect(resolved).toHaveProperty('body.result.postcode', 'BD6 1DB Plop')
    } catch (error) {
      fail('response promise rejected when it should resolve')
    }
  })

  describe('randomPostcode', () => {
    it('should return PostcodeData', async () => {
      // given
      const scope = nock(basePath)
        .get('/random/postcodes')
        .reply(200, {
          status: 200,
          result: {
            "postcode": "BD6 1DB",
            "quality": 1,
            "eastings": 415881,
            "northings": 429882,
            "country": "England",
            "nhs_ha": "Yorkshire and the Humber",
            "longitude": -1.760567,
            "latitude": 53.765049,
            "european_electoral_region": "Yorkshire and The Humber",
            "primary_care_trust": "Bradford and Airedale Teaching",
            "region": "Yorkshire and The Humber",
            "lsoa": "Bradford 060A",
            "msoa": "Bradford 060",
            "incode": "1DB",
            "outcode": "BD6",
            "parliamentary_constituency": "Bradford South",
            "admin_district": "Bradford",
            "parish": "Bradford, unparished area",
            "admin_county": null,
            "date_of_introduction": "198001",
            "admin_ward": "Wibsey",
            "ced": null,
            "ccg": "NHS West Yorkshire",
            "nuts": "Bradford",
            "pfa": "West Yorkshire",
            "codes": {
                "admin_district": "E08000032",
                "admin_county": "E99999999",
                "admin_ward": "E05001367",
                "parish": "E43000274",
                "parliamentary_constituency": "E14000588",
                "ccg": "E38000232",
                "ccg_id": "36J",
                "ced": "E99999999",
                "nuts": "TLE41",
                "lsoa": "E01010746",
                "msoa": "E02002242",
                "lau2": "E08000032",
                "pfa": "E23000010"
            }
          }
        })

      // when
      const response = randomApi.randomPostcode(undefined)

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePostcodeData(),
        },
      })
      expect(scope.isDone()).toBeTruthy()
    })

    it('should return PostcodeData for outcode', async () => {
      // given
      const outcode = 'NR7'
      const scope = nock(basePath)
        .get(`/random/postcodes?outcode=${outcode}`)
        .reply(200, {
          status: 200,
          result: {
            "postcode": "NR7 0DT",
            "quality": 1,
            "eastings": 626103,
            "northings": 309334,
            "country": "England",
            "nhs_ha": "East of England",
            "longitude": 1.33995,
            "latitude": 52.634622,
            "european_electoral_region": "Eastern",
            "primary_care_trust": "Norfolk",
            "region": "East of England",
            "lsoa": "Broadland 015D",
            "msoa": "Broadland 015",
            "incode": "0DT",
            "outcode": "NR7",
            "parliamentary_constituency": "Norwich North",
            "admin_district": "Broadland",
            "parish": "Thorpe St. Andrew",
            "admin_county": "Norfolk",
            "date_of_introduction": "198001",
            "admin_ward": "Thorpe St. Andrew North West",
            "ced": "Woodside",
            "ccg": "NHS Norfolk and Waveney",
            "nuts": "Norwich and East Norfolk",
            "pfa": "Norfolk",
            "codes": {
                "admin_district": "E07000144",
                "admin_county": "E10000020",
                "admin_ward": "E05005781",
                "parish": "E04006256",
                "parliamentary_constituency": "E14000863",
                "ccg": "E38000239",
                "ccg_id": "26A",
                "ced": "E58001035",
                "nuts": "TLH15",
                "lsoa": "E01026572",
                "msoa": "E02005534",
                "lau2": "E07000144",
                "pfa": "E23000024"
            }
          }
      })

      // when
      const response = randomApi.randomPostcode(outcode)

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePostcodeData(),
        },
      })
      expect(scope.isDone()).toBeTruthy()
    })
  })

  describe('randomPlace', () => {
    it('should return PlacesData', async () => {
      // given
      const scope = nock(basePath)
      .get('/random/places')
        .reply(200, {
          "status": 200,
          "result": {
            "code": "osgb4000000074569912",
            "name_1": "Bracadale",
            "name_1_lang": null,
            "name_2": null,
            "name_2_lang": null,
            "local_type": "Hamlet",
            "outcode": "IV56",
            "county_unitary": "Highland",
            "county_unitary_type": "UnitaryAuthority",
            "district_borough": null,
            "district_borough_type": null,
            "region": "Scotland",
            "country": "Scotland",
            "longitude": -6.40485169252266,
            "latitude": 57.3613536744277,
            "eastings": 135214,
            "northings": 838678,
            "min_eastings": 135007,
            "min_northings": 838422,
            "max_eastings": 135540,
            "max_northings": 838922
          }
        })

      // when
      const response = randomApi.randomPlace()

      // then
      await expect(response).resolves.toEqual({
        status: 200,
        contentType: 'application/json',
        body: {
          status: 200,
          result: expect.toBePlacesData()
        },
      })
      expect(scope.isDone()).toBeTruthy()
    })
  })
})
