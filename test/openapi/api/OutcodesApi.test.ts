import { describe, expect, it } from '@jest/globals'
import { OutcodesApi } from '../../../src/openapi'

describe('OutcodesApi', () => {
  const outcodesApi = new OutcodesApi()

  describe('nearestOutcode', () => {
    it('should return list of nearest OutcodeData for valid outcode', async () => {
      // given
      const outcode = 'W1A'

      // when
      const response = await outcodesApi.nearestOutcode({ outcode, limit: 2 })

      // then
      expect(response).toEqual({
        status: 200,
        result: [
          {
            admin_county: [],
            admin_district: [
              'Westminster',
              'Islington',
            ],
            admin_ward: [
              'West End',
              'Clerkenwell',
            ],
            country: [
              'England',
            ],
            eastings: 531022,
            latitude: 51.5243793926381,
            longitude: -0.112778809815951,
            northings: 182295,
            outcode: 'W1A',
            parish: [
              'Islington, unparished area',
              'Westminster, unparished area',
            ],
            parliamentary_constituency: [
              'Islington South and Finsbury',
              'Cities of London and Westminster',
            ],
          },
          {
            admin_county: [],
            admin_district: [
              'Islington',
            ],
            admin_ward: [
              'Clerkenwell',
            ],
            country: [
              'England',
            ],
            eastings: 531073,
            latitude: 51.5245656272727,
            longitude: -0.112034159090909,
            northings: 182317,
            outcode: 'EC1P',
            parish: [
              'Islington, unparished area',
            ],
            parliamentary_constituency: [
              'Islington South and Finsbury',
            ],
          },
        ],
      });
    })

    it('should return 404 error for invalid outcode', async () => {
      // given
      const outcode = 'PLOP'

      // when
      const response = await outcodesApi.nearestOutcode({ outcode, limit: 2 })

      // then
      expect(response).toEqual({
        status: 404,
        error: 'Outcode not found'
      })
    })
  })

  describe('outcodeReverseGeocoding', () => {
    it('should return list of nearest OutcodeData for matching lon/lat', async () => {
      // given
      const lon = -2.302836
      const lat = 53.455654

      // when
      const response = await outcodesApi.outcodeReverseGeocoding({ lon, lat, limit: 2 })

      // then
      expect(response).toEqual({
        status: 200,
        result: [
          {
            admin_county: [],
            admin_district: [
              'Trafford',
            ],
            admin_ward: [
              'Gorse Hill',
              'Longford',
              'Stretford',
              'Priory',
            ],
            country: [
              'England',
            ],
            eastings: 379552,
            latitude: 53.4509196350365,
            longitude: -2.30937130656934,
            northings: 394951,
            outcode: 'M32',
            parish: [
              'Trafford, unparished area',
            ],
            parliamentary_constituency: [
              'Stretford and Urmston',
              'Wythenshawe and Sale East',
            ],
          },
          {
            admin_county: [],
            admin_district: [
              'Salford',
              'Trafford',
            ],
            admin_ward: [
              'Pendleton & Charlestown',
              'Gorse Hill',
              'Davyhulme East',
            ],
            country: [
              'England',
            ],
            eastings: 378921,
            latitude: 53.467968,
            longitude: -2.31899632335329,
            northings: 396850,
            outcode: 'M17',
            parish: [
              'Salford, unparished area',
              'Trafford, unparished area',
            ],
            parliamentary_constituency: [
              'Salford and Eccles',
              'Stretford and Urmston',
            ],
          },
        ],
      })
    })

    it('should return 200 null for non-matching lon/lat', async () => {
      // given
      const lon = 0
      const lat = 0

      // when
      const response = await outcodesApi.outcodeReverseGeocoding({ lon, lat })

      // then
      expect(response).toEqual({
        status: 200,
        result: null,
      })
    })
  })

  describe('outwardCodeLookup', () => {
    it('should return OutcodeData for valid outcode', async () => {
      // given
      const outcode = 'B1'

      // when
      const response = await outcodesApi.outwardCodeLookup(outcode)

      // then
      expect(response).toEqual({
        status: 200,
        result: {
          admin_county: [],
          admin_district: [
            "Birmingham",
          ],
          admin_ward: [
            "Ladywood",
            "Soho & Jewellery Quarter",
            "Bordesley & Highgate",
            "Newtown",
          ],
          country: [
            "England",
          ],
          eastings: 406257,
          latitude: 52.479937379085,
          longitude: -1.90929488562091,
          northings: 286893,
          outcode: "B1",
          parish: [
            "Birmingham, unparished area",
          ],
          parliamentary_constituency: [
            "Birmingham, Ladywood",
          ],
        },
      })
    })

    it('should return 404 error for invalid outcode', async () => {
      // given
      const outcode = 'PLOP'

      // when
      const response = await outcodesApi.outwardCodeLookup(outcode)

      // then
      expect(response).toEqual({
        status: 404,
        error: 'Outcode not found'
      })
    })
  })
})
