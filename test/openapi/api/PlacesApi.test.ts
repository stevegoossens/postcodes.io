import { describe, expect, it } from '@jest/globals'
import { PlacesApi } from '../../../src/openapi'

describe('PlacesApi', () => {
  const placesApi = new PlacesApi()

  describe('placeQuery', () => {
    it('should return list of PlacesData for matching query', async () => {
      // given
      const query = 'adl'

      // when
      const response = await placesApi.placeQuery({ query })

      // then
      expect(response).toEqual({
        status: 200,
        contentType: 'application/json',
        body: {          
          "status": 200,
          "result": [
              {
                  "code": "osgb4000000074553835",
                  "name_1": "Adlington",
                  "name_1_lang": null,
                  "name_2": null,
                  "name_2_lang": null,
                  "local_type": "Town",
                  "outcode": "PR6",
                  "county_unitary": "Lancashire",
                  "county_unitary_type": "County",
                  "district_borough": "Chorley",
                  "district_borough_type": "District",
                  "region": "North West",
                  "country": "England",
                  "longitude": -2.597354528609,
                  "latitude": 53.6173202874495,
                  "eastings": 360582,
                  "northings": 413585,
                  "min_eastings": 359099,
                  "min_northings": 412300,
                  "max_eastings": 361435,
                  "max_northings": 414767
              },
              {
                  "code": "osgb4000000074543613",
                  "name_1": "Adlingfleet",
                  "name_1_lang": null,
                  "name_2": null,
                  "name_2_lang": null,
                  "local_type": "Village",
                  "outcode": "DN14",
                  "county_unitary": "East Riding of Yorkshire",
                  "county_unitary_type": "UnitaryAuthority",
                  "district_borough": null,
                  "district_borough_type": null,
                  "region": "Yorkshire and the Humber",
                  "country": "England",
                  "longitude": -0.724682993719623,
                  "latitude": 53.6785976143851,
                  "eastings": 484337,
                  "northings": 420992,
                  "min_eastings": 484107,
                  "min_northings": 420632,
                  "max_eastings": 484992,
                  "max_northings": 421299
              },
              {
                  "code": "osgb4000000074544422",
                  "name_1": "Adlington",
                  "name_1_lang": null,
                  "name_2": null,
                  "name_2_lang": null,
                  "local_type": "Village",
                  "outcode": "SK10",
                  "county_unitary": "Cheshire East",
                  "county_unitary_type": "UnitaryAuthority",
                  "district_borough": null,
                  "district_borough_type": null,
                  "region": "North West",
                  "country": "England",
                  "longitude": -2.12928816062687,
                  "latitude": 53.3207739728258,
                  "eastings": 391485,
                  "northings": 380435,
                  "min_eastings": 390867,
                  "min_northings": 380053,
                  "max_eastings": 391921,
                  "max_northings": 380553
              },
              {
                  "code": "osgb4000000074561795",
                  "name_1": "Adley Moor",
                  "name_1_lang": null,
                  "name_2": null,
                  "name_2_lang": null,
                  "local_type": "Hamlet",
                  "outcode": "SY7",
                  "county_unitary": "County of Herefordshire",
                  "county_unitary_type": "UnitaryAuthority",
                  "district_borough": null,
                  "district_borough_type": null,
                  "region": "West Midlands",
                  "country": "England",
                  "longitude": -2.91265007812378,
                  "latitude": 52.365881613655,
                  "eastings": 337954,
                  "northings": 274595,
                  "min_eastings": 337387,
                  "min_northings": 274372,
                  "max_eastings": 338451,
                  "max_northings": 274872
              },
              {
                  "code": "osgb4000000074565937",
                  "name_1": "Adlestrop",
                  "name_1_lang": null,
                  "name_2": null,
                  "name_2_lang": null,
                  "local_type": "Village",
                  "outcode": "GL56",
                  "county_unitary": "Gloucestershire",
                  "county_unitary_type": "County",
                  "district_borough": "Cotswold",
                  "district_borough_type": "District",
                  "region": "South West",
                  "country": "England",
                  "longitude": -1.6472595570591,
                  "latitude": 51.9412647669806,
                  "eastings": 424345,
                  "northings": 227032,
                  "min_eastings": 423981,
                  "min_northings": 226777,
                  "max_eastings": 424651,
                  "max_northings": 227277
              }
          ]
        },
      })
    })

    it('should return 400 error for missing query',async () => {
      // given
      const query = undefined

      // when
      const response = await placesApi.placeQuery({ query })

      // then
      expect(response).toEqual({
        status: 400,
        contentType: 'application/json',
        body: {          
          status: 400,
          error: 'No valid query submitted. Remember to include every parameter',
        },
      })
    })
  })

  describe('placeLookup', () => {
    it('should return PlacesData for matching code', async () => {
      // given
      const code = 'osgb4000000074564391'

      // when
      const response = await placesApi.placeLookup(code)

      // then
      expect(response).toEqual(
        {
          status: 200,
          contentType: 'application/json',
          body: {            
            "status": 200,
            "result": {
              "code": "osgb4000000074564391",
              "name_1": "Kent",
              "name_1_lang": null,
              "name_2": null,
              "name_2_lang": null,
              "local_type": "Hamlet",
              "outcode": "BH24",
              "county_unitary": "Hampshire",
              "county_unitary_type": "County",
              "district_borough": "New Forest",
              "district_borough_type": "District",
              "region": "South East",
              "country": "England",
              "longitude": -1.80317162043943,
              "latitude": 50.8926950373503,
              "eastings": 413940,
              "northings": 110375,
              "min_eastings": 413668,
              "min_northings": 110116,
              "max_eastings": 414169,
              "max_northings": 110616
            }
          },
        }
      )
    })

    it('should return 404 error for non-matching code', async () => {
      // given
      const code = 'Plop'

      // when
      const response = await placesApi.placeLookup(code)

      // then
      expect(response).toEqual({
        status: 404,
        contentType: 'application/json',
        body: {          
          status: 404,
          error: 'Place not found',
        },
      })
    })
  })
})
